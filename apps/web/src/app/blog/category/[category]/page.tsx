import { db, schema } from "@resumio/db";
import { desc, eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createCollectionSchema } from "@/lib/seo/schema/collection";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await db.query.blogCategory.findFirst({
    where: eq(schema.blogCategory.slug, slug),
  });

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | Blog`,
    description: category.description || `Articles about ${category.name}`,
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const categories = await db.query.blogCategory.findMany();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = await db.query.blogCategory.findFirst({
    where: eq(schema.blogCategory.slug, slug),
  });

  if (!category) {
    notFound();
  }

  const posts = await db.query.blogPost.findMany({
    where: (posts, { and, eq }) =>
      and(eq(posts.categoryId, category.id), eq(posts.status, "published")),
    orderBy: [desc(schema.blogPost.publishedAt)],
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://www.resumebuild.cv" },
    { name: "Blog", url: "https://www.resumebuild.cv/blog" },
    {
      name: category.name,
      url: `https://www.resumebuild.cv/blog/category/${category.slug}`,
    },
  ]);

  const collectionSchema = createCollectionSchema({
    name: `${category.name} - Blog`,
    description: category.description || `Articles about ${category.name}`,
    url: `https://www.resumebuild.cv/blog/category/${category.slug}`,
  });

  return (
    <div className="container py-12">
      <JsonLd data={[breadcrumbSchema, collectionSchema]} />
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-extrabold text-4xl tracking-tight lg:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            {category.description}
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No posts found in this category yet.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col space-y-3 rounded-lg border p-6 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <Badge variant="outline">{category.name}</Badge>
                <span className="text-muted-foreground text-xs">
                  {post.readingTime} min read
                </span>
              </div>
              <h3 className="font-bold text-xl leading-tight group-hover:underline">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="line-clamp-3 text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-auto pt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center font-medium text-primary text-sm hover:underline"
                >
                  Read more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
