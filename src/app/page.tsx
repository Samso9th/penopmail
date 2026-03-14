import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { Pricing } from "@/components/blocks/pricing";
import { getRegion } from "@/lib/get-region";

export default async function Home() {
  const region = await getRegion();
  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero region={region} />
        <Features region={region} />
        <HowItWorks />
      </Background>
      <Background variant="bottom">
        <Pricing region={region} />
        <FAQ region={region} />
      </Background>
    </>
  );
}
