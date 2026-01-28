import { type NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/ats/parse-resume";

export interface ResumeScoreRequest {
  resumeText?: string;
}

export interface ResumeScoreResponse {
  overallScore: number;
  grade: "A+" | "A" | "B+" | "B" | "C" | "D" | "F";
  categoryScores: {
    content: number;
    formatting: number;
    ats: number;
    impact: number;
    completeness: number;
  };
  strengths: string[];
  improvements: string[];
  oneLiner: string;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let resumeText = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return NextResponse.json(
          { error: "No file uploaded" },
          { status: 400 },
        );
      }

      try {
        resumeText = await parseResume(file);
      } catch (error) {
        console.error("Parsing error:", error);
        return NextResponse.json(
          { error: "Failed to parse file. Please upload a valid PDF or DOCX." },
          { status: 400 },
        );
      }
    } else {
      const body = (await req.json()) as ResumeScoreRequest;
      resumeText = body.resumeText || "";
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        {
          error:
            "Could not extract enough text from the resume. Is it an image-based PDF or empty?",
        },
        { status: 422 },
      );
    }

    const results = analyzeResumeScore(resumeText);

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Resume Scorer Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function analyzeResumeScore(text: string): ResumeScoreResponse {
  const normalizedText = text.toLowerCase();
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  // Score each category
  const contentScore = calculateContentScore(normalizedText, words, wordCount);
  const formattingScore = calculateFormattingScore(
    normalizedText,
    lines,
    wordCount,
  );
  const atsScore = calculateATSScore(normalizedText, text);
  const impactScore = calculateImpactScore(normalizedText, text);
  const completenessScore = calculateCompletenessScore(normalizedText);

  // Calculate weighted overall score
  const overallScore = Math.round(
    contentScore * 0.25 +
      formattingScore * 0.2 +
      atsScore * 0.2 +
      impactScore * 0.2 +
      completenessScore * 0.15,
  );

  const grade = calculateGrade(overallScore);
  const strengths = generateStrengths(
    contentScore,
    formattingScore,
    atsScore,
    impactScore,
    completenessScore,
    normalizedText,
    text,
  );
  const improvements = generateImprovements(
    contentScore,
    formattingScore,
    atsScore,
    impactScore,
    completenessScore,
    normalizedText,
    text,
  );
  const oneLiner = generateOneLiner(
    overallScore,
    strengths.length,
    improvements.length,
  );

  return {
    overallScore,
    grade,
    categoryScores: {
      content: contentScore,
      formatting: formattingScore,
      ats: atsScore,
      impact: impactScore,
      completeness: completenessScore,
    },
    strengths,
    improvements,
    oneLiner,
  };
}

function calculateContentScore(
  normalizedText: string,
  _words: string[],
  wordCount: number,
): number {
  let score = 50; // Base score

  // Check for action verbs
  const actionVerbs = [
    "achieved",
    "accomplished",
    "managed",
    "led",
    "developed",
    "created",
    "implemented",
    "designed",
    "built",
    "launched",
    "increased",
    "improved",
    "reduced",
    "saved",
    "generated",
    "delivered",
    "spearheaded",
    "initiated",
    "transformed",
    "streamlined",
    "optimized",
    "automated",
    "coordinated",
    "executed",
    "facilitated",
    "negotiated",
    "resolved",
    "supervised",
    "trained",
    "mentored",
    "collaborated",
    "analyzed",
    "researched",
  ];
  const actionVerbCount = actionVerbs.reduce((count, verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, "g");
    const matches = normalizedText.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);

  if (actionVerbCount >= 8) score += 15;
  else if (actionVerbCount >= 4) score += 10;
  else if (actionVerbCount >= 2) score += 5;

  // Check for bullet points (indicated by common bullet markers or sentence structure)
  const bulletPatterns = [/^\s*[•\-*]/m, /^\s*\d+\./m, /^\s*o\s/m];
  const hasBulletPoints = bulletPatterns.some((pattern) =>
    pattern.test(normalizedText),
  );
  if (hasBulletPoints) score += 10;

  // Check for section headers
  const sections = [
    "experience",
    "education",
    "skills",
    "summary",
    "objective",
    "projects",
  ];
  const sectionCount = sections.reduce((count, section) => {
    const regex = new RegExp(`\\b${section}\\b`, "i");
    return count + (regex.test(normalizedText) ? 1 : 0);
  }, 0);

  if (sectionCount >= 5) score += 10;
  else if (sectionCount >= 3) score += 5;

  // Check for first-person pronouns (negative)
  const pronouns = /\b(i|me|my|mine|we|us|our)\b/i;
  if (pronouns.test(normalizedText)) score -= 10;

  // Word count appropriateness
  if (wordCount >= 300 && wordCount <= 800) score += 15;
  else if (wordCount >= 200 && wordCount <= 1000) score += 10;
  else if (wordCount < 150) score -= 10;

  return Math.max(0, Math.min(100, score));
}

function calculateFormattingScore(
  normalizedText: string,
  _lines: string[],
  wordCount: number,
): number {
  let score = 60; // Base score

  // Check for appropriate length (1-2 pages ideal)
  if (wordCount >= 300 && wordCount <= 700) score += 15;
  else if (wordCount > 700 && wordCount <= 900) score += 10;
  else if (wordCount > 900) score -= 5;
  else if (wordCount < 200) score -= 15;

  // Check for special characters that might cause parsing issues
  const specialChars = /[<>{}[\]|\\]/;
  if (!specialChars.test(normalizedText)) score += 10;
  else score -= 10;

  // Check for consistent structure (headers detected)
  const headerPattern =
    /\b(education|experience|skills|projects|certifications|summary)\b/i;
  const hasHeaders = headerPattern.test(normalizedText);
  if (hasHeaders) score += 10;

  // Check for tables (common formatting issue) - rough heuristic
  const tableLikePatterns = /\|\s*\w+\s*\|/;
  if (tableLikePatterns.test(normalizedText)) score -= 10;

  // Check for images/heavy graphics (indicated by lack of text)
  if (wordCount < 100) score -= 20;

  return Math.max(0, Math.min(100, score));
}

function calculateATSScore(normalizedText: string, rawText: string): number {
  let score = 50; // Base score

  // Check for contact information
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;

  if (emailRegex.test(rawText)) score += 10;
  if (phoneRegex.test(rawText)) score += 10;

  // Check for common ATS-friendly formatting
  const hasStandardSections =
    /\b(experience|work|employment)\b/i.test(normalizedText) &&
    /\b(education)\b/i.test(normalizedText);

  if (hasStandardSections) score += 15;

  // Check for common keywords that ATS look for
  const commonKeywords = [
    "skills",
    "experience",
    "education",
    "certifications",
    "achievements",
    "responsibilities",
    "objective",
    "summary",
  ];
  const keywordCount = commonKeywords.reduce((count, keyword) => {
    return count + (normalizedText.includes(keyword) ? 1 : 0);
  }, 0);

  if (keywordCount >= 6) score += 10;
  else if (keywordCount >= 4) score += 5;

  // Check for headers/footers (often problematic)
  const hasHeaderFooter = /\b(page|of)\s*\d+/i.test(normalizedText);
  if (hasHeaderFooter) score -= 5;

  return Math.max(0, Math.min(100, score));
}

function calculateImpactScore(
  _normalizedText: string,
  rawText: string,
): number {
  let score = 40; // Base score

  // Check for quantified achievements (numbers, percentages, dollar amounts)
  const hasNumbers = /\d+%?/.test(rawText);
  const hasPercentages = /\d+%/.test(rawText);
  const hasDollarAmounts = /\$[\d,]+/.test(rawText);
  const hasMetrics =
    /\d+\s*(people|team|users|customers|clients|projects)/i.test(rawText);

  if (hasNumbers) score += 10;
  if (hasPercentages) score += 15;
  if (hasDollarAmounts) score += 15;
  if (hasMetrics) score += 10;

  // Check for result-oriented language
  const resultWords = [
    "increased",
    "decreased",
    "improved",
    "reduced",
    "saved",
    "generated",
    "grew",
    "boosted",
    "enhanced",
    "optimized",
    "achieved",
    "exceeded",
    "surpassed",
    "delivered",
  ];
  const resultCount = resultWords.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    const matches = rawText.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);

  if (resultCount >= 5) score += 15;
  else if (resultCount >= 3) score += 10;
  else if (resultCount >= 1) score += 5;

  // Check for time frames
  const timeFramePattern = /\d+\s*(year|month|week|day)s?/i;
  if (timeFramePattern.test(rawText)) score += 5;

  return Math.max(0, Math.min(100, score));
}

function calculateCompletenessScore(normalizedText: string): number {
  let score = 30; // Base score

  // Check for essential sections
  const essentialSections = {
    contact: /\b(email|phone|address|linkedin)\b/i,
    summary: /\b(summary|objective|profile|about)\b/i,
    experience: /\b(experience|work|employment|career)\b/i,
    education: /\b(education|degree|university|college|school)\b/i,
    skills: /\b(skills|technologies|competencies|expertise)\b/i,
  };

  let sectionsFound = 0;
  for (const [_, pattern] of Object.entries(essentialSections)) {
    if (pattern.test(normalizedText)) sectionsFound++;
  }

  score += sectionsFound * 12;

  // Bonus for additional sections
  const bonusSections = {
    certifications: /\b(certifications?|certificates?)\b/i,
    projects: /\b(projects?)\b/i,
    awards: /\b(awards?|honors?|achievements?)\b/i,
    languages: /\b(languages?)\b/i,
    volunteer: /\b(volunteer|community)\b/i,
  };

  let bonusFound = 0;
  for (const [_, pattern] of Object.entries(bonusSections)) {
    if (pattern.test(normalizedText)) bonusFound++;
  }

  score += bonusFound * 3;

  return Math.max(0, Math.min(100, score));
}

function calculateGrade(score: number): ResumeScoreResponse["grade"] {
  if (score >= 95) return "A+";
  if (score >= 87) return "A";
  if (score >= 80) return "B+";
  if (score >= 73) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  return "F";
}

function generateStrengths(
  content: number,
  formatting: number,
  ats: number,
  impact: number,
  completeness: number,
  _normalizedText: string,
  rawText: string,
): string[] {
  const strengths: string[] = [];

  if (content >= 75) {
    strengths.push("Strong use of action verbs throughout");
  }
  if (content >= 70) {
    strengths.push("Well-organized with clear section structure");
  }
  if (formatting >= 75) {
    strengths.push("Clean formatting that's ATS-friendly");
  }
  if (formatting >= 70) {
    strengths.push("Appropriate length for the content");
  }
  if (ats >= 75) {
    strengths.push("Good contact information visibility");
  }
  if (ats >= 70) {
    strengths.push("Contains standard section headers ATS can parse");
  }
  if (impact >= 75) {
    strengths.push("Excellent use of quantified achievements");
  }
  if (impact >= 65) {
    strengths.push("Strong results-oriented language");
  }
  if (completeness >= 75) {
    strengths.push("All key resume sections present");
  }
  if (completeness >= 65) {
    strengths.push("Good section variety");
  }

  // Check for specific content strengths
  const hasLinkedIn = /linkedin\.com/i.test(rawText);
  if (hasLinkedIn) strengths.push("LinkedIn profile included");

  const hasMetrics = /\d+%|\$[\d,]+/.test(rawText);
  if (hasMetrics) strengths.push("Uses specific metrics and numbers");

  // Return top 4 strengths
  return strengths.slice(0, 4);
}

function generateImprovements(
  content: number,
  formatting: number,
  ats: number,
  impact: number,
  completeness: number,
  normalizedText: string,
  rawText: string,
): string[] {
  const improvements: string[] = [];

  if (content < 70) {
    improvements.push("Add more action verbs to describe your experience");
  }
  if (content < 60) {
    improvements.push("Use bullet points for better readability");
  }
  if (formatting < 70) {
    improvements.push("Simplify formatting to improve ATS compatibility");
  }
  const wordCount = rawText.split(/\s+/).filter((w) => w.length > 0).length;
  if (wordCount < 250) {
    improvements.push(
      "Expand your resume with more details about your experience",
    );
  } else if (wordCount > 900) {
    improvements.push("Consider condensing your resume to 1-2 pages");
  }
  if (ats < 70) {
    improvements.push("Add clear contact information (email and phone)");
  }
  if (ats < 60) {
    improvements.push(
      "Use standard section headers like 'Experience' and 'Education'",
    );
  }
  if (impact < 65) {
    improvements.push(
      "Add quantified achievements (numbers, percentages, dollar amounts)",
    );
  }
  if (impact < 55) {
    improvements.push("Use more results-oriented language");
  }
  if (completeness < 65) {
    const missingSections = [];
    if (!/\b(summary|objective)\b/i.test(normalizedText))
      missingSections.push("summary");
    if (!/\b(skills)\b/i.test(normalizedText)) missingSections.push("skills");
    if (!/\b(education)\b/i.test(normalizedText))
      missingSections.push("education");
    if (!/\b(experience|work)\b/i.test(normalizedText))
      missingSections.push("experience");

    if (missingSections.length > 0) {
      improvements.push(
        `Consider adding missing sections: ${missingSections.join(", ")}`,
      );
    }
  }

  // Check for first-person pronouns
  const hasPronouns = /\b(i|me|my|mine|we|us|our)\b/i.test(rawText);
  if (hasPronouns) {
    improvements.push(
      "Remove first-person pronouns (I, me, my) for a more professional tone",
    );
  }

  // Return top 4 improvements
  return improvements.slice(0, 4);
}

function generateOneLiner(
  score: number,
  _strengthCount: number,
  _improvementCount: number,
): string {
  if (score >= 85) {
    return "Excellent resume! Minor tweaks can make it perfect.";
  }
  if (score >= 75) {
    return "Strong foundation with clear strengths and a few areas to enhance.";
  }
  if (score >= 65) {
    return "Good start with solid potential—focus on the suggested improvements.";
  }
  if (score >= 50) {
    return "Functional resume that needs refinement to stand out.";
  }
  return "Significant improvements needed to pass initial screenings.";
}
