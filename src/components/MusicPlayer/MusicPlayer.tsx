import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { isPlaying, playTrack, stopTrack } from "../../engine/musicEngine";
import { assetUrl } from "../../lib/utils";
import type { Song } from "../../types/song";

export function MusicPlayer({ song }: { song: Song }) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => stopTrack();
  }, []);

  return (
    <section className="glass flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
      <img
        src={assetUrl(`assets/${song.artwork}`)}
        alt={`${song.title} artwork`}
        className="h-32 w-32 rounded-2xl object-cover"
      />
      <div className="flex-1">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan">{song.genre}</p>
        <h3 className="font-display text-3xl font-bold">{song.title}</h3>
        <p className="mt-1 text-sm text-mist/60">Demo loop · licensed original stinger</p>
        {error ? <p className="mt-2 text-sm text-gold">{error} Preview skipped — the rest of the studio still works.</p> : null}
      </div>
      <button
        type="button"
        className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink"
        onClick={() => {
          if (playing) {
            stopTrack();
            setPlaying(false);
            return;
          }
          const result = playTrack(song.audioKey);
          if (!result.ok) {
            setError(result.error ?? "Audio unavailable.");
            setPlaying(false);
            return;
          }
          setError(null);
          setPlaying(true);
          window.setTimeout(() => setPlaying(isPlaying()), 200);
        }}
        aria-label={playing ? "Pause preview" : "Play preview"}
      >
        {playing ? <Pause size={22} /> : <Play size={22} />}
      </button>
    </section>
  );
}
