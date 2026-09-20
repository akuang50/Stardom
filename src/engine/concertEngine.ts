import { venuesById } from "../data/venues";
import type { ConcertRecord } from "../types/concert";
import type { Member } from "../types/member";
import type { Song } from "../types/song";
import { clamp, uid } from "../lib/utils";
import { chemistryBonus } from "./chemistryEngine";
import { scoreSong } from "./musicEngine";

export function simulateConcert(input: {
  venueId: string;
  song: Song | undefined;
  members: Member[];
  week: number;
  fans: number;
  money: number;
}): { concert: ConcertRecord; fans: number; money: number } | { error: string } {
  const venue = venuesById[input.venueId];
  if (!venue) return { error: "Unknown venue." };
  if (input.money < venue.cost) return { error: `Need ${venue.cost.toLocaleString()} to book ${venue.name}.` };
  if (input.fans < venue.minFans) return { error: `${venue.name} wants at least ${venue.minFans.toLocaleString()} fans.` };
  if (!input.song) return { error: "Cut a title track before you take the stage." };

  const quality = scoreSong(input.song, input.members);
  const chem = chemistryBonus(input.members);
  const demand = input.fans * (0.045 + quality / 900 + chem / 500);
  const attendance = clamp(Math.round(demand), 40, venue.capacity);
  const soldOut = attendance >= venue.capacity * 0.96;
  const gate = venue.ticket > 0 ? attendance * venue.ticket : Math.round(18_000 + quality * 280);
  const moneyDelta = gate - venue.cost;
  const fansDelta = Math.round(attendance * 0.22 + quality * 40 + (soldOut ? 8_000 : 1_200));

  return {
    concert: {
      id: uid("show"),
      venueId: venue.id,
      songTitle: input.song.title,
      week: input.week,
      attendance,
      capacity: venue.capacity,
      soldOut,
      fansDelta,
      moneyDelta,
    },
    fans: input.fans + fansDelta,
    money: input.money + moneyDelta,
  };
}
