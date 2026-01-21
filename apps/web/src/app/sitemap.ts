import type { MetadataRoute } from "next";

/**
 * Dynamic Sitemap Generation
 * Privacy-first: Only includes static marketing pages
 * User resumes are NOT indexed for privacy protection
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://resumebuild.cv";

	// Static pages only - no user-generated content
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1.0,
		},
		{
			url: `${baseUrl}/privacy`,
			lastModified: new Date("2025-01-04"),
			changeFrequency: "monthly",
			priority: 0.5,
		},
	];

	return staticPages;
}
