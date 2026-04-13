"use client";

import * as React from "react";
import { CommandPalette } from "@/components/ui/command-palette";

export function CommandPaletteMount() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <CommandPalette />;
}
