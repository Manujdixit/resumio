import type { NextConfig } from "next";
import path from "path";
import dotenv from "dotenv";
import { withSentryConfig } from "@sentry/nextjs";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry organization and project
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

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
