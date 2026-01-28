/**
 * Model Configuration - Easily swappable LLM providers
 *
 * Uses AI SDK providers for type-safe model configuration.
 */

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
 *
 * Using vercel/ prefix tells Mastra to use the Vercel AI Gateway
 */
export function getModel(role: AgentRole): string {
  // Check for environment variable overrides
  const envKey = `LLM_MODEL_${role.toUpperCase()}`;
  const envModel = process.env[envKey];

  if (envModel) {
    // If it doesn't have a prefix, assume vercel/ for backward compatibility with our env setup
    return envModel.includes("/") ? envModel : `vercel/${envModel}`;
  }

  // Default model assignments by role
  // Using Vercel AI Gateway for unified access via Mastra
  const defaults: Record<AgentRole, string> = {
    orchestrator: "vercel/xiaomi/mimo-v2-flash",
    topicFinder: "vercel/xiaomi/mimo-v2-flash",
    researcher: "vercel/xiaomi/mimo-v2-flash",
    seoStrategist: "vercel/xiaomi/mimo-v2-flash",
    writer: "vercel/xiaomi/mimo-v2-flash",
    editor: "vercel/xiaomi/mimo-v2-flash",
    publisher: "vercel/xiaomi/mimo-v2-flash",
  };

  return defaults[role];
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
