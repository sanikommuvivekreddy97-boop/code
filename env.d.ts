/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly NEXT_RUNTIME?: "nodejs" | "edge";
    readonly ANALYZE?: "true" | "false";
    readonly npm_config_user_agent?: string;
    readonly NEXT_PUBLIC_ANALYTICS_BASE_URL: string;
    readonly NEXT_PUBLIC_API_BASE_URL: string;
    readonly NEXT_PUBLIC_CLIENT_ID: string;
    readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    readonly NEXT_PUBLIC_USE_LOCAL_STORAGE: "true" | "false";
    readonly NEXT_PUBLIC_HOST_URL: string;
    readonly NEXT_PUBLIC_IMAGE_SERVICE_URL: string;
    readonly NEXT_PUBLIC_CDN_URL: string;
    readonly NEXT_PUBLIC_STRIPE_KEY: string;
    readonly NEXT_PUBLIC_CDN_URL_ASSETS: string;
    readonly NEXT_PUBLIC_COOKIE_HOST: string;
    readonly NEXT_PUBLIC_SENTRY_DSN: string;
    readonly NEXT_PUBLIC_SENTRY_PROJECT: string;
    readonly NEXT_PUBLIC_SENTRY_ORG: string;
    readonly NEXT_PUBLIC_SENTRY_DEFAULT_PII: "true" | "false";
    readonly NEXT_PUBLIC_SENTRY_ENABLE_SOURCE_MAPS: "true" | "false";
    readonly NEXT_PUBLIC_LANDING_PAGE_URL: string;
    readonly NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: string;
    readonly NEXT_PUBLIC_EXP_LP_STUDIO_DESIGN?: "true" | "false";
    readonly NEXT_PUBLIC_EXP_LP_PROFESSIONAL_TWIN?: "true" | "false";
    readonly REQUEST_SIGNING_KEY?: string;
  }
}
