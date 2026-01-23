import type { RelatedPage } from "./types";

/**
 * Get related pages for internal linking
 */
export function getRelatedPages(
	currentSlug: string,
	allPages: RelatedPage[],
	limit = 6,
): RelatedPage[] {
	return allPages.filter((p) => p.path !== `/${currentSlug}`).slice(0, limit);
}

/**
 * Get sibling pages (same parent)
 */
export function getSiblingPages(
	parentSlug: string,
	allPages: RelatedPage[],
	currentSlug: string,
	limit = 4,
): RelatedPage[] {
	return allPages
		.filter((p) => p.relationship === "sibling" && p.path !== `/${currentSlug}`)
		.slice(0, limit);
}
