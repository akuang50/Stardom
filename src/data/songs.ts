export interface CatalogSong {
  id: string;
  title: string;
  concept: string;
  genre: string;
  audioKey: string;
  artwork: string;
}

export const catalogSongs: CatalogSong[] = [
  {
    id: "neon-heart",
    title: "NEON HEART",
    concept: "neon",
    genre: "Neon Pop",
    audioKey: "neon-pop-demo",
    artwork: "neonix-cover.svg",
  },
  {
    id: "midnight-static",
    title: "Midnight Static",
    concept: "dark",
    genre: "Dark R&B",
    audioKey: "dark-rnb-demo",
    artwork: "dark-cover.svg",
  },
  {
    id: "sunspill",
    title: "Sunspill",
    concept: "summer",
    genre: "Summer Pop",
    audioKey: "summer-pop-demo",
    artwork: "summer-cover.svg",
  },
];
