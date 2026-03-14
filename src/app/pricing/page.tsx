import React from "react";

import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Pricing } from "@/components/blocks/pricing";
import { getRegion } from "@/lib/get-region";

export const metadata = {
  title: "Pricing",
};

const Page = async () => {
  const region = await getRegion();
  return (
    <Background>
      <Pricing region={region} className="py-28 text-center lg:pt-44 lg:pb-0" />
      <FAQ region={region} className="pb-28 lg:pb-32" />
    </Background>
  );
};

export default Page;
