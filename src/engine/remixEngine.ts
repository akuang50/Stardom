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
  const looks = visualForConcept(source.concept);
  return {
    ...group,
    concept: source.concept,
    paletteId: palette.id,
    color: palette.accent,
    slogan: source.signature,
    ...looks,
  };
}

export function visualForConcept(concept: string): Pick<Group, "eraName" | "logoStyle" | "lighting" | "led" | "lightstick"> {
  if (concept === "dark") {
    return { eraName: "MIDNIGHT ERA", logoStyle: "dark", lighting: "spot", led: "grid", lightstick: "crown" };
  }
  if (concept === "summer") {
    return { eraName: "SUNLIT ERA", logoStyle: "dreamy", lighting: "sun", led: "horizon", lightstick: "orb" };
  }
  if (concept === "elegant") {
    return { eraName: "IVORY ERA", logoStyle: "luxury", lighting: "wash", led: "horizon", lightstick: "crystal" };
  }
  if (concept === "fierce") {
    return { eraName: "RAID ERA", logoStyle: "cyber", lighting: "laser", led: "orbit", lightstick: "crown" };
  }
  return { eraName: "AFTERGLOW ERA", logoStyle: "futuristic", lighting: "laser", led: "grid", lightstick: "orb" };
}
