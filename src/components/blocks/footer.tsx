import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "How It Works", href: "/#how-it-works" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Account Deletion", href: "/account-deletion" },
  ];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Start creating email aliases today
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          Professional email aliases without the enterprise price. Built for
          Nigerian businesses and individuals.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <a href="/signup">Get Started Free</a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground text-sm">
          © 2026 PeponMail. All rights reserved.
        </p>
      </nav>

      <div className="text-primary mt-10 w-full md:mt-14 lg:mt-20">
        <div className="flex w-full items-end justify-center overflow-hidden pb-0">
          <span
            className="select-none text-center font-bold tracking-tighter opacity-10"
            style={{ fontSize: "clamp(4rem, 18vw, 18rem)", lineHeight: 0.85 }}
          >
            PeponMail
          </span>
        </div>
      </div>
    </footer>
  );
}
