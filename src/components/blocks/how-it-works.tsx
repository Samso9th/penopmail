import { Globe, Mail, LayoutDashboard, Plus } from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Pick or Connect Domain",
    description:
      "Choose a shared PeponMail domain or connect your own custom domain for a fully branded experience.",
  },
  {
    number: "02",
    icon: Plus,
    title: "Create Your Alias",
    description:
      "Set up your custom email addresses in seconds. Use any name you want — support@, hello@, shop@, and more.",
  },
  {
    number: "03",
    icon: Mail,
    title: "Start Sending & Receiving",
    description:
      "Your alias is live immediately. Emails sent to it are forwarded to your primary inbox — no delay.",
  },
  {
    number: "04",
    icon: LayoutDashboard,
    title: "Manage from Dashboard",
    description:
      "Monitor activity, create new aliases, manage domains, and control everything from one clean dashboard.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pb-28 lg:pb-32">
      <div className="container">
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            GET STARTED IN MINUTES, NOT HOURS.
          </span>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="text-muted-foreground leading-snug">
            Four simple steps to get professional email aliases up and running.
            No technical expertise required.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.number} className="relative overflow-hidden">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
                      <Icon className="text-foreground size-5" />
                    </div>
                    <span className="text-muted-foreground/30 font-mono text-4xl font-bold">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-snug">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
