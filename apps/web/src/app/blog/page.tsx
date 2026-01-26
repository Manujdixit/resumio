import { db, schema } from "@resumio/db";
import { desc, eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createBreadcrumbSchema } from "@/lib/seo/schema/breadcrumb";
import { createCollectionSchema } from "@/lib/seo/schema/collection";

export const metadata: Metadata = {
	title: "Career & Resume Blog | resumebuild.cv",
	description:
		"Expert advice on resume writing, job search strategies, and career development. Get the latest tips to land your dream job.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogHubPage() {
	// Fetch latest posts
	const latestPosts = await db.query.blogPost.findMany({
		where: eq(schema.blogPost.status, "published"),
		orderBy: [desc(schema.blogPost.publishedAt)],
		limit: 10,
		with: {
			category: true,
		},
	});

	// Separate featured post (first one)
	const featuredPost = latestPosts[0];
	const recentPosts = latestPosts.slice(1);

	// Generate Schemas
	const breadcrumbSchema = createBreadcrumbSchema([
		{ name: "Home", url: "https://www.resumebuild.cv" },
		{ name: "Blog", url: "https://www.resumebuild.cv/blog" },
	]);

	const collectionSchema = createCollectionSchema({
		name: "Career & Resume Blog",
		description:
			"Expert advice on resume writing, job search strategies, and career development.",
		url: "https://www.resumebuild.cv/blog",
	});

	return (
		<div className="container py-12">
			<JsonLd data={[breadcrumbSchema, collectionSchema]} />
			{/* Hero Section with Featured Post */}
			{featuredPost && (
				<section className="mb-16">
					<div className="grid items-center gap-8 md:grid-cols-2">
						<div className="space-y-4">
							{featuredPost.category && (
								<Badge variant="secondary" className="mb-2">
									{featuredPost.category.name}
								</Badge>
							)}
							<h1 className="font-extrabold text-4xl tracking-tight lg:text-5xl">
								<Link
									href={`/blog/${featuredPost.slug}`}
									className="hover:underline"
								>
									{featuredPost.title}
								</Link>
							</h1>
							<p className="text-muted-foreground text-xl">
								{featuredPost.excerpt}
							</p>
							<div className="flex items-center gap-4 pt-4">
								<Link href={`/blog/${featuredPost.slug}`}>
									<Button size="lg">
										Read Article <ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
								<span className="text-muted-foreground text-sm">
									{featuredPost.readingTime} min read
								</span>
							</div>
						</div>
						<div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
							{/* Placeholder for image - in real app, use next/image with post.featuredImage */}
							<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary/40">
								<span className="font-bold text-6xl">Blog</span>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Recent Posts Grid */}
			<section>
				<div className="mb-8 flex items-center justify-between">
					<h2 className="font-bold text-3xl tracking-tight">Recent Articles</h2>
				</div>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{recentPosts.map((post) => (
						<article
							key={post.id}
							className="group flex flex-col space-y-3 rounded-lg border p-6 transition-colors hover:bg-muted/50"
						>
							<div className="flex items-center justify-between">
								{post.category && (
									<Badge variant="outline">{post.category.name}</Badge>
								)}
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
			</section>
		</div>
	);
}
