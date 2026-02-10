import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageCTA } from "@/components/seo/PageCTA";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getIndustryBySlug } from "@/data/industries";
import type { JobTitleData } from "@/data/job-titles";
import { getJobTitlesByIndustry } from "@/data/job-titles";
import { SITE_URL } from "@/lib/seo/constants";
import { generateJobTitleFAQs } from "@/lib/seo/content/faqs";
import { generateJobTitleIntro } from "@/lib/seo/content/intros";
import { createArticleSchema } from "@/lib/seo/schema/article";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";
import type { RelatedPage } from "@/lib/seo/types";

interface Props {
  job: JobTitleData;
}

export function JobTitlePageContent({ job }: Props) {
  const year = new Date().getFullYear();
  const faqs = generateJobTitleFAQs(job.title);
  const intro = generateJobTitleIntro(job.title, job.industry);
  const industry = getIndustryBySlug(job.industry);
  const similarJobs = getJobTitlesByIndustry(job.industry).filter(
    (j) => j.slug !== job.slug,
  );

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Resume Examples", url: `${SITE_URL}/resume-examples` },
    { name: job.title, url: `${SITE_URL}/resume-examples/${job.slug}` },
  ];

  const relatedLinks: RelatedPage[] = similarJobs.map((jt) => ({
    title: `${jt.title} Resume`,
    path: `/resume-examples/${jt.slug}`,
    relationship: "sibling",
  }));

  if (industry) {
    relatedLinks.push({
      title: `${industry.name} Resumes`,
      path: `/resume-templates/${industry.slug}`,
      relationship: "parent",
    });
  }

  const articleSchema = createArticleSchema({
    headline: `${job.title} Resume Examples & Guide ${year}`,
    description: intro,
    url: `${SITE_URL}/resume-examples/${job.slug}`,
    datePublished: "2024-01-01T00:00:00.000Z",
    dateModified: new Date().toISOString(),
  });

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={[
          createBreadcrumbSchema(breadcrumbs),
          createFAQSchema(faqs),
          articleSchema,
        ]}
      />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mb-6 font-bold text-4xl text-gray-900">
          {job.title} Resume Examples {year}
        </h1>

        <div className="mb-8 flex gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 text-sm capitalize">
            {job.experienceLevel} Level
          </span>
          {industry && (
            <Link
              href={`/resume-templates/${industry.slug}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 text-sm hover:bg-gray-200"
            >
              {industry.name}
            </Link>
          )}
        </div>

        <p className="mb-12 text-gray-600 text-lg leading-relaxed">
          {job.description || intro}
        </p>

        <section className="mb-12">
          <h2 className="mb-6 font-semibold text-2xl text-gray-900">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-green-700 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {job.responsibilities && (
          <section className="mb-12">
            <h2 className="mb-6 font-semibold text-2xl text-gray-900">
              Key Responsibilities
            </h2>
            <ul className="list-disc pl-5 text-gray-600">
              {job.responsibilities.map((item) => (
                <li key={item} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-12">
          <h2 className="mb-6 font-semibold text-2xl text-gray-900">
            {job.title} Resume Guide
          </h2>
          <div className="prose prose-blue max-w-none text-gray-600">
            <h3>Professional Summary</h3>
            {job.summary ? (
              <div className="rounded-lg border-blue-500 border-l-4 bg-gray-50 p-6 italic">
                &ldquo;{job.summary}&rdquo;
              </div>
            ) : (
              <p>
                Start with a compelling summary that highlights your years of
                experience as a {job.title} and your key achievements. Mention
                your industry expertise in {industry?.name || "your field"}.
              </p>
            )}
            <h3>Work Experience</h3>
            <p>
              List your experience in reverse chronological order. Focus on
              achievements rather than duties. Use numbers to quantify your
              impact (e.g., &quot;Increased efficiency by 20%&quot;).
            </p>
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

        <RelatedLinks links={relatedLinks} title="Similar Roles" />

        <PageCTA
          heading={`Build Your ${job.title} Resume`}
          description="Use our AI to write your resume bullets and optimize for ATS."
          buttonText="Start Building"
          buttonUrl="/new"
        />
      </main>
    </div>
  );
}
