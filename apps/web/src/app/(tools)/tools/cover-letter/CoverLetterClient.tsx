"use client";

import {
  ArrowRight,
  CheckCircle,
  Copy,
  FileText,
  Loader2,
  Lock,
  RefreshCw,
  ScanText,
  Sparkles,
  Target,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import type {
  CoverLetterRequest,
  CoverLetterResponse,
} from "@/app/api/tools/cover-letter/route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CoverLetterClient() {
  const [results, setResults] = useState<CoverLetterResponse | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900 tracking-tight">
            Generate a Personalized Cover Letter in Seconds
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            AI-powered cover letter generation that matches your resume to the
            job description. Get a tailored letter that highlights your
            strengths.
          </p>
        </div>

        {!results ? (
          <CoverLetterForm onResults={setResults} />
        ) : (
          <CoverLetterResults
            results={results}
            onReset={() => setResults(null)}
          />
        )}

        {/* How It Works Section */}
        {!results && (
          <div className="mt-20">
            <section>
              <h2 className="mb-8 text-center font-bold text-2xl text-gray-900">
                How It Works
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 text-lg">
                    1
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">Paste Resume</h3>
                  <p className="text-gray-600">
                    Copy and paste your resume content so our AI understands
                    your experience and skills.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 text-lg">
                    2
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">
                    Add Job Details
                  </h3>
                  <p className="text-gray-600">
                    Paste the job description and optionally add company name
                    and job title for personalization.
                  </p>
                </div>
                <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 text-lg">
                    3
                  </div>
                  <h3 className="mb-2 font-semibold text-lg">
                    Get Personalized Letter
                  </h3>
                  <p className="text-gray-600">
                    Our AI generates a tailored cover letter highlighting your
                    relevant experience for this specific role.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SEO Content (Below the fold) */}
        {!results && (
          <div className="mt-16 space-y-8">
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-bold text-2xl">
                Why Use a Cover Letter Generator?
              </h2>
              <p className="mb-4 text-gray-600">
                A well-crafted cover letter can be the difference between
                getting an interview and being overlooked. While your resume
                lists your qualifications, your cover letter tells your story
                and explains why you are the perfect fit for the role. However,
                writing a compelling, personalized cover letter for every
                application is time-consuming and challenging. Many job seekers
                resort to generic templates that fail to impress hiring
                managers. Our AI-powered cover letter generator solves this
                problem by creating unique, tailored letters in seconds that
                highlight your most relevant experience for each specific
                position.
              </p>
              <p className="mb-6 text-gray-600">
                Using a cover letter generator ensures consistency in quality
                while saving you hours of writing time. Our AI analyzes both
                your resume and the job description to identify the best
                connections between your skills and the employer's needs. This
                data-driven approach results in cover letters that speak
                directly to what hiring managers are looking for, increasing
                your chances of making a memorable first impression. Whether you
                are applying to five jobs or fifty, our tool helps you maintain
                high-quality, personalized applications without the burnout of
                writing each letter from scratch.
              </p>
              <h3 className="mb-3 font-semibold text-lg">
                What Makes a Great Cover Letter
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                <li>
                  <strong>Personalization:</strong> A great cover letter
                  addresses the specific company and role, showing you have
                  researched the organization and understand their values,
                  culture, and challenges.
                </li>
                <li>
                  <strong>Relevance:</strong> The best cover letters connect
                  your experience directly to the job requirements, using
                  specific examples that demonstrate how you have successfully
                  handled similar responsibilities.
                </li>
                <li>
                  <strong>Conciseness:</strong> Hiring managers review dozens of
                  applications daily. An effective cover letter communicates
                  your value proposition clearly and concisely, typically in
                  250-400 words, respecting the reader's time while making a
                  strong impression.
                </li>
              </ul>
            </section>

            <section className="rounded-xl bg-purple-50 p-8">
              <h2 className="mb-4 font-bold text-2xl text-purple-900">
                Cover Letter Best Practices
              </h2>
              <p className="text-purple-800">
                To maximize the impact of your cover letter, start with a strong
                opening that grabs attention and clearly states the position you
                are applying for. Use the body paragraphs to tell a compelling
                story about your most relevant achievements, focusing on results
                and impact rather than just listing responsibilities. Address
                any potential concerns, such as career transitions or employment
                gaps, with honesty and positivity. Always proofread carefully,
                as even small errors can undermine your professionalism. Tailor
                your tone to match the company culture—more formal for
                traditional industries, conversational for startups and creative
                roles. Finally, end with a confident call to action, expressing
                enthusiasm for the opportunity and inviting further
                conversation. Our cover letter generator incorporates all these
                best practices automatically, ensuring every letter you send
                follows proven strategies for success.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-bold text-2xl">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    How does the AI cover letter generator work?
                  </h3>
                  <p className="text-gray-600">
                    Our AI cover letter generator analyzes your resume and the
                    job description you provide. It identifies the key
                    connections between your experience and the job
                    requirements, then crafts a personalized cover letter that
                    highlights your most relevant qualifications. The AI ensures
                    proper formatting, professional tone, and compelling content
                    tailored to the specific role.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Is the cover letter generator free to use?
                  </h3>
                  <p className="text-gray-600">
                    Yes! You can generate a free preview of your cover letter
                    instantly with no signup required. The preview includes the
                    first part of your personalized letter and key highlights.
                    To unlock the full letter and save it for future use, you
                    can sign up for a free account.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    How long should a cover letter be?
                  </h3>
                  <p className="text-gray-600">
                    The ideal cover letter is typically 250-400 words or about
                    3-4 paragraphs. Hiring managers review dozens of
                    applications daily, so an effective cover letter
                    communicates your value proposition clearly and concisely
                    while respecting the reader&apos;s time. Our generator
                    creates letters within this optimal length range.
                  </p>
                </div>
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
      id: "ats-checker",
      title: "ATS Resume Checker",
      description:
        "Scan your resume against ATS algorithms. Get instant feedback on formatting, keywords, and readability to pass applicant tracking systems.",
      icon: <ScanText className="size-6" />,
      href: "/tools/ats-checker",
    },
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

interface CoverLetterFormProps {
  onResults: (data: CoverLetterResponse) => void;
}

function CoverLetterForm({ onResults }: CoverLetterFormProps) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const payload: CoverLetterRequest = {
        resumeText,
        jobDescription,
        companyName: companyName || undefined,
        jobTitle: jobTitle || undefined,
      };

      const response = await fetch("/api/tools/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate cover letter");
      }

      onResults(data.data);
      toast.success("Cover letter generated!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-text">
                Paste Your Resume <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="resume-text"
                placeholder="Paste your resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[200px]"
                required
              />
              <p className="text-gray-500 text-xs">
                Copy and paste the full text of your resume.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">
                Paste the Job Description{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px]"
                required
              />
              <p className="text-gray-500 text-xs">
                Copy and paste the full job description for best results.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name (Optional)</Label>
                <Input
                  id="company-name"
                  placeholder="e.g., Google"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title (Optional)</Label>
                <Input
                  id="job-title"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isGenerating ||
              !resumeText.trim() ||
              resumeText.trim().length < 50 ||
              !jobDescription.trim() ||
              jobDescription.trim().length < 50
            }
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Cover Letter
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface CoverLetterResultsProps {
  results: CoverLetterResponse;
  onReset: () => void;
}

function CoverLetterResults({ results, onReset }: CoverLetterResultsProps) {
  const handleCopyPreview = () => {
    navigator.clipboard.writeText(results.preview);
    toast.success("Preview copied to clipboard!");
  };

  return (
    <div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-500">
      {/* Free Preview Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="border-b bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                Your Cover Letter Preview
              </h3>
              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700 text-xs">
                Free Preview
              </span>
            </div>
          </div>

          <div className="relative">
            {/* Preview Text */}
            <div className="p-6">
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {results.preview}
                </p>
              </div>
            </div>

            {/* Blur Overlay */}
            <div className="absolute inset-0 top-1/2 bg-gradient-to-t from-white via-white/95 to-transparent" />

            {/* CTA Overlay */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center p-8">
              <div className="mb-4 text-center">
                <p className="mb-2 font-medium text-gray-700">
                  Continue reading to see your full cover letter
                </p>
                <p className="text-gray-500 text-sm">
                  {results.wordCount} words • {results.keyPoints.length} key
                  highlights identified
                </p>
              </div>
              <Link
                href={`/signup?ref=cover-letter&returnUrl=${encodeURIComponent("/tools/cover-letter")}`}
              >
                <Button size="lg" className="gap-2">
                  <Lock className="h-4 w-4" />
                  Unlock Full Letter
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="mt-2 text-gray-500 text-xs">
                Free signup required to view complete letter
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Highlights Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            Key Highlights
          </h3>
          <p className="mb-4 text-gray-600 text-sm">
            Here is what our AI focused on when matching your experience to the
            job:
          </p>
          <ul className="space-y-3">
            {results.keyPoints.map((point, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: keyPoints are static after generation
              <li key={`keypoint-${index}`} className="flex items-start gap-3">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 text-xs">
                  {index + 1}
                </div>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          variant="outline"
          onClick={handleCopyPreview}
          className="flex-1"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Preview
        </Button>
        <Button variant="outline" onClick={onReset} className="flex-1">
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate
        </Button>
      </div>

      {/* CTA Section */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
        <h3 className="mb-2 font-bold text-2xl">Want the Full Letter?</h3>
        <p className="mb-6 text-blue-100">
          Sign up for free to unlock your complete, personalized cover letter
          and save it for future applications.
        </p>
        <Link
          href={`/signup?ref=cover-letter&returnUrl=${encodeURIComponent("/tools/cover-letter")}`}
          className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 transition-colors hover:bg-blue-50"
        >
          Unlock Full Letter
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
