import { organizationRef } from "./organization";

interface ArticleParams {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

/**
 * Generate Article schema
 */
export function createArticleSchema(params: ArticleParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    image: params.image,
    author: organizationRef,
    publisher: organizationRef,
  };
}
