import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";
import type { FAQItem } from "@/lib/seo/types";
import { KeywordMatcherClient } from "./KeywordMatcherClient";

export const metadata: Metadata = {
  title: "Free Job Description Keyword Matcher | Optimize Your Resume",
  description:
    "Match your resume to any job description. See how well you align with job requirements and identify missing keywords to optimize your resume for ATS.",
  keywords: [
    "resume keyword matcher",
    "job description analyzer",
    "ATS keywords",
    "resume optimization",
    "job match score",
  ],
  openGraph: {
    title: "Free Job Description Keyword Matcher",
    description: "See how well your resume matches any job description",
    type: "website",
  },
};

// FAQ data for keyword matcher
const keywordMatcherFaqs: FAQItem[] = [
  {
    question: "How does the keyword matcher work?",
    answer:
      "Our keyword matcher analyzes your resume and the job description you provide. It uses AI to extract important keywords, skills, and qualifications from the job posting, then compares them against your resume content. You'll receive a match percentage showing how well your resume aligns with the job requirements, along with specific keywords you're missing.",
  },
  {
    question: "Why is keyword matching important for my resume?",
    answer:
      "Over 75% of resumes are rejected by Applicant Tracking Systems (ATS) before a human ever sees them. These systems scan for specific keywords that match the job description. If your resume lacks the right keywords, it gets automatically rejected regardless of your qualifications. Our keyword matcher helps you identify and add the missing terms to pass through these filters.",
  },
  {
    question: "What types of keywords does the tool identify?",
    answer:
      "The tool identifies various types of keywords including: hard skills (programming languages, software, tools), soft skills (leadership, communication, teamwork), industry-specific terminology, certifications, educational requirements, and action verbs. It prioritizes keywords based on their frequency and importance in the job description.",
  },
  {
    question: "Is the keyword matcher free to use?",
    answer:
      "Yes! Our keyword matcher is completely free with no signup required. Simply paste your resume and the job description to get instant results. We also offer other free tools like ATS checker and resume scorer to help you optimize your entire application.",
  },
  {
    question: "What match score should I aim for?",
    answer:
      "We recommend aiming for a match score of 75% or higher. Scores above 75% indicate strong alignment with the job requirements and good chances of passing ATS filters. Scores between 50-75% suggest moderate alignment but could benefit from adding more relevant keywords. Scores below 50% indicate significant gaps that should be addressed.",
  },
];

export default function KeywordMatcherPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: "Keyword Matcher", url: `${SITE_URL}/tools/keyword-matcher` },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={createFAQSchema(keywordMatcherFaqs)} />

      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <KeywordMatcherClient />
    </>
  );
}
