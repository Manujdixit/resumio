# SEO Audit & Marketing Recommendations for resumebuild.cv

Based on the Google Search Console data and a review of technical SEO elements + marketing skills, here is an assessment of why organic performance is struggling and actionable strategies to fix it.

## 1. Google Search Console Findings

- **High Impressions, Zero Clicks:** The vast majority of traffic potential is locked behind pages ranking on pages 6-10 (Positions 50-90+).
    - Queries like `sales representative resume`, `accountant resume`, `mechanical engineer resume` yield hundreds of impressions but position at 60-80.
- **Tools are Underperforming:** `tools/resume-scorer` and `tools/ats-checker` are your top clicked pages, but their average position is ~75. They represent your highest intent, lowest friction entry points.
- **Canonicalization Issue:** GSC shows impressions split between `https://resumebuild.cv/...` and `https://www.resumebuild.cv/...`. This splits domain authority. You need a strict 301 redirect from one to the other (typically non-www to www or vice versa) in your Next.js config or middleware.

---

## 2. Technical SEO Review

- **Sitemap & Robots.txt:** Your [sitemap.ts](file:///home/sierra/Documents/resumio-final/resumio/apps/web/src/app/sitemap.ts) and [robots.ts](file:///home/sierra/Documents/resumio-final/resumio/apps/web/src/app/robots.ts) are well-configured for AI bots and traditional search engines. 
- **Missing www/non-www Redirect:** The [next.config.ts](file:///home/sierra/Documents/resumio-final/resumio/apps/web/next.config.ts) does not contain any forced redirects for www/non-www. This is causing duplicate content issues in Google's eyes, diluting your ranking power.

---

## 3. Recommended Marketing Skills & Strategies

To jumpstart your SEO and overall growth, we should deploy the following strategies from our **Marketing Ideas** playbook:

### A. Programmatic SEO (Top Priority)
*(Marketing Idea #4: Programmatic SEO)*
You are already attempting to rank for `[Job Title] resume` (e.g., `mechanical engineer resume`). We should build a robust Programmatic SEO engine that generates hundreds of highly-optimized, localized, or industry-specific resume example pages. 
- **Action:** Refine the Next.js dynamic routes (`/resume-examples/[slug]`) to include deep, unique content, AI-generated tips, and keyword-rich templates rather than thin/duplicate content.

### B. Engineering As Marketing / Free Tools
*(Marketing Ideas #14-22: Engineering as Marketing)*
Your `/tools/ats-checker` and `/tools/resume-scorer` are getting impressions. We should lean into this heavily. Free tools naturally attract backlinks and high-intent traffic.
- **Action:** Improve the UX of these tools, add Schema markup (SoftwareApplication), and create dedicated landing pages detailing *how* the ATS scoring works to capture long-tail queries like `how to check if my resume is ats compliant`.

### C. Content Clustering & Internal Linking
*(Marketing Idea #7: Internal Linking)*
Your blog posts (e.g., `ai-interview-anxiety-mental-wellness-2026`) are ranking relatively well (Positions 7-11). 
- **Action:** Create "Hub" pages that link out to these "Spoke" blog posts. Ensure your high-performing blog posts heavily internal link to your Template and Tool pages to pass down authority.

### D. Competitor Comparison Pages
*(Marketing Idea #11: Competitor Comparison Pages)*
- **Action:** Create `Resumebuild vs Zety`, `Resumebuild vs Novoresume` pages. High intent users search for these comparisons when ready to switch or buy.

---

## Next Steps

1. **Quick Fix:** Implement the www / non-www 301 redirect in [next.config.ts](file:///home/sierra/Documents/resumio-final/resumio/apps/web/next.config.ts) or `middleware.ts`.
2. **Growth Task:** Choose one marketing strategy above (e.g., upgrading the Free Tools or expanding the Programmatic SEO job pages) to tackle first.

Which area would you like to focus on fixing or building first?
