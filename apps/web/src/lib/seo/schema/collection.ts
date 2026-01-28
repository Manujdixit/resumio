import { organizationRef } from "./organization";

interface CollectionPageParams {
  name: string;
  description: string;
  url: string;
}

/**
 * Generate CollectionPage schema for blog hubs and categories
 */
export function createCollectionSchema(params: CollectionPageParams) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: params.url,
    publisher: organizationRef,
  };
}
