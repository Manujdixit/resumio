"use client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// OAuth Provider Icons
function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <title>Google</title>
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
      <title>GitHub</title>
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
      <title>Facebook</title>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="#0A66C2" viewBox="0 0 24 24">
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function SignUpForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

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
      toast.error(`Failed to sign up with ${provider}`);
      setOauthLoading(null);
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign up successful");
          },
          onError: (error) => {
            toast.error(error.error.message || error.error.statusText);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-md p-6">
      <h1 className="mb-6 text-center font-bold text-3xl">Create Account</h1>

      {/* OAuth Buttons */}
      <div className="mb-6 space-y-3">
        <Button
          type="button"
          variant="outline"
          className="flex w-full items-center justify-center gap-3"
          onClick={() => handleOAuthSignIn("google")}
          disabled={oauthLoading !== null}
        >
          <GoogleIcon />
          {oauthLoading === "google" ? "Signing up..." : "Continue with Google"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex w-full items-center justify-center gap-3"
          onClick={() => handleOAuthSignIn("github")}
          disabled={oauthLoading !== null}
        >
          <GitHubIcon />
          {oauthLoading === "github" ? "Signing up..." : "Continue with GitHub"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex w-full items-center justify-center gap-3"
          onClick={() => handleOAuthSignIn("facebook")}
          disabled={oauthLoading !== null}
        >
          <FacebookIcon />
          {oauthLoading === "facebook"
            ? "Signing up..."
            : "Continue with Facebook"}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="flex w-full items-center justify-center gap-3"
          onClick={() => handleOAuthSignIn("linkedin")}
          disabled={oauthLoading !== null}
        >
          <LinkedInIcon />
          {oauthLoading === "linkedin"
            ? "Signing up..."
            : "Continue with LinkedIn"}
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
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
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
              {state.isSubmitting ? "Submitting..." : "Sign Up"}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className="mt-4 text-center">
        <Link
          href="/login"
          className="text-indigo-600 underline hover:text-indigo-800"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   Lock,
//   Mail,
//   User,
//   Github,
//   Check,
//   ArrowRight,
// } from "lucide-react";
// import { motion } from "motion/react";
// import { Button } from "@/components/landing/Button";

// export default function SignUpPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setIsLoading(false);
//   };

//   const getPasswordStrength = (pass: string) => {
//     if (!pass) return 0;
//     let score = 0;
//     if (pass.length > 6) score++;
//     if (pass.length > 10) score++;
//     if (/[A-Z]/.test(pass)) score++;
//     if (/[0-9]/.test(pass)) score++;
//     return score; // 0-4
//   };

//   const strength = getPasswordStrength(formData.password);

//   return (
//     <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4 relative overflow-hidden bg-black selection:bg-white selection:text-black">
//       {/* Ambient Background Effects */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
//       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="w-full max-w-[400px] relative z-10"
//       >
//         <div className="bg-zinc-900 border border-zinc-800/50 rounded-xl shadow-2xl overflow-hidden relative">
//           {/* Top Highlight Line */}
//           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//           <div className="p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-xl font-semibold text-white tracking-tight mb-2">
//                 Create your account
//               </h1>
//               <p className="text-zinc-400 text-sm">
//                 Join thousands of professionals optimizing their careers.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-zinc-400 ml-1">
//                   Full Name
//                 </label>
//                 <div className="relative group">
//                   <User
//                     className="absolute left-3 top-3 text-zinc-500 group-focus-within:text-white transition-colors duration-300"
//                     size={16}
//                   />
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, name: e.target.value }))
//                     }
//                     className="w-full bg-black/50 border border-zinc-800 text-zinc-200 text-sm py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-zinc-400 ml-1">
//                   Email
//                 </label>
//                 <div className="relative group">
//                   <Mail
//                     className="absolute left-3 top-3 text-zinc-500 group-focus-within:text-white transition-colors duration-300"
//                     size={16}
//                   />
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         email: e.target.value,
//                       }))
//                     }
//                     className="w-full bg-black/50 border border-zinc-800 text-zinc-200 text-sm py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
//                     placeholder="name@company.com"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-xs font-medium text-zinc-400 ml-1">
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <Lock
//                     className="absolute left-3 top-3 text-zinc-500 group-focus-within:text-white transition-colors duration-300"
//                     size={16}
//                   />
//                   <input
//                     type="password"
//                     required
//                     value={formData.password}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         password: e.target.value,
//                       }))
//                     }
//                     className="w-full bg-black/50 border border-zinc-800 text-zinc-200 text-sm py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder:text-zinc-600"
//                     placeholder="Create a password"
//                   />
//                 </div>
//                 {/* Password Strength Meter */}
//                 <div className="flex gap-1.5 pt-1 px-1 h-1.5">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className={`h-full flex-1 rounded-full transition-colors duration-300 ${
//                         strength >= i
//                           ? strength < 2
//                             ? "bg-red-500"
//                             : strength < 3
//                             ? "bg-yellow-500"
//                             : "bg-green-500"
//                           : "bg-zinc-800"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-start gap-2.5 pt-2">
//                 <div className="mt-0.5 relative flex items-center justify-center">
//                   <input
//                     type="checkbox"
//                     className="peer appearance-none w-4 h-4 border border-zinc-700 rounded bg-zinc-900 checked:bg-white checked:border-white transition-colors cursor-pointer"
//                   />
//                   <Check
//                     size={10}
//                     className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none"
//                   />
//                 </div>
//                 <p className="text-xs text-zinc-500 leading-snug">
//                   I agree to the{" "}
//                   <a
//                     href="#"
//                     className="text-zinc-300 hover:text-white transition-colors"
//                   >
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a
//                     href="#"
//                     className="text-zinc-300 hover:text-white transition-colors"
//                   >
//                     Privacy Policy
//                   </a>
//                   .
//                 </p>
//               </div>

//               <Button
//                 type="submit"
//                 variant="primary"
//                 className="w-full h-11 mt-2 text-sm font-semibold rounded-lg group"
//                 isLoading={isLoading}
//               >
//                 Create Account
//                 {!isLoading && (
//                   <ArrowRight
//                     size={14}
//                     className="ml-1 group-hover:translate-x-1 transition-transform"
//                   />
//                 )}
//               </Button>
//             </form>

//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-zinc-800"></div>
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-zinc-900 px-2 text-zinc-500 font-mono">
//                   Or register with
//                 </span>
//               </div>
//             </div>

//             <button className="w-full h-10 bg-white text-black hover:bg-zinc-200 border border-transparent rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors mb-6">
//               <Github size={18} />
//               GitHub
//             </button>

//             <div className="text-center">
//               <p className="text-xs text-zinc-500">
//                 Already have an account?{" "}
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="text-white hover:underline font-medium transition-colors"
//                 >
//                   Sign in
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 text-center">
//           <button
//             onClick={() => navigate("/")}
//             className="text-zinc-500 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors group"
//           >
//             <ArrowLeft
//               size={12}
//               className="group-hover:-translate-x-1 transition-transform"
//             />
//             Return to Home
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
