import { headers } from "next/headers";

import { type Region } from "@/lib/region";

export async function getRegion(): Promise<Region> {
  const headersList = await headers();
  const region = headersList.get("x-region");
  return region === "intl" ? "intl" : "ng";
}
