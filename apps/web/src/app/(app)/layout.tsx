import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@resumio/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Get sidebar state from cookie (default to collapsed)
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarState === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-svh overflow-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
