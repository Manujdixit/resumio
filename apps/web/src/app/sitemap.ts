import type { MetadataRoute } from "next";
import { industries } from "@/data/industries";
import { jobTitles } from "@/data/job-titles";

const BASE_URL = "https://resumebuild.cv";

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

	return [...staticPages, ...industryPages, ...jobPages];
}
