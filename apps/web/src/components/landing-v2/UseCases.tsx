"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { useRef } from "react";

const useCases = [
	{
		title: "Tech & Engineering",
		description:
			"Highlight technical skills and project achievements for software, data, and engineering roles.",
		color: "bg-blue-100",
	},
	{
		title: "Business & Finance",
		description:
			"Showcase financial acumen and business impact for consulting, banking, and management roles.",
		color: "bg-green-100",
	},
	{
		title: "Creative & Design",
		description:
			"Present your portfolio and creative process for design, marketing, and content roles.",
		color: "bg-purple-100",
	},
	{
		title: "Healthcare",
		description:
			"Emphasize certifications and patient care experience for medical and healthcare positions.",
		color: "bg-red-100",
	},
	{
		title: "Students & Graduates",
		description:
			"Turn internships and coursework into compelling experience for entry-level positions.",
		color: "bg-amber-100",
	},
	{
		title: "Career Changers",
		description:
			"Translate transferable skills and experience for a successful industry transition.",
		color: "bg-cyan-100",
	},
];

export const UseCases: React.FC = () => {
	const scrollRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const scrollAmount = 300;
			scrollRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<section className="bg-white py-24">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-12 text-center">
					<h2 className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
						Resumes tailored for every industry
					</h2>
					<p className="mx-auto max-w-2xl text-gray-600">
						Whether you're in tech, healthcare, or making a career change, we've
						got you covered.
					</p>
				</div>

				<div className="relative">
					{/* Scroll Buttons */}
					<button
						onClick={() => scroll("left")}
						className="-translate-y-1/2 -translate-x-4 absolute top-1/2 left-0 z-10 flex hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 md:flex"
					>
						<ChevronLeft size={20} className="text-gray-600" />
					</button>
					<button
						onClick={() => scroll("right")}
						className="-translate-y-1/2 absolute top-1/2 right-0 z-10 flex hidden h-10 w-10 translate-x-4 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 md:flex"
					>
						<ChevronRight size={20} className="text-gray-600" />
					</button>

					{/* Cards Container */}
					<div
						ref={scrollRef}
						className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
						style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
					>
						{useCases.map((useCase, index) => (
							<div key={index} className="w-72 flex-shrink-0 snap-start">
								<div className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg">
									{/* Image placeholder */}
									<div
										className={`h-40 ${useCase.color} flex items-center justify-center`}
									>
										<div className="h-24 w-20 transform rounded-lg bg-white shadow-md transition-transform group-hover:scale-105">
											<div className="space-y-1.5 p-2">
												<div className="h-2 w-3/4 rounded bg-gray-200" />
												<div className="h-1.5 w-full rounded bg-gray-100" />
												<div className="h-1.5 w-5/6 rounded bg-gray-100" />
											</div>
										</div>
									</div>

									{/* Content */}
									<div className="p-5">
										<h3 className="mb-2 font-semibold text-gray-900">
											{useCase.title}
										</h3>
										<p className="text-gray-600 text-sm leading-relaxed">
											{useCase.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
