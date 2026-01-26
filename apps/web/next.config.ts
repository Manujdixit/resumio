import path from "node:path";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import dotenv from "dotenv";
import type { NextConfig } from "next";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  serverExternalPackages: ["better-auth"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withSentryConfig(withAnalyzer(nextConfig), {
  // Sentry organization and project
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Sentry auth token
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Sentry URL
  url: process.env.SENTRY_URL,

  // Suppress Sentry source map upload logs during build
  silent: !process.env.CI,

  // Upload large source maps
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent adblockers
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Hide source maps from generated client bundles
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});
