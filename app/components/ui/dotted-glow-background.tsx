import type { CSSProperties } from "react";

import { cn } from "~/lib/utils";

type DottedGlowBackgroundProps = {
  className?: string;
  opacity?: number;
  gap?: number;
  radius?: number;
  backgroundOpacity?: number;
  speedScale?: number;
};

export function DottedGlowBackground({
  className,
  opacity = 1,
  gap = 14,
  radius = 1.35,
  backgroundOpacity = 0,
  speedScale = 1,
}: DottedGlowBackgroundProps) {
  const style = {
    "--dot-gap": `${gap}px`,
    "--dot-radius": `${radius}px`,
    "--dot-opacity": opacity,
    "--dot-bg-opacity": backgroundOpacity,
    "--dot-speed": `${Math.max(speedScale, 0.2) * 16}s`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn("dotted-glow-layer", className)}
    />
  );
}
