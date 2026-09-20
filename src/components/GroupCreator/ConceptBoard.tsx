import type { Group } from "../../types/group";

const tiles = [
  { id: "palette", label: "Palette" },
  { id: "outfit", label: "Outfit" },
  { id: "stage", label: "Stage" },
  { id: "type", label: "Typography" },
  { id: "light", label: "Lighting" },
  { id: "mood", label: "Mood" },
];

export function ConceptBoard({ group }: { group: Group }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--theme-secondary)]">Concept board</p>
      <h2 className="font-display mt-1 text-3xl font-bold">{group.eraName}</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {tiles.map((tile, index) => (
          <article
            key={tile.id}
            className="flex h-28 flex-col justify-between rounded-2xl p-4"
            style={{
              background:
                index % 2 === 0
                  ? `linear-gradient(160deg, ${group.color}, #111018)`
                  : `linear-gradient(160deg, #141018, ${group.color})`,
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">{tile.label}</p>
            <p className="font-display text-lg text-white">{visualWord(group, tile.id)}</p>
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
