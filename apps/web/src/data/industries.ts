/**
 * Industry definitions for programmatic SEO pages
 */

export interface IndustryData {
	slug: string;
	name: string;
	description: string;
	keywords: string[];
	jobTitles: string[];
	skills: string[];
}

export const industries: IndustryData[] = [
	{
		slug: "technology",
		name: "Technology",
		description: "Software development, IT, and tech industry resume templates",
		keywords: ["tech resume", "software engineer resume", "IT resume"],
		jobTitles: [
			"software-engineer",
			"product-manager",
			"data-scientist",
			"devops-engineer",
		],
		skills: ["JavaScript", "Python", "Cloud Computing", "Agile"],
	},
	{
		slug: "healthcare",
		name: "Healthcare",
		description: "Medical and healthcare professional resume templates",
		keywords: ["healthcare resume", "medical resume", "nurse resume"],
		jobTitles: [
			"registered-nurse",
			"physician",
			"medical-assistant",
			"pharmacist",
		],
		skills: [
			"Patient Care",
			"EMR Systems",
			"HIPAA Compliance",
			"Clinical Skills",
		],
	},
	{
		slug: "finance",
		name: "Finance",
		description: "Banking, accounting, and financial services resume templates",
		keywords: ["finance resume", "banking resume", "accountant resume"],
		jobTitles: [
			"financial-analyst",
			"accountant",
			"investment-banker",
			"auditor",
		],
		skills: [
			"Financial Analysis",
			"Excel",
			"Bloomberg Terminal",
			"Risk Management",
		],
	},
	{
		slug: "marketing",
		name: "Marketing",
		description: "Digital marketing and advertising resume templates",
		keywords: [
			"marketing resume",
			"digital marketing resume",
			"social media resume",
		],
		jobTitles: [
			"marketing-manager",
			"content-strategist",
			"seo-specialist",
			"brand-manager",
		],
		skills: ["SEO", "Google Analytics", "Content Marketing", "Social Media"],
	},
	{
		slug: "education",
		name: "Education",
		description: "Teaching and academic professional resume templates",
		keywords: ["teacher resume", "education resume", "professor resume"],
		jobTitles: [
			"teacher",
			"professor",
			"school-administrator",
			"curriculum-developer",
		],
		skills: [
			"Lesson Planning",
			"Classroom Management",
			"Student Assessment",
			"EdTech",
		],
	},
	{
		slug: "engineering",
		name: "Engineering",
		description:
			"Mechanical, civil, and electrical engineering resume templates",
		keywords: [
			"engineering resume",
			"mechanical engineer resume",
			"civil engineer resume",
		],
		jobTitles: [
			"mechanical-engineer",
			"civil-engineer",
			"electrical-engineer",
			"project-engineer",
		],
		skills: [
			"CAD",
			"Project Management",
			"Technical Documentation",
			"Quality Control",
		],
	},
	{
		slug: "sales",
		name: "Sales",
		description: "Sales and business development resume templates",
		keywords: [
			"sales resume",
			"account executive resume",
			"business development resume",
		],
		jobTitles: [
			"sales-representative",
			"account-executive",
			"sales-manager",
			"business-development",
		],
		skills: ["CRM", "Negotiation", "Lead Generation", "Sales Forecasting"],
	},
	{
		slug: "design",
		name: "Design",
		description: "Graphic, UX, and product design resume templates",
		keywords: ["designer resume", "UX resume", "graphic design resume"],
		jobTitles: [
			"ux-designer",
			"graphic-designer",
			"product-designer",
			"ui-designer",
		],
		skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
	},
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
	return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
	return industries.map((i) => i.slug);
}
