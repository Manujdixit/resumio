#!/usr/bin/env bun

/**
 * Blog Agents CLI
 *
 * Command-line interface for the blog content generation system.
 *
 * Usage:
 *   bun run blog:generate --topic "How to write an ATS-friendly resume"
 *   bun run blog:topics --count 5
 *   bun run blog:review
 *   bun run blog:publish <post-id>
 */

import { db, schema } from "@resumio/db";
import { Command } from "commander";
import dotenv from "dotenv";
import { desc, eq } from "drizzle-orm";

// Load environment variables
dotenv.config({ path: "../../.env" });

import { runBlogPipeline } from "./mastra/agents/orchestrator";
import { topicFinderAgent } from "./mastra/agents/topic-finder";
import { blogConfig } from "./mastra/config/models";

const program = new Command();

program
  .name("blog")
  .description("AI-powered blog content generation for ResumeBuild")
  .version("0.1.0");

/**
 * Generate Command
 * Creates a new blog post using the AI pipeline
 */
program
  .command("generate")
  .description("Generate a new blog post")
  .option("-t, --topic <topic>", "Topic or title for the blog post")
  .option("-c, --category <category>", "Category slug")
  .option("--dry-run", "Show plan without executing")
  .option("-v, --verbose", "Show detailed output")
  .action(async (options) => {
    console.log("\n🚀 ResumeBuild Blog Generator\n");
    console.log("━".repeat(50));

    const topic = options.topic || "auto-detect";

    console.log(`📝 Topic: ${topic}`);
    console.log(`📁 Category: ${options.category || "auto-detect"}`);
    console.log(`🔧 Mode: ${options.dryRun ? "Dry Run" : "Live"}`);
    console.log("━".repeat(50));

    try {
      const result = await runBlogPipeline(topic, {
        dryRun: options.dryRun,
        verbose: options.verbose,
      });

      console.log("\n" + "━".repeat(50));
      if (result.success) {
        console.log("✅ Blog generation completed successfully!");
        if (result.postUrl) {
          console.log(`🔗 URL: ${result.postUrl}`);
        }
        if (result.qualityScore) {
          console.log(`📊 Quality Score: ${result.qualityScore}/100`);
        }
      } else {
        console.log("❌ Blog generation failed");
        if (result.error) {
          console.log(`Error: ${result.error}`);
        }
      }
    } catch (error) {
      console.error("\n❌ Error:", error);
      process.exit(1);
    }
  });

/**
 * Topics Command
 * Generate topic suggestions
 */
program
  .command("topics")
  .description("Generate topic suggestions")
  .option("-n, --count <number>", "Number of topics to suggest", "5")
  .option("-c, --category <category>", "Focus on specific category")
  .action(async (options) => {
    console.log("\n💡 Generating Topic Suggestions...\n");

    const count = Number.parseInt(options.count, 10);
    const category = options.category;

    try {
      const prompt = category
        ? `Suggest ${count} blog topic ideas for the "${category}" category. 
           Check existing content first to avoid overlap.
           For each topic, provide: title, primary keyword, and brief description.`
        : `Suggest ${count} blog topic ideas for ResumeBuild.
           Consider topics across all categories: resume writing, career advice, industry insights, job search.
           Check existing content first to identify gaps.
           For each topic, provide: title, primary keyword, category, and brief description.`;

      const result = await topicFinderAgent.generate(prompt);
      if (!result.text) {
        console.log(
          "⚠️ No text returned. Full result:",
          JSON.stringify(result, null, 2),
        );
      }
      console.log(result.text);
    } catch (error) {
      console.error("❌ Error generating topics:", error);
      process.exit(1);
    }
  });

/**
 * Review Command
 * List posts pending review
 */
program
  .command("review")
  .description("List posts pending review")
  .option("-a, --all", "Show all non-published posts")
  .action(async (options) => {
    console.log("\n📋 Posts Pending Review\n");
    console.log("━".repeat(60));

    try {
      const status = options.all ? undefined : "pending_review";
      const posts = await db.query.blogPost.findMany({
        where: status ? eq(schema.blogPost.status, status) : undefined,
        orderBy: [desc(schema.blogPost.createdAt)],
        limit: 20,
      });

      if (posts.length === 0) {
        console.log("No posts pending review.");
        return;
      }

      for (const post of posts) {
        console.log(`\n📄 ${post.title}`);
        console.log(`   ID: ${post.id}`);
        console.log(`   Status: ${post.status}`);
        console.log(`   Quality: ${post.qualityScore ?? "N/A"}/100`);
        console.log(`   Created: ${post.createdAt.toLocaleDateString()}`);
        console.log(`   Slug: /blog/${post.slug}`);
      }

      console.log("\n" + "━".repeat(60));
      console.log(`Total: ${posts.length} posts`);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
      process.exit(1);
    }
  });

/**
 * Publish Command
 * Publish a reviewed post
 */
program
  .command("publish <postId>")
  .description("Publish a post by ID")
  .option("-f, --force", "Force publish regardless of quality score")
  .action(async (postId, options) => {
    console.log(`\n📤 Publishing post: ${postId}\n`);

    try {
      const post = await db.query.blogPost.findFirst({
        where: eq(schema.blogPost.id, postId),
      });

      if (!post) {
        console.error(`❌ Post not found: ${postId}`);
        process.exit(1);
      }

      // Check quality score
      if (
        !options.force &&
        post.qualityScore &&
        post.qualityScore < blogConfig.qualityThreshold
      ) {
        console.error(
          `❌ Quality score (${post.qualityScore}) below threshold (${blogConfig.qualityThreshold})`,
        );
        console.log("Use --force to publish anyway");
        process.exit(1);
      }

      // Update status
      await db
        .update(schema.blogPost)
        .set({
          status: "published",
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(schema.blogPost.id, postId));

      console.log("✅ Post published successfully!");
      console.log(`🔗 URL: ${blogConfig.siteUrl}/blog/${post.slug}`);
    } catch (error) {
      console.error("❌ Error publishing post:", error);
      process.exit(1);
    }
  });

/**
 * Drafts Command
 * List all draft posts
 */
program
  .command("drafts")
  .description("List all draft posts")
  .action(async () => {
    console.log("\n📝 Draft Posts\n");
    console.log("━".repeat(60));

    try {
      const posts = await db.query.blogPost.findMany({
        where: eq(schema.blogPost.status, "draft"),
        orderBy: [desc(schema.blogPost.createdAt)],
      });

      if (posts.length === 0) {
        console.log("No draft posts.");
        return;
      }

      for (const post of posts) {
        console.log(`\n📄 ${post.title}`);
        console.log(`   ID: ${post.id}`);
        console.log(`   Topic: ${post.topicBrief ?? "N/A"}`);
        console.log(`   Created: ${post.createdAt.toLocaleDateString()}`);
      }

      console.log("\n" + "━".repeat(60));
      console.log(`Total: ${posts.length} drafts`);
    } catch (error) {
      console.error("❌ Error fetching drafts:", error);
      process.exit(1);
    }
  });

/**
 * Stats Command
 * Show blog statistics
 */
program
  .command("stats")
  .description("Show blog statistics")
  .action(async () => {
    console.log("\n📊 Blog Statistics\n");
    console.log("━".repeat(40));

    try {
      const [published, pendingReview, drafts, categories] = await Promise.all([
        db.query.blogPost.findMany({
          where: eq(schema.blogPost.status, "published"),
        }),
        db.query.blogPost.findMany({
          where: eq(schema.blogPost.status, "pending_review"),
        }),
        db.query.blogPost.findMany({
          where: eq(schema.blogPost.status, "draft"),
        }),
        db.query.blogCategory.findMany(),
      ]);

      console.log(`📗 Published: ${published.length}`);
      console.log(`📙 Pending Review: ${pendingReview.length}`);
      console.log(`📝 Drafts: ${drafts.length}`);
      console.log(`📁 Categories: ${categories.length}`);

      // Calculate average quality score
      const scoredPosts = published.filter((p) => p.qualityScore);
      if (scoredPosts.length > 0) {
        const avgScore =
          scoredPosts.reduce((sum, p) => sum + (p.qualityScore || 0), 0) /
          scoredPosts.length;
        console.log(`\n📈 Avg Quality Score: ${avgScore.toFixed(1)}/100`);
      }

      // Total word count
      const totalWords = published.reduce(
        (sum, p) => sum + (p.wordCount || 0),
        0,
      );
      console.log(`📚 Total Words: ${totalWords.toLocaleString()}`);
    } catch (error) {
      console.error("❌ Error fetching stats:", error);
      process.exit(1);
    }
  });

// Parse arguments and run
program.parse();
