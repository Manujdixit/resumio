import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";

const manrope = Manrope({
	variable: "--font-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "resumebuild.cv",
	description: "AI-powered resume builder",
	verification: {
		google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${manrope.variable} font-sans antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
