import { exploreGroups } from "../../data/explore";
import { conceptsById } from "../../data/concepts";

export function RemixBoard({ onRemix }: { onRemix: (id: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {exploreGroups.map((group) => {
        const concept = conceptsById[group.concept];
        return (
          <article key={group.id} className="glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-violet">{concept?.name}</p>
            <h3 className="font-display mt-1 text-2xl font-bold">{group.name}</h3>
            <p className="mt-2 text-sm text-mist/70">{group.signature}</p>
            <p className="mt-3 text-xs text-mist/50">{group.members} members</p>
            <button
              type="button"
              onClick={() => onRemix(group.id)}
              className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm"
            >
              Remix this concept
            </button>
          </article>
        );
      })}
    </div>
  );
}
