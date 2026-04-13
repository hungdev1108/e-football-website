"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number;
  glare?: boolean;
  children: React.ReactNode;
}

export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
  ...rest
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = React.useState(false);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 180,
    damping: 18,
  });

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]: number[]) =>
      `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.18), transparent 55%)`,
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
    setHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative will-change-transform ${className || ""}`}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: glareBg,
            opacity: hovering ? 1 : 0,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </motion.div>
  );
}
