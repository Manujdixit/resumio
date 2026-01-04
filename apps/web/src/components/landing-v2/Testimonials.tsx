"use client";
import { User } from "lucide-react";
import Link from "next/link";
import type React from "react";

const testimonials = [
	{
		quote:
			"I was skeptical about AI resume tools, but this changed everything. Got 3 interviews in my first week after optimizing my resume.",
		name: "Sarah Johnson",
		role: "Marketing Manager",
		company: "Now at Google",
		image: null,
		bgGradient: "from-blue-400 to-purple-500",
	},
	{
		quote:
			"The keyword matching feature is incredible. My ATS scores went from 40% to 95% overnight. Landed my dream job within a month.",
		name: "Michael Chen",
		role: "Software Engineer",
		company: "Now at Stripe",
		image: null,
		bgGradient: "from-green-400 to-cyan-500",
	},
	{
		quote:
			"As a career changer, I struggled to present my experience. The AI helped me translate my skills perfectly for my new industry.",
		name: "Emily Rodriguez",
		role: "Product Designer",
		company: "Now at Figma",
		image: null,
		bgGradient: "from-orange-400 to-pink-500",
	},
];

export const Testimonials: React.FC = () => {
	return (
		<section className="bg-gray-50 py-24">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-16 text-center">
					<h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
						Loved by job seekers everywhere
					</h2>
					<p className="mx-auto max-w-2xl text-gray-600">
						See how professionals like you landed their dream jobs.
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
						>
							{/* Image Header */}
							<div
								className={`h-48 bg-gradient-to-br ${testimonial.bgGradient} relative`}
							>
								<div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-medium text-gray-700 text-xs backdrop-blur-sm">
									Success story
								</div>
								{/* Decorative elements */}
								<div className="absolute right-4 bottom-4 h-24 w-24 rotate-12 transform rounded-xl bg-white/20" />
								<div className="-rotate-6 absolute right-8 bottom-8 h-16 w-16 transform rounded-lg bg-white/30" />
							</div>

							{/* Content */}
							<div className="p-6">
								{/* Avatar */}
								<div className="-mt-12 mb-4">
									<div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gray-200">
										<User size={24} className="text-gray-400" />
									</div>
								</div>

								<blockquote className="mb-6 text-gray-700 leading-relaxed">
									"{testimonial.quote}"
								</blockquote>

								<div className="mb-4">
									<p className="font-semibold text-gray-900">
										{testimonial.name}
									</p>
									<p className="text-gray-500 text-sm">
										{testimonial.role} · {testimonial.company}
									</p>
								</div>

								<Link
									href="#"
									className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-gray-800"
								>
									Read story
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
