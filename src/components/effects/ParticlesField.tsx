"use client";

import * as React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticlesField({
  className,
  density = 50,
}: {
  className?: string;
  density?: number;
}) {
  const [ready, setReady] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mql.matches);
      const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
  }, []);

  React.useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  const options: ISourceOptions = React.useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: density, density: { enable: true, width: 1200, height: 800 } },
        color: { value: ["#22d3ee", "#a855f7", "#f472b6"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.15, max: 0.6 },
          animation: { enable: true, speed: 0.6, sync: false },
        },
        size: {
          value: { min: 0.6, max: 2.2 },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { default: "out" },
          random: true,
          straight: false,
        },
        links: {
          enable: true,
          distance: 140,
          color: "#a855f7",
          opacity: 0.18,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.4 } },
        },
      },
    }),
    [density],
  );

  if (reduced || !ready) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className || ""}`}>
      <Particles id="efb-particles" options={options} className="h-full w-full" />
    </div>
  );
}
