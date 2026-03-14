import Link from "next/link";

import { FileText } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { getRegion } from "@/lib/get-region";
import { PRICES } from "@/lib/region";

export const metadata = {
  title: "Terms & Conditions",
};

export default async function TermsPage() {
  const region = await getRegion();
  const p = PRICES[region];

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using PeponMail's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.",
    },
    {
      title: "2. Service Description",
      content: `PeponMail provides email alias and forwarding services. We offer two tiers: Shared Domain (${p.shared}/month) and Custom Domain (${p.custom}/month). Our service allows you to create email aliases that forward to your primary email address.`,
    },
    {
      title: "3. Account Responsibilities",
      content: "You are responsible for:",
      list: [
        "Maintaining the confidentiality of your account credentials",
        "All activities that occur under your account",
        "Providing accurate and complete registration information",
        "Notifying us immediately of any unauthorized use",
      ],
    },
    {
      title: "4. Acceptable Use",
      content: "You agree NOT to use our service for:",
      list: [
        "Sending spam, phishing, or malicious content",
        "Any illegal activities or fraud",
        "Harassment, abuse, or threats",
        "Distributing malware or harmful code",
        "Impersonating others or misrepresentation",
        "Violating intellectual property rights",
      ],
    },
    {
      title: "5. Payment Terms",
      content:
        "Subscriptions are billed monthly. Payments are non-refundable except as required by law. We reserve the right to change pricing with 30 days notice. Failure to pay may result in service suspension or termination.",
    },
    {
      title: "6. Custom Domains",
      content:
        "If you use the Custom Domain tier, you must own or have authorization to use the domain. You are responsible for maintaining proper DNS configuration. We are not liable for issues arising from misconfigured DNS records.",
    },
    {
      title: "7. Service Availability",
      content:
        "We strive for 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance with reasonable notice. We are not liable for service interruptions beyond our control.",
    },
    {
      title: "8. Spam, Fraud & Abuse Policy",
      content:
        "We have a strict zero-tolerance policy for spam and fraudulent activity. If we detect spam-type behaviour, mass unsolicited emails, phishing attempts, fraudulent use, or any other abusive activity originating from your account or aliases, your account will be suspended immediately and without prior notice. Any remaining account balance or prepaid funds will be forfeited and are non-refundable. We reserve the right to report such activity to relevant authorities.",
    },
    {
      title: "9. Termination",
      content:
        "Either party may terminate the service at any time. We may suspend or terminate accounts that violate these terms without notice. Upon termination, your aliases will stop forwarding, and your data may be deleted after 30 days.",
    },
    {
      title: "9. Limitation of Liability",
      content:
        "PeponMail shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.",
    },
    {
      title: "10. Governing Law",
      content:
        "These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of Lagos, Nigeria.",
    },
    {
      title: "11. Contact",
      content:
        "For questions about these Terms, contact us at legal@peponmail.com",
    },
  ];
  return (
    <Background>
      <section className="mx-auto max-w-2xl px-4 py-28 lg:pt-44 lg:pb-32">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
            <FileText className="text-foreground size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground text-sm">
              Last Updated: March 9, 2026
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-foreground mb-2 text-lg font-semibold">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
              {section.list && (
                <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button variant="outline" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </section>
    </Background>
  );
}
