import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();

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
        }
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
    <div className="mx-auto w-full mt-10 max-w-md p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Create Account</h1>

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
          className="text-indigo-600 hover:text-indigo-800 underline"
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
