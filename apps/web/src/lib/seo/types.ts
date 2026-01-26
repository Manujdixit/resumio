/**
 * Core SEO type definitions
 */

export type PageType =
  | "hub"
  | "spoke"
  | "template"
  | "example"
  | "guide"
  | "industry"
  | "job-title"
  | "location";

export type ContentCategory =
  | "resume-templates"
  | "resume-examples"
  | "career-guides"
  | "industries"
  | "job-titles"
  | "locations";

export type SearchIntent =
  | "informational"
  | "transactional"
  | "navigational"
  | "commercial";

export interface SEOPageData {
  slug: string;
  type: PageType;
  category: ContentCategory;
  path: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: SearchIntent;
  priority: number;
  parentSlug?: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedPage {
  title: string;
  path: string;
  relationship: "parent" | "child" | "sibling" | "related";
}
