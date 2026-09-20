import { concepts } from "../../data/concepts";
import type { GroupPalette } from "../../data/palettes";
import { PalettePicker } from "./PalettePicker";

export function GroupCreatorForm({
  name,
  concept,
  fandomName,
  paletteId,
  onChange,
}: {
  name: string;
  concept: string;
  fandomName: string;
  paletteId: string;
  onChange: (patch: {
    name?: string;
    concept?: string;
    fandomName?: string;
    palette?: GroupPalette;
  }) => void;
}) {
  return (
    <div className="glass grid gap-4 rounded-3xl p-6">
      <label className="grid gap-2 text-sm">
        Group name
        <input
          value={name}
          onChange={(event) => onChange({ name: event.target.value })}
          placeholder="NEONIX"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-display text-xl outline-none focus:border-[var(--theme-accent)]"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Fandom name
        <input
          value={fandomName}
          onChange={(event) => onChange({ fandomName: event.target.value })}
          placeholder="NXLIGHT"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[var(--theme-secondary)]"
        />
      </label>
      <div className="grid gap-2 text-sm">
        Concept
        <div className="grid gap-2 sm:grid-cols-2">
          {concepts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ concept: item.id })}
              className={`rounded-2xl border px-4 py-3 text-left ${
                concept === item.id ? "border-[var(--theme-accent)] bg-white/10" : "border-white/10 bg-black/20"
              }`}
            >
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-mist/60">{item.mood}</p>
            </button>
          ))}
        </div>
      </div>
      <PalettePicker value={paletteId} onChange={(palette) => onChange({ palette })} />
    </div>
  );
}
