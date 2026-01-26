import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageCTA } from "@/components/seo/PageCTA";
import { jobTitles } from "@/data/job-titles";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";
import {
  generateCanonical,
  generateDescription,
  generateTitle,
} from "@/lib/seo/metadata";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";

const title = generateTitle("Resume Examples by Job Title", SITE_NAME);
const description = generateDescription(
  "Browse resume examples for hundreds of job titles. See what successful resumes look like in your field.",
);
const canonical = generateCanonical("/resume-examples", SITE_URL);

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

export default function ResumeExamplesHub() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Resume Examples", url: `${SITE_URL}/resume-examples` },
  ];

  // Group by industry for better UX
  const groupedJobs = jobTitles.reduce(
    (acc, job) => {
      if (!acc[job.industry]) acc[job.industry] = [];
      acc[job.industry].push(job);
      return acc;
    },
    {} as Record<string, typeof jobTitles>,
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mb-6 font-bold text-4xl text-gray-900">
          Resume Examples by Job Title
        </h1>

        <p className="mb-12 text-gray-600 text-lg leading-relaxed">
          Explore real resume examples for your specific role. Learn what
          skills, keywords, and achievements you should include to land your
          next interview.
        </p>

        <div className="mb-16 space-y-12">
          {Object.entries(groupedJobs).map(([industry, jobs]) => (
            <section key={industry}>
              <h2 className="mb-6 border-b pb-2 font-semibold text-2xl text-gray-900 capitalize">
                {industry}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <Link
                    key={job.slug}
                    href={`/resume-examples/${job.slug}`}
                    className="block rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:border-blue-300 hover:bg-white hover:shadow-sm"
                  >
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <p className="mt-1 text-gray-500 text-xs">
                      {job.experienceLevel} Level
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <PageCTA
          heading="Write your resume with AI"
          description="Our AI writer can generate bullet points for any of these job titles."
          buttonText="Try AI Writer"
          buttonUrl="/new"
        />
      </main>
    </div>
  );
}
