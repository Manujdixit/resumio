import { db, schema } from "@resumio/db";
import { eq } from "drizzle-orm";
import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { createArticleSchema } from "@/lib/seo/schema/article";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createFAQSchema } from "@/lib/seo/schema/faq";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

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

  return (
    <>
      <JsonLd data={schemas} />
      <div className="container mx-auto py-12">
        <div className="mb-12 space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            {post.category && (
              <Link href={`/blog/category/${post.category.slug}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {post.category.name}
                </Badge>
              </Link>
            )}
            <span className="text-muted-foreground text-sm">
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="font-extrabold text-4xl tracking-tight lg:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-center text-muted-foreground text-sm">
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        <Separator className="my-8" />

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            components={{
              // Suppress H1s in content since the layout handles the main title
              h1: () => null,
            }}
          />
        </article>

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
