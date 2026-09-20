import { charactersById } from "../data/characters";
import { defaultPaletteId } from "../data/palettes";
import type { Member } from "../types/member";
import { uid } from "../lib/utils";
import type { Group } from "../types/group";

export function createGroupDraft(partial: {
  name: string;
  concept: string;
  fandomName: string;
  color: string;
  paletteId?: string;
  memberIds: string[];
}): Group {
  return {
    id: uid("group"),
    name: partial.name.trim() || "UNTITLED",
    concept: partial.concept,
    fandomName: partial.fandomName.trim() || "STARS",
    color: partial.color,
    paletteId: partial.paletteId ?? defaultPaletteId,
    memberIds: partial.memberIds,
    debuted: false,
  };
}

export function resolveMembers(memberIds: string[]): Member[] {
  return memberIds
    .map((id) => charactersById[id])
    .filter((member): member is Member => Boolean(member));
}

export function averageStat(members: Member[], key: keyof Pick<Member, "vocal" | "dance" | "rap" | "visual" | "charisma">): number {
  if (members.length === 0) return 0;
  return members.reduce((sum, member) => sum + member[key], 0) / members.length;
}
