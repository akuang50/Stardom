import { events } from "../data/events";
import type { CareerLogEntry } from "../types/game";
import type { Member } from "../types/member";
import type { Song } from "../types/song";
import { clamp, uid } from "../lib/utils";
import { scoreSong } from "./musicEngine";
import { chemistryBonus } from "./chemistryEngine";

export interface WeekResult {
  entry: CareerLogEntry;
  fans: number;
  money: number;
  songs: Song[];
}

export function simulateRelease(song: Song, members: Member[], week: number, fans: number, money: number): {
  song: Song;
  fans: number;
  money: number;
  entry: CareerLogEntry;
} {
  const quality = scoreSong(song, members);
  const chem = chemistryBonus(members);
  const streams = Math.round((40_000 + fans * 1.8) * (quality / 70) * (1 + chem / 200));
  const peak = clamp(Math.round(50 - quality * 0.42 - Math.log10(streams + 10) * 4), 1, 49);
  const fansDelta = Math.round(12_000 + quality * 400 + chem * 80);
  const moneyDelta = Math.round(8_000 + streams * 0.04);

  return {
    song: {
      ...song,
      released: true,
      weekReleased: week,
      streams,
      chartPeak: peak,
    },
    fans: fans + fansDelta,
    money: money + moneyDelta,
    entry: {
      id: uid("log"),
      week,
      title: `${song.title} drops`,
      description: `Quality ${Math.round(quality)}. Peak #${peak}. ${streams.toLocaleString()} first-week streams.`,
      fansDelta,
      moneyDelta,
    },
  };
}

export function simulateWeek(week: number, fans: number, money: number, songs: Song[]): WeekResult {
  const pool = events.filter((event) => week >= event.minWeek);
  const event = pool[week % pool.length] ?? events[0];
  const catalogBoost = songs.some((song) => song.released) ? 1 : 0.35;
  const fansDelta = Math.round(event.fansDelta * catalogBoost);
  const moneyDelta = Math.round(event.moneyDelta * catalogBoost);

  return {
    fans: fans + fansDelta,
    money: money + moneyDelta,
    songs: songs.map((song) =>
      song.released
        ? { ...song, streams: song.streams + Math.round(song.streams * 0.08) }
        : song,
    ),
    entry: {
      id: uid("log"),
      week,
      title: event.title,
      description: event.description,
      fansDelta,
      moneyDelta,
    },
  };
}
