"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="rounded-3xl border border-gray-600 px-4 py-2 text-sm"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}