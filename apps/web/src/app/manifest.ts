import type { MetadataRoute } from "next";

/**
 * PWA Manifest
 * Provides metadata for progressive web app installation
 */
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "resumebuild.cv - AI Resume Builder",
		short_name: "resumebuild.cv",
		description: "Create professional, ATS-optimized resumes with AI",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#6366f1",
		icons: [
			{
				src: "/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
