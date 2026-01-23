/**
 * Resume template definitions for programmatic SEO pages
 */

export interface TemplateData {
	slug: string;
	name: string;
	description: string;
	style: "modern" | "classic" | "minimal" | "creative";
	suitableFor: string[];
	features: string[];
}

export const templates: TemplateData[] = [
	{
		slug: "modern",
		name: "Modern",
		description:
			"Clean, contemporary design with bold headers and clear sections",
		style: "modern",
		suitableFor: ["technology", "marketing", "design"],
		features: [
			"ATS-friendly",
			"Clean layout",
			"Bold headers",
			"Skills section",
		],
	},
	{
		slug: "classic",
		name: "Classic",
		description: "Traditional professional layout trusted by recruiters",
		style: "classic",
		suitableFor: ["finance", "healthcare", "education"],
		features: [
			"ATS-optimized",
			"Traditional format",
			"Conservative design",
			"Chronological layout",
		],
	},
	{
		slug: "minimal",
		name: "Minimal",
		description: "Simple, elegant design that lets your content shine",
		style: "minimal",
		suitableFor: ["technology", "engineering", "education"],
		features: [
			"Clean typography",
			"Whitespace focused",
			"Distraction-free",
			"ATS-friendly",
		],
	},
	{
		slug: "creative",
		name: "Creative",
		description: "Stand out with a unique design for creative professionals",
		style: "creative",
		suitableFor: ["design", "marketing", "sales"],
		features: [
			"Visual elements",
			"Color accents",
			"Unique layout",
			"Portfolio ready",
		],
	},
];

export function getTemplateBySlug(slug: string): TemplateData | undefined {
	return templates.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs(): string[] {
	return templates.map((t) => t.slug);
}
