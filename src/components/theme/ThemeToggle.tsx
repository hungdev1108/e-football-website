"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : undefined;
  const isDark = current === "dark";

  const toggle = React.useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Bật chế độ sáng" : "Bật chế độ tối"}
      className={`relative overflow-hidden rounded-full border border-border/50 bg-background/40 backdrop-blur hover:bg-accent/40 transition-colors ${
        className || ""
      }`}
    >
      <Sun
        className={`h-[1.15rem] w-[1.15rem] transition-all duration-500 ${
          mounted && isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-500 ${
          mounted && isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </Button>
  );
}
