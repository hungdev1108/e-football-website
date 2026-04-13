"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "span";
}

const baseVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
});

export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  as = "div",
}: ScrollRevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={baseVariants(y)}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "section" | "ul";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div variants={baseVariants(y)} className={className}>
      {children}
    </motion.div>
  );
}
