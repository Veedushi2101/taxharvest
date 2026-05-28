import { CapitalGainsResponse } from "@/types";

export const fetchCapitalGains = (): Promise<CapitalGainsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        capitalGains: {
          stcg: { profits: 70498.91, losses: 0, net: 70498.91 },
          ltcg: { profits: 0, losses: 298.03, net: -298.03 },
        },
      });
    }, 900);
  });
