"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  FileText,
  Loader2,
  ScanText,
  Sparkles,
  Target,
  UploadCloud,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { ResumeScoreResponse } from "@/app/api/tools/resume-scorer/route";
import { ShareableScoreCard } from "@/components/tools/ShareableScoreCard";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function ResumeScorerClient() {
  const [results, setResults] = useState<ResumeScoreResponse | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900 tracking-tight">
            Free Resume Score Checker
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Get Your Resume Grade — See how your resume scores across 5 key
            categories and share your results
          </p>
        </div>

        {!results ? (
          <ResumeScorerForm onResults={setResults} />
        ) : (
          <ResumeScoreResults
            results={results}
            onReset={() => setResults(null)}
          />
        )}

        {/* SEO Content (Below the fold) */}
        {!results && (
          <div className="mt-16 space-y-8">
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-bold text-2xl">
                What is a Resume Score?
              </h2>
              <p className="mb-4 text-gray-600">
                A resume score is a comprehensive evaluation of your resume's
                effectiveness based on industry best practices and recruiter
                preferences. Unlike simple spell-checking, our scoring
                methodology analyzes five critical dimensions that determine
                whether your resume gets noticed or ignored. The score ranges
                from 0 to 100, with higher scores indicating a stronger, more
                competitive resume. Our AI-powered system has been trained on
                thousands of successful resumes and real job postings to provide
                accurate, actionable feedback that reflects what employers
                actually look for.
              </p>
              <p className="mb-6 text-gray-600">
                Understanding your resume score helps you make data-driven
                improvements rather than guessing what might work. Each category
                is weighted based on its importance to hiring managers and ATS
                systems. By breaking down your score into specific components,
                you can focus your efforts on the areas that will have the
                greatest impact on your job search success. Whether you are a
                recent graduate or an experienced professional, knowing your
                resume score gives you a competitive edge in today's job market.
              </p>
              <h3 className="mb-3 font-semibold text-lg">
                Our 5-Point Scoring System
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-semibold">Content Quality</h4>
                  <p className="text-gray-600 text-sm">
                    Evaluates your use of action verbs, professional language,
                    and clear communication. Strong content uses active voice,
                    avoids jargon, and demonstrates expertise through precise
                    terminology.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-semibold">Formatting</h4>
                  <p className="text-gray-600 text-sm">
                    Assesses visual structure, section organization, font
                    consistency, and white space usage. Proper formatting makes
                    your resume scannable and professional-looking.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-semibold">ATS Compatibility</h4>
                  <p className="text-gray-600 text-sm">
                    Checks if your resume can be parsed by Applicant Tracking
                    Systems. This includes proper file format, readable fonts,
                    and standard section headings that ATS software recognizes.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-semibold">Impact Statements</h4>
                  <p className="text-gray-600 text-sm">
                    Measures the presence of quantified achievements with
                    numbers, percentages, and concrete results. Impact
                    statements prove your value to potential employers.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 md:col-span-2">
                  <h4 className="font-semibold">Completeness</h4>
                  <p className="text-gray-600 text-sm">
                    Reviews whether all essential sections are present and
                    adequately filled, including contact information, work
                    experience, education, and skills. Missing sections can
                    disqualify you from consideration.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-emerald-50 p-8">
              <h2 className="mb-4 font-bold text-2xl text-emerald-900">
                How to Improve Your Resume Score
              </h2>
              <p className="text-emerald-800">
                Improving your resume score starts with understanding your
                results. Focus first on the categories with the lowest scores,
                as these represent your biggest opportunities for improvement.
                For content quality, replace passive phrases with action verbs
                like "led," "developed," or "increased." To boost formatting
                scores, ensure consistent spacing, use a clean professional
                font, and maintain clear section hierarchy. Improve ATS
                compatibility by avoiding tables, graphics, and unusual fonts
                that parsing software cannot read. Add impact statements by
                quantifying your achievements—turn "managed a team" into
                "managed a team of 12, increasing productivity by 25%." Finally,
                ensure completeness by including all standard sections and
                double-checking that contact information is current and
                professional. Small, targeted improvements in each category can
                significantly raise your overall score and your chances of
                landing interviews.
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
                    How is my resume score calculated?
                  </h3>
                  <p className="text-gray-600">
                    Our resume scorer evaluates your resume across five key
                    categories: Content Quality (use of action verbs,
                    professional language), Formatting (visual structure,
                    consistency), ATS Compatibility (parsability by automated
                    systems), Impact Statements (quantified achievements), and
                    Completeness (all essential sections). Each category is
                    scored individually, and you receive an overall grade from A
                    to F.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    What is a good resume score?
                  </h3>
                  <p className="text-gray-600">
                    We recommend aiming for a score of 80 or above (Grade A or
                    B) for the best chances of getting interviews. Scores
                    between 65-79 (Grade C) indicate a decent resume with room
                    for improvement. Scores below 65 suggest significant issues
                    that should be addressed before submitting applications.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    How can I improve my resume score?
                  </h3>
                  <p className="text-gray-600">
                    Focus on the categories with the lowest scores first. For
                    Content Quality, use action verbs and avoid passive
                    language. For Formatting, ensure consistent spacing and
                    fonts. For ATS Compatibility, avoid tables and graphics. For
                    Impact Statements, add quantified achievements with numbers
                    and percentages. For Completeness, ensure all standard
                    sections are present.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

interface ResumeScorerFormProps {
  onResults: (data: ResumeScoreResponse) => void;
}

function ResumeScorerForm({ onResults }: ResumeScorerFormProps) {
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      let response: Response;

      if (activeTab === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        response = await fetch("/api/tools/resume-scorer", {
          method: "POST",
          body: formData,
        });
      } else if (activeTab === "paste" && resumeText.trim()) {
        response = await fetch("/api/tools/resume-scorer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText }),
        });
      } else {
        toast.error("Please provide your resume");
        setIsAnalyzing(false);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      onResults(data.data);
      toast.success("Score calculated!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="paste">
                <FileText className="mr-2 h-4 w-4" />
                Paste Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resume-upload">
                  Upload Resume (PDF or DOCX)
                </Label>
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="resume-upload"
                    className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="mb-3 h-10 w-10 text-gray-400" />
                      <p className="mb-2 text-gray-500 text-sm">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-gray-500 text-xs">
                        PDF or DOCX (MAX. 2MB)
                      </p>
                    </div>
                    <Input
                      id="resume-upload"
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {file && (
                  <p className="font-medium text-green-600 text-sm">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="paste" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resume-text">Paste Your Resume</Label>
                <Textarea
                  id="resume-text"
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-gray-500 text-xs">
                  Copy and paste the text from your resume for instant scoring.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isAnalyzing ||
              (activeTab === "upload" && !file) ||
              (activeTab === "paste" && !resumeText.trim())
            }
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get My Score
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface ResumeScoreResultsProps {
  results: ResumeScoreResponse;
  onReset: () => void;
}

function ResumeScoreResults({ results, onReset }: ResumeScoreResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 65) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const categories = [
    {
      key: "content",
      label: "Content Quality",
      score: results.categoryScores.content,
    },
    {
      key: "formatting",
      label: "Formatting",
      score: results.categoryScores.formatting,
    },
    {
      key: "ats",
      label: "ATS Compatibility",
      score: results.categoryScores.ats,
    },
    {
      key: "impact",
      label: "Impact Statements",
      score: results.categoryScores.impact,
    },
    {
      key: "completeness",
      label: "Completeness",
      score: results.categoryScores.completeness,
    },
  ];

  return (
    <div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-500">
      {/* Score Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Shareable Card - Left Side */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h3 className="mb-4 text-center font-semibold text-lg">
              Your Score Card
            </h3>
            <ShareableScoreCard
              grade={results.grade}
              overallScore={results.overallScore}
              categoryScores={results.categoryScores}
            />
          </CardContent>
        </Card>

        {/* Category Scores - Right Side */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold text-lg">Category Breakdown</h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.key}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-gray-700 text-sm">{cat.label}</span>
                    <span className="font-semibold text-sm">{cat.score}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getScoreColor(cat.score)}`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* One Liner */}
      <div className="rounded-lg bg-blue-50 p-6 text-center">
        <p className="text-blue-900 text-lg">{results.oneLiner}</p>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-emerald-700 text-lg">
              <CheckCircle className="h-5 w-5" />
              Strengths
            </h3>
            <ul className="space-y-3">
              {results.strengths.map((strength) => (
                <li key={strength} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-gray-700 text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg text-orange-700">
              <AlertCircle className="h-5 w-5" />
              Areas to Improve
            </h3>
            <ul className="space-y-3">
              {results.improvements.map((improvement) => (
                <li key={improvement} className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  <span className="text-gray-700 text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white">
        <h3 className="mb-2 font-bold text-2xl">Want to Improve Your Score?</h3>
        <p className="mb-6 text-blue-100">
          Get AI-powered suggestions to boost your resume and land more
          interviews.
        </p>
        <a
          href="/signup?ref=resume-scorer"
          className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 transition-colors hover:bg-blue-50"
        >
          Improve Your Score with AI
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-gray-500 text-sm underline hover:text-blue-600"
        >
          Score another resume
        </button>
      </div>

      {/* Other Tools Section */}
      <OtherToolsSection />
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
