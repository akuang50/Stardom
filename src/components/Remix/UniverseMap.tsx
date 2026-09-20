import { exploreGroups } from "../../data/explore";
import type { Group } from "../../types/group";

export function UniverseMap({ group }: { group: Group | null }) {
  return (
    <section className="glass rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--theme-secondary)]">STARDOM universe</p>
      <h2 className="font-display mt-1 text-3xl font-bold">Starline agencies</h2>
      <div className="mt-6 flex flex-col items-center gap-6">
        <div className="rounded-full border border-white/20 px-6 py-3 font-display text-xl">STARLINE</div>
        <div className="h-8 w-px bg-white/20" />
        <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {group ? (
            <Node name={group.name} detail={`${group.eraName} · ${group.concept}`} accent={group.color} />
          ) : null}
          {exploreGroups.map((item) => (
            <Node key={item.id} name={item.name} detail={item.concept} accent="#9b6dff" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Node({ name, detail, accent }: { name: string; detail: string; accent: string }) {
  return (
    <article className="rounded-2xl border border-white/10 p-4" style={{ boxShadow: `inset 0 0 0 1px ${accent}33` }}>
      <p className="font-display text-xl" style={{ color: accent }}>
        {name}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mist/50">{detail}</p>
    </article>
  );
}
