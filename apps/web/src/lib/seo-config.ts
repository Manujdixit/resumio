/**
 * SEO Configuration for resumebuild.cv
 * Centralized metadata and Schema.org definitions for AI Search Visibility
 */

import { ORG_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from "./seo/constants";
import { organizationRef, organizationSchema } from "./seo/schema/organization";

// Re-export organization schema for use in layout
export { organizationSchema };

export const siteConfig = {
  name: SITE_NAME,
  title: "resumebuild.cv - AI-Powered Resume Builder",
  description:
    "Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder. Chat with AI to generate your perfect resume.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.png`,
  links: {
    twitter: "https://twitter.com/resumebuildcv",
  },
  keywords: [
    "AI resume builder",
    "ATS-optimized resume",
    "professional resume templates",
    "resume maker",
    "CV builder",
    "job application",
    "career tools",
    "resume optimization",
    "applicant tracking system",
    "professional resume",
  ],
};

/**
 * WebSite Schema for site-wide search action
 * Enables AI systems to understand site structure
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description: siteConfig.description,
  publisher: { "@id": ORG_ID },
};

/**
 * Landing Page WebPage schema
 * Specific schema for the homepage
 */
export const landingPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI-Powered Resume Builder | resumebuild.cv",
  description: siteConfig.description,
  url: SITE_URL,
  publisher: organizationRef,
  inLanguage: "en-US",
};

/**
 * Generate WebPage schema for individual pages
 */
export function generateWebPageSchema(
  pageTitle: string,
  pageDescription: string,
  pageUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    publisher: organizationRef,
    inLanguage: "en-US",
  };
}
