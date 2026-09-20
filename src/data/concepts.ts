export interface Concept {
  id: string;
  name: string;
  palette: string;
  mood: string;
  audioKey: string;
  artwork: string;
}

export const concepts: Concept[] = [
  {
    id: "neon",
    name: "Neon Pop",
    palette: "hot pink / cyan",
    mood: "Maximal, glittering, city-night.",
    audioKey: "neon-pop-demo",
    artwork: "neonix-cover.svg",
  },
  {
    id: "dark",
    name: "Dark R&B",
    palette: "violet / black",
    mood: "Velvet, nocturnal, cinematic.",
    audioKey: "dark-rnb-demo",
    artwork: "dark-cover.svg",
  },
  {
    id: "summer",
    name: "Summer Pop",
    palette: "gold / coral",
    mood: "Sun-washed, sticky-sweet, festival.",
    audioKey: "summer-pop-demo",
    artwork: "summer-cover.svg",
  },
  {
    id: "elegant",
    name: "Elegant",
    palette: "ivory / gold",
    mood: "Couture, restrained, high-art.",
    audioKey: "dark-rnb-demo",
    artwork: "dark-cover.svg",
  },
  {
    id: "fierce",
    name: "Fierce",
    palette: "crimson / chrome",
    mood: "Sharper formations, title-track attitude.",
    audioKey: "neon-pop-demo",
    artwork: "neonix-cover.svg",
  },
];

export const conceptsById = Object.fromEntries(
  concepts.map((concept) => [concept.id, concept]),
) as Record<string, Concept>;
