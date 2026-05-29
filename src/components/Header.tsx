import { Wallet } from "lucide-react";

export function Header({ portfolioValue }: { portfolioValue: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-[var(--border)] pb-2">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tax Harvesting
        </h1>

        {/* Hover info */}
        <div className="relative group cursor-pointer">
          <span className="pl-2 text-md text-[#4A78FF] underline decoration-dotted">
            How it works?
          </span>

          <div className="absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 text-xs text-[var(--foreground)] shadow-lg group-hover:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit illo, recusandae tempore sapiente sit molestiae veritatis dignissimos, totam quibusdam dolorum magni temporibus accusantium modi expedita, molestias debitis optio? Doloremque, velit?
          </div>
        </div>
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

        <span className="text-black/60 dark:text-white/60">Portfolio</span>

        <span className="font-semibold tabular-nums">{portfolioValue}</span>
      </div>
    </header>
  );
}
