export type HairCut = "wave" | "crop" | "pony" | "bob" | "twins" | "wolf";
export type StageStyle = "elegant" | "street" | "futuristic" | "retro";
export type OutfitLook = "stage" | "mv" | "award" | "casual";
export type LogoStyle = "minimal" | "futuristic" | "luxury" | "cute" | "dark" | "retro" | "cyber" | "dreamy";
export type LogoSymbol = "star" | "orbit" | "heart" | "bolt" | "moon";
export type LightstickShape = "orb" | "crown" | "crystal";
export type LightingMode = "spot" | "wash" | "laser" | "sun";
export type LedMode = "grid" | "horizon" | "orbit";

export interface MemberLook {
  hair: HairCut;
  hairColor: string;
  style: StageStyle;
  outfit: OutfitLook;
}

export const hairOptions: { id: HairCut; label: string }[] = [
  { id: "wave", label: "Long" },
  { id: "crop", label: "Short" },
  { id: "bob", label: "Bob" },
  { id: "pony", label: "Ponytail" },
  { id: "twins", label: "Twin" },
  { id: "wolf", label: "Wolf" },
];

export const styleOptions: { id: StageStyle; label: string }[] = [
  { id: "elegant", label: "Elegant" },
  { id: "street", label: "Street" },
  { id: "futuristic", label: "Futuristic" },
  { id: "retro", label: "Retro" },
];

export const outfitOptions: { id: OutfitLook; label: string }[] = [
  { id: "stage", label: "Stage" },
  { id: "mv", label: "MV" },
  { id: "award", label: "Award" },
  { id: "casual", label: "Casual" },
];

export const hairColors = ["#1a1220", "#4a2c18", "#c9a24a", "#ff4fd8", "#7ad9b8", "#6f8fff", "#6b4ca0", "#e23d4a", "#c8d0dc"];

export const defaultLooks: Record<string, MemberLook> = {
  nova: { hair: "wave", hairColor: "#2a1020", style: "elegant", outfit: "stage" },
  rin: { hair: "crop", hairColor: "#1b2430", style: "street", outfit: "mv" },
  mira: { hair: "pony", hairColor: "#3b2158", style: "futuristic", outfit: "stage" },
  sage: { hair: "bob", hairColor: "#c9a24a", style: "elegant", outfit: "award" },
  yuna: { hair: "twins", hairColor: "#7ad9b8", style: "elegant", outfit: "casual" },
  kai: { hair: "crop", hairColor: "#d45a28", style: "street", outfit: "stage" },
  hana: { hair: "wolf", hairColor: "#8a2038", style: "street", outfit: "mv" },
  jules: { hair: "bob", hairColor: "#6f8fff", style: "elegant", outfit: "award" },
  aera: { hair: "wave", hairColor: "#f0b7d4", style: "elegant", outfit: "casual" },
  theo: { hair: "crop", hairColor: "#1c2744", style: "street", outfit: "mv" },
  lumi: { hair: "pony", hairColor: "#f0d25a", style: "futuristic", outfit: "stage" },
  vesper: { hair: "wave", hairColor: "#6b4ca0", style: "retro", outfit: "mv" },
  niko: { hair: "wolf", hairColor: "#1f8f7a", style: "street", outfit: "casual" },
  sol: { hair: "bob", hairColor: "#f0a04a", style: "futuristic", outfit: "stage" },
};

export function resolveLook(id: string, override?: Partial<MemberLook>): MemberLook {
  const base = defaultLooks[id] ?? {
    hair: "bob" as const,
    hairColor: "#1a1220",
    style: "elegant" as const,
    outfit: "stage" as const,
  };
  const look = { ...base, ...override };
  return look;
}
