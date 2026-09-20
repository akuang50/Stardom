import type { Group } from "../../types/group";
import type { Member } from "../../types/member";
import type { MemberLook } from "../../types/look";
import { CharacterPortrait } from "./CharacterPortrait";
import { assetUrl } from "../../lib/utils";

export function PerformanceStage({
  group,
  members,
  looks,
  activeId,
  playing,
}: {
  group: Group;
  members: Member[];
  looks: Record<string, MemberLook>;
  activeId?: string;
  playing: boolean;
}) {
  const lights = lightColors(group);
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10">
      <div className="relative min-h-[360px] bg-black">
        <img src={assetUrl("concerts/venue-arena.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <img src={assetUrl("concerts/crowd.jpg")} alt="" className="absolute inset-x-0 bottom-0 h-1/3 w-full object-cover opacity-70" />
        <div
          className="absolute inset-x-8 top-6 h-16 rounded-full opacity-70"
          style={{
            background:
              group.led === "horizon"
                ? `linear-gradient(90deg, transparent, ${group.color}, transparent)`
                : `repeating-linear-gradient(90deg, ${group.color} 0 8px, transparent 8px 18px)`,
          }}
        />
        {lights.map((light, index) => (
          <span
            key={light}
            className={`absolute top-24 h-40 w-24 blur-2xl ${playing ? "animate-pulse" : ""}`}
            style={{ left: `${18 + index * 22}%`, background: light, opacity: 0.45 }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-10 flex items-end justify-center gap-3 px-6">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="w-16 overflow-hidden rounded-2xl border transition sm:w-24"
              style={{
                borderColor: member.id === activeId ? member.color : "transparent",
                transform: playing ? `translateY(${index % 2 === 0 ? -10 : 6}px)` : undefined,
              }}
            >
              <CharacterPortrait member={member} look={looks[member.id]} label={false} />
            </div>
          ))}
        </div>
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/70">
          {group.name} · {group.eraName}
        </p>
      </div>
    </section>
  );
}

function lightColors(group: Group): string[] {
  if (group.lighting === "sun") return ["#f4c45a", "#ff8a4c", "#fff1c4"];
  if (group.lighting === "spot") return ["#ff2d55", "#3a0c12", "#ffffff"];
  if (group.lighting === "wash") return ["#7ad7ff", "#9b6dff", "#ffd0ef"];
  return ["#ff2d95", "#3cefff", "#b388ff"];
}
