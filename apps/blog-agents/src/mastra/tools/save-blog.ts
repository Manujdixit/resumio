/**
 * Save Blog Tool
 *
 * Allows agents to create and update blog posts in the database.
 */

import { createTool } from "@mastra/core/tools";
import { db, schema } from "@resumio/db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { blogConfig } from "../config/models.js";
import { generateEmbedding } from "../lib/embeddings.js";

export const saveBlogTool = createTool({
  id: "save-blog",
  description: `Save a blog post to the database.
    Can create new posts or update existing ones.
    
    Actions:
    - 'draft': Save as draft (not visible on site)
    - 'submit': Save as pending_review (needs human approval)
    - 'publish': Publish immediately (use only if quality score >= threshold)`,
  inputSchema: z.object({
    id: z
      .string()
      .optional()
      .describe("Post ID for updates. Leave empty for new posts."),
    slug: z.string().describe("URL slug for the post"),
    title: z.string().describe("Post title"),
    excerpt: z
      .string()
      .optional()
      .describe("Short excerpt/summary (150-200 chars)"),
    content: z.string().describe("Full MDX content"),
    categoryId: z.string().optional().describe("Category ID"),
    metaTitle: z.string().optional().describe("SEO meta title"),
    metaDescription: z.string().optional().describe("SEO meta description"),
    featuredImage: z.string().optional().describe("Featured image URL"),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional()
      .describe("Structured FAQ list for Schema markup"),
    tags: z.array(z.string()).optional().describe("Post tags"),
    qualityScore: z
      .number()
      .min(0)
      .max(100)
      .optional()
      .describe("Quality score from editor agent"),
    seoScore: z.number().min(0).max(100).optional().describe("SEO score"),
    action: z
      .enum(["draft", "submit", "publish"])
      .describe("Action to perform"),
    generatedBy: z.string().optional().describe("Agent run ID for tracking"),
    topicBrief: z.string().optional().describe("Original topic input"),
    researchSummary: z
      .string()
      .optional()
      .describe("Research agent output summary"),
  }),
  outputSchema: z.object({
    id: z.string(),
    slug: z.string(),
    status: z.string(),
    url: z.string(),
    message: z.string(),
  }),
  execute: async (context) => {
    const {
      id,
      slug,
      title,
      excerpt,
      content,
      categoryId,
      metaTitle,
      metaDescription,
      featuredImage,
      faq,
      tags,
      qualityScore,
      seoScore,
      action,
      generatedBy,
      topicBrief,
      researchSummary,
    } = context;

    // Calculate word count and reading time
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // ~200 words per minute

    // Determine status based on action and quality
    let status: "draft" | "pending_review" | "published";
    let publishedAt: Date | null = null;

    if (action === "publish") {
      if (qualityScore && qualityScore >= blogConfig.qualityThreshold) {
        status = "published";
        publishedAt = new Date();
      } else {
        // Quality too low, send for review instead
        status = "pending_review";
      }
    } else if (action === "submit") {
      status = "pending_review";
    } else {
      status = "draft";
    }

    // Generate embedding
    let embedding: number[] | null = null;
    try {
      const textToEmbed = `${title}\n\n${excerpt || ""}\n\n${content.slice(0, 1000)}`;
      embedding = await generateEmbedding(textToEmbed);
    } catch (error) {
      console.error("Failed to generate embedding:", error);
      // Continue without embedding (soft fail)
    }

    const postData = {
      slug,
      title,
      excerpt: excerpt ?? null,
      content,
      categoryId: categoryId ?? null,
      metaTitle: metaTitle ?? null,
      metaDescription: metaDescription ?? null,
      featuredImage: featuredImage ?? null,
      faq: faq ?? null,
      embedding: embedding ?? null,
      qualityScore: qualityScore ?? null,
      seoScore: seoScore ?? null,
      wordCount,
      readingTime,
      status,
      publishedAt,
      generatedBy: generatedBy ?? null,
      topicBrief: topicBrief ?? null,
      researchSummary: researchSummary ?? null,
      updatedAt: new Date(),
    };

    let postId: string;

    if (id) {
      // Update existing post
      await db
        .update(schema.blogPost)
        .set(postData)
        .where(eq(schema.blogPost.id, id));
      postId = id;
    } else {
      // Create new post
      postId = nanoid();
      await db.insert(schema.blogPost).values({
        id: postId,
        ...postData,
        createdAt: new Date(),
      });
    }

    // Handle tags
    if (tags && tags.length > 0) {
      // Delete existing tags
      await db
        .delete(schema.blogPostTag)
        .where(eq(schema.blogPostTag.postId, postId));

      // Insert new tags
      await db.insert(schema.blogPostTag).values(
        tags.map((tag) => ({
          id: nanoid(),
          postId,
          tag,
        })),
      );
    }

    const url = `${blogConfig.siteUrl}/blog/${slug}`;

    return {
      id: postId,
      slug,
      status,
      url,
      message:
        status === "published"
          ? `Post published successfully at ${url}`
          : status === "pending_review"
            ? `Post saved for review (quality: ${qualityScore ?? "N/A"})`
            : "Post saved as draft",
    };
  },
});
