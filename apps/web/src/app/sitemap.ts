import { db, schema } from "@resumio/db";
import { desc, eq } from "drizzle-orm";
import type { MetadataRoute } from "next";
import { competitors } from "@/data/competitors";
import { industries } from "@/data/industries";
import { jobTitles } from "@/data/job-titles";

const BASE_URL = "https://www.resumebuild.cv";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/resume-templates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/resume-examples`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tools/ats-checker`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/keyword-matcher`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/resume-scorer`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/cover-letter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${BASE_URL}/resume-templates/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const jobPages: MetadataRoute.Sitemap = jobTitles.map((job) => ({
    url: `${BASE_URL}/resume-examples/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Fetch blog posts
  const posts = await db.query.blogPost.findMany({
    where: eq(schema.blogPost.status, "published"),
    orderBy: [desc(schema.blogPost.publishedAt)],
    columns: {
      slug: true,
      updatedAt: true,
    },
  });

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Fetch blog categories
  const categories = await db.query.blogCategory.findMany({
    columns: {
      slug: true,
      updatedAt: true,
    },
  });

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/blog/category/${cat.slug}`,
    lastModified: cat.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Add competitor pages
  const competitorPages: MetadataRoute.Sitemap = competitors.map(
    (competitor) => ({
      url: `${BASE_URL}/alternatives/${competitor.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [
    ...staticPages,
    ...industryPages,
    ...jobPages,
    ...blogPages,
    ...categoryPages,
    ...competitorPages,
  ];
}
