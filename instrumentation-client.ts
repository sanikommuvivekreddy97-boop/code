// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import posthogClient from "posthog-js";

// Script-origin URLs for third-party / browser-extension noise that Sentry's
// built-in "browser extensions" inbound filter does not catch. Append as found.
const IGNORED_SCRIPT_URLS = [
  /\/scrapers\//, // ad/network scraper extension (PrebidScraper, NetworkRequest2Scraper)
  /\/ct\/lib\/main\./, // Pinterest conversion tag (ct.pinterest.com) fetch rejections
  /\.js\.download(?:$|[?#])/, // saved-page ("Save As") artifacts opened from disk
  /\/inpage\.js/, // MetaMask extension inpage.js
  /^app:\/\/navigation_performance_logger_android/,
  /\/executors\/\d+\.js/,
  /\/inject_content\.js/,
];

// Patterns tested against each exception message in beforeSend; a match drops the event.
const IGNORED_ERROR_MESSAGES = [
  /metamask/i, // MetaMask extension errors injected via inpage.js
  /fireCustomGoal/,
  /fireSlimPurchaseEvent/,
  /px\.ads\.linkedin\.com/,
  /runtime\.sendMessage\(\)\. Tab not found/,
  /Object Not Found Matching Id/,
  /window\.webkit\.messageHandlers/,
  /document\.elementFromPoint\(.*\)\.click/,
  /Blocked a frame with origin .* from accessing a cross-origin frame/,
  /Event `CustomEvent` \(type=unhandledrejection\) captured as promise rejection/,
];

// True when any exception message matches an ignored pattern.
function isIgnoredErrorMessage(event: Sentry.ErrorEvent): boolean {
  return (
    event.exception?.values?.some((v) =>
      IGNORED_ERROR_MESSAGES.some((re) => re.test(v.value ?? "")),
    ) ?? false
  );
}
/**
 * Detect in-app browsers so we can tag Sentry events for diagnostics.
 */
function detectInAppBrowser(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/NewsSapphire/i.test(ua)) return "apple-news";
  if (/FBAN|FBAV/i.test(ua)) return "facebook";
  if (/Instagram/i.test(ua)) return "instagram";
  if (/musical_ly|TikTok|BytedanceWebview/i.test(ua)) return "tiktok";
  if (/LinkedIn/i.test(ua)) return "linkedin";
  if (/Twitter|X-Twitter/i.test(ua)) return "twitter";
  if (/Snapchat/i.test(ua)) return "snapchat";
  if (/Pinterest/i.test(ua)) return "pinterest";
  return null;
}

posthogClient.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, {
  api_host: "https://p.magicstudio.com",
  defaults: "2026-01-30",
  autocapture: false,
  disable_session_recording: false,
  capture_pageview: false,
  capture_pageleave: false,
  cross_subdomain_cookie: true,
});

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Add optional integrations for additional features

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  // replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  // replaysOnErrorSampleRate: 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: process.env.NEXT_PUBLIC_SENTRY_DEFAULT_PII === "true",

  denyUrls: IGNORED_SCRIPT_URLS,

  initialScope: {
    tags: { app_name: "instaheadshots", runtime: "client" },
  },

  beforeSend(event) {
    // Drop events whose message matches an ignored pattern.
    if (
      isIgnoredErrorMessage(event) ||
      event.request?.url?.startsWith("file://")
    ) {
      return null;
    }

    // Tag events with in-app browser for diagnostics — helps identify
    // error patterns in restricted browser environments.
    const inAppBrowser = detectInAppBrowser();
    if (inAppBrowser !== null) {
      event.tags = { ...event.tags, in_app_browser: inAppBrowser };
    }

    return event;
  },

  beforeBreadcrumb(breadcrumb, hint) {
    // Filter out noisy analytics debug logs from console breadcrumbs
    if (breadcrumb.category === "console") {
      const message = breadcrumb.message ?? "";
      if (
        message.includes("Analytics event sent") ||
        message.includes("[object Object]")
      ) {
        return null;
      }

      // Serialize console arguments that Sentry captures as [object Object]
      const args = hint?.["input"] as unknown[] | undefined;
      if (Array.isArray(args) && args.length > 1) {
        breadcrumb.message = args
          .map((arg) => {
            if (typeof arg === "string") return arg;
            try {
              return JSON.stringify(arg);
            } catch {
              return String(arg);
            }
          })
          .join(" ");
      }
    }

    return breadcrumb;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
