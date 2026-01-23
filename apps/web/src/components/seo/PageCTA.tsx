import type { Route } from "next";
import Link from "next/link";

interface Props {
	heading: string;
	description: string;
	buttonText: string;
	buttonUrl: string;
}

export function PageCTA({
	heading,
	description,
	buttonText,
	buttonUrl,
}: Props) {
	return (
		<section className="rounded-xl bg-blue-50 p-8 text-center">
			<h2 className="mb-3 font-bold text-2xl text-gray-900">{heading}</h2>
			<p className="mb-6 text-gray-600">{description}</p>
			<Link
				href={buttonUrl as Route}
				className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
			>
				{buttonText}
			</Link>
		</section>
	);
}
