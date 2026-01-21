# SEO & AI Search Visibility Assets

This directory contains assets for SEO and AI search engine optimization.

## Required Images

To complete the AI Search Visibility setup, add the following images to the `apps/web/public/` directory:

### 1. OpenGraph Image

**File:** `og-image.png`

- **Size:** 1200x630 pixels
- **Format:** PNG or JPG
- **Usage:** Homepage social sharing, AI search previews
- **Design Tips:**
  - Include "resumebuild.cv" branding
  - Show key benefit: "AI-Powered Resume Builder"
  - Use professional design with readable text
  - Optimize for mobile previews (safe zone: 1200x600)

### 2. Resume OG Image

**File:** `og-resume.png`

- **Size:** 1200x630 pixels
- **Format:** PNG or JPG
- **Usage:** Shared resume pages
- **Design Tips:**
  - Generic resume preview template
  - Include "Built with resumebuild.cv" branding
  - Professional, clean design

### 3. Logo

**File:** `logo.png`

- **Size:** 512x512 pixels minimum
- **Format:** PNG with transparency
- **Usage:** Schema.org Organization markup, AI attribution

### 4. PWA Icons

**Files:**

- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)
- **Format:** PNG
- **Usage:** Progressive Web App installation

### 5. Screenshot (Optional)

**File:** `screenshot.png`

- **Size:** 1280x720 pixels or higher
- **Format:** PNG or JPG
- **Usage:** SoftwareApplication schema

## Generating Images

### Option 1: Design Tools

- Use Figma, Canva, or Adobe Photoshop
- Follow brand guidelines
- Export at 2x resolution for retina displays

### Option 2: Dynamic OG Images (Advanced)

Consider using Next.js OG Image Generation:

- Create `apps/web/src/app/opengraph-image.tsx`
- Use `@vercel/og` for dynamic image generation
- Automatically generate images based on page content

### Option 3: Placeholder Generator

For quick testing, use online tools:

- [OG Image Playground](https://og-playground.vercel.app/)
- [Cloudinary](https://cloudinary.com/)
- [Bannerbear](https://www.bannerbear.com/)

## Verification

After adding images, verify they work correctly:

1. **Test OpenGraph Tags:**
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - Use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

2. **Test AI Crawlers:**
   - Check `https://resumebuild.cv/robots.txt`
   - Check `https://resumebuild.cv/sitemap.xml`
   - Verify `https://resumebuild.cv/ai.txt` loads
   - Verify `https://resumebuild.cv/llms.txt` loads

3. **Test Schema.org Markup:**
   - Use [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Use [Schema.org Validator](https://validator.schema.org/)

## Current Status

- ✅ robots.txt configured
- ✅ sitemap.xml configured
- ✅ ai.txt created
- ✅ llms.txt created
- ✅ Schema.org markup added
- ✅ OpenGraph metadata configured
- ⚠️ **Images needed** (placeholder references in place)

## Next Steps

1. Create and add the required images listed above
2. Update `apps/web/src/lib/seo-config.ts` if image URLs change
3. Test all social sharing and AI search functionality
4. Submit sitemap to Google Search Console
5. Monitor AI search visibility in analytics

## AI Search Engine Optimization

The following AI systems should now be able to discover and cite resumebuild.cv correctly:

- **ChatGPT Search** (GPTBot)
- **Perplexity** (PerplexityBot)
- **Claude** (anthropic-ai, Claude-Web)
- **Google AI Overviews** (Google-Extended)
- **Bing Copilot** (Bingbot)

Each system will:

1. Respect robots.txt crawl directives
2. Discover pages via sitemap.xml
3. Read ai.txt for citation preferences
4. Use llms.txt for content understanding
5. Extract Schema.org structured data
6. Display OpenGraph images in results
