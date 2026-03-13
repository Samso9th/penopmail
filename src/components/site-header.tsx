"use client";

import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/mail": "Mails",
  "/dashboard/aliases": "Aliases",
  "/dashboard/domains": "Domains",
  "/dashboard/settings": "Settings",
};

export function SiteHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
      <span className="text-sm font-medium">{title}</span>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}

