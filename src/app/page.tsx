"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Holding, CapitalGains } from "@/types";
import { fetchHoldings } from "@/services/holdings";
import { fetchCapitalGains } from "@/services/capitalGains";
import {
  calculateHarvestedGains,
  calculateRealisedGains,
  holdingId,
} from "@/lib/calculations";
import { formatCurrency } from "@/lib/formatters";
import { Header } from "@/components/Header";
import { SummarySection } from "@/components/summary/SummarySection";
import { SummarySkeleton } from "@/components/summary/SummarySkeleton";
import { HoldingsTable } from "@/components/holdings/HoldingsTable";
import { HoldingsSkeleton } from "@/components/holdings/HoldingsSkeleton";
import { TransactionsModal } from "@/components/transactions/TransactionsModal";
import { ErrorState } from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/Disclaimer";
import {Navbar} from "@/components/Navbar";

const INITIAL_LIMIT = 6;

export default function Page() {
  const [holdings, setHoldings] = useState<Holding[] | null>(null);
  const [preHarvest, setPreHarvest] = useState<CapitalGains | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [h, cg] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
      setHoldings(h);
      setPreHarvest(cg.capitalGains);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const postHarvest = useMemo(() => {
    if (!preHarvest || !holdings) return null;
    return calculateHarvestedGains(preHarvest, holdings, selectedIds);
  }, [preHarvest, holdings, selectedIds]);

  const selectedHoldings = useMemo(
    () => (holdings ?? []).filter((h) => selectedIds.has(holdingId(h))),
    [holdings, selectedIds],
  );

  const savings = useMemo(() => {
    if (!preHarvest || !postHarvest) return 0;
    return (
      calculateRealisedGains(preHarvest) - calculateRealisedGains(postHarvest)
    );
  }, [preHarvest, postHarvest]);

  const portfolioValue = useMemo(() => {
    if (!holdings) return "—";
    const total = holdings.reduce(
      (acc, h) => acc + h.currentPrice * h.totalHolding,
      0,
    );
    return formatCurrency(total);
  }, [holdings]);

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback((ids: string[], select: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => (select ? next.add(id) : next.delete(id)));
      return next;
    });
  }, []);

  return (
    <div>
    <Navbar />
    <main
      className="
mx-auto
space-y-6
px-4
py-6
md:px-6
md:py-8
bg-[var(--background)]
text-[var(--foreground)]
min-h-screen
transition-colors
"
    >
      <Header portfolioValue={portfolioValue} />
      <Disclaimer />

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : loading || !preHarvest || !postHarvest || !holdings ? (
        <>
          <SummarySkeleton />
          <HoldingsSkeleton />
        </>
      ) : (
        <>
          <SummarySection preHarvest={preHarvest} postHarvest={postHarvest} />

          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Holdings</h2>
                <p className="text-xs text-[var(--foreground)]/50">
                  {selectedIds.size} selected of {holdings.length}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? "Show Less" : "View All"}
                </Button>
                <TransactionsModal
                  selectedHoldings={selectedHoldings}
                  savings={savings}
                />
              </div>
            </div>

            <HoldingsTable
              holdings={holdings}
              selectedIds={selectedIds}
              onToggle={toggle}
              onToggleAll={toggleAll}
              limit={showAll ? undefined : INITIAL_LIMIT}
              showSearch={false}
            />
          </section>
        </>
      )}
    </main>
    </div>
  );
}
