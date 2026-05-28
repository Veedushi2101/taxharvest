"use client";

import { motion } from "framer-motion";
import { CapitalGains } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  gains: CapitalGains;
  variant?: "default" | "primary";
  realised: number;
}

const Row = ({
  label,
  value,
  valueClass,
  isPrimary,
}: {
  label: string;
  value: string;
  valueClass?: string;
  isPrimary?: boolean;
}) => (
  <div className="flex items-center justify-between text-sm">
    <span
      className={
        isPrimary
          ? "text-white/70"
          : "text-black/60 dark:text-white/60"
      }
    >
      {label}
    </span>

    <span className={cn("font-medium tabular-nums", valueClass)}>
      {value}
    </span>
  </div>
);

export function SummaryCard({
  title,
  gains,
  variant = "default",
  realised,
}: Props) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-2xl border p-5 shadow-lg transition-colors",
        isPrimary
          ? "border-blue-500/30 bg-[linear-gradient(135deg,#3C9AFF_2.5%,#0066FE_100.05%)] text-white"
          : "border-[var(--border)] bg-[var(--surface)] text-black dark:text-white"
      )}
    >
      <h3
        className={cn(
          "mb-4 text-base font-semibold",
          isPrimary
            ? "text-white"
            : "text-black dark:text-white"
        )}
      >
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div
            className={cn(
              "text-xs uppercase tracking-wider",
              isPrimary
                ? "text-white/70"
                : "text-black/50 dark:text-white/50"
            )}
          >
            Short-term
          </div>

          <Row
            label="Profits"
            value={formatCurrency(gains.stcg.profits)}
            isPrimary={isPrimary}
          />

          <Row
            label="Losses"
            value={`- ${formatCurrency(gains.stcg.losses)}`}
            isPrimary={isPrimary}
          />

          <div className="my-1 h-px bg-black/10 dark:bg-white/10" />

          <Row
            label="Net Capital Gains"
            value={formatCurrency(gains.stcg.net)}
            valueClass="font-semibold"
            isPrimary={isPrimary}
          />
        </div>

        <div className="space-y-2">
          <div
            className={cn(
              "text-xs uppercase tracking-wider",
              isPrimary
                ? "text-white/70"
                : "text-black/50 dark:text-white/50"
            )}
          >
            Long-term
          </div>

          <Row
            label="Profits"
            value={formatCurrency(gains.ltcg.profits)}
            isPrimary={isPrimary}
          />

          <Row
            label="Losses"
            value={`- ${formatCurrency(gains.ltcg.losses)}`}
            isPrimary={isPrimary}
          />

          <div className="my-1 h-px bg-black/10 dark:bg-white/10" />

          <Row
            label="Net Capital Gains"
            value={formatCurrency(gains.ltcg.net)}
            valueClass="font-semibold"
            isPrimary={isPrimary}
          />
        </div>
      </div>

      <div
        className={cn(
          "mt-5 flex items-center justify-between rounded-xl px-4 py-3",
          isPrimary
            ? "bg-white/10"
            : "bg-black/[0.03] dark:bg-white/5"
        )}
      >
        <span className="text-sm font-medium">
          Realised Capital Gains
        </span>

        <span className="text-lg font-bold tabular-nums">
          {formatCurrency(realised)}
        </span>
      </div>
    </motion.div>
  );
}