"use client";

import { useState } from "react";

import Link from "next/link";

import { CheckCircle, Trash2 } from "lucide-react";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const consequences = [
  "All email aliases will stop forwarding immediately",
  "Custom domains will be disconnected",
  "Billing history and invoices will be deleted",
  "Your alias names may become available to other users",
  "No refunds will be issued for unused subscription time",
];

export default function AccountDeletionPage() {
  const [email, setEmail] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [checks, setChecks] = useState([false, false, false]);
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    email.trim() !== "" &&
    confirmation.toUpperCase() === "DELETE" &&
    checks.every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) setSubmitted(true);
  };

  const toggleCheck = (index: number) => {
    setChecks((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  if (submitted) {
    return (
      <Background>
        <section className="py-28 lg:pt-44 lg:pb-32">
          <div className="container">
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
              <div className="bg-primary/10 flex size-16 items-center justify-center rounded-full">
                <CheckCircle className="text-primary size-8" />
              </div>
              <h1 className="text-2xl font-bold">Request Submitted</h1>
              <p className="text-muted-foreground">
                Your account deletion request has been received. We&apos;ll
                process it within 48 hours and send a confirmation email.
              </p>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </Background>
    );
  }

  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-32">
        <div className="container">
          <div className="mx-auto max-w-lg">
            <div className="mb-8 flex items-center gap-3">
              <div className="bg-destructive/10 flex size-12 items-center justify-center rounded-xl">
                <Trash2 className="text-destructive size-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Account Deletion
              </h1>
            </div>

            <Card className="border-destructive/50 mb-6">
              <CardHeader>
                <CardTitle className="text-destructive text-base">
                  Warning: This action is irreversible
                </CardTitle>
                <CardDescription>
                  Deleting your account will permanently remove all your data
                  from our servers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-1.5 text-sm">
                  {consequences.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5 shrink-0">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Confirm your email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your account email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">
                  Type &quot;DELETE&quot; to confirm
                </Label>
                <Input
                  id="confirm"
                  type="text"
                  placeholder="DELETE"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                {[
                  "I understand that my account and all associated data will be permanently deleted",
                  "I acknowledge that email aliases will stop working and cannot be recovered",
                  "I accept that no refunds will be provided for any remaining subscription period",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Checkbox
                      id={`check-${i}`}
                      checked={checks[i]}
                      onCheckedChange={() => toggleCheck(i)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={`check-${i}`}
                      className="text-muted-foreground cursor-pointer text-sm leading-snug"
                    >
                      {text}
                    </label>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                variant="destructive"
                className="w-full"
                disabled={!isValid}
              >
                Delete My Account
              </Button>
            </form>

            <p className="text-muted-foreground mt-6 text-center text-sm">
              Need help?{" "}
              <a
                href="mailto:support@peponmail.com"
                className="text-foreground underline underline-offset-4"
              >
                Contact support
              </a>{" "}
              before deleting your account.
            </p>
          </div>
        </div>
      </section>
    </Background>
  );
}
