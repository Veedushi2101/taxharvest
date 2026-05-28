import data from "@/data/holdings.json";
import { Holding } from "@/types";

export const fetchHoldings = (): Promise<Holding[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.001) reject(new Error("Failed to fetch holdings"));
      else resolve(data as Holding[]);
    }, 900);
  });
