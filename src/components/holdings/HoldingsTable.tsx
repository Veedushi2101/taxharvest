"use client";
import { useMemo, useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";
import { Holding } from "@/types";
import { holdingId } from "@/lib/calculations";
import { formatCurrency, formatNumber, cleanFloatingValues } from "@/lib/formatters";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SortKey = "currentPrice" | "stcg" | "ltcg" | "totalHolding" | null;
type SortDir = "asc" | "desc";

interface Props {
  holdings: Holding[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[], select: boolean) => void;
  limit?: number;
  showSearch?: boolean;
}

export function HoldingsTable({ holdings, selectedIds, onToggle, onToggleAll, limit, showSearch = true }: Props) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  useMemo(() => {
    const t = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    let list = holdings;
    if (q) list = list.filter((h) => h.coin.toLowerCase().includes(q) || h.coinName.toLowerCase().includes(q));
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const va = sortKey === "stcg" ? a.stcg.gain : sortKey === "ltcg" ? a.ltcg.gain : (a as any)[sortKey];
        const vb = sortKey === "stcg" ? b.stcg.gain : sortKey === "ltcg" ? b.ltcg.gain : (b as any)[sortKey];
        return sortDir === "asc" ? va - vb : vb - va;
      });
    }
    return limit ? list.slice(0, limit) : list;
  }, [holdings, debounced, sortKey, sortDir, limit]);

  const visibleIds = filtered.map(holdingId);
  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someSelected = visibleIds.some((id) => selectedIds.has(id)) && !allSelected;

  const handleSort = (key: NonNullable<SortKey>) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ k }: { k: NonNullable<SortKey> }) => {
    if (sortKey !== k) return <ArrowUpDown className="h-3 w-3 opacity-40" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div className="space-y-3">
      {showSearch && (
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search asset..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Search holdings"
          />
        </div>
      )}

      {/* Desktop table */}
      <div className="
hidden
overflow-x-auto
rounded-2xl
border
border-[var(--border)]
bg-[var(--card)]
md:block
">
        <table className="w-full text-sm">
          <thead className="
border-b
border-[var(--border)]
bg-black/[0.03]
dark:bg-white/[0.02]
text-xs
uppercase
tracking-wider
text-[var(--foreground)]/50
">
            <tr>
              <th className="p-3 text-left">
                <Checkbox
                  aria-label="Select all"
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={(c) => onToggleAll(visibleIds, !!c)}
                />
              </th>
              <th className="p-3 text-left">Asset</th>
              <Th onClick={() => handleSort("totalHolding")}>Holdings / Avg Buy <SortIcon k="totalHolding" /></Th>
              <Th onClick={() => handleSort("currentPrice")}>Current Price <SortIcon k="currentPrice" /></Th>
              <Th onClick={() => handleSort("stcg")}>Short-term Gain <SortIcon k="stcg" /></Th>
              <Th onClick={() => handleSort("ltcg")}>Long-term Gain <SortIcon k="ltcg" /></Th>
              <th className="p-3 text-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h) => {
              const id = holdingId(h);
              const selected = selectedIds.has(id);
              const stcg = cleanFloatingValues(h.stcg.gain);
              const ltcg = cleanFloatingValues(h.ltcg.gain);
              return (
                <tr
                  key={id}
                  className={cn(
                    "border-b border-[var(--border)] transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.03]",
                    selected && "bg-accent/10"
                  )}
                >
                  <td className="p-3">
                    <Checkbox checked={selected} onCheckedChange={() => onToggle(id)} aria-label={`Select ${h.coin}`} />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={h.logo} alt="" className="h-7 w-7 rounded-full bg-black/5 dark:bg-white/5 object-contain" onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
                      <div>
                        <div className="font-medium">{h.coin}</div>
                        <div className="text-xs text-black/50 dark:text-white/50">{h.coinName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 tabular-nums">
                    <div>{formatNumber(h.totalHolding, 4)}</div>
                    <div className="text-xs text-black/50 dark:text-white/50">{formatCurrency(h.averageBuyPrice)}</div>
                  </td>
                  <td className="p-3 tabular-nums">{formatCurrency(h.currentPrice)}</td>
                  <td className={cn("p-3 tabular-nums", stcg > 0 ? "text-success" : stcg < 0 ? "text-danger" : "text-black/60 dark:text-white/60")}>
                    {formatCurrency(stcg)}
                    <div className="text-xs text-black/50 dark:text-white/50">{formatNumber(h.stcg.balance, 4)}</div>
                  </td>
                  <td className={cn("p-3 tabular-nums", ltcg > 0 ? "text-success" : ltcg < 0 ? "text-danger" : "text-black/60 dark:text-white/60")}>
                    {formatCurrency(ltcg)}
                    <div className="text-xs text-black/50 dark:text-white/50">{formatNumber(h.ltcg.balance, 4)}</div>
                  </td>
                  <td className="p-3 text-right tabular-nums">{selected ? formatNumber(h.totalHolding, 4) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {filtered.map((h) => {
          const id = holdingId(h);
          const selected = selectedIds.has(id);
          const stcg = cleanFloatingValues(h.stcg.gain);
          const ltcg = cleanFloatingValues(h.ltcg.gain);
          return (
            <div key={id} className={cn("rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors", selected ? "border-accent/50 bg-accent/10" : "border-border")}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={h.logo} alt="" className="h-8 w-8 rounded-full bg-black/5 dark:bg-white/5 object-contain" onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
                  <div>
                    <div className="font-medium">{h.coin}</div>
                    <div className="text-xs text-black/50 dark:text-white/50">{h.coinName}</div>
                  </div>
                </div>
                <Checkbox checked={selected} onCheckedChange={() => onToggle(id)} aria-label={`Select ${h.coin}`} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div><div className="text-black/50 dark:text-white/50">Current</div><div className="tabular-nums">{formatCurrency(h.currentPrice)}</div></div>
                <div><div className="text-black/50 dark:text-white/50">Holdings</div><div className="tabular-nums">{formatNumber(h.totalHolding, 4)}</div></div>
                <div><div className="text-black/50 dark:text-white/50">STCG</div><div className={cn("tabular-nums", stcg > 0 ? "text-success" : stcg < 0 ? "text-danger" : "")}>{formatCurrency(stcg)}</div></div>
                <div><div className="text-black/50 dark:text-white/50">LTCG</div><div className={cn("tabular-nums", ltcg > 0 ? "text-success" : ltcg < 0 ? "text-danger" : "")}>{formatCurrency(ltcg)}</div></div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center text-sm text-black/50 dark:text-white/50">No holdings found.</div>
      )}
    </div>
  );
}

function Th({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <th className="p-3 text-left">
      <button onClick={onClick} className="inline-flex items-center gap-1 transition-colors hover:text-black dark:hover:text-white">
        {children}
      </button>
    </th>
  );
}
