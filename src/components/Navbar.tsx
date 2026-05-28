"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";

export function Navbar() {
  const { theme } = useTheme();

  return (
    <nav
      className="sticky top-0 z-50 w-full flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-6
    py-4 shadow-[0px_0px_12px_0px_#1026490F] backdrop-blur-md
"
    >
      <div className="flex items-center gap-3">
        <Image
          src={
            theme === "dark"
              ? "/logo-dark.png"
              : "/logo-light.png"
          }
          alt="Logo"
          width={40}
          height={40}
          priority
          className="h-auto"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-black/60 dark:text-white/60">
          <ThemeToggle />
        </span>
      </div>
    </nav>
  );
}