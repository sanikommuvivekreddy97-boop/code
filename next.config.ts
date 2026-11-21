import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import { withBotId } from "botid/next/config";
import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * When set (e.g. by Husky pre-push), production build writes to `.next-husky`
 * so `pnpm build` does not delete the `.next` folder used by a running dev server.
 */
const nextDistDir =
  process.env["NEXT_ISOLATED_BUILD"] === "1" ? ".next-husky" : ".next";

const nextConfig: NextConfig = {
  distDir: nextDistDir,

  // ===== Performance Optimizations =====
  reactStrictMode: true,
  compress: true,

  // Strip redesign verification hooks (data-t) from production HTML only —
  // dev keeps them for pixel-verify. Exact-match regex: must NOT touch
  // data-redesign (runtime CSS token scope) or data-testid.
  ...(process.env.NODE_ENV === "production"
    ? { compiler: { reactRemoveProperties: { properties: ["^data-t$"] } } }
    : {}),

  // ===== Security =====
  poweredByHeader: false,

  // ===== TypeScript Strict Mode =====
  typescript: {
    // Fail build on type errors - no bypassing!
    ignoreBuildErrors: false,
  },

  // ===== Image Optimization =====
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 80, 85, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.magicstudio.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "meta.magicstudio.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "magicstudio-public.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "instaheadshots-public.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // ===== Experimental Features for Performance =====
  experimental: {
    // Use optimized package imports
    optimizePackageImports: ["react", "react-dom"],
  },

  outputFileTracingIncludes: {
    "**/share/**": ["./app/**/share/**/og-background.jpg"],
    "**/refer/**": ["./app/**/refer/**/*.{jpg,png}"],
  },

  // ===== Output for better caching =====
  // output: "standalone", // Only enable for Docker/production builds

  // ===== Domain migration: instaheadshots -> magicstudio =====
  // Document requests are redirected in middleware.ts instead (with a
  // logged-in session handoff), so these rules cover only the paths the
  // middleware matcher excludes: /api, /_next, /_vercel, and dotted files.
  // Host values are anchored regexes, so client subdomains like
  // jpmwm.app-develop.instaheadshots.com are NOT redirected.
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => {
    const migratedHosts = [
      {
        host: "app\\.instaheadshots\\.com",
        target: "https://app.magicstudio.com",
      },
      {
        host: "app-develop\\.instaheadshots\\.com",
        target: "https://app.develop.magicstudio.com",
      },
    ];
    const pathRules = [
      { source: "/api/:path*", destinationPath: "/api/:path*" },
      { source: "/_next/:path*", destinationPath: "/_next/:path*" },
      { source: "/_vercel/:path*", destinationPath: "/_vercel/:path*" },
      { source: "/:path(.*\\..*)", destinationPath: "/:path" },
    ];
    return migratedHosts.flatMap(({ host, target }) =>
      pathRules.map(({ source, destinationPath }) => ({
        source,
        has: [{ type: "host" as const, value: host }],
        destination: `${target}${destinationPath}`,
        permanent: true,
      }))
    );
  },

  // ===== Headers for Security & Performance =====
  // eslint-disable-next-line @typescript-eslint/require-await
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(
  withBundleAnalyzer(withBotId(withNextIntl(nextConfig))),
  {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    org: process.env.NEXT_PUBLIC_SENTRY_ORG,

    project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env["CI"],

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload:
      process.env.NEXT_PUBLIC_SENTRY_ENABLE_SOURCE_MAPS === "true",

    // Source-map generation is otherwise forced on every build (the SDK
    // overrides webpack devtool) and upload runs whenever SENTRY_AUTH_TOKEN
    // is set. Only production deploys need symbolicated stack traces.
    sourcemaps: {
      disable: process.env["VERCEL_ENV"] !== "production",
    },

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    webpack: {
      // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,

      // Tree-shaking options for reducing bundle size
      treeshake: {
        // Automatically tree-shake Sentry logger statements to reduce bundle size
        removeDebugLogging: true,
      },
    },
  }
);
