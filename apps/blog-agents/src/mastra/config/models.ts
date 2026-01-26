/**
 * Model Configuration - Easily swappable LLM providers
 *
 * Uses AI SDK providers for type-safe model configuration.
 */

import { gateway } from "@ai-sdk/gateway";

export type AgentRole =
  | "orchestrator"
  | "topicFinder"
  | "researcher"
  | "seoStrategist"
  | "writer"
  | "editor"
  | "publisher";

/**
 * Get the language model for a specific agent role
 *
 * This function centralizes model configuration, making it easy to:
 * - Switch providers (OpenAI, Anthropic, etc.)
 * - Adjust models per role
 * - Override via environment variables
 */
export function getModel(role: AgentRole): any {
  // Check for environment variable overrides
  const envKey = `LLM_MODEL_${role.toUpperCase()}`;
  const envModel = process.env[envKey];

  // Default model assignments by role
  // Using Vercel AI Gateway for unified access
  const defaults: Record<AgentRole, () => any> = {
    orchestrator: () => gateway("xiaomi/mimo-v2-flash"),
    topicFinder: () => gateway("xiaomi/mimo-v2-flash"),
    researcher: () => gateway("xiaomi/mimo-v2-flash"),
    seoStrategist: () => gateway("xiaomi/mimo-v2-flash"),
    writer: () => gateway("xiaomi/mimo-v2-flash"),
    editor: () => gateway("zai/glm-4.7"),
    publisher: () => gateway("minimax/minimax-m2.1"),
  };

  // If environment variable is set, use it via gateway
  if (envModel) {
    // gateway() handles "provider/model" strings automatically
    return gateway(envModel);
  }

  // Return default model for role
  return defaults[role]();
}

/**
 * Blog generation configuration
 */
export const blogConfig = {
  // Quality thresholds
  qualityThreshold: Number.parseInt(
    process.env.BLOG_QUALITY_THRESHOLD || "80",
    10,
  ),
  autoPublish: process.env.BLOG_AUTO_PUBLISH === "true",

  // Content settings
  minWordCount: 1500,
  maxWordCount: 2500,
  targetInternalLinks: 5,

  // Site configuration
  siteUrl: process.env.BLOG_SITE_URL || "https://www.resumebuild.cv",
  siteName: "ResumeBuild",
};
