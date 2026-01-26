/**
 * Manage Categories Tool
 *
 * Allows agents to create and manage blog categories.
 * Categories are dynamically generated based on content needs.
 */

import { createTool } from "@mastra/core/tools";
import { db, schema } from "@resumio/db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export const manageCategoriesToolTool = createTool({
	id: "manage-categories",
	description: `Manage blog categories.
    Categories are created dynamically based on content needs.
    
    Actions:
    - 'list': Get all existing categories
    - 'get': Get a specific category by slug
    - 'create': Create a new category (if it doesn't exist)
    - 'get-or-create': Get existing or create new category`,
	inputSchema: z.object({
		action: z
			.enum(["list", "get", "create", "get-or-create"])
			.describe("Action to perform"),
		slug: z
			.string()
			.optional()
			.describe("Category slug (required for get, create, get-or-create)"),
		name: z.string().optional().describe("Category display name"),
		description: z.string().optional().describe("Category description"),
	}),
	outputSchema: z.object({
		success: z.boolean(),
		category: z
			.object({
				id: z.string(),
				slug: z.string(),
				name: z.string(),
				description: z.string().nullable(),
			})
			.nullable(),
		categories: z
			.array(
				z.object({
					id: z.string(),
					slug: z.string(),
					name: z.string(),
					description: z.string().nullable(),
				}),
			)
			.optional(),
		message: z.string(),
	}),
	execute: async (context) => {
		const { action, slug, name, description } = context;

		// List all categories
		if (action === "list") {
			try {
				const categories = await db.select().from(schema.blogCategory);
				return {
					success: true,
					category: null,
					categories: categories.map((c) => ({
						id: c.id,
						slug: c.slug,
						name: c.name,
						description: c.description,
					})),
					message: `Found ${categories.length} categories`,
				};
			} catch (error) {
				console.error("Failed to list categories:", error);
				throw error;
			}
		}

		// Get specific category
		if (action === "get") {
			if (!slug) {
				return {
					success: false,
					category: null,
					message: "Slug is required for 'get' action",
				};
			}

			try {
				const [category] = await db
					.select()
					.from(schema.blogCategory)
					.where(eq(schema.blogCategory.slug, slug))
					.limit(1);

				if (!category) {
					return {
						success: false,
						category: null,
						message: `Category with slug '${slug}' not found`,
					};
				}

				return {
					success: true,
					category: {
						id: category.id,
						slug: category.slug,
						name: category.name,
						description: category.description,
					},
					message: `Found category: ${category.name}`,
				};
			} catch (error) {
				console.error("Failed to get category:", error);
				throw error;
			}
		}

		// Create new category
		if (action === "create" || action === "get-or-create") {
			if (!slug || !name) {
				return {
					success: false,
					category: null,
					message: "Slug and name are required for create actions",
				};
			}

			try {
				// Check if exists
				const [existing] = await db
					.select()
					.from(schema.blogCategory)
					.where(eq(schema.blogCategory.slug, slug))
					.limit(1);

				if (existing) {
					if (action === "get-or-create") {
						return {
							success: true,
							category: {
								id: existing.id,
								slug: existing.slug,
								name: existing.name,
								description: existing.description,
							},
							message: `Using existing category: ${existing.name}`,
						};
					}
					return {
						success: false,
						category: null,
						message: `Category with slug '${slug}' already exists`,
					};
				}

				// Create new category
				const id = nanoid();
				await db.insert(schema.blogCategory).values({
					id,
					slug,
					name,
					description: description ?? null,
					createdAt: new Date(),
					updatedAt: new Date(),
				});

				return {
					success: true,
					category: {
						id,
						slug,
						name,
						description: description ?? null,
					},
					message: `Created new category: ${name}`,
				};
			} catch (error) {
				console.error("Failed to create category:", error);
				throw error;
			}
		}

		return {
			success: false,
			category: null,
			message: `Unknown action: ${action}`,
		};
	},
});
