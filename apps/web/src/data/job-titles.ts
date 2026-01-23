/**
 * Job title definitions for programmatic SEO pages
 */

export interface JobTitleData {
	slug: string;
	title: string;
	industry: string;
	experienceLevel: "entry" | "mid" | "senior" | "executive";
	keywords: string[];
	skills: string[];
}

export const jobTitles: JobTitleData[] = [
	// Technology
	{
		slug: "software-engineer",
		title: "Software Engineer",
		industry: "technology",
		experienceLevel: "mid",
		keywords: ["software developer resume", "programmer resume"],
		skills: ["JavaScript", "Python", "Git", "AWS"],
	},
	{
		slug: "product-manager",
		title: "Product Manager",
		industry: "technology",
		experienceLevel: "mid",
		keywords: ["PM resume", "product management resume"],
		skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
	},
	{
		slug: "data-scientist",
		title: "Data Scientist",
		industry: "technology",
		experienceLevel: "mid",
		keywords: ["data science resume", "ML resume"],
		skills: ["Python", "Machine Learning", "SQL", "Statistics"],
	},
	{
		slug: "devops-engineer",
		title: "DevOps Engineer",
		industry: "technology",
		experienceLevel: "mid",
		keywords: ["DevOps resume", "SRE resume"],
		skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
	},
	// Healthcare
	{
		slug: "registered-nurse",
		title: "Registered Nurse",
		industry: "healthcare",
		experienceLevel: "mid",
		keywords: ["RN resume", "nursing resume"],
		skills: ["Patient Care", "IV Therapy", "EMR", "Triage"],
	},
	{
		slug: "physician",
		title: "Physician",
		industry: "healthcare",
		experienceLevel: "senior",
		keywords: ["doctor resume", "MD resume"],
		skills: [
			"Diagnosis",
			"Patient Care",
			"Medical Records",
			"Treatment Planning",
		],
	},
	// Finance
	{
		slug: "financial-analyst",
		title: "Financial Analyst",
		industry: "finance",
		experienceLevel: "mid",
		keywords: ["finance resume", "analyst resume"],
		skills: ["Financial Modeling", "Excel", "Valuation", "Reporting"],
	},
	{
		slug: "accountant",
		title: "Accountant",
		industry: "finance",
		experienceLevel: "mid",
		keywords: ["CPA resume", "accounting resume"],
		skills: ["GAAP", "Financial Reporting", "QuickBooks", "Tax Preparation"],
	},
	// Marketing
	{
		slug: "marketing-manager",
		title: "Marketing Manager",
		industry: "marketing",
		experienceLevel: "mid",
		keywords: ["marketing resume", "brand manager resume"],
		skills: [
			"Campaign Management",
			"Analytics",
			"Brand Strategy",
			"Budget Management",
		],
	},
	{
		slug: "seo-specialist",
		title: "SEO Specialist",
		industry: "marketing",
		experienceLevel: "mid",
		keywords: ["SEO resume", "digital marketing resume"],
		skills: [
			"Keyword Research",
			"Google Analytics",
			"Technical SEO",
			"Content Strategy",
		],
	},
	// Design
	{
		slug: "ux-designer",
		title: "UX Designer",
		industry: "design",
		experienceLevel: "mid",
		keywords: ["UX resume", "user experience resume"],
		skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
	},
	{
		slug: "graphic-designer",
		title: "Graphic Designer",
		industry: "design",
		experienceLevel: "mid",
		keywords: ["design resume", "creative resume"],
		skills: ["Adobe Photoshop", "Illustrator", "Typography", "Brand Design"],
	},
	// Education
	{
		slug: "teacher",
		title: "Teacher",
		industry: "education",
		experienceLevel: "mid",
		keywords: ["teacher resume", "educator resume"],
		skills: [
			"Curriculum Design",
			"Classroom Management",
			"Lesson Planning",
			"Student Assessment",
		],
	},
	{
		slug: "professor",
		title: "Professor",
		industry: "education",
		experienceLevel: "senior",
		keywords: ["academic resume", "faculty resume"],
		skills: ["Research", "Public Speaking", "Academic Writing", "Mentoring"],
	},
	// Engineering
	{
		slug: "mechanical-engineer",
		title: "Mechanical Engineer",
		industry: "engineering",
		experienceLevel: "mid",
		keywords: ["mechanical engineering resume", "CAD resume"],
		skills: ["SolidWorks", "AutoCAD", "Thermodynamics", "Prototyping"],
	},
	{
		slug: "civil-engineer",
		title: "Civil Engineer",
		industry: "engineering",
		experienceLevel: "mid",
		keywords: ["civil engineering resume", "structural engineer resume"],
		skills: [
			"AutoCAD",
			"Project Management",
			"Structural Analysis",
			"Site Planning",
		],
	},
	// Sales
	{
		slug: "sales-representative",
		title: "Sales Representative",
		industry: "sales",
		experienceLevel: "entry",
		keywords: ["sales resume", "sales rep resume"],
		skills: ["Cold Calling", "CRM", "Negotiation", "Lead Generation"],
	},
	{
		slug: "account-executive",
		title: "Account Executive",
		industry: "sales",
		experienceLevel: "mid",
		keywords: ["AE resume", "B2B sales resume"],
		skills: [
			"Pipeline Management",
			"Salesforce",
			"Strategic Selling",
			"Client Relations",
		],
	},
];

export function getJobTitleBySlug(slug: string): JobTitleData | undefined {
	return jobTitles.find((j) => j.slug === slug);
}

export function getJobTitlesByIndustry(industry: string): JobTitleData[] {
	return jobTitles.filter((j) => j.industry === industry);
}

export function getAllJobTitleSlugs(): string[] {
	return jobTitles.map((j) => j.slug);
}
