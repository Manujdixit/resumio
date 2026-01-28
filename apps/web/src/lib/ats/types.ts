export interface ATSCheckRequest {
  resumeText: string;
  jobDescription?: string;
  requestDetailedAnalysis?: boolean;
}

export interface ATSIssue {
  rule: string;
  severity: "critical" | "warning" | "info";
  message: string;
  fix?: string;
}

export interface ATSCategoryResult {
  score: number;
  issues: ATSIssue[];
}

export interface ATSKeywordMatch {
  score: number;
  matched: string[];
  missing: string[];
}

export interface ATSCheckResponse {
  score: number;
  grade: "A+" | "A" | "B" | "C" | "D" | "F";
  summary: string;

  categories: {
    contactInfo: ATSCategoryResult;
    formatting: ATSCategoryResult;
    content: ATSCategoryResult;
    keywords?: ATSKeywordMatch;
  };

  detailedAnalysis?: {
    suggestions: string[];
    rewrittenBullets?: string[];
    industryTips?: string[];
  };
}

export interface ResumeData {
  text: string;
  wordCount: number;
  email?: string;
  phone?: string;
  linkedin?: string;
  links: string[];
}
