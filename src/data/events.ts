export interface CareerEvent {
  id: string;
  title: string;
  description: string;
  fansDelta: number;
  moneyDelta: number;
  minWeek: number;
}

export const events: CareerEvent[] = [
  {
    id: "variety-clip",
    title: "Variety clip goes viral",
    description: "A 12-second dance fail becomes the week's most stitched sound.",
    fansDelta: 18000,
    moneyDelta: 4000,
    minWeek: 1,
  },
  {
    id: "music-show",
    title: "Music show nomination",
    description: "The title track lands a first-week trophy nomination.",
    fansDelta: 26000,
    moneyDelta: 12000,
    minWeek: 2,
  },
  {
    id: "fancam",
    title: "Fancam ranking war",
    description: "Fans clip every member. The algorithm cannot choose a bias.",
    fansDelta: 14000,
    moneyDelta: 2000,
    minWeek: 1,
  },
  {
    id: "radio",
    title: "Late-night radio live",
    description: "An acoustic bridge version leaks from a campus radio booth.",
    fansDelta: 9000,
    moneyDelta: 1500,
    minWeek: 3,
  },
  {
    id: "brand-deal",
    title: "Capsule streetwear drop",
    description: "A limited hoodie with the fandom color sells out in forty minutes.",
    fansDelta: 7000,
    moneyDelta: 28000,
    minWeek: 4,
  },
  {
    id: "tour-rumor",
    title: "Showcase rumor",
    description: "A venue listing appears, then disappears. The fandom does not sleep.",
    fansDelta: 22000,
    moneyDelta: 0,
    minWeek: 5,
  },
  {
    id: "challenge",
    title: "Challenge explosion",
    description: "The chorus hook becomes a phone-camera ritual worldwide.",
    fansDelta: 41000,
    moneyDelta: 9000,
    minWeek: 2,
  },
];
