import type { Member } from "../../types/member";

export function StatBar({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-mist/55">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: color ?? "#ff2d95" }}
        />
      </div>
    </div>
  );
}

export function MemberStats({ member }: { member: Member }) {
  return (
    <div className="grid gap-2">
      <StatBar label="Vocal" value={member.vocal} color="#ff2d95" />
      <StatBar label="Dance" value={member.dance} color="#3cefff" />
      <StatBar label="Rap" value={member.rap} color="#9b6dff" />
      <StatBar label="Visual" value={member.visual} color="#f4c45a" />
    </div>
  );
}
