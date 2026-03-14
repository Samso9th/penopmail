import { OnboardingClient } from "@/app/onboarding/onboarding-client";
import { getRegion } from "@/lib/get-region";

export default async function OnboardingPage() {
  const region = await getRegion();
  return <OnboardingClient region={region} />;
}
