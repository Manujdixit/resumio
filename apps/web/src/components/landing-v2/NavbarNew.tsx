"use client";
import Link from "next/link";
import type React from "react";

export const NavbarNew: React.FC = () => {
	return (
		<nav className="fixed top-0 right-0 left-0 z-50 border-gray-100 border-b bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				{/* Logo */}
				<Link href="/" className="group flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
						<div className="h-3 w-3 rounded-sm bg-white" />
					</div>
					<span className="font-semibold text-gray-900 text-lg transition-colors group-hover:text-gray-600">
						resumebuild.cv
					</span>
				</Link>

				{/* Navigation Links */}
				<div className="hidden items-center gap-8 md:flex">
					{["Product", "Features", "Pricing"].map((item) => (
						<Link
							key={item}
							href={`#${item.toLowerCase()}`}
							className="text-gray-600 text-sm transition-colors hover:text-gray-900"
						>
							{item}
						</Link>
					))}
				</div>

				{/* Actions */}
				<div className="flex items-center gap-4">
					<Link
						href="/login"
						className="hidden text-gray-600 text-sm transition-colors hover:text-gray-900 sm:block"
					>
						Log in
					</Link>
					<Link
						href="/signup"
						className="rounded-full bg-gray-900 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-gray-800"
					>
						Start creating
					</Link>
				</div>
			</div>
		</nav>
	);
};
