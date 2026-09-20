import type { Group } from "../../types/group";
import type { Member } from "../../types/member";
import { CharacterPortrait } from "../Shared/CharacterPortrait";

const shots = ["OPENING", "SOLO", "DANCE", "STORY", "CLIMAX", "FINALE"];

export function Storyboard({ group, members }: { group: Group; members: Member[] }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--theme-accent)]">MV storyboard</p>
      <h2 className="font-display mt-1 text-3xl font-bold">Six shots. One era.</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {shots.map((shot, index) => {
          const member = members[index % members.length];
          return (
            <article key={shot} className="overflow-hidden rounded-2xl border border-white/10">
              <div className="relative h-36">
                {member ? <CharacterPortrait member={member} label={false} /> : null}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(180deg, transparent, ${group.color}99)` }}
                />
                <p className="font-display absolute bottom-2 left-3 text-xl text-white">{member?.name}</p>
              </div>
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-mist/50">Shot 0{index + 1}</p>
                <p className="font-semibold">{shot}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
