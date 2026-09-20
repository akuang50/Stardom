import { motion } from "framer-motion";
import type { MemberLook } from "../../types/look";
import type { Member } from "../../types/member";
import { CharacterPortrait } from "./CharacterPortrait";
import { MemberStats } from "./StatBar";

export function MemberCard({
  member,
  selected = false,
  onToggle,
  look,
}: {
  member: Member;
  selected?: boolean;
  onToggle?: () => void;
  look?: Partial<MemberLook>;
}) {
  const className = `photocard w-full overflow-hidden rounded-3xl border p-4 text-left transition ${
    selected ? "border-[var(--theme-accent)] shadow-[0_0_0_1px_var(--theme-accent)]" : "border-white/10"
  }`;
  const body = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">{member.role}</p>
          <h3 className="font-display mt-1 text-2xl font-bold">{member.name}</h3>
        </div>
        <span className="rounded-full bg-black/35 px-2 py-1 text-xs">{member.nationality}</span>
      </div>
      <div className="mt-5 aspect-[5/6] overflow-hidden rounded-2xl">
        <CharacterPortrait member={member} look={look} />
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-white/70">{member.bio}</p>
      <div className="mt-4">
        <MemberStats member={member} />
      </div>
    </>
  );

  if (onToggle) {
    return (
      <motion.button
        type="button"
        onClick={onToggle}
        whileHover={{ y: -6 }}
        className={className}
        style={{ ["--member-color" as string]: member.color }}
      >
        {body}
      </motion.button>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={className}
      style={{ ["--member-color" as string]: member.color }}
    >
      {body}
    </motion.article>
  );
}
