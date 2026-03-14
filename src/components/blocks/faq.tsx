import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Getting Started",
    questions: [
      {
        question: "What is an email alias?",
        answer:
          "An email alias is a custom email address that forwards messages to your primary inbox. For example, shop@yourbusiness.com can forward to your personal Gmail. You get a professional address without changing your current email provider.",
      },
      {
        question: "Do I need my own domain to get started?",
        answer:
          "No! With our Shared Domain plan (₦500/alias/month), you can pick from our list of professional domains like @peponmail.com, @pepon.email, or @peponsend.com. If you want your own domain, our Custom Domain plan (₦1,000/alias/month) lets you use any domain you own.",
      },
      {
        question: "How quickly can I set up my email alias?",
        answer:
          "You can create your first alias in under 2 minutes. Sign up, pick a domain (shared or custom), create your alias, and start receiving emails immediately.",
      },
    ],
  },
  {
    title: "Pricing & Billing",
    questions: [
      {
        question: "How does the ₦500/month pricing work?",
        answer:
          "You pay ₦500 per alias per month on the Shared Domain plan, or ₦1,000 per alias per month on the Custom Domain plan. Billing is monthly and you can cancel at any time.",
      },
      {
        question: "Can I cancel my subscription at any time?",
        answer:
          "Yes, you can cancel at any time. When you cancel, your aliases will continue working until the end of your billing period. After that, email forwarding will stop.",
      },
    ],
  },
  {
    title: "Technical Questions",
    questions: [
      {
        question: "How do I set up a custom domain?",
        answer:
          "After signing up for a Custom Domain plan, you'll need to add DNS records to your domain (we provide the exact records). The verification usually takes a few minutes to a few hours depending on your DNS provider.",
      },
      {
        question: "Does PeponMail read or store my emails?",
        answer:
          "No. We only process the routing information needed to forward your emails. We do not read, analyze, or store the content of emails that pass through our service.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can&apos;t find what you&apos;re looking for,{" "}
              <a
                href="mailto:support@peponmail.com"
                className="underline underline-offset-4"
              >
                get in touch
              </a>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
