"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullscreen =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/onboarding") ||
    pathname === "/login" ||
    pathname === "/signup";

  if (isFullscreen) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
