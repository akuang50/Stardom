import type { Group } from "./group";
import type { Member } from "./member";
import type { Song } from "./song";
import type { MemberLook } from "./look";
import type { ConcertRecord } from "./concert";

export interface CareerLogEntry {
  id: string;
  week: number;
  title: string;
  description: string;
  fansDelta: number;
  moneyDelta: number;
}

export interface GameSettings {
  audioEnabled: boolean;
  directorOffline: boolean;
}

export interface GameSnapshot {
  group: Group | null;
  memberIds: string[];
  songs: Song[];
  week: number;
  money: number;
  fans: number;
  careerLog: CareerLogEntry[];
  settings: GameSettings;
  demoMode: boolean;
  looks: Record<string, MemberLook>;
  concerts: ConcertRecord[];
}

export type { Group, Member, Song };
