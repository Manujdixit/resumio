import { relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  vector,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

/**
 * Blog post status enum
 */
export const blogStatusEnum = pgEnum("blog_status", [
  "draft",
  "pending_review",
  "published",
]);

/**
 * Blog Categories - agent-generated and managed
 */
export const blogCategory = pgTable(
  "blog_category",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("blog_category_slug_idx").on(table.slug)],
);

/**
 * Blog Posts - main content table
 */
export const blogPost = pgTable(
  "blog_post",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(), // MDX content

    // Foreign keys
    categoryId: text("category_id").references(() => blogCategory.id, {
      onDelete: "set null",
    }),

    // SEO fields
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    featuredImage: text("featured_image"),
    canonicalUrl: text("canonical_url"),
    faq: jsonb("faq").$type<{ question: string; answer: string }[]>(),
    embedding: vector("embedding", { dimensions: 1024 }),

    // Quality & Status
    status: blogStatusEnum("status").notNull().default("draft"),
    qualityScore: integer("quality_score"), // 0-100
    seoScore: integer("seo_score"), // 0-100

    // Content metadata
    wordCount: integer("word_count"),
    readingTime: integer("reading_time"), // minutes

    // Agent metadata (for tracking generation)
    generatedBy: text("generated_by"), // agent run ID
    topicBrief: text("topic_brief"), // original topic input
    researchSummary: text("research_summary"), // research agent output

    // Timestamps
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("blog_post_slug_idx").on(table.slug),
    index("blog_post_status_idx").on(table.status),
    index("blog_post_category_idx").on(table.categoryId),
    index("blog_post_published_idx").on(table.publishedAt),
    index("blog_post_embedding_idx").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
  ],
);

/**
 * Blog Post Tags - for SEO and categorization
 */
export const blogPostTag = pgTable(
  "blog_post_tag",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    postId: text("post_id")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    tag: text("tag").notNull(),
  },
  (table) => [
    index("blog_post_tag_post_idx").on(table.postId),
    index("blog_post_tag_tag_idx").on(table.tag),
  ],
);

/**
 * Blog Internal Links - tracked for SEO analysis
 */
export const blogInternalLink = pgTable(
  "blog_internal_link",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    postId: text("post_id")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    targetUrl: text("target_url").notNull(),
    anchorText: text("anchor_text").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("blog_internal_link_post_idx").on(table.postId)],
);

/**
 * Blog Generation Runs - for tracking agent executions
 */
export const blogGenerationRun = pgTable("blog_generation_run", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  postId: text("post_id").references(() => blogPost.id, {
    onDelete: "set null",
  }),
  topic: text("topic").notNull(),
  status: text("status").notNull().default("running"), // running | completed | failed
  agentLogs: text("agent_logs"), // JSON logs from agents
  errorMessage: text("error_message"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Relations
export const blogCategoryRelations = relations(blogCategory, ({ many }) => ({
  posts: many(blogPost),
}));

export const blogPostRelations = relations(blogPost, ({ one, many }) => ({
  category: one(blogCategory, {
    fields: [blogPost.categoryId],
    references: [blogCategory.id],
  }),
  tags: many(blogPostTag),
  internalLinks: many(blogInternalLink),
}));

export const blogPostTagRelations = relations(blogPostTag, ({ one }) => ({
  post: one(blogPost, {
    fields: [blogPostTag.postId],
    references: [blogPost.id],
  }),
}));

export const blogInternalLinkRelations = relations(
  blogInternalLink,
  ({ one }) => ({
    post: one(blogPost, {
      fields: [blogInternalLink.postId],
      references: [blogPost.id],
    }),
  }),
);

// Type exports for use in agents
export type BlogCategory = typeof blogCategory.$inferSelect;
export type NewBlogCategory = typeof blogCategory.$inferInsert;
export type BlogPost = typeof blogPost.$inferSelect;
export type NewBlogPost = typeof blogPost.$inferInsert;
export type BlogPostTag = typeof blogPostTag.$inferSelect;
export type NewBlogPostTag = typeof blogPostTag.$inferInsert;
export type BlogInternalLink = typeof blogInternalLink.$inferSelect;
export type BlogGenerationRun = typeof blogGenerationRun.$inferSelect;
