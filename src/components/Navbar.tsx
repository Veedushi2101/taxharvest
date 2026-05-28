"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

export function Navbar() {
  const { resolvedTheme } = useTheme();
const [mounted, setMounted] = useState(false);

useEffect(() => setMounted(true), []);

if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-6 py-4 shadow-[0px_0px_12px_0px_#1026490F] backdrop-blur-md">
      
      <div className="flex items-center gap-3">
        <Image
          src={
            resolvedTheme === "dark"
              ? "/dark-logo.png"
              : "/light-logo.png"
          }
          alt="Logo"
          width={120}
          height={120}
          priority
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