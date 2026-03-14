export type Region = "ng" | "intl";

export interface RegionPrices {
  shared: string;
  custom: string;
  sharedRaw: number;
  customRaw: number;
  currency: string;
  unit: string;
}

export const PRICES: Record<Region, RegionPrices> = {
  ng: {
    shared: "₦500",
    custom: "₦1,000",
    sharedRaw: 500,
    customRaw: 1000,
    currency: "₦",
    unit: "/alias/month",
  },
  intl: {
    shared: "$0.50",
    custom: "$1.00",
    sharedRaw: 0.5,
    customRaw: 1,
    currency: "$",
    unit: "/alias/month",
  },
};

export function formatAmount(region: Region, amount: number): string {
  if (region === "ng") return `₦${Math.round(amount).toLocaleString()}`;
  return `$${amount.toFixed(2)}`;
}
