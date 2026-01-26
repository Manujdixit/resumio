import { auth } from "@resumio/auth";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignUpForm = dynamic(() => import("@/components/sign-up-form"));

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    redirect("/dashboard");
  }
  return <SignUpForm />;
}
