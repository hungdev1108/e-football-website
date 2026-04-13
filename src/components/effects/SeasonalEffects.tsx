"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadEmojiShape } from "@tsparticles/shape-emoji";
import type { ISourceOptions } from "@tsparticles/engine";

const STORAGE_KEY = "efb-seasonal-effects";

// ---------- shared state via React Context ----------

interface SeasonalContextValue {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
  mounted: boolean;
}

const SeasonalContext = React.createContext<SeasonalContextValue | null>(null);

export function SeasonalEffectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabledState] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v !== null) setEnabledState(v === "1");
    } catch {}
  }, []);

  const setEnabled = React.useCallback((v: boolean) => {
    setEnabledState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {}
  }, []);

  const toggle = React.useCallback(() => {
    setEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ enabled, setEnabled, toggle, mounted }),
    [enabled, setEnabled, toggle, mounted],
  );

  return (
    <SeasonalContext.Provider value={value}>
      {children}
    </SeasonalContext.Provider>
  );
}

export function useSeasonalEffects(): SeasonalContextValue {
  const ctx = React.useContext(SeasonalContext);
  if (!ctx) {
    // Fallback so the hook doesn't throw if used outside provider
    return {
      enabled: false,
      setEnabled: () => {},
      toggle: () => {},
      mounted: false,
    };
  }
  return ctx;
}

// ---------- engine init (module-level singleton) ----------

let engineInitPromise: Promise<void> | null = null;
function initEngine() {
  if (!engineInitPromise) {
    engineInitPromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadEmojiShape(engine);
    });
  }
  return engineInitPromise;
}

// ---------- the effect layer ----------

export function SeasonalEffects() {
  const { enabled, mounted } = useSeasonalEffects();
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [engineReady, setEngineReady] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    initEngine().then(() => {
      if (!cancelled) setEngineReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isDark = resolvedTheme === "dark";

  const options: ISourceOptions = React.useMemo(() => {
    if (isDark) {
      // ❄️ Blue snowflake — tiny, straight down
      return {
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
          number: {
            value: 45,
            density: { enable: true, width: 1200, height: 800 },
          },
          shape: {
            type: "emoji",
            options: {
              emoji: { value: "❄️" },
            },
          },
          opacity: {
            value: { min: 0.6, max: 1 },
          },
          size: {
            value: { min: 5, max: 8 },
          },
          move: {
            enable: true,
            speed: { min: 2.5, max: 3.0 },
            direction: "bottom",
            outModes: { default: "out" },
            straight: true,
          },
        },
        interactivity: {
          events: { resize: { enable: true } },
        },
      };
    }

    // 🌸 Sakura — tiny, straight down
    return {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: 30,
          density: { enable: true, width: 1200, height: 800 },
        },
        shape: {
          type: "emoji",
          options: {
            emoji: { value: "🌸" },
          },
        },
        opacity: {
          value: { min: 0.75, max: 1 },
        },
        size: {
          value: { min: 5, max: 8 },
        },
        move: {
          enable: true,
          speed: { min: 2.5, max: 3.0 },
          direction: "bottom",
          outModes: { default: "out" },
          straight: true,
        },
      },
      interactivity: {
        events: { resize: { enable: true } },
      },
    };
  }, [isDark]);

  // Hide on admin routes
  const onAdmin = pathname?.startsWith("/admin") ?? false;
  if (onAdmin) return null;

  if (!mounted || !enabled || reduced || !engineReady) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden="true"
    >
      <Particles
        id="efb-seasonal"
        options={options}
        className="h-full w-full"
      />
    </div>
  );
}
