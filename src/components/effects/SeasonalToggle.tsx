"use client";

import * as React from "react";
import { Snowflake, Flower2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useSeasonalEffects } from "./SeasonalEffects";

export function SeasonalToggle({ className }: { className?: string }) {
  const { enabled, toggle, mounted } = useSeasonalEffects();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (!mounted) {
    return (
      <button
        type="button"
        className={`h-9 w-9 rounded-full border border-border/50 bg-background/40 ${className || ""}`}
        aria-label="Effects"
      />
    );
  }

  const Icon = isDark ? Snowflake : Flower2;
  const label = isDark
    ? enabled
      ? "Tắt hiệu ứng tuyết"
      : "Bật hiệu ứng tuyết"
    : enabled
      ? "Tắt hiệu ứng hoa anh đào"
      : "Bật hiệu ứng hoa anh đào";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={enabled}
      title={label}
      className={`group relative inline-flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background/40 backdrop-blur transition-colors hover:bg-accent/40 ${className || ""}`}
    >
      <Icon
        className={`h-[1.05rem] w-[1.05rem] transition-all ${
          enabled
            ? isDark
              ? "text-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.55)]"
              : "text-pink-500 drop-shadow-[0_0_6px_rgba(244,114,182,0.55)]"
            : "text-foreground/50"
        } group-hover:scale-110`}
      />
      {enabled && (
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-pink-400/20 dark:ring-cyan-400/20" />
      )}
    </button>
  );
}
