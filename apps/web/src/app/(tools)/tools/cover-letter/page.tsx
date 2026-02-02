import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";
import type { FAQItem } from "@/lib/seo/types";
import { CoverLetterClient } from "./CoverLetterClient";

export const metadata: Metadata = {
  title: "Free AI Cover Letter Generator | Write Cover Letters Fast",
  description:
    "Generate personalized cover letters in seconds using AI. Match your resume to any job description and create compelling cover letters that get interviews.",
  keywords: [
    "cover letter generator",
    "AI cover letter",
    "free cover letter writer",
    "job application letter",
    "cover letter maker",
  ],
  openGraph: {
    title: "Free AI Cover Letter Generator",
    description: "Generate personalized cover letters with AI",
    type: "website",
  },
  alternates: {
    canonical: "/tools/cover-letter",
  },
};

// FAQ data for cover letter generator
const coverLetterFaqs: FAQItem[] = [
  {
    question: "How does the AI cover letter generator work?",
    answer:
      "Our AI cover letter generator analyzes your resume and the job description you provide. It identifies the key connections between your experience and the job requirements, then crafts a personalized cover letter that highlights your most relevant qualifications. The AI ensures proper formatting, professional tone, and compelling content tailored to the specific role.",
  },
  {
    question: "Is the cover letter generator free to use?",
    answer:
      "Yes! You can generate a free preview of your cover letter instantly with no signup required. The preview includes the first part of your personalized letter and key highlights. To unlock the full letter and save it for future use, you can sign up for a free account.",
  },
  {
    question: "What makes a good cover letter?",
    answer:
      "A great cover letter is personalized to the specific company and role, connects your experience directly to job requirements with specific examples, and communicates your value proposition clearly and concisely (typically 250-400 words). It should have a strong opening, compelling body paragraphs highlighting relevant achievements, and a confident call to action.",
  },
  {
    question: "Can I customize the generated cover letter?",
    answer:
      "Yes! While our AI generates a strong foundation, you can always copy the generated letter and make adjustments to better match your voice or add additional details. We recommend using the AI-generated letter as a starting point and personalizing it further based on your specific situation.",
  },
  {
    question: "How long should a cover letter be?",
    answer:
      "The ideal cover letter is typically 250-400 words or about 3-4 paragraphs. Hiring managers review dozens of applications daily, so an effective cover letter communicates your value proposition clearly and concisely while respecting the reader's time. Our generator creates letters within this optimal length range.",
  },
];

export default function CoverLetterPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: "Cover Letter Generator", url: `${SITE_URL}/tools/cover-letter` },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={createFAQSchema(coverLetterFaqs)} />

      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <CoverLetterClient />
    </>
  );
}
