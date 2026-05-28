import { Holding, CapitalGains } from "@/types";
import { cleanFloatingValues } from "./formatters";

export const calculateNetGain = (profits: number, losses: number): number =>
  cleanFloatingValues(profits - losses);

export const calculateRealisedGains = (cg: CapitalGains): number =>
  cleanFloatingValues(cg.stcg.net + cg.ltcg.net);

export const calculateHarvestedGains = (
  initial: CapitalGains,
  holdings: Holding[],
  selectedIds: Set<string>
): CapitalGains => {
  let stcgProfits = initial.stcg.profits;
  let stcgLosses = initial.stcg.losses;
  let ltcgProfits = initial.ltcg.profits;
  let ltcgLosses = initial.ltcg.losses;

  holdings.forEach((h) => {
    if (!selectedIds.has(holdingId(h))) return;
    const s = h.stcg.gain;
    if (s > 0) stcgProfits += s; else stcgLosses += Math.abs(s);
    const l = h.ltcg.gain;
    if (l > 0) ltcgProfits += l; else ltcgLosses += Math.abs(l);
  });

  return {
    stcg: { profits: stcgProfits, losses: stcgLosses, net: calculateNetGain(stcgProfits, stcgLosses) },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses, net: calculateNetGain(ltcgProfits, ltcgLosses) },
  };
};

export const holdingId = (h: Holding): string => `${h.coin}-${h.coinName}`;
