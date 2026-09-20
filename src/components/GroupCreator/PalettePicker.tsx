import type { GroupPalette } from "../../data/palettes";
import { palettes } from "../../data/palettes";

export function PalettePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (palette: GroupPalette) => void;
}) {
  return (
    <div className="grid gap-3">
      <div>
        <p className="text-sm">Color scheme</p>
        <p className="mt-1 text-xs text-mist/55">
          Original palettes using public color moods. Not official group branding.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {palettes.map((palette) => {
          const active = palette.id === value;
          return (
            <button
              key={palette.id}
              type="button"
              onClick={() => onChange(palette)}
              className={`rounded-2xl border px-3 py-3 text-left ${
                active ? "border-[var(--theme-accent)] bg-white/10" : "border-white/10 bg-black/15"
              }`}
            >
              <div className="flex gap-1">
                {palette.swatches.map((swatch) => (
                  <span
                    key={swatch}
                    className="h-5 flex-1 rounded-full border border-black/10"
                    style={{ background: swatch }}
                  />
                ))}
              </div>
              <p className="mt-2 font-semibold">{palette.name}</p>
              <p className="text-[11px] text-mist/55">
                {palette.mood === "pastel" ? "Pastel" : "Night"} · inspired by {palette.inspiredBy}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
