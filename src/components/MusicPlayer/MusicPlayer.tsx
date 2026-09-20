import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { isPlaying, playTrack, stopTrack } from "../../engine/musicEngine";
import type { Group } from "../../types/group";
import type { Song } from "../../types/song";
import { AlbumArt } from "../Shared/AlbumArt";
import { Waveform } from "./Waveform";

export function MusicPlayer({
  song,
  group,
  onPlayingChange,
}: {
  song: Song;
  group: Group;
  onPlayingChange?: (playing: boolean) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => stopTrack();
  }, []);

  const setPlay = (next: boolean) => {
    setPlaying(next);
    onPlayingChange?.(next);
  };

  return (
    <section className="glass grid gap-5 rounded-3xl p-6 md:grid-cols-[220px_1fr_auto] md:items-center">
      <div className="overflow-hidden rounded-3xl glow-ring">
        <AlbumArt song={song} group={group} className="aspect-square w-full" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--theme-secondary)]">{song.genre}</p>
        <h3 className="font-display text-3xl font-bold">{song.title}</h3>
        <p className="mt-1 text-sm text-mist/60">{group.name} · original demo loop</p>
        <div className="mt-4">
          <Waveform playing={playing} color={group.color} />
        </div>
        {error ? (
          <p className="mt-2 text-sm text-gold">{error} Preview skipped — the rest of the studio still works.</p>
        ) : null}
      </div>
      <button
        type="button"
        className="grid h-16 w-16 place-items-center rounded-full bg-white text-ink"
        onClick={() => {
          if (playing) {
            stopTrack();
            setPlay(false);
            return;
          }
          const result = playTrack(song.audioKey);
          if (!result.ok) {
            setError(result.error ?? "Audio unavailable.");
            setPlay(false);
            return;
          }
          setError(null);
          setPlay(true);
          window.setTimeout(() => setPlay(isPlaying()), 200);
        }}
        aria-label={playing ? "Pause preview" : "Play preview"}
      >
        {playing ? <Pause size={22} /> : <Play size={22} />}
      </button>
    </section>
  );
}
