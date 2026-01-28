import { ORG_ID, SITE_NAME, SITE_URL } from "../constants";

/**
 * Organization Schema - Single source of truth
 * Define once with @id, reference everywhere else
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder. Chat with AI to generate your perfect resume.",
  sameAs: ["https://twitter.com/resumebuildcv"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "resumebuildcv@gmail.com",
    contactType: "Customer Support",
    availableLanguage: ["English"],
  },
};

/**
 * Organization reference for embedding in other schemas
 * Use this instead of duplicating organization data
 */
export const organizationRef = { "@id": ORG_ID };
