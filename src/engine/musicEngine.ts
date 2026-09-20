import { Howl } from "howler";
import { conceptsById } from "../data/concepts";
import type { LineShare, Song } from "../types/song";
import type { Member } from "../types/member";
import { assetUrl, clamp, uid } from "../lib/utils";

let current: Howl | null = null;

export function evenLines(memberIds: string[]): LineShare[] {
  const share = memberIds.length === 0 ? 0 : 100 / memberIds.length;
  return memberIds.map((memberId) => ({ memberId, share }));
}

export function normalizeLines(lines: LineShare[]): LineShare[] {
  const total = lines.reduce((sum, line) => sum + line.share, 0);
  if (total <= 0) {
    const share = lines.length === 0 ? 0 : 100 / lines.length;
    return lines.map((line) => ({ ...line, share }));
  }
  return lines.map((line) => ({
    ...line,
    share: (line.share / total) * 100,
  }));
}

export function setMemberShare(lines: LineShare[], memberId: string, share: number): LineShare[] {
  return normalizeLines(
    lines.map((line) => (line.memberId === memberId ? { ...line, share: clamp(share, 0, 100) } : line)),
  );
}

export function createSong(input: {
  title: string;
  concept: string;
  memberIds: string[];
}): Song {
  const concept = conceptsById[input.concept] ?? conceptsById.neon;
  return {
    id: uid("song"),
    title: input.title.trim() || "Untitled Track",
    concept: concept.id,
    genre: concept.name,
    audioKey: concept.audioKey,
    artwork: concept.artwork,
    lines: evenLines(input.memberIds),
    released: false,
    weekReleased: null,
    streams: 0,
    chartPeak: null,
  };
}

export function scoreSong(song: Song, members: Member[]): number {
  if (members.length === 0) return 40;
  const byId = Object.fromEntries(members.map((member) => [member.id, member]));
  const performance = song.lines.reduce((sum, line) => {
    const member = byId[line.memberId];
    if (!member) return sum;
    const roleBias =
      member.role.includes("Vocal") ? member.vocal :
      member.role.includes("Rap") ? member.rap :
      member.role.includes("Dancer") ? member.dance :
      (member.vocal + member.dance + member.visual) / 3;
    const blend = roleBias * 0.55 + member.charisma * 0.25 + member.dance * 0.2;
    return sum + blend * (line.share / 100);
  }, 0);
  const balancePenalty = lineImbalance(song.lines) * 8;
  return clamp(performance - balancePenalty, 35, 99);
}

function lineImbalance(lines: LineShare[]): number {
  if (lines.length === 0) return 1;
  const expected = 100 / lines.length;
  const variance =
    lines.reduce((sum, line) => sum + (line.share - expected) ** 2, 0) / lines.length;
  return Math.min(1, Math.sqrt(variance) / 40);
}

export function playTrack(audioKey: string): { ok: boolean; error?: string } {
  stopTrack();
  try {
    current = new Howl({
      src: [assetUrl(`music/${audioKey}.wav`)],
      html5: true,
      loop: true,
      volume: 0.7,
      onloaderror: () => {
        current = null;
      },
    });
    current.play();
    return { ok: true };
  } catch {
    return { ok: false, error: "Audio engine unavailable." };
  }
}

export function stopTrack(): void {
  current?.stop();
  current?.unload();
  current = null;
}

export function isPlaying(): boolean {
  return Boolean(current?.playing());
}
