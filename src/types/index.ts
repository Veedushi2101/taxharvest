export interface GainInfo { balance: number; gain: number; }

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainInfo;
  ltcg: GainInfo;
}

export interface CapitalGainsBreakdown {
  profits: number;
  losses: number;
  net: number;
}

export interface CapitalGains {
  stcg: CapitalGainsBreakdown;
  ltcg: CapitalGainsBreakdown;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}
