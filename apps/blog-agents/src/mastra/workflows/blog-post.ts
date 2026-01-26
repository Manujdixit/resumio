import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { writerAgent } from "../agents/content-writer.js";
import { editorAgent } from "../agents/editor.js";
import { publisherAgent } from "../agents/publisher.js";
import { researcherAgent } from "../agents/researcher.js";
import { seoStrategistAgent } from "../agents/seo-strategist.js";
import { topicFinderAgent } from "../agents/topic-finder.js";
import { queryBlogsTool } from "../tools/query-blogs.js";

// --- STEPS ---

// 1. Topic Discovery (Auto-detect if missing)
const topicDiscoveryStep = createStep({
  id: "topic-discovery",
  inputSchema: z.object({
    topic: z.string().optional(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    topic: z.string(),
    dryRun: z.boolean().optional(),
  }),
  execute: async ({ inputData }) => {
    const { topic, dryRun } = inputData;
    if (topic && topic !== "auto-detect") {
      return { topic, dryRun };
    }

    console.log("🕵️ [Workflow] Auto-discovering topic...");
    const result = await topicFinderAgent.generate(
      `Suggest ONE high-potential blog topic for ResumeBuild that we haven't covered yet.
            Analyze existing content gaps using queryBlogs tool.
            Consider seasonal relevance and search trends.
            
            IMPORTANT: Return ONLY the topic title. Do not include explanation or quotes.`,
    );
    const effectiveTopic = result.text.trim().replace(/^"|"$/g, "");
    console.log(`💡 [Workflow] Selected topic: "${effectiveTopic}"`);
    return { topic: effectiveTopic, dryRun };
  },
});

// 2. Topic Validation + Similarity Gate + Pivot (All-in-one to avoid complex branching types)
const topicValidationStep = createStep({
  id: "topic-validation",
  inputSchema: z.object({
    topic: z.string(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    topic: z.string(),
    topicBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  execute: async ({ inputData }) => {
    let { topic } = inputData;
    const { dryRun } = inputData;

    console.log(`🛡️ [Workflow] Checking similarity for: "${topic}"`);

    // Tools should be called via their run or execute method
    // In Mastra, they are often registered on the agent or called directly
    // Using direct execution with the correct context structure
    // biome-ignore lint/suspicious/noExplicitAny: Mastra tool execution types can be tricky
    const simResult = await (queryBlogsTool as any).execute({
      context: {
        query: topic,
        similarityThreshold: 0.15,
        limit: 1,
      },
    });

    // biome-ignore lint/suspicious/noExplicitAny: result structure varies
    const posts = (simResult as any)?.posts || [];

    // 2. Pivot if needed
    if (posts.length > 0) {
      const conflict = posts[0];
      console.warn(
        `⚠️ [Workflow] Similarity Conflict! "${topic}" is too similar to "${conflict.title}" (Score: ${conflict.similarity?.toFixed(4)})`,
      );
      console.log(
        `🔄 [Workflow] Pivoting topic away from: "${conflict.title}"`,
      );

      const pivotResult = await topicFinderAgent.generate(
        `Your previous topic suggestion "${topic}" was rejected because it is too similar to an existing post: "${conflict.title}".
        
        Please suggest a NEW, 100% unique angle or a more specific sub-topic that provides different value to the reader.
        
        IMPORTANT: Return ONLY the new topic title. Do not include explanation or quotes.`,
      );

      topic = pivotResult.text.trim().replace(/^"|"$/g, "");
      console.log(`✨ [Workflow] New pivoted topic: "${topic}"`);
    }

    // 3. Generate Brief
    console.log(
      `📋 [Workflow] Validating topic & generating brief: "${topic}"`,
    );
    const result = await topicFinderAgent.generate(
      `Validate and create a topic brief for: "${topic}"
            
            Check existing content for overlap.
            Generate a structured topic brief including:
            - Title (compelling, keyword-optimized)
            - Primary keyword
            - Secondary keywords (3-5)
            - Target audience
            - Content angle
            - Key points to cover (5-7)
            - Recommended category`,
    );
    return { topic, topicBrief: result.text, dryRun };
  },
});

// 3. Research
const researchStep = createStep({
  id: "research",
  inputSchema: z.object({
    topic: z.string(),
    topicBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    topic: z.string(),
    topicBrief: z.string(),
    researchBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  execute: async ({ inputData }) => {
    const { topic, topicBrief, dryRun } = inputData;
    console.log("🔬 [Workflow] Researching...");
    const result = await researcherAgent.generate(
      `Research the following topic for a blog post:
            
            ${topicBrief}
            
            Gather:
            - Key statistics with sources
            - Expert insights
            - Industry trends
            - Common mistakes to address
            - Unique angles`,
    );
    return { topic, topicBrief, researchBrief: result.text, dryRun };
  },
});

// 4. SEO Strategy
const seoStep = createStep({
  id: "seo-strategy",
  inputSchema: z.object({
    topic: z.string(),
    topicBrief: z.string(),
    researchBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    topic: z.string(),
    topicBrief: z.string(),
    researchBrief: z.string(),
    seoBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  execute: async ({ inputData }) => {
    const { topic, topicBrief, researchBrief, dryRun } = inputData;
    console.log("🎯 [Workflow] Planning SEO...");
    const result = await seoStrategistAgent.generate(
      `Create an SEO strategy for this blog post:
            
            Topic Brief:
            ${topicBrief}
            
            Research:
            ${researchBrief}
            
            Generate:
            - Meta title (50-60 chars)
            - Meta description (150-160 chars)
            - URL slug
            - H2/H3 heading structure
            - Internal linking recommendations
            - 3-5 FAQs`,
    );
    return { topic, topicBrief, researchBrief, seoBrief: result.text, dryRun };
  },
});

// 5. Writing
const writingStep = createStep({
  id: "writing",
  inputSchema: z.object({
    topic: z.string(),
    topicBrief: z.string(),
    researchBrief: z.string(),
    seoBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    content: z.string(),
    seoBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  execute: async ({ inputData }) => {
    const { topicBrief, researchBrief, seoBrief, dryRun } = inputData;

    if (dryRun) {
      console.log("🔍 [Workflow] Dry Run - Skipping writing/publishing");
      return { content: "DRY RUN CONTENT", seoBrief, dryRun };
    }

    console.log("✍️ [Workflow] Writing content...");
    const result = await writerAgent.generate(
      `Write a complete blog post in MDX format.
            
            Topic Brief:
            ${topicBrief}
            
            Research:
            ${researchBrief}
            
            SEO Brief:
            ${seoBrief}
            
            Requirements:
            - 1500-2500 words
            - Follow the heading structure from SEO brief
            - Include 3-5 internal links
            - Include statistics from research
            - Use brand voice: professional, helpful, concise
            - End with CTA to resume builder`,
    );
    return { content: result.text, seoBrief, dryRun };
  },
});

// 6. Refinement Loop (Review + Rewrite if needed)
const refinementLoopStep = createStep({
  id: "refinement-loop",
  inputSchema: z.object({
    content: z.string(),
    seoBrief: z.string(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    content: z.string(),
    seoBrief: z.string(),
    qualityScore: z.number(),
    dryRun: z.boolean().optional(),
  }),
  execute: async ({ inputData }) => {
    const { seoBrief, dryRun } = inputData;
    let { content } = inputData;

    if (dryRun) {
      return { content, seoBrief, qualityScore: 0, dryRun };
    }

    let qualityScore = 0;
    const MAX_RETRIES = 3;

    for (let i = 0; i < MAX_RETRIES; i++) {
      console.log(
        `🧐 [Workflow] Reviewing content (Attempt ${i + 1}/${MAX_RETRIES})...`,
      );

      const reviewResult = await editorAgent.generate(
        `Review and score this blog post:
                
                ${content}
                
                Score on:
                - Accuracy (25 points)
                - SEO Compliance (25 points)
                - Readability (20 points)
                - Brand Voice (15 points)
                - Internal Links (15 points)
                
                Provide total score out of 100.
                If score < 80, provide specific feedback for improvement.`,
      );

      const scoreMatch = reviewResult.text.match(/(\d+)\s*\/\s*100/);
      qualityScore = scoreMatch?.[1] ? Number.parseInt(scoreMatch[1], 10) : 70;
      console.log(`📊 [Workflow] Quality Score: ${qualityScore}/100`);

      if (qualityScore >= 80) {
        console.log("✅ Quality threshold met.");
        break;
      }

      if (i < MAX_RETRIES - 1) {
        console.log("🔧 [Workflow] Score too low. Refining content...");
        const refineResult = await writerAgent.generate(
          `Refine this blog post based on the editor's review.
                    
                    Editor's Feedback:
                    ${reviewResult.text}
                    
                    Original Content:
                    ${content}
                    
                    Return the IMPROVED content in full MDX format.`,
        );
        content = refineResult.text;
      } else {
        console.log("⚠️ Max retries reached. Proceeding with current content.");
      }
    }

    return { content, seoBrief, qualityScore, dryRun };
  },
});

// 7. Publish
const publishStep = createStep({
  id: "publish",
  inputSchema: z.object({
    content: z.string(),
    seoBrief: z.string(),
    qualityScore: z.number(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    postUrl: z.string().optional(),
    status: z.string(),
  }),
  execute: async ({ inputData }) => {
    const { content, seoBrief, qualityScore, dryRun } = inputData;

    if (dryRun) {
      console.log("🔍 [Workflow] Dry Run Finished. Nothing published.");
      return { status: "dry-run", postUrl: undefined };
    }

    const action =
      qualityScore >= 80 ? "publish" : qualityScore >= 60 ? "submit" : "draft";

    console.log(`🚀 [Workflow] Publishing (Action: ${action})...`);

    const result = await publisherAgent.generate(
      `Save this blog post to the database.
            
            Content:
            ${content}
            
            SEO Brief (for meta info):
            ${seoBrief}
            
            Quality Score: ${qualityScore}
            Action: ${action}
            
            Use the saveBlog tool to save the post.
            Generate a proper slug from the title.
            Create an excerpt from the first paragraph.
            Get or create the appropriate category.`,
    );

    // Extract URL if present in text (Publisher usually outputs markdown)
    // Or we could parse the tool output if we had access to it,
    // but since the agent calls the tool internally, we rely on its report.
    const urlMatch = result.text.match(
      /https:\/\/www\.resumebuild\.cv\/blog\/[\w-]+/,
    );
    const postUrl = urlMatch ? urlMatch[0] : undefined;

    console.log(result.text);

    return {
      postUrl,
      status:
        action === "publish"
          ? "published"
          : action === "submit"
            ? "pending_review"
            : "draft",
    };
  },
});

// --- WORKFLOW DEFINITION ---

export const blogPostWorkflow = createWorkflow({
  id: "blog-post-generation",
  description: "Autonomous blog post generation pipeline",
  inputSchema: z.object({
    topic: z.string().optional(),
    dryRun: z.boolean().optional(),
  }),
  outputSchema: z.object({
    postUrl: z.string().optional(),
    status: z.string(),
  }),
})
  .then(topicDiscoveryStep)
  .then(topicValidationStep)
  .then(researchStep)
  .then(seoStep)
  .then(writingStep)
  .then(refinementLoopStep)
  .then(publishStep)
  .commit();
