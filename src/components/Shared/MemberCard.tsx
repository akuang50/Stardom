import { motion } from "framer-motion";
import type { Member } from "../../types/member";
import { MemberStats } from "./StatBar";

export function MemberCard({
  member,
  selected = false,
  onToggle,
}: {
  member: Member;
  selected?: boolean;
  onToggle?: () => void;
}) {
  const className = `photocard w-full overflow-hidden rounded-3xl border p-4 text-left transition ${
    selected ? "border-pink shadow-[0_0_0_1px_#ff2d95]" : "border-white/10"
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
      <div className="mt-5 grid h-28 place-items-center rounded-2xl bg-black/25 font-display text-5xl font-extrabold text-white/90">
        {member.name.slice(0, 1)}
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
