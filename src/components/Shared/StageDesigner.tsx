import type { Group } from "../../types/group";
import type { LedMode, LightingMode } from "../../types/look";

const lights: LightingMode[] = ["spot", "wash", "laser", "sun"];
const leds: LedMode[] = ["grid", "horizon", "orbit"];

export function StageDesigner({
  group,
  onChange,
}: {
  group: Group;
  onChange: (patch: Partial<Group>) => void;
}) {
  return (
    <section className="glass rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--theme-accent)]">Stage designer</p>
      <h2 className="font-display mt-1 text-2xl font-bold">Lights, LED, now</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-mist/60">Lighting</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {lights.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange({ lighting: mode })}
                className={`rounded-full px-3 py-1.5 text-sm capitalize ${
                  group.lighting === mode ? "bg-white text-ink" : "bg-white/10"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-mist/60">LED screen</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {leds.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onChange({ led: mode })}
                className={`rounded-full px-3 py-1.5 text-sm capitalize ${
                  group.led === mode ? "bg-white text-ink" : "bg-white/10"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
