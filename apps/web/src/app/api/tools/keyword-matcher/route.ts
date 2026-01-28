import { type NextRequest, NextResponse } from "next/server";

export interface KeywordMatcherRequest {
  resumeText: string;
  jobDescription: string;
}

export interface KeywordMatcherResponse {
  matchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  topSkills: string[];
}

// Common tech skills, technologies, and certifications for better extraction
const commonTechSkills = new Set([
  // Programming Languages
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "c#",
  "c++",
  "c",
  "go",
  "golang",
  "rust",
  "kotlin",
  "swift",
  "php",
  "ruby",
  "scala",
  "perl",
  "r",
  "matlab",
  "dart",
  "objectivec",
  "vba",
  "sql",
  "bash",
  "shell",
  "powershell",

  // Frontend
  "react",
  "vue",
  "vuejs",
  "angular",
  "svelte",
  "nextjs",
  "next",
  "nuxt",
  "html",
  "css",
  "sass",
  "scss",
  "less",
  "tailwind",
  "bootstrap",
  "materialui",
  "mui",
  "webpack",
  "vite",
  "rollup",
  "parcel",
  "babel",

  // Backend
  "nodejs",
  "node",
  "express",
  "fastify",
  "nest",
  "nestjs",
  "django",
  "flask",
  "spring",
  "springboot",
  "rails",
  "rubyonrails",
  "laravel",
  "symfony",
  "aspnet",
  "dotnet",
  "graphql",
  "rest",
  "restapi",
  "soap",
  "grpc",

  // Databases
  "mongodb",
  "postgresql",
  "postgres",
  "mysql",
  "mariadb",
  "sqlite",
  "redis",
  "elasticsearch",
  "cassandra",
  "dynamodb",
  "firebase",
  "supabase",
  "prisma",
  "sequelize",
  "typeorm",
  "mongoose",
  "hibernate",

  // Cloud & DevOps
  "aws",
  "azure",
  "gcp",
  "googlecloud",
  "docker",
  "kubernetes",
  "k8s",
  "terraform",
  "ansible",
  "jenkins",
  "githubactions",
  "gitlabci",
  "circleci",
  "travisci",
  "prometheus",
  "grafana",
  "datadog",
  "newrelic",
  "elk",
  "serverless",
  "lambda",
  "ec2",
  "s3",

  // Mobile
  "reactnative",
  "flutter",
  "ionic",
  "cordova",
  "android",
  "ios",
  "xamarin",

  // AI/ML
  "tensorflow",
  "pytorch",
  "keras",
  "scikit",
  "sklearn",
  "pandas",
  "numpy",
  "opencv",
  "nlp",
  "machinelearning",
  "deeplearning",
  "ai",
  "artificialintelligence",
  "data science",
  "datascience",

  // Testing
  "jest",
  "cypress",
  "playwright",
  "selenium",
  "mocha",
  "chai",
  "jasmine",
  "karma",
  "unittest",
  "integrationtest",
  "e2e",

  // Tools & Platforms
  "git",
  "github",
  "gitlab",
  "bitbucket",
  "jira",
  "confluence",
  "trello",
  "asana",
  "slack",
  "notion",
  "figma",
  "sketch",
  "adobe",
  "photoshop",
  "illustrator",
  "postman",
  "insomnia",
  "swagger",

  // Methodologies
  "agile",
  "scrum",
  "kanban",
  "lean",
  "waterfall",
  "tdd",
  "bdd",
  "ci/cd",
  "cicd",
  "devops",
  "microservices",
  "monolith",
  "serverless",
  "eventdriven",

  // Soft Skills (for completeness)
  "leadership",
  "communication",
  "teamwork",
  "collaboration",
  "problem solving",
  "critical thinking",
  "time management",
  "project management",
  "mentoring",
  "presentation",
]);

// Common certifications
const commonCertifications = new Set([
  "aws certified",
  "azure certified",
  "google certified",
  "ccna",
  "ccnp",
  "pmp",
  "scrum master",
  "cissp",
  "ceh",
  "comptia",
  "itil",
  "six sigma",
  "lean six sigma",
  "csm",
  "psm",
]);

// Action verbs often used in job descriptions
const actionVerbs = new Set([
  "manage",
  "lead",
  "develop",
  "design",
  "implement",
  "build",
  "create",
  "analyze",
  "optimize",
  "improve",
  "maintain",
  "support",
  "troubleshoot",
  "debug",
  "test",
  "deploy",
  "configure",
  "integrate",
  "automate",
  "monitor",
  "document",
  "collaborate",
  "coordinate",
  "facilitate",
  "mentor",
  "train",
  "present",
  "negotiate",
  "strategize",
  "architect",
  "refactor",
  "scale",
]);

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
  "as",
  "it",
  "this",
  "that",
  "be",
  "been",
  "have",
  "has",
  "had",
  "will",
  "shall",
  "would",
  "should",
  "could",
  "may",
  "might",
  "can",
  "must",
  "do",
  "does",
  "did",
  "we",
  "you",
  "they",
  "he",
  "she",
  "i",
  "me",
  "us",
  "them",
  "his",
  "her",
  "its",
  "our",
  "your",
  "their",
  "who",
  "what",
  "where",
  "when",
  "why",
  "how",
  "all",
  "each",
  "every",
  "both",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "just",
  "also",
  "or",
  "but",
  "if",
  "then",
  "else",
  "because",
  "until",
  "while",
  "during",
  "before",
  "after",
  "above",
  "below",
  "up",
  "down",
  "out",
  "off",
  "over",
  "under",
  "again",
  "further",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "than",
  "too",
  "very",
]);

function extractKeywords(text: string): string[] {
  const normalizedText = text.toLowerCase();
  const keywords: string[] = [];
  const seen = new Set<string>();

  // 1. Extract known tech skills (prioritize these)
  for (const skill of commonTechSkills) {
    if (
      normalizedText.includes(skill) &&
      !seen.has(skill) &&
      skill.length > 1
    ) {
      keywords.push(skill);
      seen.add(skill);
    }
  }

  // 2. Extract certifications
  for (const cert of commonCertifications) {
    if (normalizedText.includes(cert) && !seen.has(cert)) {
      keywords.push(cert);
      seen.add(cert);
    }
  }

  // 3. Extract action verbs
  for (const verb of actionVerbs) {
    if (normalizedText.includes(verb) && !seen.has(verb)) {
      keywords.push(verb);
      seen.add(verb);
    }
  }

  // 4. Extract capitalized/multi-word phrases (potential proper nouns/technologies)
  const wordPattern = /\b[a-z][a-z0-9]*(?:\s+[a-z][a-z0-9]*){0,2}\b/g;
  const matches = normalizedText.match(wordPattern) || [];

  const wordFreq = new Map<string, number>();
  for (const word of matches) {
    if (
      word.length > 3 &&
      !stopwords.has(word) &&
      !/^\d+$/.test(word) &&
      !seen.has(word)
    ) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  }

  // Add high-frequency words as potential keywords
  const sortedWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  for (const [word, count] of sortedWords) {
    if (count >= 2 && !seen.has(word)) {
      keywords.push(word);
      seen.add(word);
    }
  }

  return keywords;
}

function generateSuggestions(
  matchPercentage: number,
  matchedCount: number,
  missingCount: number,
  topSkills: string[],
): string[] {
  const suggestions: string[] = [];

  if (matchPercentage < 50) {
    suggestions.push(
      "Your resume has significant gaps. Consider adding more relevant skills and experiences.",
    );
  } else if (matchPercentage < 75) {
    suggestions.push(
      "Good start! Adding a few more keywords from the job description could significantly improve your match.",
    );
  } else {
    suggestions.push(
      "Great job! Your resume aligns well with the job requirements.",
    );
  }

  if (missingCount > 0) {
    suggestions.push(
      `You are missing ${missingCount} key terms from the job description. Add these to improve your ATS score.`,
    );
  }

  if (matchedCount < 5) {
    suggestions.push(
      "Try to include more relevant skills and technologies in your resume.",
    );
  }

  if (topSkills.includes("leadership") || topSkills.includes("management")) {
    suggestions.push(
      "This role emphasizes leadership. Highlight your team management or project leadership experiences.",
    );
  }

  if (
    topSkills.some((s) =>
      ["javascript", "python", "java", "react", "aws"].includes(s),
    )
  ) {
    suggestions.push(
      "Technical skills are key for this role. Consider creating a dedicated 'Technical Skills' section.",
    );
  }

  suggestions.push(
    "Tailor your resume for each job application by incorporating relevant keywords from the job description.",
  );

  return suggestions.slice(0, 5);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as KeywordMatcherRequest;
    const { resumeText, jobDescription } = body;

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Both resume text and job description are required" },
        { status: 400 },
      );
    }

    if (resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short. Please provide more content." },
        { status: 400 },
      );
    }

    if (jobDescription.trim().length < 50) {
      return NextResponse.json(
        {
          error: "Job description is too short. Please provide more content.",
        },
        { status: 400 },
      );
    }

    // Extract keywords from job description
    const jdKeywords = extractKeywords(jobDescription);

    // Normalize resume text for matching
    const resumeLower = resumeText.toLowerCase();

    // Find matched and missing keywords
    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    for (const keyword of jdKeywords) {
      // Check if keyword or its variations exist in resume
      const keywordParts = keyword.split(/\s+/);
      const isMatched =
        resumeLower.includes(keyword) ||
        keywordParts.every((part) => resumeLower.includes(part));

      if (isMatched) {
        matchedKeywords.push(keyword);
      } else {
        missingKeywords.push(keyword);
      }
    }

    // Calculate match percentage
    const totalKeywords = jdKeywords.length;
    const matchPercentage =
      totalKeywords > 0
        ? Math.round((matchedKeywords.length / totalKeywords) * 100)
        : 0;

    // Get top skills from job description (prioritize tech skills)
    const techSkillsInJD = jdKeywords.filter((k) => commonTechSkills.has(k));
    const otherKeywords = jdKeywords.filter((k) => !commonTechSkills.has(k));
    const topSkills = [...techSkillsInJD, ...otherKeywords].slice(0, 15);

    // Generate suggestions
    const suggestions = generateSuggestions(
      matchPercentage,
      matchedKeywords.length,
      missingKeywords.length,
      topSkills,
    );

    const result: KeywordMatcherResponse = {
      matchPercentage,
      matchedKeywords: matchedKeywords.slice(0, 20),
      missingKeywords: missingKeywords.slice(0, 20),
      suggestions,
      topSkills,
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Keyword Matcher Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
