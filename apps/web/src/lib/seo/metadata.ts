/**
 * Generate page title with consistent format
 */
export function generateTitle(primary: string, suffix?: string): string {
  const base = suffix ? `${primary} | ${suffix}` : primary;
  return base.length > 60 ? `${base.slice(0, 57)}...` : base;
}

/**
 * Generate meta description within character limits
 */
export function generateDescription(text: string, maxLength = 160): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3).replace(/\s+\S*$/, "")}...`;
}

/**
 * Generate canonical URL
 */
export function generateCanonical(path: string, baseUrl: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
