"use client";

import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("@/components/sign-up-form"), {
	ssr: false,
});

export default function SignupPage() {
	return <SignUpForm />;
}
