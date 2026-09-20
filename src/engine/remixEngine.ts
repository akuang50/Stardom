import { palettesById } from "../data/palettes";
import { exploreGroups } from "../data/explore";
import type { Group } from "../types/group";

const explorePalettes: Record<string, string> = {
  "aurora-9": "navy-pearl",
  "black-velvet": "galaxy-violet",
  sunburst: "sunshine-coral",
  "void-girls": "chrome-street",
};

export function remixFromExplore(group: Group, exploreId: string): Group {
  const source = exploreGroups.find((item) => item.id === exploreId);
  if (!source) return group;
  const palette = palettesById[explorePalettes[exploreId] ?? ""] ?? palettesById["ink-pink"];
  return {
    ...group,
    concept: source.concept,
    paletteId: palette.id,
    color: palette.accent,
  };
}
