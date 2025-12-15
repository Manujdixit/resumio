"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useResumes, useCreateResume } from "@/hooks/use-resumes";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  FileText,
  ChevronUp,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const { data: resumes = [], isLoading: isResumesLoading } = useResumes();

  const handleNewResume = () => {
    router.push("/new");
  };

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* Branding + Toggle */}
        <div
          className={cn([
            "flex items-center justify-between py-1",
            !isCollapsed && "px-2",
          ])}
        >
          {isCollapsed ? (
            <SidebarTrigger className="mx-auto" />
          ) : (
            <>
              <Link
                href="/new"
                className="flex items-center gap-2 font-bold text-foreground"
              >
                <Sparkles className="size-5 text-primary" />
                <span>Resumio</span>
              </Link>
              <SidebarTrigger />
            </>
          )}
        </div>

        {/* New Resume Button */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleNewResume}
              tooltip="New Resume"
              className="font-medium"
            >
              <Plus className="size-4" />
              <span>New Resume</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/resumes"}
              tooltip="All Resumes"
            >
              <Link href={"/resumes" as any}>
                <FileText className="size-4" />
                <span>Resumes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isResumesLoading ? (
                <>
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                  <SidebarMenuSkeleton showIcon />
                </>
              ) : resumes.length === 0 ? (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="text-muted-foreground">
                    <FileText className="size-4" />
                    <span>No resumes yet</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                resumes.map((resume) => {
                  const isActive = pathname === `/chat/${resume.id}`;
                  return (
                    <SidebarMenuItem key={resume.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={resume.title}
                      >
                        <Link href={`/chat/${resume.id}`}>
                          <FileText className="size-4" />
                          <span className="truncate">{resume.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isSessionPending ? (
              <SidebarMenuSkeleton showIcon />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton tooltip={session.user.name || "User"}>
                    <User className="size-4" />
                    <span className="truncate">{session.user.name}</span>
                    <ChevronUp className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  <DropdownMenuItem disabled className="text-muted-foreground">
                    {session.user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SidebarMenuButton asChild tooltip="Sign In">
                <Link href="/login">
                  <User className="size-4" />
                  <span>Sign In</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
