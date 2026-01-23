import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllJobTitleSlugs, getJobTitleBySlug } from "@/data/job-titles";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import {
	generateCanonical,
	generateDescription,
	generateTitle,
} from "@/lib/seo/metadata";
import { JobTitlePageContent } from "./content";

interface Props {
	params: Promise<{ jobTitle: string }>;
}

export async function generateStaticParams() {
	return getAllJobTitleSlugs().map((jobTitle) => ({ jobTitle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { jobTitle: slug } = await params;
	const job = getJobTitleBySlug(slug);
	if (!job) return {};

	const year = new Date().getFullYear();
	const title = generateTitle(
		`${job.title} Resume Examples & Guide ${year}`,
		SITE_NAME,
	);
	const description = generateDescription(
		`Professional ${job.title} resume examples and writing guide. Learn what skills and experience to include for ${job.title} roles in ${year}.`,
	);
	const canonical = generateCanonical(`/resume-examples/${slug}`, SITE_URL);

	return {
		title,
		description,
		keywords: job.keywords,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			url: canonical,
			type: "article",
		},
	};
}

export default async function JobTitlePage({ params }: Props) {
	const { jobTitle: slug } = await params;
	const job = getJobTitleBySlug(slug);

	if (!job) {
		notFound();
	}

	return <JobTitlePageContent job={job} />;
}
