/**
 * Mastra Instance Configuration
 *
 * Sets up the Mastra framework for the blog agents.
 */

import { Mastra } from "@mastra/core";
import { PostgresStore } from "@mastra/pg";
import dotenv from "dotenv";
import path from "path";
import {
	editorAgent,
	orchestratorAgent,
	publisherAgent,
	researcherAgent,
	seoStrategistAgent,
	topicFinderAgent,
	writerAgent,
} from "./agents/index";
import { blogPostWorkflow } from "./workflows/index";

// Robustly find .env file
const possiblePaths = [
	path.resolve(process.cwd(), "../../.env"),
	path.resolve(process.cwd(), "../../../../../.env"),
];

for (const p of possiblePaths) {
	const result = dotenv.config({ path: p });
	if (!result.error) break;
}

// Validate required environment variables
const requiredEnvVars = [
	"DATABASE_URL",
	"AI_GATEWAY_API_KEY",
	"TAVILY_API_KEY",
];
for (const envVar of requiredEnvVars) {
	if (!process.env[envVar]) {
		console.warn(`Warning: ${envVar} is not set`);
	}
}

/**
 * Main Mastra instance
 */
export const mastra = new Mastra({
	storage: new PostgresStore({
		id: "blog-agents-storage",
		connectionString: process.env.DATABASE_URL!,
	}),
	agents: {
		orchestratorAgent,
		topicFinderAgent,
		researcherAgent,
		seoStrategistAgent,
		writerAgent,
		editorAgent,
		publisherAgent,
	},
	workflows: {
		blogPostWorkflow,
	},
});

export default mastra;

/**
 * Initialize Mastra and all agents
 * Call this before using any agents
 */
export async function initializeMastra(): Promise<void> {
	console.log("Initializing Mastra...");
	console.log("Mastra initialized successfully");
}

/**
 * Graceful shutdown
 */
export async function shutdownMastra(): Promise<void> {
	console.log("Shutting down Mastra...");
}

export { dotenv };
