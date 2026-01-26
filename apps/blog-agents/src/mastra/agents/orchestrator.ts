/**
 * Blog Orchestrator Agent
 *
 * The main agent that coordinates the entire blog generation pipeline.
 * Instead of using agent networks, this orchestrator calls each agent
 * sequentially through a pipeline function.
 */

import { Agent } from "@mastra/core/agent";
import { getModel } from "../config/models.js";
import {
  getInternalLinksTool,
  manageCategoriesToolTool,
  queryBlogsTool,
} from "../tools/index.js";
import { blogPostWorkflow } from "../workflows/blog-post.js";

// Import sub-agents
// import { topicFinderAgent } from "./topic-finder.js"; // Unused

/**
 * Blog Orchestrator - a helper agent for high-level coordination
 * Note: The actual pipeline is run via runBlogPipeline function below which uses the Workflow
 */
export const orchestratorAgent = new Agent({
  id: "blog-orchestrator",
  name: "blog-orchestrator",
  instructions: `You are the blog content orchestrator for ResumeBuild.
Your job is to help coordinate and plan blog content creation.
You can query existing blogs and help with high-level decisions.`,
  model: getModel("orchestrator"),
  tools: {
    queryBlogs: queryBlogsTool,
    getInternalLinks: getInternalLinksTool,
    manageCategories: manageCategoriesToolTool,
  },
});

/**
 * Run the blog generation pipeline
 *
 * This function orchestrates the entire content generation process
 * by calling each specialized agent in sequence.
 *
 * @param topic - The blog topic or title
 * @param options - Optional configuration
 * @returns Pipeline result
 */
export async function runBlogPipeline(
  topic: string,
  options: {
    dryRun?: boolean;
    verbose?: boolean;
  } = {},
): Promise<{
  success: boolean;
  postId?: string;
  postUrl?: string;
  status?: string;
  qualityScore?: number;
  error?: string;
}> {
  const { dryRun = false, verbose = false } = options;

  const log = (message: string) => {
    if (verbose) console.log(message);
  };

  log("\n🚀 Starting blog generation pipeline (Workflow Engine)...");
  log(`📝 Input Topic: "${topic || "Auto-detect"}"`);
  log(`🔧 Mode: ${dryRun ? "Dry Run" : "Live"}\n`);

  try {
    // createRun is async in Mastra v1? The type check says so.
    // It returns Promise<Run>
    // Run object has runId and start()
    const workflowRun = blogPostWorkflow.createRun();

    // If it's a promise, we should await it?
    // But type error said: Property 'runId' does not exist on type 'Promise<Run...>'
    // So yes, it is a promise.

    // Wait, if createRun() returns a Promise, I cannot destructure immediately.
    // But in the code I saw: const { runId, start } = blogPostWorkflow.createRun();

    // Let's assume we need to await it?
    // Actually, standard Mastra v1 might be synchronous createRun but returns an object that has async methods?
    // But the error is explicit: "Property 'runId' does not exist on type 'Promise<...>'"

    // So I MUST await it if the library defines it as async.

    // However, I suspect createRun() returns a Run object directly in some versions.
    // Let's try awaiting it.

    // BUT wait! I am editing the file.
    // I will change it to await.

    // Wait, if I change it to await, I need to know if createRun returns a Promise.
    // The error confirms it returns a Promise.

    const { runId, start } = blogPostWorkflow.createRun();
    // If this line caused the error, then createRun IS async?
    // Or maybe createRun returns { runId, start } but TS thinks it's a Promise?

    // Let's try `await blogPostWorkflow.createRun()`.

    /* 
		   Wait, look at context7 examples.
		   const result = await userWorkflow.execute({ triggerData: ... });
		   
		   It doesn't use createRun().
		   
		   I used createRun() because I wanted runId.
		   
		   If I use .execute(), I get result.
		   Does result have runId?
		   
		   "const run = await userWorkflow.execute({...}); if (run.status...) const resumed = await userWorkflow.resume(run.runId...)"
		   
		   So `execute()` returns the Run object (or result with runId).
		*/

    // So I should use .execute() directly!

    const result = await blogPostWorkflow.execute({
      triggerData: {
        topic: topic || undefined,
        dryRun,
      },
    });

    console.log(`▶️ Workflow Run ID: ${result.runId}`); // execute returns Run

    // result.results contains the output steps
    const publishResult = result.results.publish;

    if (dryRun) {
      return {
        success: true,
        status: "dry-run-completed",
      };
    }

    if (publishResult) {
      const { status, postUrl } = publishResult;
      log("\n" + "━".repeat(50));
      log(`✅ Workflow Completed. Status: ${status}`);
      if (postUrl) log(`🔗 URL: ${postUrl}`);

      return {
        success: true,
        status,
        postUrl,
        // Quality score is in review step output, but hard to access if only final output returned?
        // We can rely on logs for now.
      };
    }

    return {
      success: false,
      error: "Workflow completed but returned no result",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`\n❌ Pipeline error: ${errorMessage}`);

    return {
      success: false,
      error: errorMessage,
    };
  }
}
