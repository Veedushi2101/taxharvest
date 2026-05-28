import { Wallet } from "lucide-react";

export function Header({ portfolioValue }: { portfolioValue: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-[var(--border)] pb-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Tax Harvesting
        </h1>

        <p className="text-sm text-black/50 dark:text-white/50">
          Reduce your capital gains tax legally and intelligently.
        </p>
      </div>

      <div
        className="
        flex
        items-center
        gap-2
        rounded-full
        border
        border-[var(--border)]
        bg-[var(--card)]
        px-3
        py-1.5
        text-sm
        shadow-sm
      "
      >
        <Wallet className="h-4 w-4 text-[#0066FE]" />

        <span className="text-black/60 dark:text-white/60">
          Portfolio
        </span>

        <span className="font-semibold tabular-nums">
          {portfolioValue}
        </span>
      </div>
    </header>
  );
}