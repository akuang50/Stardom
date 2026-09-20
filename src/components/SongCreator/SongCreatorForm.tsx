import { concepts } from "../../data/concepts";

export function SongCreatorForm({
  title,
  concept,
  onChange,
}: {
  title: string;
  concept: string;
  onChange: (patch: { title?: string; concept?: string }) => void;
}) {
  return (
    <div className="glass grid gap-4 rounded-3xl p-6">
      <label className="grid gap-2 text-sm">
        Title track
        <input
          value={title}
          onChange={(event) => onChange({ title: event.target.value })}
          placeholder="NEON HEART"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-display text-2xl outline-none focus:border-pink"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {concepts.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange({ concept: item.id })}
            className={`rounded-full px-4 py-2 text-sm ${
              concept === item.id ? "bg-white text-ink" : "bg-white/8 text-mist/80"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
