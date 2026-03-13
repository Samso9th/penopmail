import Image from "next/image";

import { Mail, Shield, Users, Zap } from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "10K+ Active Users",
    description: "Trusted by thousands of Nigerian businesses and individuals.",
    icon: Users,
  },
  {
    title: "99.9% Uptime",
    description: "Enterprise-grade reliability for your email aliases.",
    icon: Zap,
  },
  {
    title: "Spam Filtering",
    description: "Advanced spam protection built into every alias.",
    icon: Shield,
  },
  {
    title: "Nigeria First",
    description: "₦aira pricing and local support built for you.",
    icon: Mail,
  },
];

export const Hero = () => {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <div className="bg-primary/20 text-foreground mb-5 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
            Now available in Nigeria
          </div>
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Professional Email Aliases{" "}
            <span className="text-muted-foreground">
              Without the Enterprise Price
            </span>
          </h1>

          <p className="text-muted-foreground text-1xl mt-5 md:text-3xl">
            Custom email aliases from ₦500/month. No domain needed. Get
            professional email addresses in minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button asChild>
              <a href="/signup">Get Started</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>
        </div>

        {/* Right side - Trust signals */}
        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="text-foreground mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-text text-foreground font-semibold">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground max-w-76 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden md:mt-20 lg:container lg:mt-24">
        <div className="relative h-[793px] w-full">
          <Image
            src="/hero.webp"
            alt="PeponMail dashboard"
            fill
            className="rounded-2xl object-cover object-left-top shadow-lg max-lg:rounded-tr-none"
          />
        </div>
      </div>
    </section>
  );
};
