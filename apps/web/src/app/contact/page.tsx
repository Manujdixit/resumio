import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { FooterNew, NavbarNew } from "@/components/landing-v2";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateWebPageSchema, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
	title: "Contact Us | resumebuild.cv",
	description:
		"Get in touch with the resumebuild.cv team. We're here to help with any questions about our AI resume builder.",
	openGraph: {
		title: "Contact Us | resumebuild.cv",
		description:
			"Get in touch with the resumebuild.cv team. We're here to help with any questions about our AI resume builder.",
		url: `${siteConfig.url}/contact`,
		type: "website",
	},
	alternates: {
		canonical: `${siteConfig.url}/contact`,
	},
};

const contactPageSchema = generateWebPageSchema(
	"Contact Us",
	"Get in touch with the resumebuild.cv team. We're here to help with any questions about our AI resume builder.",
	`${siteConfig.url}/contact`,
);

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-background font-sans text-white">
			<JsonLd data={contactPageSchema} />
			{/* Grid Background Layer */}
			<div className="pointer-events-none fixed inset-0 z-0 bg-grid-pattern bg-grid-sm opacity-[0.03]" />

			<div className="relative z-10 flex flex-col">
				<NavbarNew />
				<main className="flex-grow py-20">
					<div className="mx-auto max-w-5xl px-6">
						<div className="mb-12 text-center">
							<h1 className="mb-4 font-bold text-4xl text-white">Contact Us</h1>
							<p className="text-xl text-zinc-400">
								Have a question or need support? We're here to help.
							</p>
						</div>

						<div className="grid gap-8 md:grid-cols-2">
							{/* Contact Information */}
							<div className="space-y-8">
								<Card className="border-zinc-800 bg-zinc-900/50">
									<CardHeader>
										<CardTitle className="text-white">Get in Touch</CardTitle>
										<CardDescription className="text-zinc-400">
											Choose the best way to reach us.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="flex items-start space-x-4">
											<Mail className="mt-1 h-5 w-5 text-indigo-400" />
											<div>
												<h3 className="font-medium text-white">
													Email Support
												</h3>
												<p className="mb-2 text-sm text-zinc-400">
													For general inquiries and support questions.
												</p>
												<a
													href="mailto:resumebuildcv@gmail.com"
													className="text-indigo-400 hover:text-indigo-300"
												>
													resumebuildcv@gmail.com
												</a>
											</div>
										</div>

										<div className="flex items-start space-x-4">
											<MapPin className="mt-1 h-5 w-5 text-indigo-400" />
											<div>
												<h3 className="font-medium text-white">Office</h3>
												<p className="text-sm text-zinc-400">
													San Francisco, CA
													<br />
													United States
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								<Card className="border-zinc-800 bg-zinc-900/50">
									<CardHeader>
										<CardTitle className="text-white">
											Frequently Asked Questions
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-4 text-sm text-zinc-400">
										<p>
											<strong>How quickly do you respond?</strong>
											<br />
											We aim to respond to all inquiries within 24 hours during
											business days.
										</p>
										<p>
											<strong>Need help with your resume?</strong>
											<br />
											Check out our blog for tips and tricks on creating the
											perfect resume.
										</p>
									</CardContent>
								</Card>
							</div>

							{/* Contact Form */}
							<Card className="border-zinc-800 bg-zinc-900/50">
								<CardHeader>
									<CardTitle className="text-white">
										Send us a Message
									</CardTitle>
									<CardDescription className="text-zinc-400">
										Fill out the form below and we'll get back to you as soon as
										possible.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form className="space-y-4">
										<div className="grid gap-2">
											<Label htmlFor="name" className="text-zinc-300">
												Name
											</Label>
											<Input
												id="name"
												placeholder="Your name"
												className="border-zinc-700 bg-zinc-950/50 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="email" className="text-zinc-300">
												Email
											</Label>
											<Input
												id="email"
												type="email"
												placeholder="your@email.com"
												className="border-zinc-700 bg-zinc-950/50 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="subject" className="text-zinc-300">
												Subject
											</Label>
											<Input
												id="subject"
												placeholder="How can we help?"
												className="border-zinc-700 bg-zinc-950/50 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="message" className="text-zinc-300">
												Message
											</Label>
											<Textarea
												id="message"
												placeholder="Tell us more about your inquiry..."
												className="min-h-[150px] border-zinc-700 bg-zinc-950/50 text-white placeholder:text-zinc-500 focus-visible:ring-indigo-500"
											/>
										</div>
										<Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
											Send Message
										</Button>
									</form>
								</CardContent>
							</Card>
						</div>
					</div>
				</main>
				<FooterNew />
			</div>
		</div>
	);
}
