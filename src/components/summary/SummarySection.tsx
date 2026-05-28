"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CapitalGains } from "@/types";
import { calculateRealisedGains } from "@/lib/calculations";
import { formatCurrency } from "@/lib/formatters";
import { SummaryCard } from "./SummaryCard";

interface Props {
  preHarvest: CapitalGains;
  postHarvest: CapitalGains;
}

export function SummarySection({ preHarvest, postHarvest }: Props) {
  const preRealised = calculateRealisedGains(preHarvest);
  const postRealised = calculateRealisedGains(postHarvest);
  const savings = preRealised - postRealised;

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {savings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success"
          >
            <Sparkles className="h-4 w-4" />
            You&apos;re going to save {formatCurrency(savings)}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SummaryCard title="Pre Harvesting" gains={preHarvest} realised={preRealised} />
        <SummaryCard title="After Harvesting" gains={postHarvest} variant="primary" realised={postRealised} />
      </div>
    </div>
  );
}
