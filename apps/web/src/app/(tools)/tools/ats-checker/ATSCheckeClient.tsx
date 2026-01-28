"use client";

import { FileText, Sparkles, Target } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ATSCheckerForm } from "@/components/tools/ats-checker/ATSCheckerForm";
import { ATSIssuesList } from "@/components/tools/ats-checker/ATSIssuesList";
import { ATSKeywordMatchList } from "@/components/tools/ats-checker/ATSKeywordMatch";
import { ATSResultCard } from "@/components/tools/ats-checker/ATSResultCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ATSCheckResponse } from "@/lib/ats/types";
import { SITE_URL } from "@/lib/seo/constants";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";
import type { FAQItem } from "@/lib/seo/types";

// FAQ data for ATS checker
const atsFaqs: FAQItem[] = [
  {
    question: "What is an ATS checker and why do I need one?",
    answer:
      "An ATS (Applicant Tracking System) checker analyzes your resume to ensure it can be properly read by automated hiring software used by most companies. Over 98% of Fortune 500 companies use ATS to filter resumes before they reach human recruiters. Our checker helps you identify formatting issues, missing keywords, and other problems that could cause your resume to be rejected automatically.",
  },
  {
    question: "How does the ATS checker work?",
    answer:
      "Our ATS checker scans your resume and evaluates it across multiple categories: contact information formatting, resume structure, content quality, and keyword optimization. It checks for common ATS parsing issues like tables, graphics, unusual fonts, and missing section headers. You'll receive a score, grade, and detailed feedback on specific issues to fix.",
  },
  {
    question: "What file formats work best for ATS?",
    answer:
      "PDF and DOCX formats are both ATS-friendly when properly formatted. Our tool accepts both formats. Avoid using images, tables, headers/footers for important information, and unusual fonts. Stick to standard fonts like Arial, Calibri, or Times New Roman for best compatibility.",
  },
  {
    question: "Is this ATS checker really free?",
    answer:
      "Yes! Our ATS checker is completely free to use with no signup required. Upload your resume or paste your text to get instant results. We also offer additional free tools like keyword matching and resume scoring to help you optimize your entire application.",
  },
  {
    question: "What score should I aim for?",
    answer:
      "We recommend aiming for a score of 80 or above (Grade A or B) for the best chances of passing ATS filters. Scores below 60 indicate significant issues that should be addressed before submitting applications. Our detailed feedback helps you understand exactly what to improve.",
  },
];

export default function ATSCheckeClient() {
  const [results, setResults] = useState<ATSCheckResponse | null>(null);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
    { name: "ATS Checker", url: `${SITE_URL}/tools/ats-checker` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={createFAQSchema(atsFaqs)} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="mb-10 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900 tracking-tight">
            Free ATS Resume Checker
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Is your resume getting rejected by robots? Scan your resume now to
            see how it performs against Applicant Tracking Systems.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Form (or Results Summary on mobile) */}
          <div className="lg:col-span-12">
            {!results ? (
              <ATSCheckerForm onResults={setResults} />
            ) : (
              <div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-500">
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Score Card */}
                  <div className="w-full md:w-1/3">
                    <ATSResultCard
                      score={results.score}
                      grade={results.grade}
                      summary={results.summary}
                    />
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={() => setResults(null)}
                        className="text-gray-500 text-sm underline hover:text-blue-600"
                      >
                        Scan another resume
                      </button>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="w-full space-y-6 md:w-2/3">
                    {results.categories.keywords && (
                      <ATSKeywordMatchList data={results.categories.keywords} />
                    )}

                    <ATSIssuesList
                      title="Contact Information"
                      issues={results.categories.contactInfo.issues}
                      score={results.categories.contactInfo.score}
                    />
                    <ATSIssuesList
                      title="Formatting & Structure"
                      issues={results.categories.formatting.issues}
                      score={results.categories.formatting.score}
                    />
                    <ATSIssuesList
                      title="Content Quality"
                      issues={results.categories.content.issues}
                      score={results.categories.content.score}
                    />

                    {/* CTA for Detailed Analysis */}
                    <div className="rounded-xl bg-blue-900 p-8 text-center text-white">
                      <h3 className="mb-2 font-bold text-2xl">
                        Want a detailed fix?
                      </h3>
                      <p className="mb-6 text-blue-100">
                        Sign up for free to get AI-powered suggestions and
                        rewrite your bullet points instantly.
                      </p>
                      <a
                        href="/signup?ref=ats-checker"
                        className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-900 transition-colors hover:bg-blue-50"
                      >
                        Unlock Full Report
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content (Below the fold) */}
        {!results && (
          <div className="mt-20 space-y-12">
            <section>
              <h2 className="mb-4 font-bold text-2xl text-gray-900">
                How ATS Systems Work
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p>
                  Applicant Tracking Systems (ATS) are software used by
                  employers to collect, sort, scan, and rank the job
                  applications they receive for their open positions. Over 98%
                  of Fortune 500 companies use an ATS.
                </p>
                <p className="mt-4">
                  If your resume isn't optimized for these systems, it might
                  never be seen by a human recruiter, regardless of how
                  qualified you are. Our free ATS checker analyzes your resume
                  against common ATS algorithms to help you identify and fix
                  issues that could be holding you back.
                </p>
              </div>
            </section>

            <section className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                  Formatting Checks
                </h3>
                <p className="text-gray-600">
                  We check for parseable fonts, proper margins, and compatible
                  file formats.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                  Keyword Analysis
                </h3>
                <p className="text-gray-600">
                  Identify missing keywords from the job description to boost
                  your ranking.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">
                  Content Scanning
                </h3>
                <p className="text-gray-600">
                  Ensure you have all necessary sections like Contact Info,
                  Experience, and Education.
                </p>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-bold text-2xl text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {atsFaqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Other Tools Section */}
        <OtherToolsSection />
      </div>
    </div>
  );
}

function OtherToolsSection() {
  const tools = [
    {
      id: "keyword-matcher",
      title: "Keyword Matcher",
      description:
        "Compare your resume against job descriptions. Identify missing keywords and optimize your resume for specific roles.",
      icon: <Target className="size-6" />,
      href: "/tools/keyword-matcher",
    },
    {
      id: "resume-scorer",
      title: "Resume Scorer",
      description:
        "Get a comprehensive score for your resume. Industry-specific benchmarks and actionable improvement suggestions.",
      icon: <Sparkles className="size-6" />,
      href: "/tools/resume-scorer",
    },
    {
      id: "cover-letter",
      title: "Cover Letter Generator",
      description:
        "Generate tailored cover letters in seconds. AI-powered writing that matches your resume to the job description.",
      icon: <FileText className="size-6" />,
      href: "/tools/cover-letter",
    },
  ];

  return (
    <section className="mt-20 border-gray-200 border-t pt-16">
      <h2 className="mb-8 text-center font-bold text-2xl text-gray-900">
        Try Our Other Free Tools
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className="flex flex-col transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  {tool.icon}
                </div>
              </div>
              <CardTitle className="text-xl">{tool.title}</CardTitle>
              <CardDescription className="text-gray-600">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={tool.href as Route}>Try It</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
