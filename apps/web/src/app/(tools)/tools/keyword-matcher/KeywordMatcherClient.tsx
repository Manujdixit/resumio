"use client";

import { Loader2, Target, UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { KeywordMatcherResponse } from "@/app/api/tools/keyword-matcher/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function KeywordMatcherClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<KeywordMatcherResponse | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isParsingFile, setIsParsingFile] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF or DOCX file");
      return;
    }

    // Validate file size (max 2MB)
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setFile(selectedFile);
    setIsParsingFile(true);

    try {
      // Parse the file using the parse-resume API
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/tools/parse-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to parse file");
      }

      setResumeText(data.text);
      toast.success(`Parsed ${selectedFile.name} successfully`);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to parse file",
      );
      setFile(null);
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast.error("Please enter your resume text or upload a file");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter the job description");
      return;
    }

    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/tools/keyword-matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze keywords");
      }

      setResults(data.data);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage < 50)
      return { text: "text-red-600", bg: "bg-red-50", stroke: "#dc2626" };
    if (percentage < 75)
      return { text: "text-yellow-600", bg: "bg-yellow-50", stroke: "#ca8a04" };
    return { text: "text-green-600", bg: "bg-green-50", stroke: "#16a34a" };
  };

  const renderCircularProgress = (percentage: number) => {
    const colors = getScoreColor(percentage);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative h-40 w-40">
        <svg
          className="-rotate-90 h-full w-full transform"
          viewBox="0 0 120 120"
          role="img"
          aria-label={`Match Score: ${percentage}%`}
        >
          <title>Match Score Gauge</title>
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold text-4xl ${colors.text}`}>
            {percentage}%
          </span>
          <span className="font-medium text-gray-500 text-xs uppercase">
            Match
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 font-bold text-4xl text-gray-900 tracking-tight">
            Match Your Resume to Any Job Description
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Upload your resume or paste your text, then add the job description
            to see how well you match. Identify missing keywords and optimize
            your resume for ATS systems.
          </p>
        </div>

        {!results ? (
          /* Input Form */
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Resume Input - Left Side */}
                <div className="space-y-4">
                  <Label
                    htmlFor="resume-input"
                    className="font-medium text-gray-700"
                  >
                    Your Resume
                  </Label>

                  {/* File Upload */}
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="resume-upload"
                      className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 border-dashed bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="mb-2 h-6 w-6 text-gray-400" />
                        <p className="text-gray-500 text-sm">
                          <span className="font-semibold">Click to upload</span>{" "}
                          PDF or DOCX
                        </p>
                      </div>
                      <Input
                        id="resume-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        disabled={isParsingFile}
                      />
                    </label>
                  </div>

                  {file && (
                    <p className="font-medium text-green-600 text-sm">
                      Selected: {file.name}
                    </p>
                  )}

                  {isParsingFile && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Parsing file...
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-gray-200 border-t" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Text Input */}
                  <Textarea
                    id="resume-input"
                    placeholder="Paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <p className="text-gray-500 text-xs">
                    Upload a file or paste your resume content as plain text
                  </p>
                </div>

                {/* Job Description Input - Right Side */}
                <div className="space-y-2">
                  <Label
                    htmlFor="job-input"
                    className="font-medium text-gray-700"
                  >
                    Job Description
                  </Label>
                  <Textarea
                    id="job-input"
                    placeholder="Paste the job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[360px] resize-none"
                  />
                  <p className="text-gray-500 text-xs">
                    Paste the full job description you're applying to
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || isParsingFile}
                  className="px-12"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-5 w-5" />
                      Check Match
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Results Section */
          <div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-500">
            {/* Score Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
                  <div className="flex flex-col items-center">
                    {renderCircularProgress(results.matchPercentage)}
                    <div className="mt-4 text-center">
                      <Badge
                        variant={
                          results.matchPercentage >= 75
                            ? "default"
                            : "secondary"
                        }
                        className={
                          results.matchPercentage >= 75
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : results.matchPercentage >= 50
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {results.matchPercentage >= 75
                          ? "Great Match"
                          : results.matchPercentage >= 50
                            ? "Fair Match"
                            : "Needs Improvement"}
                      </Badge>
                    </div>
                  </div>

                  <div className="max-w-md text-center md:text-left">
                    <h3 className="mb-2 font-semibold text-xl">
                      Match Analysis
                    </h3>
                    <p className="text-gray-600">
                      Your resume matches {results.matchPercentage}% of the key
                      requirements for this job.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setResults(null);
                  setResumeText("");
                  setJobDescription("");
                  setFile(null);
                }}
              >
                Analyze Another Resume
              </Button>
            </div>
          </div>
        )}

        {/* SEO Content (Below the fold) */}
        {!results && (
          <div className="mt-16 space-y-8">
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-4 font-bold text-2xl">
                Why Match Your Resume to Job Descriptions?
              </h2>
              <p className="mb-4 text-gray-600">
                In today's competitive job market, Applicant Tracking Systems
                (ATS) filter out over 70% of resumes before they ever reach a
                human recruiter. These automated systems scan your resume for
                specific keywords that match the job description. If your resume
                lacks the right keywords, it gets rejected—regardless of your
                qualifications. Our keyword matcher helps you bridge this gap by
                identifying exactly which terms you need to include to pass
                through ATS filters and land interviews.
              </p>
              <p className="mb-6 text-gray-600">
                Beyond ATS optimization, matching your resume to job
                descriptions demonstrates to hiring managers that you have taken
                the time to understand the role and tailor your application.
                This personalization shows genuine interest and significantly
                increases your chances of getting noticed. Studies show that
                tailored resumes receive 40% more responses than generic ones.
                Our tool takes the guesswork out of this process, giving you
                data-driven insights into how well your resume aligns with each
                opportunity.
              </p>
              <h3 className="mb-3 font-semibold text-lg">
                How Our Keyword Matcher Works
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                <li>
                  <strong>Smart Keyword Extraction:</strong> Our AI analyzes the
                  job description to identify critical skills, qualifications,
                  and industry-specific terms that recruiters and ATS systems
                  prioritize.
                </li>
                <li>
                  <strong>Comprehensive Matching:</strong> We compare extracted
                  keywords against your resume content, calculating a match
                  percentage that shows exactly how aligned your application is
                  with the role.
                </li>
                <li>
                  <strong>Actionable Suggestions:</strong> Receive specific
                  recommendations on which keywords to add, where to place them,
                  and how to naturally incorporate them into your existing
                  content.
                </li>
              </ul>
            </section>

            <section className="rounded-xl bg-blue-50 p-8">
              <h2 className="mb-4 font-bold text-2xl text-blue-900">
                Common Resume Keywords by Industry
              </h2>
              <p className="mb-4 text-blue-800">
                Different industries prioritize different keywords. Technology
                roles often look for programming languages, frameworks, and
                methodologies like "React," "Agile," or "CI/CD." Healthcare
                positions emphasize certifications, patient care skills, and
                regulatory knowledge such as "HIPAA" or "clinical
                documentation." Finance and accounting jobs seek terms like
                "financial modeling," "GAAP," or "risk assessment." Marketing
                roles focus on "SEO," "content strategy," "conversion
                optimization," and platform-specific tools. By understanding
                industry-specific terminology, you can optimize your resume for
                the exact field you are targeting. Our keyword matcher learns
                from thousands of job postings to provide the most relevant and
                up-to-date keyword recommendations for your specific industry
                and role level.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 font-bold text-2xl text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    How does the keyword matcher work?
                  </h3>
                  <p className="text-gray-600">
                    Our keyword matcher analyzes your resume and the job
                    description you provide. It uses AI to extract important
                    keywords, skills, and qualifications from the job posting,
                    then compares them against your resume content. You&apos;ll
                    receive a match percentage showing how well your resume
                    aligns with the job requirements, along with specific
                    keywords you&apos;re missing.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Why is keyword matching important for my resume?
                  </h3>
                  <p className="text-gray-600">
                    Over 75% of resumes are rejected by Applicant Tracking
                    Systems (ATS) before a human ever sees them. These systems
                    scan for specific keywords that match the job description.
                    If your resume lacks the right keywords, it gets
                    automatically rejected regardless of your qualifications.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    What match score should I aim for?
                  </h3>
                  <p className="text-gray-600">
                    We recommend aiming for a match score of 75% or higher.
                    Scores above 75% indicate strong alignment with the job
                    requirements and good chances of passing ATS filters. Scores
                    between 50-75% suggest moderate alignment but could benefit
                    from adding more relevant keywords.
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
