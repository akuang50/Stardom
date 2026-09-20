import type { CSSProperties } from "react";
import type { GroupPalette } from "../data/palettes";

export function paletteStyle(palette: GroupPalette): CSSProperties {
  return {
    ["--theme-ink" as string]: palette.ink,
    ["--theme-mist" as string]: palette.mist,
    ["--theme-accent" as string]: palette.accent,
    ["--theme-secondary" as string]: palette.secondary,
    ["--theme-glow" as string]: palette.glow,
  };
}
