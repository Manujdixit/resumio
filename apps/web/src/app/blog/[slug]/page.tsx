import { db, schema } from "@resumio/db";
import { eq } from "drizzle-orm";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MobileTOC } from "@/components/blog/MobileTOC";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createArticleSchema } from "@/lib/seo/schema/article";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";
import { createHowToSchema } from "@/lib/seo/schema/how-to";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// export const revalidate = 3600;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.query.blogPost.findFirst({
    where: eq(schema.blogPost.slug, slug),
    with: {
      category: true,
    },
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ["resumebuild.cv"],
      tags: [], // Add tags if available
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export async function generateStaticParams() {
  const posts = await db.query.blogPost.findMany({
    where: eq(schema.blogPost.status, "published"),
    columns: {
      slug: true,
    },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await db.query.blogPost.findFirst({
    where: eq(schema.blogPost.slug, slug),
    with: {
      category: true,
    },
  });

  if (!post || post.status !== "published") {
    notFound();
  }

  const schemas = [];

  // 1. Article Schema
  schemas.push(
    createArticleSchema({
      headline: post.title,
      description: post.excerpt || "",
      url: `https://www.resumebuild.cv/blog/${post.slug}`,
      datePublished: post.publishedAt?.toISOString() || "",
      dateModified: post.updatedAt?.toISOString() || "",
      image: post.featuredImage || undefined,
    }),
  );

  // 2. FAQ Schema
  if (post.faq && Array.isArray(post.faq) && post.faq.length > 0) {
    schemas.push(createFAQSchema(post.faq));
  }

  // 3. Breadcrumb Schema
  const breadcrumbs = [
    { name: "Home", url: "https://www.resumebuild.cv" },
    { name: "Blog", url: "https://www.resumebuild.cv/blog" },
  ];

  if (post.category) {
    breadcrumbs.push({
      name: post.category.name,
      url: `https://www.resumebuild.cv/blog/category/${post.category.slug}`,
    });
  }

  breadcrumbs.push({
    name: post.title,
    url: `https://www.resumebuild.cv/blog/${post.slug}`,
  });

  schemas.push(createBreadcrumbSchema(breadcrumbs));

  // 4. HowTo Schema (Dynamic Extraction)
  const isHowTo =
    post.title.toLowerCase().startsWith("how to") ||
    post.title.toLowerCase().startsWith("guide to") ||
    post.intent?.includes("how-to");

  if (isHowTo) {
    // Extract steps from H2s in content
    // Simple regex to find ## Heading
    const steps = [];
    const stepRegex = /^##\s+(.+)$/gm;
    let match: RegExpExecArray | null;
    // biome-ignore lint/suspicious/noAssignInExpressions: Regex exec loop pattern
    while ((match = stepRegex.exec(post.content)) !== null) {
      steps.push({
        name: match[1].trim(),
        text: match[1].trim(), // In a real parser we'd get the paragraph below
        url: `https://www.resumebuild.cv/blog/${post.slug}#${match[1]
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
      });
    }

    if (steps.length > 0) {
      schemas.push(
        createHowToSchema({
          name: post.title,
          description: post.excerpt || `Guide on ${post.title}`,
          image: post.featuredImage || undefined,
          url: `https://www.resumebuild.cv/blog/${post.slug}`,
          steps: steps,
        }),
      );
    }
  }

  return (
    <>
      <JsonLd data={schemas as any} />

      {/* Hero Header with Background Image */}
      <div
        className="relative w-full bg-center bg-cover bg-gray-900 bg-no-repeat"
        style={{
          backgroundImage: post.featuredImage
            ? `url(${post.featuredImage})`
            : undefined,
          minHeight: "400px",
        }}
      >
        {/* Dark backdrop overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="container relative mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            {post.category && (
              <Link href={`/blog/category/${post.category.slug}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {post.category.name}
                </Badge>
              </Link>
            )}
            <span className="text-sm text-white/80">
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="max-w-4xl font-extrabold text-4xl text-white tracking-tight lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center justify-center text-sm text-white/80">
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="relative grid grid-cols-1 gap-10 xl:grid-cols-[1fr_300px]">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              components={{
                MobileTOC,
                // Suppress H1s in content since the layout handles the main title
                h1: () => null,
                // Add IDs to H2s for TOC linking
                h2: ({ children }) => {
                  const id = children
                    ?.toString()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-");
                  return (
                    <h2 id={id} className="scroll-m-20">
                      {children}
                    </h2>
                  );
                },
              }}
            />
          </article>
          <div className="hidden xl:block">
            <TableOfContents content={post.content} />
          </div>
        </div>

        <Separator className="my-12" />

        <div className="flex justify-center">
          <Link href={"/builder" as Route}>
            <div className="max-w-2xl rounded-xl border bg-card p-8 text-center text-card-foreground shadow">
              <h3 className="mb-2 font-bold text-2xl">
                Ready to build your resume?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Use our AI-powered resume builder to create a professional
                resume in minutes.
              </p>
              <div className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground">
                Build My Resume Now
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
