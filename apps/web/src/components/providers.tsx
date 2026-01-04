"use client";

import { PostHogProvider } from "./posthog";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<PostHogProvider>
				<QueryProvider>
					{children}
					<Toaster richColors />
				</QueryProvider>
			</PostHogProvider>
		</ThemeProvider>
	);
}
