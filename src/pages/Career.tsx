import { Link } from "react-router-dom";
import { CareerTimeline } from "../components/Career/CareerTimeline";
import { SocialFeed } from "../components/Career/SocialFeed";
import { useGameStore } from "../store/gameStore";

export function Career() {
  const group = useGameStore((state) => state.group);
  const week = useGameStore((state) => state.week);
  const fans = useGameStore((state) => state.fans);
  const money = useGameStore((state) => state.money);
  const careerLog = useGameStore((state) => state.careerLog);
  const songs = useGameStore((state) => state.songs);
  const advanceWeek = useGameStore((state) => state.advanceWeek);

  if (!group) {
    return (
      <div className="glass max-w-lg rounded-3xl p-8">
        <h1 className="font-display text-4xl font-bold">No career to simulate</h1>
        <p className="mt-3 text-mist/70">Load Demo Mode or form a group first.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-semibold text-ink">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <header className="mb-6">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Career archive</p>
          <h1 className="font-display mt-2 text-5xl font-extrabold">The {group.name} archive</h1>
          <p className="mt-3 max-w-2xl text-mist/70">
            A visual timeline of debuts, wins, and tours. Advance the calendar — everything stays in this browser.
          </p>
          <Link to="/concert" className="mt-4 inline-block rounded-full bg-white px-5 py-3 font-semibold text-ink">
            Hold a concert
          </Link>
        </header>
        <CareerTimeline week={week} fans={fans} money={money} log={careerLog} onAdvance={advanceWeek} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--theme-accent)]">Teaser campaign</p>
        <h2 className="font-display mt-1 mb-4 text-3xl font-bold">The feed is alive</h2>
        <SocialFeed group={group} song={songs.at(-1)} />
      </div>
    </div>
  );
}
