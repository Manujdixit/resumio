import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { writerAgent } from "../agents/content-writer.js";
import { editorAgent } from "../agents/editor.js";
import { publisherAgent } from "../agents/publisher.js";
import { researcherAgent } from "../agents/researcher.js";
import { seoStrategistAgent } from "../agents/seo-strategist.js";
import { topicFinderAgent } from "../agents/topic-finder.js";
import { queryBlogsTool } from "../tools/query-blogs.js";

// --- SCHEMAS ---

// Topic Brief schema for structured output - using flexible strings instead of enums
// to avoid validation failures with models that may use slightly different terminology
// IMPORTANT: Field names use camelCase - descriptions explicitly state the expected key name
const topicBriefSchema = z.object({
  title: z.string().describe("Compelling, keyword-optimized title"),
  userIntent: z.object({
    primaryQuestion: z.string().describe("The main question this post answers"),
    buyingStage: z.string().describe("awareness, consideration, or decision"),
    userGoal: z.string().describe("What the user wants to achieve"),
  }),
  clusterStrategy: z.object({
    role: z.string().describe("pillar or support"),
    isNewCluster: z
      .boolean()
      .describe("Whether this starts a new topic cluster"),
    parentPillarId: z
      .string()
      .nullable()
      .describe("DB ID of parent pillar if this is a support post"),
    parentPillarSlug: z
      .string()
      .nullable()
      .describe("Slug of parent pillar for internal linking"),
  }),
  primaryKeyword: z
    .string()
    .describe("(primaryKeyword) Main SEO keyword to target"),
  secondaryKeywords: z
    .array(z.string())
    .describe("(secondaryKeywords) 3-5 related keywords"),
  targetAudience: z.string().describe("(targetAudience) Who this post is for"),
  searchIntent: z
    .string()
    .describe("(searchIntent) informational, how-to, list, or comparison"),
  recommendedCategory: z
    .string()
    .describe("(recommendedCategory) Blog category slug"),
  contentAngle: z
    .string()
    .describe("(contentAngle) Unique value proposition / angle"),
  suggestedWordCount: z
    .number()
    .describe("(suggestedWordCount) Recommended word count 1500-2500"),
  keyPoints: z
    .array(z.string())
    .describe("(keyPoints) 5-7 key points to cover"),
});

export type TopicBrief = z.infer<typeof topicBriefSchema>;

// Simple schema for topic discovery
const topicDiscoverySchema = z.object({
  topic: z.string().describe("The suggested blog topic title"),
});

// Research brief schema for structured output
const researchBriefSchema = z.object({
  keyStatistics: z
    .array(
      z.object({
        stat: z.string().describe("The statistic or data point"),
        source: z.string().describe("Source attribution"),
        year: z.string().optional().describe("Year of the data"),
      }),
    )
    .describe("Key statistics with sources"),
  expertInsights: z
    .array(
      z.object({
        insight: z.string().describe("The expert quote or insight"),
        attribution: z.string().describe("Who said it or source"),
      }),
    )
    .describe("Expert quotes and insights"),
  industryTrends: z
    .array(z.string())
    .describe("Current industry trends relevant to the topic"),
  commonMistakes: z
    .array(z.string())
    .describe("Common mistakes or misconceptions to address"),
  uniqueAngles: z
    .array(z.string())
    .describe("Unique angles not covered by competitors"),
  suggestedCitations: z
    .array(
      z.object({
        title: z.string().describe("Article or source title"),
        url: z.string().describe("URL of the source"),
      }),
    )
    .describe("3-5 authoritative sources for citations"),
  contentRecommendations: z
    .array(z.string())
    .describe("Recommendations based on research"),
});

export type ResearchBrief = z.infer<typeof researchBriefSchema>;

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

    const MAX_DISCOVERY_RETRIES = 3;
    let effectiveTopic = "";

    for (let attempt = 1; attempt <= MAX_DISCOVERY_RETRIES; attempt++) {
      const result = await topicFinderAgent.generate(
        `Suggest ONE high-potential blog topic for ResumeBuild that we haven't covered yet.
              Analyze existing content gaps using queryBlogs tool.
              Consider seasonal relevance and search trends.
              
              Return a JSON object with a single "topic" field containing the topic title.`,
        {
          maxSteps: 5,
          structuredOutput: {
            schema: topicDiscoverySchema,
          },
        },
      );

      // With structuredOutput, result.object contains the validated data
      effectiveTopic =
        result.object?.topic?.trim() || result.text?.trim() || "";
      effectiveTopic = effectiveTopic.replace(/^"|"$/g, "");

      if (effectiveTopic && effectiveTopic.length > 10) {
        console.log(`💡 [Workflow] Selected topic: "${effectiveTopic}"`);
        return { topic: effectiveTopic, dryRun };
      }

      console.warn(
        `⚠️ [Workflow] Topic discovery attempt ${attempt}/${MAX_DISCOVERY_RETRIES} returned empty or invalid topic. Retrying...`,
      );
    }

    // If all retries failed, throw an error
    throw new Error(
      `Topic discovery failed after ${MAX_DISCOVERY_RETRIES} attempts. The model returned empty or invalid topics.`,
    );
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

    // Execute queryBlogsTool directly - parameters go at top level, not nested in context
    // biome-ignore lint/suspicious/noExplicitAny: Mastra tool execution types can be tricky
    const simResult = await (queryBlogsTool as any).execute({
      query: topic,
      similarityThreshold: 0.15,
      limit: 1,
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
        
        Return a JSON object with a single "topic" field containing the new topic title.`,
        {
          maxSteps: 3,
          structuredOutput: {
            schema: topicDiscoverySchema,
          },
        },
      );

      topic =
        pivotResult.object?.topic?.trim() || pivotResult.text?.trim() || "";
      topic = topic.replace(/^"|"$/g, "");

      if (!topic || topic.length < 10) {
        throw new Error(
          "Topic pivot failed - model returned empty or invalid topic",
        );
      }

      console.log(`✨ [Workflow] New pivoted topic: "${topic}"`);
    }

    // 3. Generate Brief using structuredOutput for guaranteed response
    console.log(
      `📋 [Workflow] Validating topic & generating brief: "${topic}"`,
    );
    const result = await topicFinderAgent.generate(
      `Validate and create a topic brief for: "${topic}"
            
            Check existing content for overlap and CLUSTER STATUS.
            
            If this topic is a "Support" post (deep dive), you MUST identify the "Parent Pillar" ID using queryBlogs.
            
            Generate a complete structured topic brief. 
            
            CRITICAL: Use exact camelCase field names as specified:
            - primaryKeyword (not "primary keyword")
            - secondaryKeywords (not "secondary keywords") 
            - targetAudience (not "target audience")
            - searchIntent (not "search intent")
            - recommendedCategory (not "recommended category")
            - contentAngle (not "content angle")
            - suggestedWordCount (not "suggested word count")
            - keyPoints (not "key points to cover")`,
      {
        structuredOutput: {
          schema: topicBriefSchema,
        },
        maxSteps: 8,
      },
    );

    // With structuredOutput, result.object contains the validated data
    // We stringify it for downstream compatibility with existing text-based flow
    const topicBrief = result.object
      ? JSON.stringify(result.object, null, 2)
      : result.text;

    // Fallback error handling if still empty
    if (!topicBrief || topicBrief === "null" || topicBrief === "{}") {
      console.error(
        "❌ [Workflow] Topic brief generation failed. Full result:",
        JSON.stringify(result, null, 2),
      );
      throw new Error(
        `Topic finder returned empty brief for topic: "${topic}". Check model configuration.`,
      );
    }

    console.log("✅ [Workflow] Topic brief generated successfully");
    return { topic, topicBrief, dryRun };
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

    // Parse topic brief to extract key points for focused research
    let keyPoints: string[] = [];
    try {
      const parsed = JSON.parse(topicBrief);
      keyPoints = parsed.keyPoints || [];
    } catch {
      // If parsing fails, continue without key points
    }

    const result = await researcherAgent.generate(
      `Research the following topic for a blog post.
      
      TOPIC: ${topic}
      
      KEY POINTS TO RESEARCH:
      ${keyPoints.map((p: string, i: number) => `${i + 1}. ${p}`).join("\n")}
      
      INSTRUCTIONS:
      1. Use web-search to find recent statistics and data (2025-2026)
      2. Use query-blogs to check what we've already covered
      3. Gather key statistics WITH sources
      4. Find expert insights and quotes
      5. Identify industry trends
      6. Note common mistakes to address
      7. Find unique angles
      
      Return a comprehensive research brief.`,
      {
        maxSteps: 10,
        structuredOutput: {
          schema: researchBriefSchema,
        },
      },
    );

    // With structuredOutput, result.object contains the validated data
    const researchBrief = result.object
      ? JSON.stringify(result.object, null, 2)
      : result.text;

    // Validate we got something
    if (!researchBrief || researchBrief === "null" || researchBrief === "{}") {
      console.error(
        "❌ [Workflow] Research failed. Full result:",
        JSON.stringify(result, null, 2),
      );
      throw new Error(
        `Researcher returned empty brief for topic: "${topic}". Check model configuration.`,
      );
    }

    console.log("✅ [Workflow] Research completed successfully");
    return { topic, topicBrief, researchBrief, dryRun };
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
