"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";

import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/sign-in-form"), {
	ssr: false,
});

export default function LoginPage() {
	const { data: session } = authClient.useSession();
	const router = useRouter();
	if (session?.user) {
		router.push("/dashboard");
		return <Loader />;
	} else {
		return <SignInForm />;
	}
}
