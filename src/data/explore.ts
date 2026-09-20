export interface ExploreGroup {
  id: string;
  name: string;
  concept: string;
  members: number;
  signature: string;
}

export const exploreGroups: ExploreGroup[] = [
  {
    id: "aurora-9",
    name: "AURORA-9",
    concept: "elegant",
    members: 9,
    signature: "String-led title tracks and slow-bloom choreography.",
  },
  {
    id: "black-velvet",
    name: "BLACK VELVET",
    concept: "dark",
    members: 4,
    signature: "Noir R&B, whispered rap verses, couture black.",
  },
  {
    id: "sunburst",
    name: "SUNBURST",
    concept: "summer",
    members: 6,
    signature: "Festival pop with brass hits and soda-ad energy.",
  },
  {
    id: "void-girls",
    name: "VOID GIRLS",
    concept: "fierce",
    members: 5,
    signature: "Industrial pop and formations that look like a raid.",
  },
];
