/**
 * SEO Configuration for resumebuild.cv
 * Centralized metadata and Schema.org definitions for AI Search Visibility
 */

export const siteConfig = {
  name: "resumebuild.cv",
  title: "resumebuild.cv - AI-Powered Resume Builder",
  description:
    "Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder. Chat with AI to generate your perfect resume.",
  url: "https://resumebuild.cv",
  ogImage: "https://resumebuild.cv/og-image.png",
  links: {
    twitter: "https://twitter.com/resumebuildcv",
    github: "https://github.com/resumio/resumio",
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
 * Organization Schema for brand identity
 * Used by AI search engines to understand business context
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "resumebuild.cv",
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  sameAs: [siteConfig.links.twitter],
  contactPoint: {
    "@type": "ContactPoint",
    email: "privacy@resumebuild.cv",
    contactType: "Customer Support",
    availableLanguage: ["English"],
  },
};

/**
 * WebSite Schema for site-wide search action
 * Enables AI systems to understand site structure
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
  },
};

/**
 * SoftwareApplication Schema for the resume builder product
 * Helps AI categorize the service correctly
 */
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "resumebuild.cv Resume Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free plan available with premium options",
  },
  description: siteConfig.description,
  url: siteConfig.url,
  screenshot: `${siteConfig.url}/screenshot.png`,
  // Note: aggregateRating removed until real review data is available
  // Adding fake ratings violates Schema.org guidelines and may result in penalties
  featureList: [
    "AI-powered resume generation",
    "ATS optimization",
    "Multiple professional templates",
    "Real-time preview",
    "PDF export",
    "LinkedIn import",
    "Cover letter generation",
  ],
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
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "en-US",
  };
}

/**
 * Generate Article schema for shared resumes
 */
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}
