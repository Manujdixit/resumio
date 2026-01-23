"use client";

import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/sign-in-form"), {
	ssr: false,
});

export default function LoginPage() {
	return <SignInForm />;
}
