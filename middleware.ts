import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import createMiddleware from "next-intl/middleware";
import { v4 as uuidv4 } from "uuid";

import { routing } from "./i18n/routing";
import { isRoutableSubdomain, getSubdomainRouteConfig } from "./lib/constants";
import { CT_FORM, HDR_CONTENT_TYPE } from "./lib/constants/auth";
import { IH_API_BASE_URL } from "./lib/constants/urls";
import { getEnvPrefixedAuthCookieName } from "./lib/cookies/schema";
import {
  AUTH_HANDOFF_CARRY_MAX_VALUE_LENGTH,
  AUTH_HANDOFF_CARRY_PARAMS,
  AUTH_HANDOFF_PATH,
  getMigrationTargetHost,
} from "./lib/domain-migration/config";
import { buildHandoffUrl } from "./lib/domain-migration/handoff";
import { rewriteCookieDomainForHostAll } from "./lib/domain-migration/rewrite-cookie-domain";
import { processExperiments } from "./lib/experiments/middleware-handler";
import { isPreviewServer } from "./lib/preview-proxy/detect";
import { stripCookieDomainAll } from "./lib/preview-proxy/rewrite-set-cookie";
import { extractSubdomain } from "./lib/utils/common/extract-subdomain";
import { mergeCookieHeader } from "./lib/utils/cookie-header";

const REFRESH_WINDOW_SECONDS = 60;
const REFRESH_TIMEOUT_MS = 8_000;

const AUTH_ACCESS_COOKIE_BASE = "at";
const AUTH_REFRESH_COOKIE_BASE = "rt";

const shouldAttemptRefresh = (request: NextRequest): boolean => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return false;
  }

  const purpose = request.headers.get("purpose");
  if (purpose === "prefetch") {
    return false;
  }

  const refreshCookieName = getEnvPrefixedAuthCookieName(
    AUTH_REFRESH_COOKIE_BASE
  );
  const refreshCookie = request.cookies.get(refreshCookieName);
  if (refreshCookie === undefined || refreshCookie.value === "") {
    return false;
  }

  const accessCookieName = getEnvPrefixedAuthCookieName(
    AUTH_ACCESS_COOKIE_BASE
  );
  const accessCookie = request.cookies.get(accessCookieName);

  if (accessCookie === undefined || accessCookie.value === "") {
    return true;
  }

  const exp = decodeJwtExp(accessCookie.value);
  if (exp === null) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return exp <= now + REFRESH_WINDOW_SECONDS;
};

const decodeJwtExp = (token: string): number | null => {
  try {
    const parts = token.split(".");
    if (parts.length < 2 || parts[1] === undefined || parts[1] === "") {
      return null;
    }

    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(payload);
    const parsed = JSON.parse(decoded) as { exp?: number };

    return typeof parsed.exp === "number" ? parsed.exp : null;
  } catch {
    return null;
  }
};

/** Normalize Set-Cookie value from backend (Edge may return non-array). */
const normalizeSetCookieList = (raw: unknown): string[] => {
  if (Array.isArray(raw)) {
    return raw.filter(
      (c): c is string => typeof c === "string" && c.length > 0
    );
  }
  if (typeof raw === "string" && raw.length > 0) {
    return [raw];
  }
  return [];
};

/** Extract Set-Cookie headers from fetch response. */
const getSetCookieHeadersFromResponse = (response: Response): string[] => {
  const hdrsUnknown = response.headers as unknown as {
    getSetCookie?: () => unknown;
    get: (key: string) => string | null;
  };
  if (typeof hdrsUnknown.getSetCookie === "function") {
    return normalizeSetCookieList(hdrsUnknown.getSetCookie());
  }
  const single = hdrsUnknown.get("set-cookie");
  if (single !== null && single !== "") {
    return normalizeSetCookieList([single]);
  }
  return [];
};

const appendSetCookieHeaders = (
  response: NextResponse,
  setCookieHeaders: string[]
): void => {
  for (const cookie of setCookieHeaders) {
    response.headers.append("Set-Cookie", cookie);
  }
};

interface RefreshResult {
  setCookieHeaders: string[];
  mergedCookieHeader: string;
}

const attemptRefresh = async (
  request: NextRequest
): Promise<RefreshResult | null> => {
  if (!shouldAttemptRefresh(request)) {
    return null;
  }

  const backendUrl = `${IH_API_BASE_URL}/finish-login/`;
  const headers = new Headers();
  const cookieHeader = request.headers.get("cookie");

  if (cookieHeader !== null && cookieHeader !== "") {
    headers.set("cookie", cookieHeader);
  }

  headers.set(HDR_CONTENT_TYPE, CT_FORM);

  const body = new URLSearchParams({
    grant_type: "refresh_token",
  }).toString();

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
    });

    if (!response.ok) {
      return null;
    }

    const setCookieHeaders = getSetCookieHeadersFromResponse(response);
    if (setCookieHeaders.length === 0) {
      return null;
    }

    const mergedCookieHeader = mergeCookieHeader(
      cookieHeader ?? undefined,
      setCookieHeaders
    );

    if (mergedCookieHeader === undefined || mergedCookieHeader === "") {
      return null;
    }

    return { setCookieHeaders, mergedCookieHeader };
  } catch {
    return null;
  }
};

const HANDOFF_MINT_TIMEOUT_MS = 5_000;

const mintHandoffToken = async (
  refreshToken: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${IH_API_BASE_URL}/create-handoff-token/`, {
      method: "POST",
      headers: { [HDR_CONTENT_TYPE]: CT_FORM },
      body: new URLSearchParams({ refresh_token: refreshToken }).toString(),
      signal: AbortSignal.timeout(HANDOFF_MINT_TIMEOUT_MS),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      handoff_token?: { id_token?: string };
    };
    const idToken = data.handoff_token?.id_token;
    return typeof idToken === "string" && idToken !== "" ? idToken : null;
  } catch {
    return null;
  }
};

const getMigrationRefreshToken = (request: NextRequest): string => {
  const baseName = getEnvPrefixedAuthCookieName(AUTH_REFRESH_COOKIE_BASE);
  const base = request.cookies.get(baseName)?.value ?? "";
  if (base !== "") {
    return base;
  }
  return request.cookies.get(`dev_${AUTH_REFRESH_COOKIE_BASE}`)?.value ?? "";
};

/**
 * Redirect an old-domain request to its migrated host. Logged-in document
 * navigations detour through the auth handoff route with a single-use backend
 * token so the session survives the domain change; everything else (and any
 * mint failure) falls back to a plain permanent redirect.
 */
const handleDomainMigration = async (
  request: NextRequest,
  targetHost: string
): Promise<NextResponse> => {
  const { pathname, search } = request.nextUrl;
  const destination = new URL(`https://${targetHost}${pathname}${search}`);

  const accept = request.headers.get("accept") ?? "";
  const isDocumentRequest =
    request.method === "GET" &&
    accept.includes("text/html") &&
    request.headers.get("purpose") !== "prefetch";

  if (!isDocumentRequest) {
    return NextResponse.redirect(destination, 308);
  }

  const carryParams = collectCarryParams(request);
  const refreshToken = getMigrationRefreshToken(request);
  const idToken =
    refreshToken === "" ? null : await mintHandoffToken(refreshToken);

  if (idToken === null && Object.keys(carryParams).length === 0) {
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.redirect(
    buildHandoffUrl(targetHost, idToken, `${pathname}${search}`, carryParams),
    302
  );
};

const collectCarryParams = (request: NextRequest): Record<string, string> => {
  const params: Record<string, string> = {};
  for (const [cookieName, param] of Object.entries(AUTH_HANDOFF_CARRY_PARAMS)) {
    const value = request.cookies.get(cookieName)?.value ?? "";
    if (value !== "" && value.length <= AUTH_HANDOFF_CARRY_MAX_VALUE_LENGTH) {
      params[param] = value;
    }
  }
  return params;
};

const handleI18nRouting = createMiddleware(routing);

const setEihCookie = (request: NextRequest, response: NextResponse): void => {
  // Check if _eih cookie already exists
  const existingCookie = request.cookies.get("_eih");
  if (existingCookie !== undefined) {
    return; // Cookie already exists, don't set it again
  }

  try {
    const domain = new URL(request.url).hostname;

    const cookieValue = uuidv4();
    const cookieOptions: {
      maxAge: number;
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax" | "strict" | "none";
      domain?: string;
    } = {
      maxAge: 400 * 24 * 60 * 60,
      httpOnly: false,
      secure: true,
      sameSite: "lax",
    };

    if (domain.length > 0) {
      cookieOptions.domain = domain;
    }

    response.cookies.set("_eih", cookieValue, cookieOptions);
  } catch (error) {
    console.error("Error setting _eih cookie in middleware:", error);
  }
};

const handleDynamicSubdomain = (
  request: NextRequest,
  pathname: string,
  subdomain: string
): NextResponse | null => {
  const config = getSubdomainRouteConfig(subdomain);
  if (config === null) return null;

  if (pathname === "/") {
    const response = NextResponse.rewrite(
      new URL(`/${config.targetRoute}`, request.url)
    );
    setEihCookie(request, response);
    processExperiments(request, response);
    return response;
  }

  if (config.preservePath && pathname !== "/") {
    const response = NextResponse.rewrite(
      new URL(`/${config.targetRoute}${pathname}`, request.url)
    );
    setEihCookie(request, response);
    processExperiments(request, response);
    return response;
  }

  return null;
};

/**
 * Handle dynamic subdomain; returns response or null.
 */
const handleSubdomains = (
  request: NextRequest,
  pathname: string,
  subdomain: string | null
): NextResponse | null => {
  if (subdomain !== null && isRoutableSubdomain(subdomain)) {
    return handleDynamicSubdomain(request, pathname, subdomain);
  }
  return null;
};

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  const hostname = request.headers.get("host") ?? "";

  const migrationTargetHost = getMigrationTargetHost(hostname);
  if (migrationTargetHost !== null) {
    return handleDomainMigration(request, migrationTargetHost);
  }

  const isHandoffRequest = request.nextUrl.pathname === AUTH_HANDOFF_PATH;

  const refreshResult = await attemptRefresh(request);

  if (refreshResult !== null) {
    const response = NextResponse.redirect(request.url);
    const cookiesToSet = isPreviewServer(hostname)
      ? stripCookieDomainAll(refreshResult.setCookieHeaders)
      : rewriteCookieDomainForHostAll(refreshResult.setCookieHeaders, hostname);
    appendSetCookieHeaders(response, cookiesToSet);
    if (!isHandoffRequest) {
      setEihCookie(request, response);
      processExperiments(request, response);
    }
    return response;
  }

  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(hostname);

  const subdomainResponse = handleSubdomains(request, pathname, subdomain);
  if (subdomainResponse !== null) {
    return subdomainResponse;
  }

  const i18nResponse = handleI18nRouting(request);
  if (!isHandoffRequest) {
    setEihCookie(request, i18nResponse);
    processExperiments(request, i18nResponse);
  }
  return i18nResponse;
}

// Our middleware only applies to routes that
// match the following:
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
