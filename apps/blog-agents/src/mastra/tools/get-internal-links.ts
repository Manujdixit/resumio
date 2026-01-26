/**
 * Get Internal Links Tool
 *
 * Provides agents with available pages for internal linking.
 * Includes both blog posts and programmatic SEO pages.
 */

import { createTool } from "@mastra/core/tools";
import { db, schema } from "@resumio/db";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { blogConfig } from "../config/models.js";

// Programmatic SEO page data
// These mirror the data from apps/web/src/data/
const industries = [
	{ slug: "technology", name: "Technology" },
	{ slug: "healthcare", name: "Healthcare" },
	{ slug: "finance", name: "Finance" },
	{ slug: "marketing", name: "Marketing" },
	{ slug: "education", name: "Education" },
	{ slug: "engineering", name: "Engineering" },
	{ slug: "sales", name: "Sales" },
	{ slug: "design", name: "Design" },
];

const jobTitles = [
	{
		slug: "software-engineer",
		title: "Software Engineer",
		industry: "technology",
	},
	{ slug: "product-manager", title: "Product Manager", industry: "technology" },
	{ slug: "data-scientist", title: "Data Scientist", industry: "technology" },
	{ slug: "devops-engineer", title: "DevOps Engineer", industry: "technology" },
	{
		slug: "registered-nurse",
		title: "Registered Nurse",
		industry: "healthcare",
	},
	{ slug: "physician", title: "Physician", industry: "healthcare" },
	{
		slug: "financial-analyst",
		title: "Financial Analyst",
		industry: "finance",
	},
	{ slug: "accountant", title: "Accountant", industry: "finance" },
	{
		slug: "marketing-manager",
		title: "Marketing Manager",
		industry: "marketing",
	},
	{ slug: "seo-specialist", title: "SEO Specialist", industry: "marketing" },
	{ slug: "ux-designer", title: "UX Designer", industry: "design" },
	{ slug: "graphic-designer", title: "Graphic Designer", industry: "design" },
	{ slug: "teacher", title: "Teacher", industry: "education" },
	{ slug: "professor", title: "Professor", industry: "education" },
	{
		slug: "mechanical-engineer",
		title: "Mechanical Engineer",
		industry: "engineering",
	},
	{ slug: "civil-engineer", title: "Civil Engineer", industry: "engineering" },
	{
		slug: "sales-representative",
		title: "Sales Representative",
		industry: "sales",
	},
	{ slug: "account-executive", title: "Account Executive", industry: "sales" },
];

export const getInternalLinksTool = createTool({
	id: "get-internal-links",
	description: `Get available pages for internal linking.
    Returns URLs from:
    - Published blog posts
    - Resume template pages (/resume-templates/[industry])
    - Resume example pages (/resume-examples/[jobTitle])
    
    Use this to find relevant internal links to add to blog content.
    Always aim for 3-5 contextual internal links per blog post.`,
	inputSchema: z.object({
		type: z
			.enum(["all", "blog", "templates", "examples"])
			.optional()
			.default("all")
			.describe("Type of pages to return"),
		industry: z
			.string()
			.optional()
			.describe("Filter by industry (for templates and examples)"),
		limit: z
			.number()
			.min(1)
			.max(100)
			.optional()
			.default(50)
			.describe("Maximum number of links to return"),
	}),
	outputSchema: z.object({
		links: z.array(
			z.object({
				url: z.string(),
				title: z.string(),
				type: z.enum(["blog", "template", "example"]),
				description: z.string().optional(),
			}),
		),
	}),
	execute: async (context) => {
		const { type, industry, limit } = context;
		const links: Array<{
			url: string;
			title: string;
			type: "blog" | "template" | "example";
			description?: string;
		}> = [];

		const baseUrl = blogConfig.siteUrl;

		// Get blog posts
		if (type === "all" || type === "blog") {
			try {
				const posts = await db
					.select({
						slug: schema.blogPost.slug,
						title: schema.blogPost.title,
						excerpt: schema.blogPost.excerpt,
					})
					.from(schema.blogPost)
					.where(eq(schema.blogPost.status, "published"))
					.orderBy(desc(schema.blogPost.publishedAt))
					.limit(Math.floor(limit / 3));

				for (const post of posts) {
					links.push({
						url: `${baseUrl}/blog/${post.slug}`,
						title: post.title,
						type: "blog",
						description: post.excerpt ?? undefined,
					});
				}
			} catch (error) {
				console.error(
					"Failed to fetch blog posts for internal linking:",
					error,
				);
			}
		}

		// Get template pages
		if (type === "all" || type === "templates") {
			const filteredIndustries = industry
				? industries.filter((i) => i.slug === industry)
				: industries;

			for (const ind of filteredIndustries.slice(0, Math.floor(limit / 3))) {
				links.push({
					url: `${baseUrl}/resume-templates/${ind.slug}`,
					title: `${ind.name} Resume Templates`,
					type: "template",
					description: `Professional resume templates for ${ind.name.toLowerCase()} professionals`,
				});
			}
		}

		// Get example pages
		if (type === "all" || type === "examples") {
			const filteredJobs = industry
				? jobTitles.filter((j) => j.industry === industry)
				: jobTitles;

			for (const job of filteredJobs.slice(0, Math.floor(limit / 3))) {
				links.push({
					url: `${baseUrl}/resume-examples/${job.slug}`,
					title: `${job.title} Resume Example`,
					type: "example",
					description: `Resume example and tips for ${job.title} positions`,
				});
			}
		}

		return { links: links.slice(0, limit) };
	},
});
