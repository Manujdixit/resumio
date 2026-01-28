import type { ATSIssue } from "./types";

export type RuleCategory = "contactInfo" | "formatting" | "content";

export interface ATSCheckRule {
  id: string;
  category: RuleCategory;
  severity: "critical" | "warning" | "info";
  check: (text: string, metadata?: unknown) => ATSIssue | null;
}

export const atsRules: ATSCheckRule[] = [
  // --- Contact Info Rules ---
  {
    id: "email-present",
    category: "contactInfo",
    severity: "critical",
    check: (text) => {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      if (!emailRegex.test(text)) {
        return {
          rule: "Email Missing",
          severity: "critical",
          message: "No email address found. ATS cannot contact you without it.",
          fix: "Add your professional email address to the header.",
        };
      }
      return null;
    },
  },
  {
    id: "phone-present",
    category: "contactInfo",
    severity: "critical",
    check: (text) => {
      // Basic phone regex (US/International)
      const phoneRegex = /(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
      if (!phoneRegex.test(text)) {
        return {
          rule: "Phone Number Missing",
          severity: "critical",
          message: "No phone number found.",
          fix: "Include a phone number so recruiters can call you.",
        };
      }
      return null;
    },
  },
  {
    id: "linkedin-present",
    category: "contactInfo",
    severity: "info",
    check: (text) => {
      if (!text.toLowerCase().includes("linkedin.com")) {
        return {
          rule: "LinkedIn Profile",
          severity: "info",
          message: "LinkedIn profile link not found.",
          fix: "Adding a LinkedIn URL helps recruiters verify your background.",
        };
      }
      return null;
    },
  },

  // --- Formatting Rules ---
  {
    id: "length-check",
    category: "formatting",
    severity: "warning",
    check: (text) => {
      const wordCount = text.split(/\s+/).length;
      if (wordCount < 200) {
        return {
          rule: "Too Short",
          severity: "warning",
          message: `Resume is too short (${wordCount} words).`,
          fix: "Aim for at least 300 words to include enough keywords.",
        };
      }
      if (wordCount > 1200) {
        return {
          rule: "Too Long",
          severity: "warning",
          message: `Resume is quite long (${wordCount} words).`,
          fix: "Try to condense to 1-2 pages (approx 400-800 words).",
        };
      }
      return null;
    },
  },
  {
    id: "pronouns-check",
    category: "formatting",
    severity: "warning",
    check: (text) => {
      // Simple check for first-person pronouns
      const pronouns = /\b(I|me|my|mine|we|us|our)\b/i;
      if (pronouns.test(text)) {
        return {
          rule: "First-Person Pronouns",
          severity: "warning",
          message: "First-person pronouns (I, Me, My) detected.",
          fix: "Use implied first-person (e.g., 'Managed team' instead of 'I managed team').",
        };
      }
      return null;
    },
  },

  // --- Content Rules ---
  {
    id: "summary-present",
    category: "content",
    severity: "warning",
    check: (text) => {
      const summaryKeywords = /summary|profile|objective|about me/i;
      if (!summaryKeywords.test(text)) {
        return {
          rule: "Summary Section",
          severity: "warning",
          message: "No Summary or Objective section detected.",
          fix: "Add a brief professional summary at the top.",
        };
      }
      return null;
    },
  },
  {
    id: "education-present",
    category: "content",
    severity: "critical",
    check: (text) => {
      if (!/education|university|college|degree|school/i.test(text)) {
        return {
          rule: "Education Section",
          severity: "critical",
          message: "Education section might be missing.",
          fix: "Ensure you have a section titled 'Education'.",
        };
      }
      return null;
    },
  },
  {
    id: "experience-present",
    category: "content",
    severity: "critical",
    check: (text) => {
      if (
        !/experience|employment|work history|professional history/i.test(text)
      ) {
        return {
          rule: "Experience Section",
          severity: "critical",
          message: "Work Experience section might be missing.",
          fix: "Ensure you have a section titled 'Experience' or 'Work History'.",
        };
      }
      return null;
    },
  },
  {
    id: "skills-present",
    category: "content",
    severity: "warning",
    check: (text) => {
      if (!/skills|competencies|technologies/i.test(text)) {
        return {
          rule: "Skills Section",
          severity: "warning",
          message: "Skills section might be missing.",
          fix: "Add a dedicated 'Skills' section for better ATS parsing.",
        };
      }
      return null;
    },
  },
  {
    id: "action-verbs",
    category: "content",
    severity: "info",
    check: (text) => {
      const strongVerbs = [
        "led",
        "managed",
        "developed",
        "created",
        "increased",
        "decreased",
        "improved",
        "launched",
        "achieved",
        "generated",
        "implemented",
      ];
      const lowerText = text.toLowerCase();
      const foundVerbs = strongVerbs.filter((v) => lowerText.includes(v));

      if (foundVerbs.length < 3) {
        return {
          rule: "Weak Action Verbs",
          severity: "info",
          message: "Few strong action verbs detected.",
          fix: "Use words like Led, Managed, Developed, Increased to start bullets.",
        };
      }
      return null;
    },
  },
  {
    id: "quantifiable-results",
    category: "content",
    severity: "info",
    check: (text) => {
      // Check for %, $, or numbers followed by keywords
      if (!/[0-9]%|\$[0-9]/.test(text)) {
        return {
          rule: "Quantifiable Results",
          severity: "info",
          message: "Few numbers (%, $) detected.",
          fix: "Add metrics to prove your impact (e.g., 'Increased sales by 20%').",
        };
      }
      return null;
    },
  },
  {
    id: "references-unnecessary",
    category: "content",
    severity: "info",
    check: (text) => {
      if (/references available upon request/i.test(text)) {
        return {
          rule: "References Phrase",
          severity: "info",
          message: "'References available upon request' is outdated.",
          fix: "Remove this phrase to save space. Recruiters will ask if needed.",
        };
      }
      return null;
    },
  },
];
