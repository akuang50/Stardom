import { directorCommands } from "../../ai/commands";
import { useGameStore } from "../../store/gameStore";
import { useState } from "react";

export function DirectorPanel() {
  const applyDirector = useGameStore((state) => state.applyDirector);
  const [prompt, setPrompt] = useState("Make our concept darker.");
  const [reply, setReply] = useState("Local parser ready. No API key required.");

  return (
    <section className="glass rounded-3xl p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan">Creative Director</p>
      <h3 className="font-display mt-1 text-2xl font-bold">Offline commands</h3>
      <p className="mt-2 text-sm text-mist/65">
        Type a note. STARDOM maps it to a game action on-device.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {directorCommands.map((command) => (
          <button
            key={command}
            type="button"
            className="rounded-full bg-white/8 px-3 py-1 text-xs text-mist/80"
            onClick={() => setPrompt(command)}
          >
            {command}
          </button>
        ))}
      </div>
      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setReply(applyDirector(prompt));
        }}
      >
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-pink"
        />
        <button
          type="submit"
          className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink"
        >
          Direct
        </button>
      </form>
      <p className="mt-3 text-sm text-gold">{reply}</p>
    </section>
  );
}
