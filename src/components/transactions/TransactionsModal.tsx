"use client";
import { Holding } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber, cleanFloatingValues } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  selectedHoldings: Holding[];
  savings: number;
}

export function TransactionsModal({ selectedHoldings, savings }: Props) {
  const totals = useMemo(() => {
    let stcg = 0, ltcg = 0;
    selectedHoldings.forEach((h) => { stcg += h.stcg.gain; ltcg += h.ltcg.gain; });
    return { stcg: cleanFloatingValues(stcg), ltcg: cleanFloatingValues(ltcg) };
  }, [selectedHoldings]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={selectedHoldings.length === 0}>
          View {selectedHoldings.length} Harvest Transaction{selectedHoldings.length === 1 ? "" : "s"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All Harvest Transactions</DialogTitle>
          <p className="text-sm text-[var(--foreground)]/60">
            {selectedHoldings.length} selected • Estimated tax savings: <span className="text-success font-medium">{formatCurrency(savings)}</span>
          </p>
        </DialogHeader>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-[var(--foreground)]/50">
              <tr>
                <th className="p-3 text-left">Asset</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-right">STCG Impact</th>
                <th className="p-3 text-right">LTCG Impact</th>
              </tr>
            </thead>
            <tbody>
              {selectedHoldings.map((h) => {
                const stcg = cleanFloatingValues(h.stcg.gain);
                const ltcg = cleanFloatingValues(h.ltcg.gain);
                return (
                  <tr key={`${h.coin}-${h.coinName}`} className="border-t border-border/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={h.logo} alt="" className="h-6 w-6 rounded-full bg-white/5 object-contain" onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
                        <div>
                          <div className="font-medium">{h.coin}</div>
                          <div className="text-xs text-[var(--foreground)]/50">{h.coinName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3"><span className="rounded-md bg-danger/15 px-2 py-1 text-xs font-medium text-danger">SELL</span></td>
                    <td className="p-3 text-right tabular-nums">{formatNumber(h.totalHolding, 4)}</td>
                    <td className={cn("p-3 text-right tabular-nums", stcg > 0 ? "text-success" : stcg < 0 ? "text-danger" : "text-[var(--foreground)]/60")}>{formatCurrency(stcg)}</td>
                    <td className={cn("p-3 text-right tabular-nums", ltcg > 0 ? "text-success" : ltcg < 0 ? "text-danger" : "text-[var(--foreground)]/60")}>{formatCurrency(ltcg)}</td>
                  </tr>
                );
              })}
              {selectedHoldings.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-sm text-[var(--foreground)]/50">Select holdings to preview transactions.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-border bg-white/[0.02] p-3">
            <div className="text-[var(--foreground)]/50 text-xs">Total STCG Impact</div>
            <div className={cn("mt-1 font-semibold tabular-nums", totals.stcg >= 0 ? "text-success" : "text-danger")}>{formatCurrency(totals.stcg)}</div>
          </div>
          <div className="rounded-xl border border-border bg-white/[0.02] p-3">
            <div className="text-[var(--foreground)]/50 text-xs">Total LTCG Impact</div>
            <div className={cn("mt-1 font-semibold tabular-nums", totals.ltcg >= 0 ? "text-success" : "text-danger")}>{formatCurrency(totals.ltcg)}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
