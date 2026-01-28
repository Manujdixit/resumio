import { atsRules } from "./ats-rules";
import type { ATSCheckResponse, ATSIssue, ATSKeywordMatch } from "./types";

export function analyzeResume(
  text: string,
  jobDescription?: string,
): ATSCheckResponse {
  // Initialize results
  const categories: ATSCheckResponse["categories"] = {
    contactInfo: { score: 0, issues: [] },
    formatting: { score: 0, issues: [] },
    content: { score: 0, issues: [] },
  };

  // Run all rules
  for (const rule of atsRules) {
    const issue = rule.check(text);
    if (issue) {
      categories[rule.category].issues.push(issue);
    }
  }

  // Calculate scores per category
  categories.contactInfo.score = calculateCategoryScore(
    categories.contactInfo.issues,
  );
  categories.formatting.score = calculateCategoryScore(
    categories.formatting.issues,
  );
  categories.content.score = calculateCategoryScore(categories.content.issues);

  // Keyword analysis if JD provided
  if (jobDescription) {
    categories.keywords = analyzeKeywords(text, jobDescription);
  }

  // Calculate total score (weighted)
  // Contact: 20%, Formatting: 30%, Content: 50% (or 40% if keywords exist)
  let totalScore = 0;
  if (categories.keywords) {
    totalScore =
      categories.contactInfo.score * 0.15 +
      categories.formatting.score * 0.25 +
      categories.content.score * 0.35 +
      categories.keywords.score * 0.25;
  } else {
    totalScore =
      categories.contactInfo.score * 0.2 +
      categories.formatting.score * 0.3 +
      categories.content.score * 0.5;
  }

  totalScore = Math.round(totalScore);

  return {
    score: totalScore,
    grade: calculateGrade(totalScore),
    summary: generateSummary(totalScore, categories.keywords?.score),
    categories,
  };
}

function calculateCategoryScore(issues: ATSIssue[]): number {
  let score = 100;
  for (const issue of issues) {
    switch (issue.severity) {
      case "critical":
        score -= 20;
        break;
      case "warning":
        score -= 10;
        break;
      case "info":
        score -= 5;
        break;
    }
  }
  return Math.max(0, score);
}

function calculateGrade(score: number): ATSCheckResponse["grade"] {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

function generateSummary(score: number, _keywordScore?: number): string {
  if (score >= 85) return "Excellent! Your resume is highly optimized for ATS.";
  if (score >= 70)
    return "Good job. A few tweaks will make your resume stand out.";
  if (score >= 50)
    return "Needs improvement. Fix critical issues to pass screening.";
  return "Action required. Your resume may be rejected by most ATS systems.";
}

function analyzeKeywords(resumeText: string, jobDesc: string): ATSKeywordMatch {
  // Simple keyword extraction (can be improved with NLP libraries later)
  // 1. Extract potential keywords from JD (capitalized words, known skills)
  // For now, simple split and filter

  const stopwords = new Set([
    "and",
    "the",
    "in",
    "of",
    "to",
    "a",
    "for",
    "with",
    "on",
    "is",
    "are",
    "was",
    "were",
    "an",
    "at",
    "by",
    "from",
  ]);
  const jdWords = jobDesc
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stopwords.has(w));

  // Get frequency map
  const jdFreq = new Map<string, number>();
  for (const w of jdWords) {
    jdFreq.set(w, (jdFreq.get(w) || 0) + 1);
  }

  // Sort by frequency to find top keywords
  const topKeywords = Array.from(jdFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15) // Top 15 keywords
    .map((e) => e[0]);

  const resumeLower = resumeText.toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];

  for (const keyword of topKeywords) {
    if (resumeLower.includes(keyword)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  }

  const score = Math.round((matched.length / topKeywords.length) * 100);

  return {
    score,
    matched,
    missing,
  };
}
