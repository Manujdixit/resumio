import type { Metadata } from "next";
import { FooterNew, NavbarNew } from "@/components/landing-v2";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateWebPageSchema, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
	title: "Terms of Service | resumebuild.cv",
	description:
		"Read the Terms of Service for resumebuild.cv. Understand the rules and regulations for using our AI resume builder.",
	openGraph: {
		title: "Terms of Service | resumebuild.cv",
		description:
			"Read the Terms of Service for resumebuild.cv. Understand the rules and regulations for using our AI resume builder.",
		url: `${siteConfig.url}/terms`,
		type: "website",
	},
	alternates: {
		canonical: `${siteConfig.url}/terms`,
	},
};

const termsPageSchema = generateWebPageSchema(
	"Terms of Service",
	"Read the Terms of Service for resumebuild.cv. Understand the rules and regulations for using our AI resume builder.",
	`${siteConfig.url}/terms`,
);

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-background font-sans text-white">
			<JsonLd data={termsPageSchema} />
			{/* Grid Background Layer */}
			<div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern bg-grid-sm opacity-[0.03]" />

			<div className="relative z-10 flex flex-col">
				<NavbarNew />
				<main className="flex-grow py-20">
					<div className="mx-auto max-w-3xl px-6">
						<h1 className="mb-8 font-bold text-4xl">Terms of Service</h1>
						<p className="mb-8 text-zinc-400">Last updated: January 25, 2026</p>

						<div className="space-y-8 text-zinc-300">
							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									1. Acceptance of Terms
								</h2>
								<p className="leading-relaxed">
									By accessing and using resumebuild.cv (the "Service"), you
									agree to be bound by these Terms of Service. If you do not
									agree to these terms, please do not use the Service.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									2. Description of Service
								</h2>
								<p className="leading-relaxed">
									resumebuild.cv provides an AI-powered resume building platform
									that allows users to create, edit, and export professional
									resumes. We reserve the right to modify or discontinue the
									Service at any time without notice.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									3. User Accounts
								</h2>
								<p className="leading-relaxed">
									To access certain features, you may need to register for an
									account. You are responsible for maintaining the
									confidentiality of your account credentials and for all
									activities that occur under your account.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									4. User Content
								</h2>
								<p className="leading-relaxed">
									You retain all rights to the resumes and content you create
									using the Service. By using the Service, you grant us a
									license to host, store, and display your content solely as
									required to provide the Service to you. You are responsible
									for the accuracy and legality of your content.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									5. Prohibited Uses
								</h2>
								<p className="mb-4 leading-relaxed">
									You agree not to use the Service to:
								</p>
								<ul className="ml-4 list-inside list-disc space-y-2">
									<li>Violate any applicable laws or regulations</li>
									<li>Infringe upon the rights of others</li>
									<li>Distribute malware or malicious code</li>
									<li>Interfere with the proper operation of the Service</li>
									<li>
										Reverse engineer or attempt to extract the source code
									</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									6. Intellectual Property
								</h2>
								<p className="leading-relaxed">
									The Service and its original content (excluding user-generated
									content), features, and functionality are owned by
									resumebuild.cv and are protected by international copyright,
									trademark, and other intellectual property laws.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									7. Limitation of Liability
								</h2>
								<p className="leading-relaxed">
									In no event shall resumebuild.cv be liable for any indirect,
									incidental, special, consequential, or punitive damages
									arising out of or relating to your use of the Service.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									8. Contact Information
								</h2>
								<p className="leading-relaxed">
									If you have any questions about these Terms, please contact us
									at{" "}
									<a
										href="mailto:resumebuildcv@gmail.com"
										className="text-indigo-400 underline hover:text-indigo-300"
									>
										resumebuildcv@gmail.com
									</a>
								</p>
							</section>
						</div>
					</div>
				</main>
				<FooterNew />
			</div>
		</div>
	);
}
