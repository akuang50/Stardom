import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LineDistribution } from "../components/LineDistribution/LineDistribution";
import { MusicPlayer } from "../components/MusicPlayer/MusicPlayer";
import { DirectorPanel } from "../components/Shared/DirectorPanel";
import { PerformanceStage } from "../components/Shared/PerformanceStage";
import { SongCreatorForm } from "../components/SongCreator/SongCreatorForm";
import { Storyboard } from "../components/SongCreator/Storyboard";
import { conceptsById } from "../data/concepts";
import { resolveMembers } from "../engine/gameEngine";
import { scoreSong } from "../engine/musicEngine";
import { resolveLook } from "../types/look";
import { useGameStore } from "../store/gameStore";

export function SongStudio() {
  const group = useGameStore((state) => state.group);
  const memberIds = useGameStore((state) => state.memberIds);
  const songs = useGameStore((state) => state.songs);
  const looks = useGameStore((state) => state.looks);
  const addSong = useGameStore((state) => state.addSong);
  const setLineShare = useGameStore((state) => state.setLineShare);
  const updateSong = useGameStore((state) => state.updateSong);
  const releaseSong = useGameStore((state) => state.releaseSong);
  const members = resolveMembers(memberIds);
  const [draftTitle, setDraftTitle] = useState("NEON HEART");
  const [draftConcept, setDraftConcept] = useState(group?.concept ?? "neon");
  const [playing, setPlaying] = useState(false);
  const [activeId, setActiveId] = useState(members[0]?.id);

  const song = songs.at(-1);
  const quality = useMemo(() => (song ? scoreSong(song, members) : 0), [song, members]);
  const resolvedLooks = useMemo(
    () => Object.fromEntries(members.map((member) => [member.id, resolveLook(member.id, looks[member.id])])),
    [members, looks],
  );

  useEffect(() => {
    if (!playing || members.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = members.findIndex((member) => member.id === current);
        return members[(index + 1) % members.length]?.id;
      });
    }, 1600);
    return () => window.clearInterval(timer);
  }, [playing, members]);

  if (!group) {
    return (
      <div className="glass max-w-lg rounded-3xl p-8">
        <h1 className="font-display text-4xl font-bold">Studio locked</h1>
        <p className="mt-3 text-mist/70">Form a group before cutting a title track.</p>
        <Link to="/create" className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-semibold text-ink">
          Create group
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-cyan">Song studio</p>
        <h1 className="font-display mt-2 text-5xl font-extrabold">Cut the title track</h1>
      </header>
      <SongCreatorForm
        title={song?.title ?? draftTitle}
        concept={song?.concept ?? draftConcept}
        onChange={(patch) => {
          if (song) {
            if (patch.title !== undefined) updateSong(song.id, { title: patch.title });
            if (patch.concept !== undefined) {
              const concept = conceptsById[patch.concept];
              updateSong(song.id, {
                concept: patch.concept,
                genre: concept?.name ?? song.genre,
                audioKey: concept?.audioKey ?? song.audioKey,
                artwork: concept?.artwork ?? song.artwork,
              });
            }
          } else {
            if (patch.title !== undefined) setDraftTitle(patch.title);
            if (patch.concept !== undefined) setDraftConcept(patch.concept);
          }
        }}
      />
      {!song ? (
        <button
          type="button"
          onClick={() => addSong(draftTitle, draftConcept)}
          className="w-fit rounded-full bg-pink px-6 py-3 font-semibold text-white"
        >
          Create song
        </button>
      ) : (
        <>
          <MusicPlayer song={song} group={group} onPlayingChange={setPlaying} />
          <PerformanceStage
            group={group}
            members={members}
            looks={resolvedLooks}
            activeId={activeId}
            playing={playing}
          />
          <LineDistribution
            song={song}
            members={members}
            playing={playing}
            onChange={(memberId, share) => setLineShare(song.id, memberId, share)}
          />
          <Storyboard group={group} members={members} />
          <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-3xl p-5">
            <p className="text-sm text-mist/70">
              Predicted quality <span className="font-display text-2xl text-white">{Math.round(quality)}</span>
            </p>
            {song.released ? (
              <Link to="/career" className="rounded-full bg-gold px-5 py-3 font-semibold text-ink">
                See the chart run
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => releaseSong(song.id)}
                className="rounded-full bg-white px-5 py-3 font-semibold text-ink"
              >
                Release
              </button>
            )}
          </div>
        </>
      )}
      <DirectorPanel />
    </div>
  );
}
