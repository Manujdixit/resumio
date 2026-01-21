import type { Metadata } from "next";
import { FooterNew, NavbarNew } from "@/components/landing-v2";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateWebPageSchema, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
	title: "Privacy Policy | resumebuild.cv",
	description:
		"Learn how resumebuild.cv collects, uses, and protects your personal information.",
	openGraph: {
		title: "Privacy Policy | resumebuild.cv",
		description:
			"Learn how resumebuild.cv collects, uses, and protects your personal information.",
		url: `${siteConfig.url}/privacy`,
		type: "website",
	},
	alternates: {
		canonical: `${siteConfig.url}/privacy`,
	},
};

const privacyPageSchema = generateWebPageSchema(
	"Privacy Policy",
	"Learn how resumebuild.cv collects, uses, and protects your personal information.",
	`${siteConfig.url}/privacy`,
);

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen bg-background font-sans text-white">
			<JsonLd data={privacyPageSchema} />
			{/* Grid Background Layer */}
			<div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern bg-grid-sm opacity-[0.03]" />

			<div className="relative z-10 flex flex-col">
				<NavbarNew />
				<main className="flex-grow py-20">
					<div className="mx-auto max-w-3xl px-6">
						<h1 className="mb-8 font-bold text-4xl">Privacy Policy</h1>
						<p className="mb-8 text-zinc-400">Last updated: January 4, 2025</p>

						<div className="space-y-8 text-zinc-300">
							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									1. Introduction
								</h2>
								<p className="leading-relaxed">
									Welcome to resumebuild.cv ("we," "our," or "us"). We are
									committed to protecting your personal information and your
									right to privacy. This Privacy Policy explains how we collect,
									use, disclose, and safeguard your information when you use our
									resume building service.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									2. Information We Collect
								</h2>
								<p className="mb-4 leading-relaxed">
									We collect information that you provide directly to us,
									including:
								</p>
								<ul className="ml-4 list-inside list-disc space-y-2">
									<li>Account information (name, email address, password)</li>
									<li>
										Profile information (professional history, education,
										skills)
									</li>
									<li>Resume content and documents you create or upload</li>
									<li>
										Payment information (processed securely through our payment
										provider)
									</li>
									<li>Communications with us (support requests, feedback)</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									3. How We Use Your Information
								</h2>
								<p className="mb-4 leading-relaxed">
									We use the information we collect to:
								</p>
								<ul className="ml-4 list-inside list-disc space-y-2">
									<li>Provide, maintain, and improve our services</li>
									<li>
										Generate and optimize your resumes using AI technology
									</li>
									<li>Process transactions and send related information</li>
									<li>
										Send you technical notices, updates, and support messages
									</li>
									<li>Respond to your comments, questions, and requests</li>
									<li>Monitor and analyze trends, usage, and activities</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									4. Information Sharing
								</h2>
								<p className="leading-relaxed">
									We do not sell, trade, or rent your personal information to
									third parties. We may share your information only in the
									following circumstances:
								</p>
								<ul className="mt-4 ml-4 list-inside list-disc space-y-2">
									<li>With service providers who assist in our operations</li>
									<li>To comply with legal obligations</li>
									<li>To protect our rights and prevent fraud</li>
									<li>With your consent or at your direction</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									5. Data Security
								</h2>
								<p className="leading-relaxed">
									We implement appropriate technical and organizational security
									measures to protect your personal information against
									unauthorized access, alteration, disclosure, or destruction.
									This includes encryption, secure servers, and regular security
									assessments.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									6. Your Rights
								</h2>
								<p className="mb-4 leading-relaxed">You have the right to:</p>
								<ul className="ml-4 list-inside list-disc space-y-2">
									<li>Access, update, or delete your personal information</li>
									<li>Object to processing of your personal information</li>
									<li>Request portability of your personal information</li>
									<li>Withdraw consent at any time</li>
									<li>Lodge a complaint with a supervisory authority</li>
								</ul>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									7. Cookies and Tracking
								</h2>
								<p className="leading-relaxed">
									We use cookies and similar tracking technologies to track
									activity on our service and hold certain information. You can
									instruct your browser to refuse all cookies or to indicate
									when a cookie is being sent.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									8. Third-Party Services
								</h2>
								<p className="leading-relaxed">
									Our service may contain links to third-party websites or
									services. We are not responsible for the privacy practices of
									these third parties. We encourage you to read their privacy
									policies.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									9. Children's Privacy
								</h2>
								<p className="leading-relaxed">
									Our service is not intended for individuals under the age of
									16. We do not knowingly collect personal information from
									children under 16.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									10. Changes to This Policy
								</h2>
								<p className="leading-relaxed">
									We may update this Privacy Policy from time to time. We will
									notify you of any changes by posting the new Privacy Policy on
									this page and updating the "Last updated" date.
								</p>
							</section>

							<section>
								<h2 className="mb-4 font-semibold text-2xl text-white">
									11. Contact Us
								</h2>
								<p className="leading-relaxed">
									If you have any questions about this Privacy Policy, please
									contact us at{" "}
									<a
										href="mailto:privacy@resumebuild.cv"
										className="text-indigo-400 underline hover:text-indigo-300"
									>
										privacy@resumebuild.cv
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
