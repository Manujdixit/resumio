import type { MetadataRoute } from "next";

/**
 * Robots.txt Configuration
 * Optimized for AI Search Engines (ChatGPT Search, Perplexity, Claude, etc.)
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://resumebuild.cv";

  return {
    rules: [
      // AI Search Engines & LLM Crawlers (high priority)
      {
        userAgent: [
          "GPTBot", // OpenAI ChatGPT Search
          "ChatGPT-User", // ChatGPT browsing
          "Google-Extended", // Google Bard/Gemini
          "GoogleOther", // Google AI training
          "CCBot", // Common Crawl (used by many AI systems)
          "anthropic-ai", // Claude AI
          "Claude-Web", // Claude web search
          "PerplexityBot", // Perplexity AI
          "Amazonbot", // Amazon AI
        ],
        allow: ["/", "/privacy"],
        disallow: [
          "/api/*",
          "/login",
          "/signup",
          "/dashboard",
          "/resumes",
          "/chat/*",
          "/new",
          "/success",
          "/share/*", // Privacy: Do not index user resumes
        ],
        crawlDelay: 1,
      },
      // Traditional search engines (privacy-first)
      {
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot"],
        allow: ["/", "/privacy"],
        disallow: [
          "/api/*",
          "/login",
          "/signup",
          "/dashboard",
          "/resumes",
          "/chat/*",
          "/new",
          "/success",
          "/share/*", // Privacy: Do not index user resumes
        ],
      },
      // Block other AI training bots and scrapers from user data
      {
        userAgent: [
          "facebookexternalhit", // Facebook AI
          "Diffbot", // Web scraping
          "Bytespider", // ByteDance crawler
          "ClaudeBot", // Anthropic training (distinct from Claude-Web search)
          "cohere-ai", // Cohere AI training
        ],
        allow: ["/", "/privacy"],
        disallow: [
          "/api/*",
          "/chat/*",
          "/resumes",
          "/dashboard",
          "/new",
          "/share/*",
        ],
      },
      // All other bots (restrictive)
      {
        userAgent: "*",
        allow: ["/", "/privacy"],
        disallow: [
          "/api/*",
          "/login",
          "/signup",
          "/dashboard",
          "/resumes",
          "/chat/*",
          "/new",
          "/success",
          "/share/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
