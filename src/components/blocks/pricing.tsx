"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Shared Domain",
    price: "₦500",
    unit: "/alias/month",
    description: "Perfect for starters",
    features: [
      "5 email aliases",
      "Use from our list of domains",
      "Email forwarding",
      "Basic support",
      "Dashboard access",
      "Spam filtering",
    ],
    popular: false,
  },
  {
    name: "Custom Domain",
    price: "₦1,000",
    unit: "/alias/month",
    description: "Full control",
    features: [
      "Unlimited email aliases",
      "Use your own domain",
      "Email forwarding",
      "Priority support",
      "API access",
      "Custom DNS setup",
    ],
    popular: true,
  },
];

export const Pricing = ({ className }: { className?: string }) => {
  return (
    <section id="pricing" className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-4xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            No hidden fees. Cancel anytime. Local pricing built for SMEs
            businesses.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-2 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.popular ? "outline-primary origin-top outline-4" : ""
              }`}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-foreground font-semibold">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="bg-primary/20 text-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-foreground text-2xl font-bold">
                      {plan.price}
                      <span className="text-muted-foreground text-sm font-normal">
                        {plan.unit}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <a href="/signup">Choose Plan</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
