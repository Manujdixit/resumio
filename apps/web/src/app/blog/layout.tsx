import { BlogFooter } from "@/components/blog/BlogFooter";
import { BlogHeader } from "@/components/blog/BlogHeader";

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<BlogHeader />
			<main className="flex-1">{children}</main>
			<BlogFooter />
		</div>
	);
}
