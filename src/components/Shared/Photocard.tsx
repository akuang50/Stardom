import type { Group } from "../../types/group";
import type { Member } from "../../types/member";
import type { MemberLook } from "../../types/look";
import { CharacterPortrait } from "./CharacterPortrait";

export function Photocard({
  member,
  group,
  look,
}: {
  member: Member;
  group: Group;
  look?: Partial<MemberLook>;
}) {
  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <div className="aspect-[3/4]">
        <CharacterPortrait member={member} look={look} />
      </div>
      <div className="p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{group.eraName}</p>
        <p className="font-display text-xl">{member.name}</p>
        <p className="text-xs text-white/60">{member.role} · {group.name}</p>
      </div>
    </article>
  );
}
