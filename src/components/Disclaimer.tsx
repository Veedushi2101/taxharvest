"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export function Disclaimer() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
    rounded-2xl
        border-[1px] border-[#0052fe]
        bg-[rgba(234,242,255,1)]
        dark:bg-[#0F172A]
        dark:border-[#3C9AFF]
        overflow-hidden
        "
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          w-full
          items-center
          justify-between
          px-4
          py-3
          text-left
        "
      >
        <div className="flex items-center gap-2">
          <InfoCircledIcon className="h-5 w-5 text-[#4782ff]" />

          <div>
            <h3 className="font-semibold text-[#000000] dark:text-[#ffffff]">
              Important Notes & Disclaimers
            </h3>
          </div>
        </div>

        <ChevronDown
          className={cn(
            "h-5 w-5 text-[#000000] transition-transform dark:text-[#ffffff]",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className=" border-[#0052FE]/20 px-4 py-2">
          <ul className="text-sm leading-relaxed text-black dark:text-white">
            <li>
              • Tax-loss harvesting is currently not allowed under Indian tax
              regulations. Please consult your tax advisor before making any
              decisions.
            </li>

            <li>
              • Tax harvesting does not apply to derivatives or futures. These
              are handled separately as business income under tax rules.
            </li>

            <li>
              • Price and market value data is fetched from Coingecko, not from
              individual exchanges. As a result, values may slightly differ from
              the ones on your exchange.
            </li>

            <li>
              • Some countries do not have a short-term / long-term bifurcation.
              For now, we are calculating everything as long-term.
            </li>

            <li>
              • Only realized losses are considered for harvesting. Unrealized
              losses in held assets are not counted.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
