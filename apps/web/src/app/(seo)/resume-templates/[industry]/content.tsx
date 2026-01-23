import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageCTA } from "@/components/seo/PageCTA";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import type { IndustryData } from "@/data/industries";
import { getJobTitlesByIndustry } from "@/data/job-titles";
import { SITE_URL } from "@/lib/seo/constants";
import { generateIndustryFAQs } from "@/lib/seo/content/faqs";
import { generateIndustryIntro } from "@/lib/seo/content/intros";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";

interface Props {
	industry: IndustryData;
}

export function IndustryPageContent({ industry }: Props) {
	const year = new Date().getFullYear();
	const jobTitles = getJobTitlesByIndustry(industry.slug);
	const faqs = generateIndustryFAQs(industry.slug, industry.name);
	const intro = generateIndustryIntro(industry.name);

	const breadcrumbs = [
		{ name: "Home", url: SITE_URL },
		{ name: "Resume Templates", url: `${SITE_URL}/resume-templates` },
		{
			name: industry.name,
			url: `${SITE_URL}/resume-templates/${industry.slug}`,
		},
	];

	const relatedLinks = jobTitles.map((jt) => ({
		title: `${jt.title} Resume`,
		path: `/resume-examples/${jt.slug}`,
		relationship: "child" as const,
	}));

	return (
		<div className="min-h-screen bg-white">
			<JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
			<JsonLd data={createFAQSchema(faqs)} />

			<main className="mx-auto max-w-4xl px-6 py-16">
				<Breadcrumbs items={breadcrumbs} />

				<h1 className="mb-6 font-bold text-4xl text-gray-900">
					{industry.name} Resume Templates {year}
				</h1>

				<p className="mb-8 text-gray-600 text-lg leading-relaxed">{intro}</p>

				<section className="mb-12">
					<h2 className="mb-4 font-semibold text-2xl text-gray-900">
						Popular {industry.name} Roles
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						{jobTitles.map((jt) => (
							<Link
								key={jt.slug}
								href={`/resume-examples/${jt.slug}`}
								className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-500"
							>
								<h3 className="font-medium text-gray-900">{jt.title}</h3>
								<p className="text-gray-500 text-sm">
									View examples and templates
								</p>
							</Link>
						))}
					</div>
				</section>

				<section className="mb-12">
					<h2 className="mb-4 font-semibold text-2xl text-gray-900">
						Key Skills
					</h2>
					<div className="flex flex-wrap gap-2">
						{industry.skills.map((skill) => (
							<span
								key={skill}
								className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 text-sm"
							>
								{skill}
							</span>
						))}
					</div>
				</section>

				<section className="mb-12">
					<h2 className="mb-6 font-semibold text-2xl text-gray-900">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						{faqs.map((faq) => (
							<div
								key={faq.question}
								className="rounded-lg border border-gray-200 p-4"
							>
								<h3 className="mb-2 font-medium text-gray-900">
									{faq.question}
								</h3>
								<p className="text-gray-600">{faq.answer}</p>
							</div>
						))}
					</div>
				</section>

				<RelatedLinks links={relatedLinks} title="Related Resume Examples" />

				<PageCTA
					heading={`Create Your ${industry.name} Resume`}
					description="Build a professional resume in minutes with our AI-powered builder."
					buttonText="Build My Resume"
					buttonUrl="/signup"
				/>
			</main>
		</div>
	);
}
