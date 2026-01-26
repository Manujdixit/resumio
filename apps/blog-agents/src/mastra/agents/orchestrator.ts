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
import { blogPostWorkflow } from "../workflows/index.js";

/**
 * Blog Orchestrator - a helper agent for high-level coordination
 * Note: The actual pipeline is run via runBlogPipeline function below which uses the Workflow
 */
export const orchestratorAgent = new Agent({
  id: "blog-orchestrator",
  name: "blog-orchestrator",
  instructions: `You are the blog content orchestrator for resumebuild.cv.
Your job is to help coordinate and plan blog content creation.
You can query existing blogs and help with high-level decisions.`,
  model: getModel("orchestrator"),
  defaultOptions: {
    modelSettings: {
      temperature: 0.1,
    },
  },
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
    // Execute the workflow directly
    const run = await blogPostWorkflow.createRun();
    const result = await run.start({
      inputData: {
        topic: topic || undefined,
        dryRun,
      },
    });

    if (!result || result.status !== "success") {
      const status = result?.status;
      const errorMsg =
        status === "failed"
          ? result.error?.message
          : status === "tripwire"
            ? "Workflow hit a tripwire"
            : status === "suspended"
              ? "Workflow suspended"
              : `Workflow ended with status: ${status}`;
      throw new Error(`Workflow execution failed: ${errorMsg}`);
    }

    // result.result contains the output defined in outputSchema on success
    const { status: workflowStatus, postUrl } = result.result;

    if (dryRun) {
      return {
        success: true,
        status: "dry-run-completed",
      };
    }

    if (workflowStatus) {
      log(`\n${"━".repeat(50)}`);
      log(`✅ Workflow Completed. Status: ${workflowStatus}`);
      if (postUrl) log(`🔗 URL: ${postUrl}`);

      return {
        success: true,
        status: workflowStatus,
        postUrl,
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
