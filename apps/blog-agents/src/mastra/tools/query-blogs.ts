/**
 * Query Blogs Tool
 *
 * Allows agents to search and retrieve existing blog posts
 * for internal linking and topic gap analysis.
 */

import { createTool } from "@mastra/core/tools";
import { db, schema } from "@resumio/db";
import {
  and,
  cosineDistance,
  desc,
  eq,
  like,
  or,
  type SQL,
  sql,
} from "drizzle-orm";
import { z } from "zod";
import { generateEmbedding } from "../lib/embeddings.js";

export const queryBlogsTool = createTool({
  id: "query-blogs",
  description: `Search and retrieve existing blog posts from the database.
    Use this to:
    - Find posts for internal linking
    - Check if a topic has already been covered
    - Get context about existing content
    - Analyze content gaps`,
  inputSchema: z.object({
    query: z
      .string()
      .optional()
      .describe("Search query to find relevant posts by title or content"),
    status: z
      .enum(["draft", "pending_review", "published", "all"])
      .optional()
      .default("published")
      .describe("Filter by post status"),
    categorySlug: z.string().optional().describe("Filter by category slug"),
    limit: z
      .number()
      .min(1)
      .max(50)
      .optional()
      .default(10)
      .describe("Maximum number of posts to return"),
  }),
  outputSchema: z.object({
    posts: z.array(
      z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string(),
        excerpt: z.string().nullable(),
        categorySlug: z.string().nullable(),
        status: z.string(),
        publishedAt: z.string().nullable(),
        wordCount: z.number().nullable(),
      }),
    ),
    totalCount: z.number(),
  }),
  execute: async (context) => {
    console.log("🔍 [queryBlogsTool] Executing with context:", {
      query: context.query,
      status: context.status,
      categorySlug: context.categorySlug,
    });

    const { query, status, categorySlug, limit } = context;

    // Build conditions
    const conditions = [];

    // Status filter
    if (status && status !== "all") {
      conditions.push(eq(schema.blogPost.status, status));
    }

    // Category filter
    if (categorySlug) {
      const category = await db.query.blogCategory.findFirst({
        where: eq(schema.blogCategory.slug, categorySlug),
      });
      if (category) {
        conditions.push(eq(schema.blogPost.categoryId, category.id));
      }
    }

    // Search query logic
    let similarityColumn = sql<number>`0`;
    let orderByClause: any = [desc(schema.blogPost.publishedAt)];

    if (query) {
      try {
        const queryVector = await generateEmbedding(query);

        // Calculate cosine distance
        similarityColumn = cosineDistance(
          schema.blogPost.embedding,
          queryVector,
        ) as SQL<number>;

        // Order by relevance (distance ASC)
        orderByClause = [similarityColumn];

        // Filter for relevance (distance < 0.5 implies decent similarity)
        // conditions.push(lt(similarityColumn, 0.5));
      } catch (error) {
        console.error("Vector search failed, falling back to LIKE:", error);
        // Fallback to LIKE if embedding fails
        conditions.push(
          or(
            like(schema.blogPost.title, `%${query}%`),
            like(schema.blogPost.excerpt, `%${query}%`),
          ),
        );
      }
    }

    // Execute query using db.select() to avoid potential prepared statement issues with db.query()
    const posts = await db
      .select({
        id: schema.blogPost.id,
        slug: schema.blogPost.slug,
        title: schema.blogPost.title,
        excerpt: schema.blogPost.excerpt,
        status: schema.blogPost.status,
        publishedAt: schema.blogPost.publishedAt,
        wordCount: schema.blogPost.wordCount,
        categorySlug: schema.blogCategory.slug,
        similarity: similarityColumn,
      })
      .from(schema.blogPost)
      .leftJoin(
        schema.blogCategory,
        eq(schema.blogPost.categoryId, schema.blogCategory.id),
      )
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(
        ...(Array.isArray(orderByClause) ? orderByClause : [orderByClause]),
      )
      .limit(limit);

    return {
      posts: posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        categorySlug: post.categorySlug,
        status: post.status,
        publishedAt: post.publishedAt?.toISOString() ?? null,
        wordCount: post.wordCount,
        similarity: post.similarity, // Useful for debugging
      })),
      totalCount: posts.length,
    };
  },
});
