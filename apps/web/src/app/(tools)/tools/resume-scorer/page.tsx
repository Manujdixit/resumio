import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";
import type { FAQItem } from "@/lib/seo/types";
import { ResumeScorerClient } from "./ResumeScorerClient";

export const metadata: Metadata = {
  title: "Free Resume Score Checker | Get Your Resume Grade",
  description:
    "Get an instant grade for your resume. Score your resume across 5 key categories: Content, Formatting, ATS Compatibility, Impact, and Completeness.",
  keywords: [
    "resume score checker",
    "resume grader",
    "free resume review",
    "resume analyzer",
    "ATS resume check",
  ],
  openGraph: {
    title: "Free Resume Score Checker",
    description: "Get your resume graded instantly",
    type: "website",
  },
  alternates: {
    canonical: "/tools/resume-scorer",
  },
};

// FAQ data for resume scorer
const resumeScorerFaqs: FAQItem[] = [
  {
    question: "How is my resume score calculated?",
    answer:
      "Our resume scorer evaluates your resume across five key categories: Content Quality (use of action verbs, professional language), Formatting (visual structure, consistency), ATS Compatibility (parsability by automated systems), Impact Statements (quantified achievements), and Completeness (all essential sections). Each category is scored individually, and you receive an overall grade from A to F.",
  },
  {
    question: "What is a good resume score?",
    answer:
      "We recommend aiming for a score of 80 or above (Grade A or B) for the best chances of getting interviews. Scores between 65-79 (Grade C) indicate a decent resume with room for improvement. Scores below 65 suggest significant issues that should be addressed before submitting applications to competitive positions.",
  },
  {
    question: "Can I share my resume score?",
    answer:
      "Yes! After analyzing your resume, you'll receive a shareable score card that you can post on social media or share with friends. This feature helps you benchmark your resume against others and get feedback from your network.",
  },
  {
    question: "Is the resume scorer free to use?",
    answer:
      "Yes! Our resume scorer is completely free with no signup required. Upload your resume PDF or DOCX file, or paste your text directly to get instant results. We also offer free AI-powered suggestions to help you improve your score.",
  },
  {
    question: "How can I improve my resume score?",
    answer:
      "Focus on the categories with the lowest scores first. For Content Quality, use action verbs and avoid passive language. For Formatting, ensure consistent spacing and fonts. For ATS Compatibility, avoid tables and graphics. For Impact Statements, add quantified achievements with numbers and percentages. For Completeness, ensure all standard sections are present.",
  },
];

export default function ResumeScorerPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: "Resume Scorer", url: `${SITE_URL}/tools/resume-scorer` },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={createFAQSchema(resumeScorerFaqs)} />

      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <ResumeScorerClient />
    </>
  );
}
