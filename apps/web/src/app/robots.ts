import type { MetadataRoute } from "next";

/**
 * Robots.txt Configuration
 * Optimized for AI Search Engines and SEO scaling
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.resumebuild.cv";

  return {
    rules: [
      // AI Search Engines & LLM Crawlers (high priority)
      {
        userAgent: [
          "GPTBot", // OpenAI ChatGPT Search
          "ChatGPT-User", // ChatGPT browsing
          "Google-Extended", // Google Bard/Gemini
          "GoogleOther", // Google AI training
          "CCBot", // Common Crawl
          "anthropic-ai", // Claude AI
          "Claude-Web", // Claude web search
          "PerplexityBot", // Perplexity AI
          "Amazonbot", // Amazon AI
        ],
        allow: [
          "/",
          "/privacy",
          "/resume-templates",
          "/resume-templates/*",
          "/resume-examples",
          "/resume-examples/*",
          "/alternatives",
          "/alternatives/*",
          "/blog",
          "/blog/*",
        ],
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
      // Traditional search engines
      {
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot"],
        allow: [
          "/",
          "/privacy",
          "/resume-templates",
          "/resume-templates/*",
          "/resume-examples",
          "/resume-examples/*",
          "/alternatives",
          "/alternatives/*",
          "/blog",
          "/blog/*",
        ],
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
      // Block other AI training bots and scrapers from user data
      {
        userAgent: [
          "facebookexternalhit",
          "Diffbot",
          "Bytespider",
          "ClaudeBot",
          "cohere-ai",
        ],
        allow: ["/", "/privacy"],
        disallow: ["/"], // Block aggressive scrapers entirely from app
      },
      // All other bots
      {
        userAgent: "*",
        allow: ["/"],
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
