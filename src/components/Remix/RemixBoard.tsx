import { conceptsById } from "../../data/concepts";
import { exploreGroups } from "../../data/explore";
import type { Group } from "../../types/group";
import { AlbumArt } from "../Shared/AlbumArt";

export function RemixBoard({
  onRemix,
  group,
}: {
  onRemix: (id: string) => void;
  group: Group | null;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {exploreGroups.map((item) => {
        const concept = conceptsById[item.concept];
        const preview = {
          name: item.name,
          color: group?.color ?? "#9b6dff",
          concept: item.concept,
        };
        return (
          <article key={item.id} className="glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-violet">{concept?.name}</p>
            <h3 className="font-display mt-1 text-2xl font-bold">{item.name}</h3>
            <p className="mt-2 text-sm text-mist/70">{item.signature}</p>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="overflow-hidden rounded-2xl">
                <AlbumArt song={{ title: "ORIGINAL", concept: item.concept }} group={{ name: item.name, color: "#9b6dff" }} />
                <p className="mt-1 text-center text-[10px] uppercase tracking-[0.16em] text-mist/50">Original</p>
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--theme-accent)]">Remix</p>
              <div className="overflow-hidden rounded-2xl">
                <AlbumArt
                  song={{ title: "YOURS", concept: group?.concept ?? item.concept }}
                  group={{ name: group?.name ?? "YOUR UNIT", color: group?.color ?? preview.color }}
                />
                <p className="mt-1 text-center text-[10px] uppercase tracking-[0.16em] text-mist/50">Your version</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-mist/50">{item.members} members · {concept?.mood}</p>
            <button
              type="button"
              onClick={() => onRemix(item.id)}
              disabled={!group}
              className="mt-4 rounded-full bg-white/10 px-4 py-2 text-sm disabled:opacity-40"
            >
              Remix this concept
            </button>
          </article>
        );
      })}
    </div>
  );
}
