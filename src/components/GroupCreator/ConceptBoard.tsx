import type { Group } from "../../types/group";
import { assetUrl } from "../../lib/utils";

const tiles = [
  { id: "palette", label: "Palette", image: "concerts/poster.jpg" },
  { id: "outfit", label: "Outfit", image: "concerts/group-stage.jpg" },
  { id: "stage", label: "Stage", image: "concerts/venue-arena.jpg" },
  { id: "type", label: "Typography", image: null },
  { id: "light", label: "Lighting", image: "concerts/crowd.jpg" },
  { id: "mood", label: "Mood", image: "concerts/venue-studio.jpg" },
];

export function ConceptBoard({ group }: { group: Group }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--theme-secondary)]">Concept board</p>
      <h2 className="font-display mt-1 text-3xl font-bold">{group.eraName}</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {tiles.map((tile) => (
          <article key={tile.id} className="relative flex h-32 flex-col justify-between overflow-hidden rounded-2xl p-4">
            {tile.image ? (
              <img src={assetUrl(tile.image)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, ${group.color}, #111018)` }}
              />
            )}
            <div className="absolute inset-0 bg-black/45" />
            <p className="relative text-[10px] uppercase tracking-[0.18em] text-white/70">{tile.label}</p>
            <p className="relative font-display text-lg text-white">{visualWord(group, tile.id)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function visualWord(group: Group, id: string): string {
  if (id === "palette") return group.color;
  if (id === "outfit") return group.logoStyle;
  if (id === "stage") return group.lighting;
  if (id === "type") return "Syne";
  if (id === "light") return group.led;
  return group.concept;
}
