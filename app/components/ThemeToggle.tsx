"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-6 w-20 mt-6" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 font-mono text-xs tracking-[0.1em] text-muted hover:text-gold transition-colors duration-200 mt-6"
    >
      {isDark ? (
        <>
          <Sun size={14} />
          LIGHT
        </>
      ) : (
        <>
          <Moon size={14} />
          DARK
        </>
      )}
    </button>
  );
}
