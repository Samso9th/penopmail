import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { Pricing } from "@/components/blocks/pricing";

export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        <Features />
        <HowItWorks />
      </Background>
      <Background variant="bottom">
        <Pricing />
        <FAQ />
      </Background>
    </>
  );
}
