import React from "react";

import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Pricing } from "@/components/blocks/pricing";

export const metadata = {
  title: "Pricing",
};

const Page = () => {
  return (
    <Background>
      <Pricing className="py-28 text-center lg:pt-44 lg:pb-0" />
      <FAQ className="pb-28 lg:pb-32" />
    </Background>
  );
};

export default Page;
