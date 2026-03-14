"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  CreditCard,
  Plus,
  X,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { haptics } from "@/lib/haptics";

const PEPONMAIL_DOMAINS = ["peponmail.com", "pepon.email", "peponsend.com"];

type DomainEntry = { domain: string; type: "shared" | "custom" };

const steps = ["Domains", "Fund Wallet", "Done"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [domainType, setDomainType] = useState<"shared" | "custom">("shared");
  const [selectedShared, setSelectedShared] = useState(PEPONMAIL_DOMAINS[0]);
  const [customInput, setCustomInput] = useState("");
  const [domains, setDomains] = useState<DomainEntry[]>([]);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const minAmount =
    domains.some((d) => d.type === "custom") ? 1000 : 500;

  const quickAmounts = [minAmount, minAmount * 2, minAmount * 5];

  const addDomain = () => {
    const d =
      domainType === "shared" ? selectedShared : customInput.trim();
    if (!d) return;
    if (domains.some((x) => x.domain === d)) return;
    setDomains([...domains, { domain: d, type: domainType }]);
    if (domainType === "custom") setCustomInput("");
  };

  const removeDomain = (d: string) =>
    setDomains(domains.filter((x) => x.domain !== d));

  const validateAmount = (val: string) => {
    const num = parseInt(val);
    if (!val || isNaN(num) || num < minAmount) {
      setAmountError(`Minimum amount is ₦${minAmount.toLocaleString()}`);
      return false;
    }
    setAmountError("");
    return true;
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold tracking-tight">
          Pepon<span className="text-primary">Mail</span>
        </div>
        <ThemeToggle />
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-0 py-6">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                  i < step
                    ? "bg-primary border-primary text-primary-foreground"
                    : i === step
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="size-4" /> : i + 1}
              </div>
              <span
                className={`text-xs ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mb-5 h-px w-16 sm:w-24 ${i < step ? "bg-primary" : "bg-muted-foreground/30"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="flex flex-1 items-start justify-center px-4 py-4">
        <Card className="w-full max-w-md">
          {/* STEP 0: Set up domains */}
          {step === 0 && (
            <>
              <CardHeader>
                <CardTitle>Set up your domains</CardTitle>
                <CardDescription>
                  Choose a PeponMail domain or add your own custom domain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Domain type selection */}
                <div className="grid grid-cols-2 gap-3">
                  {(["shared", "custom"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => { haptics.trigger(); setDomainType(t); }}
                      className={`rounded-lg border p-3 text-left transition-colors ${
                        domainType === t
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/50"
                      }`}
                    >
                      <div className="text-sm font-medium capitalize">
                        {t === "shared" ? "PeponMail Domain" : "Custom Domain"}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {t === "shared" ? "₦500/alias/mo" : "₦1,000/alias/mo"}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Domain input */}
                {domainType === "shared" ? (
                  <div className="space-y-2">
                    <Label>Select a domain</Label>
                    <div className="grid gap-2">
                      {PEPONMAIL_DOMAINS.map((d) => (
                        <button
                          key={d}
                          onClick={() => { haptics.trigger(); setSelectedShared(d); }}
                          className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                            selectedShared === d
                              ? "border-primary bg-primary/5 font-medium"
                              : "hover:border-muted-foreground/50"
                          }`}
                        >
                          @{d}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Your domain</Label>
                    <Input
                      placeholder="example.com"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                    />
                    <p className="text-muted-foreground text-xs">
                      You&apos;ll need to verify DNS records after setup
                    </p>
                  </div>
                )}

                <Button variant="outline" className="w-full" onClick={addDomain}>
                  <Plus className="mr-2 size-4" /> Add Domain
                </Button>

                {domains.length > 0 && (
                  <div className="space-y-2">
                    <Label>Added domains</Label>
                    <div className="flex flex-wrap gap-2">
                      {domains.map((d) => (
                        <Badge
                          key={d.domain}
                          variant="secondary"
                          className="flex items-center gap-1 px-2 py-1"
                        >
                          @{d.domain}
                          <span className="text-muted-foreground">
                            ({d.type})
                          </span>
                          <button onClick={() => { haptics.trigger(); removeDomain(d.domain); }}>
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={domains.length === 0}
                  onClick={() => setStep(1)}
                >
                  Continue <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </>
          )}

          {/* STEP 1: Fund wallet */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Fund your wallet</CardTitle>
                <CardDescription>
                  Add funds to cover your first month of email aliases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="bg-muted rounded-lg p-4 text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your domains</span>
                    <span className="font-medium">{domains.length} domain(s)</span>
                  </div>
                  {domains.some((d) => d.type === "shared") && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shared domain rate</span>
                      <span>₦500/alias/month</span>
                    </div>
                  )}
                  {domains.some((d) => d.type === "custom") && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Custom domain rate</span>
                      <span>₦1,000/alias/month</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-1.5 font-semibold">
                    <span className="text-muted-foreground">Minimum required</span>
                    <span className="text-primary">
                      ₦{minAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Amount (₦)</Label>
                  <div className="relative">
                    <CreditCard className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      className="pl-9"
                      type="number"
                      placeholder={`Min ₦${minAmount.toLocaleString()}`}
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        if (amountError) validateAmount(e.target.value);
                      }}
                    />
                  </div>
                  {amountError && (
                    <p className="text-destructive text-xs">{amountError}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {quickAmounts.map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setAmount(String(q));
                        setAmountError("");
                      }}
                    >
                      ₦{q.toLocaleString()}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(0)}
                  >
                    <ArrowLeft className="mr-2 size-4" /> Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (validateAmount(amount)) {
                        haptics.success();
                        setStep(2);
                      }
                    }}
                  >
                    Fund &amp; Continue <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}

          {/* STEP 2: Done */}
          {step === 2 && (
            <>
              <CardHeader className="items-center text-center">
                <div className="bg-primary/10 mb-2 flex size-14 items-center justify-center rounded-full">
                  <CheckCircle className="text-primary size-8" />
                </div>
                <CardTitle>You&apos;re all set!</CardTitle>
                <CardDescription>
                  Your account is ready. Start creating email aliases from your
                  dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="bg-muted rounded-lg p-4 text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domains added</span>
                    <span className="font-medium">{domains.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wallet balance</span>
                    <span className="text-primary font-semibold">
                      ₦{parseInt(amount).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
