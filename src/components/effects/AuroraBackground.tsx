"use client";

import * as React from "react";

export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain-overlay"
    >
      <div className="absolute inset-0 bg-background" />

      {/* Radial gradient base */}
      <div
        className="absolute inset-0 opacity-70 dark:opacity-80"
        style={{
          background:
            "radial-gradient(1200px 600px at 12% -10%, rgb(var(--neon-violet) / 0.22), transparent 60%), radial-gradient(900px 500px at 95% 8%, rgb(var(--neon-cyan) / 0.2), transparent 55%), radial-gradient(700px 400px at 50% 110%, rgb(var(--neon-pink) / 0.12), transparent 60%)",
        }}
      />

      {/* Floating blobs */}
      <div
        className="aurora-blob absolute -top-24 left-[10%] h-[420px] w-[420px] rounded-full blur-3xl opacity-40 dark:opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--neon-violet) / 0.55), transparent 65%)",
        }}
      />
      <div
        className="aurora-blob absolute top-[30%] right-[5%] h-[380px] w-[380px] rounded-full blur-3xl opacity-35 dark:opacity-55"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--neon-cyan) / 0.5), transparent 65%)",
          animationDelay: "4s",
        }}
      />
      <div
        className="aurora-blob absolute bottom-[-10%] left-[35%] h-[500px] w-[500px] rounded-full blur-3xl opacity-30 dark:opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--neon-pink) / 0.4), transparent 65%)",
          animationDelay: "8s",
        }}
      />
    </div>
  );
}
