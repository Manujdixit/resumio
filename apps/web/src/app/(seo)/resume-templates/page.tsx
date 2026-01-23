import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageCTA } from "@/components/seo/PageCTA";
import { industries } from "@/data/industries";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import {
	generateCanonical,
	generateDescription,
	generateTitle,
} from "@/lib/seo/metadata";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";

const title = generateTitle("Resume Templates by Industry", SITE_NAME);
const description = generateDescription(
	"Browse professional resume templates by industry. Find the perfect design for your career path.",
);
const canonical = generateCanonical("/resume-templates", SITE_URL);

export const metadata: Metadata = {
	title,
	description,
	alternates: { canonical },
	openGraph: {
		title,
		description,
		url: canonical,
		type: "website",
	},
};

export default function ResumeTemplatesHub() {
	const breadcrumbs = [
		{ name: "Home", url: SITE_URL },
		{ name: "Resume Templates", url: `${SITE_URL}/resume-templates` },
	];

	return (
		<div className="min-h-screen bg-white">
			<JsonLd data={createBreadcrumbSchema(breadcrumbs)} />

			<main className="mx-auto max-w-4xl px-6 py-16">
				<Breadcrumbs items={breadcrumbs} />

				<h1 className="mb-6 font-bold text-4xl text-gray-900">
					Resume Templates by Industry
				</h1>

				<p className="mb-12 text-gray-600 text-lg leading-relaxed">
					Choose from our collection of industry-specific resume templates. Each
					template is optimized for ATS and designed to highlight the skills
					that matter most in your field.
				</p>

				<div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{industries.map((industry) => (
						<Link
							key={industry.slug}
							href={`/resume-templates/${industry.slug}`}
							className="flex flex-col rounded-xl border border-gray-200 p-6 transition-all hover:border-blue-500 hover:shadow-lg"
						>
							<h2 className="mb-2 font-semibold text-gray-900 text-xl">
								{industry.name}
							</h2>
							<p className="mb-4 flex-grow text-gray-500 text-sm">
								{industry.description}
							</p>
							<span className="font-medium text-blue-600 text-sm">
								View Templates &rarr;
							</span>
						</Link>
					))}
				</div>

				<PageCTA
					heading="Ready to build your resume?"
					description="Create a professional resume in minutes with our AI-powered builder."
					buttonText="Get Started For Free"
					buttonUrl="/signup"
				/>
			</main>
		</div>
	);
}
