export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity: number;
  cost: number;
  minFans: number;
  ticket: number;
  image: string;
  vibe: string;
}

export const venues: Venue[] = [
  {
    id: "showcase",
    name: "Starline Hall",
    city: "Seoul",
    capacity: 800,
    cost: 18_000,
    minFans: 1_000,
    ticket: 48,
    image: "concerts/venue-showcase.jpg",
    vibe: "Fog, close faces, debut-night heat.",
  },
  {
    id: "studio",
    name: "Pulse Music Show",
    city: "Seoul",
    capacity: 420,
    cost: 12_000,
    minFans: 8_000,
    ticket: 0,
    image: "concerts/venue-studio.jpg",
    vibe: "Broadcast stage. Cameras, LED wall, live vote.",
  },
  {
    id: "arena",
    name: "NX Arena",
    city: "Incheon",
    capacity: 12_000,
    cost: 88_000,
    minFans: 40_000,
    ticket: 96,
    image: "concerts/venue-arena.jpg",
    vibe: "The first real lightstick ocean.",
  },
  {
    id: "stadium",
    name: "Afterglow Stadium",
    city: "Busan",
    capacity: 42_000,
    cost: 210_000,
    minFans: 140_000,
    ticket: 142,
    image: "concerts/venue-stadium.jpg",
    vibe: "Night sky, LED towers, encore forever.",
  },
];

export const venuesById = Object.fromEntries(venues.map((venue) => [venue.id, venue])) as Record<string, Venue>;
