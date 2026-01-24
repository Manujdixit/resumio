"use client";
import { authClient } from "@/lib/auth-client";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("@/components/sign-up-form"), {
	ssr: false,
});

export default function SignupPage() {
	const { data: session } = authClient.useSession();
	const router = useRouter();
	if (session?.user) {
		router.push("/dashboard");
		return <Loader />;
	} else {
		return <SignUpForm />;
	}
}
