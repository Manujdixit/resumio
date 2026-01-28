import {
  ArrowRight,
  FileText,
  ScanText,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE_URL } from "@/lib/seo/constants";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";
import type { FAQItem } from "@/lib/seo/types";

export const metadata: Metadata = {
  title: "Free Resume Tools | Resumio",
  description:
    "Boost your job search with our free resume tools. ATS checker, keyword matcher, cover letter generator, and more. No signup required.",
};

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  status: "live" | "coming-soon";
  badge?: string;
}

const tools: ToolCard[] = [
  {
    id: "ats-checker",
    title: "ATS Resume Checker",
    description:
      "Scan your resume against ATS algorithms. Get instant feedback on formatting, keywords, and readability to pass applicant tracking systems.",
    icon: <ScanText className="size-6" />,
    href: "/tools/ats-checker",
    status: "live",
    badge: "Free",
  },
  {
    id: "keyword-matcher",
    title: "Keyword Matcher",
    description:
      "Compare your resume against job descriptions. Identify missing keywords and optimize your resume for specific roles.",
    icon: <Target className="size-6" />,
    href: "/tools/keyword-matcher",
    status: "live",
    badge: "Free",
  },
  {
    id: "cover-letter-generator",
    title: "Cover Letter Generator",
    description:
      "Generate tailored cover letters in seconds. AI-powered writing that matches your resume to the job description.",
    icon: <FileText className="size-6" />,
    href: "/tools/cover-letter",
    status: "live",
    badge: "Free Preview",
  },
  {
    id: "resume-scorer",
    title: "Resume Scorer",
    description:
      "Get a comprehensive score for your resume. Industry-specific benchmarks and actionable improvement suggestions.",
    icon: <Sparkles className="size-6" />,
    href: "/tools/resume-scorer",
    status: "live",
    badge: "Free",
  },
];

// FAQ data for tools hub
const toolsFaqs: FAQItem[] = [
  {
    question: "Are these resume tools really free?",
    answer:
      "Yes! All our resume tools are completely free to use with no signup required. This includes our ATS checker, keyword matcher, resume scorer, and cover letter generator. We believe everyone should have access to tools that help them land their dream job.",
  },
  {
    question: "How does the ATS checker work?",
    answer:
      "Our ATS checker analyzes your resume against common Applicant Tracking System algorithms. It checks your formatting, structure, keywords, and content to ensure your resume can be properly parsed by automated systems used by employers. You'll receive a score and detailed feedback on areas for improvement.",
  },
  {
    question: "What is keyword matching and why is it important?",
    answer:
      "Keyword matching compares your resume against job descriptions to identify missing skills and qualifications. Over 75% of resumes are rejected by ATS before a human sees them, often due to missing keywords. Our tool helps you identify and add the right keywords to pass through automated filters.",
  },
  {
    question: "How is the resume score calculated?",
    answer:
      "Our resume scorer evaluates your resume across five key categories: Content Quality, Formatting, ATS Compatibility, Impact Statements, and Completeness. Each category is scored individually, and you'll receive an overall grade with actionable suggestions for improvement.",
  },
  {
    question: "Do I need to create an account to use these tools?",
    answer:
      "No account is required to use our free tools. Simply upload your resume or paste your text to get instant results. If you want to save your results or access advanced features, you can sign up for a free account.",
  },
];

export default function ToolsPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={createFAQSchema(toolsFaqs)} />
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5">
              <Wand2 className="mr-2 size-4 text-blue-600" />
              <span className="font-medium text-blue-700 text-sm">
                100% Free Tools
              </span>
            </div>
            <h1 className="mb-6 font-bold text-4xl text-gray-900 tracking-tight md:text-5xl lg:text-6xl">
              Free Resume & Career Tools
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg md:text-xl">
              Everything you need to land your dream job. No signup required for
              our free tools — just instant results to optimize your job search.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className={`flex flex-col transition-shadow hover:shadow-lg ${
                  tool.status === "coming-soon" ? "opacity-75" : ""
                }`}
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      {tool.icon}
                    </div>
                    {tool.badge && (
                      <span
                        className={`rounded-full px-3 py-1 font-medium text-xs ${
                          tool.status === "live"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter>
                  {tool.status === "live" ? (
                    <Button asChild className="w-full">
                      <Link href={tool.href as Route}>
                        Try Free
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-20 space-y-12">
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-bold text-2xl">
                Free Resume Tools to Land Your Dream Job
              </h2>
              <p className="mb-4 text-gray-600">
                In today&apos;s competitive job market, having a professional
                resume is no longer optional—it&apos;s essential. Our free
                resume tools are designed to help job seekers at every stage of
                their career journey. Whether you&apos;re a recent graduate
                applying for your first position or an experienced professional
                looking to make a career change, these tools provide the
                insights and guidance you need to stand out from the crowd.
              </p>
              <p className="text-gray-600">
                Unlike generic resume builders, our tools focus on what really
                matters: getting your resume past Applicant Tracking Systems
                (ATS) and into the hands of hiring managers. With our ATS
                checker, keyword matcher, resume scorer, and cover letter
                generator, you have everything you need to create a job-winning
                application package. Best of all, these tools are completely
                free to use with no signup required.
              </p>
            </section>

            <section className="rounded-xl bg-blue-50 p-8">
              <h2 className="mb-4 font-bold text-2xl text-blue-900">
                Why Use Resume Tools?
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">ATS Optimization</h3>
                  <p className="text-blue-800">
                    Over 75% of resumes are rejected by ATS before a human ever
                    sees them. Our ATS checker analyzes your resume formatting,
                    structure, and content to ensure it passes through these
                    automated systems and reaches hiring managers.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Keyword Matching</h3>
                  <p className="text-blue-800">
                    Tailoring your resume to each job description is crucial.
                    Our keyword matcher compares your resume against job
                    postings to identify missing keywords and phrases, helping
                    you optimize for specific roles and industries.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    Professional Formatting
                  </h3>
                  <p className="text-blue-800">
                    First impressions matter. Our resume scorer evaluates your
                    resume&apos;s visual appeal, readability, and professional
                    formatting standards, providing actionable suggestions to
                    make your resume look polished and modern.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    Cover Letter Generation
                  </h3>
                  <p className="text-blue-800">
                    A great cover letter can make all the difference. Our AI
                    cover letter generator creates personalized, compelling
                    cover letters that complement your resume and highlight your
                    unique qualifications for each position.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-gray-50 p-8">
              <h2 className="mb-4 font-bold text-2xl">
                How to Use Our Free Tools
              </h2>
              <ol className="list-decimal space-y-3 pl-5 text-gray-700">
                <li>
                  <strong>Check Your Resume Score</strong> - Upload your
                  existing resume to our resume scorer and receive a
                  comprehensive analysis with industry-specific benchmarks and
                  personalized improvement recommendations.
                </li>
                <li>
                  <strong>Match Keywords</strong> - Copy and paste your target
                  job description into our keyword matcher to see exactly which
                  skills and phrases you need to add to your resume.
                </li>
                <li>
                  <strong>Generate Cover Letters</strong> - Use our AI-powered
                  cover letter generator to create tailored cover letters in
                  seconds that match your experience to the job requirements.
                </li>
                <li>
                  <strong>Check ATS Compatibility</strong> - Run your optimized
                  resume through our ATS checker to ensure it will pass
                  automated screening systems used by major employers.
                </li>
              </ol>
            </section>

            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-bold text-2xl">
                Build Your Career with Resumio
              </h2>
              <p className="mb-4 text-gray-600">
                Our free resume tools are just the beginning. When you&apos;re
                ready to take your job search to the next level, our AI-powered
                resume builder combines all these features into one seamless
                experience. Create professional, ATS-optimized resumes with ease
                using our intuitive resume builder that guides you through every
                step of the process.
              </p>
              <p className="text-gray-600">
                From entry-level positions to executive roles, job seekers
                across all industries trust Resumio to help them land interviews
                and secure their dream jobs. Start with our free tools today,
                and discover why thousands of professionals choose our platform
                for their career advancement needs.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-bold text-2xl">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {toolsFaqs.map((faq) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 font-bold text-3xl text-white md:text-4xl">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="mb-8 text-blue-100 text-lg">
            Our AI-powered resume builder takes your tools results and creates a
            professional, ATS-optimized resume that gets you hired faster.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white px-8 text-blue-900 hover:bg-blue-50"
            >
              <Link href="/signup?ref=tools-hub">
                Start Building Free
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-400 bg-transparent px-8 text-white hover:bg-blue-800 hover:text-white"
            >
              <Link href="/resume-templates">Browse Templates</Link>
            </Button>
          </div>
          <p className="mt-6 text-blue-200 text-sm">
            No credit card required. Free plan available.
          </p>
        </div>
      </section>
    </div>
  );
}
