import { useForm } from "@tanstack/react-form";
import { DoorOpenIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import Loader from "./loader";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// OAuth Provider Icons
function GoogleIcon() {
	return (
		<svg className="h-5 w-5" viewBox="0 0 24 24">
			<path
				fill="#4285F4"
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
			/>
			<path
				fill="#34A853"
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
			/>
			<path
				fill="#FBBC05"
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
			/>
			<path
				fill="#EA4335"
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
			/>
		</svg>
	);
}

function GitHubIcon() {
	return (
		<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
			<path
				fillRule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
				clipRule="evenodd"
			/>
		</svg>
	);
}

function FacebookIcon() {
	return (
		<svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	);
}

function LinkedInIcon() {
	return (
		<svg className="h-5 w-5" fill="#0A66C2" viewBox="0 0 24 24">
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

export default function SignInForm() {
	const router = useRouter();
	const { isPending } = authClient.useSession();
	const [oauthLoading, setOauthLoading] = useState<string | null>(null);
	const [lastMethod, setLastMethod] = useState<string | null>(null);

	// Get the last login method on mount
	useEffect(() => {
		const method = authClient.getLastUsedLoginMethod();
		if (method) {
			setLastMethod(method);
		}
	}, []);

	const handleOAuthSignIn = async (
		provider: "google" | "github" | "facebook" | "linkedin",
	) => {
		setOauthLoading(provider);
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: "/dashboard",
			});
		} catch (_error) {
			toast.error(`Failed to sign in with ${provider}`);
			setOauthLoading(null);
		}
	};

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						router.push("/dashboard");
						toast.success("Sign in successful");
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				},
			);
		},
		validators: {
			onSubmit: z.object({
				email: z.email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	if (isPending) {
		return <Loader />;
	}

	// Helper to check if a method matches the last used method
	const isLastUsed = (provider: string) => lastMethod === provider;

	return (
		<div className="mx-auto mt-10 w-full max-w-md p-6">
			<h1 className="mb-6 text-center font-bold text-3xl">Welcome Back</h1>

			{/* OAuth Buttons */}
			<div className="mb-6 space-y-3">
				<Button
					type="button"
					variant="outline"
					className={"relative flex w-full items-center justify-center gap-3"}
					onClick={() => handleOAuthSignIn("google")}
					disabled={oauthLoading !== null}
				>
					<GoogleIcon />
					{oauthLoading === "google" ? "Signing in..." : "Continue with Google"}
					{isLastUsed("google") && (
						<Badge className="-top-2 -right-2 absolute rounded-full bg-indigo-500 px-2 py-0.5 text-white text-xs">
							<DoorOpenIcon />
							Last used
						</Badge>
					)}
				</Button>

				<Button
					type="button"
					variant="outline"
					className={"relative flex w-full items-center justify-center gap-3"}
					onClick={() => handleOAuthSignIn("github")}
					disabled={oauthLoading !== null}
				>
					<GitHubIcon />
					{oauthLoading === "github" ? "Signing in..." : "Continue with GitHub"}
					{isLastUsed("github") && (
						<Badge className="-top-2 -right-2 absolute rounded-full bg-indigo-500 px-2 py-0.5 text-white text-xs">
							<DoorOpenIcon />
							Last used
						</Badge>
					)}
				</Button>

				<Button
					type="button"
					variant="outline"
					className={"relative flex w-full items-center justify-center gap-3"}
					onClick={() => handleOAuthSignIn("facebook")}
					disabled={oauthLoading !== null}
				>
					<FacebookIcon />
					{oauthLoading === "facebook"
						? "Signing in..."
						: "Continue with Facebook"}
					{isLastUsed("facebook") && (
						<Badge className="-top-2 -right-2 absolute rounded-full bg-indigo-500 px-2 py-0.5 text-white text-xs">
							<DoorOpenIcon />
							Last used
						</Badge>
					)}
				</Button>

				<Button
					type="button"
					variant="outline"
					className={"relative flex w-full items-center justify-center gap-3"}
					onClick={() => handleOAuthSignIn("linkedin")}
					disabled={oauthLoading !== null}
				>
					<LinkedInIcon />
					{oauthLoading === "linkedin"
						? "Signing in..."
						: "Continue with LinkedIn"}
					{isLastUsed("linkedin") && (
						<Badge className="-top-2 -right-2 absolute rounded-full bg-indigo-500 px-2 py-0.5 text-white text-xs">
							<DoorOpenIcon />
							Last used
						</Badge>
					)}
				</Button>
			</div>

			{/* Divider */}
			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-gray-300 border-t" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-white px-2 text-gray-500">
						or continue with email
					</span>
				</div>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-4"
			>
				<div>
					<form.Field name="email">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>Email</Label>
								<Input
									id={field.name}
									name={field.name}
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors.map((error) => (
									<p key={error?.message} className="text-red-500">
										{error?.message}
									</p>
								))}
							</div>
						)}
					</form.Field>
				</div>

				<div>
					<form.Field name="password">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>Password</Label>
								<Input
									id={field.name}
									name={field.name}
									type="password"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{field.state.meta.errors.map((error) => (
									<p key={error?.message} className="text-red-500">
										{error?.message}
									</p>
								))}
							</div>
						)}
					</form.Field>
				</div>

				<form.Subscribe>
					{(state) => (
						<Button
							type="submit"
							className="w-full"
							disabled={!state.canSubmit || state.isSubmitting}
						>
							{state.isSubmitting ? "Submitting..." : "Sign In"}
						</Button>
					)}
				</form.Subscribe>
			</form>

			<div className="mt-4 text-center">
				<Link
					href="/signup"
					className="text-indigo-600 underline hover:text-indigo-800"
				>
					Need an account? Sign Up
				</Link>
			</div>
		</div>
	);
}
