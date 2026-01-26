/**
 * Web Search Tool
 *
 * Allows research agent to search the web for information.
 * Uses a simple web search approach.
 */

import { createTool } from "@mastra/core/tools";
import { tavily } from "@tavily/core";
import { z } from "zod";

export const webSearchTool = createTool({
	id: "web-search",
	description: `Search the web for information on a topic.
    Use this to:
    - Research statistics and facts for blog posts
    - Find expert opinions and quotes
    - Analyze competitor content
    - Get up-to-date information on topics
    
    Note: This is a simulated search for now. In production,
    connect to a real search API (Serper, Tavily, etc.)`,
	inputSchema: z.object({
		query: z.string().describe("Search query"),
		type: z
			.enum(["general", "news", "statistics"])
			.optional()
			.default("general")
			.describe("Type of search"),
		limit: z
			.number()
			.min(1)
			.max(10)
			.optional()
			.default(5)
			.describe("Number of results"),
	}),
	outputSchema: z.object({
		results: z.array(
			z.object({
				title: z.string(),
				url: z.string(),
				snippet: z.string(),
				source: z.string(),
			}),
		),
		query: z.string(),
		message: z.string(),
	}),
	execute: async (context) => {
		const { query, type, limit } = context;

		console.log(
			`[Web Search] Query: "${query}" (type: ${type}, limit: ${limit})`,
		);

		try {
			const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || "" });
			const response = await tvly.search(query, {
				search_depth:
					type === "news" || type === "statistics" ? "advanced" : "basic",
				include_answer: true,
				max_results: limit,
				topic: type === "news" ? "news" : "general",
			});

			return {
				results: response.results.map((r) => ({
					title: r.title,
					url: r.url,
					snippet: r.content,
					source: r.url,
				})),
				query,
				message: response.answer || "Search completed successfully.",
			};
		} catch (error) {
			console.error("Tavily search failed:", error);
			return {
				results: [],
				query,
				message: `Search failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			};
		}
	},
});
