import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllIndustrySlugs, getIndustryBySlug } from "@/data/industries";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import {
	generateCanonical,
	generateDescription,
	generateTitle,
} from "@/lib/seo/metadata";
import { IndustryPageContent } from "./content";

interface Props {
	params: Promise<{ industry: string }>;
}

export async function generateStaticParams() {
	return getAllIndustrySlugs().map((industry) => ({ industry }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { industry: slug } = await params;
	const industry = getIndustryBySlug(slug);
	if (!industry) return {};

	const year = new Date().getFullYear();
	const title = generateTitle(
		`${industry.name} Resume Templates ${year}`,
		SITE_NAME,
	);
	const description = generateDescription(
		`Professional ${industry.name} resume templates and examples. ATS-optimized designs for ${industry.name} professionals. Create your resume in minutes.`,
	);
	const canonical = generateCanonical(`/resume-templates/${slug}`, SITE_URL);

	return {
		title,
		description,
		keywords: industry.keywords,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			url: canonical,
			type: "website",
		},
	};
}

export default async function IndustryPage({ params }: Props) {
	const { industry: slug } = await params;
	const industry = getIndustryBySlug(slug);

	if (!industry) {
		notFound();
	}

	return <IndustryPageContent industry={industry} />;
}
