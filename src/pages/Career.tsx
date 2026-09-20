import { Link } from "react-router-dom";
import { CareerFeed } from "../components/Career/CareerFeed";
import { useGameStore } from "../store/gameStore";

export function Career() {
  const group = useGameStore((state) => state.group);
  const week = useGameStore((state) => state.week);
  const fans = useGameStore((state) => state.fans);
  const money = useGameStore((state) => state.money);
  const careerLog = useGameStore((state) => state.careerLog);
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
    <div className="grid gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Career simulation</p>
        <h1 className="font-display mt-2 text-5xl font-extrabold">{group.name} era</h1>
        <p className="mt-3 max-w-2xl text-mist/70">
          Advance the calendar. Releases, variety clips, and fandom weather all live in localStorage.
        </p>
      </header>
      <CareerFeed week={week} fans={fans} money={money} log={careerLog} onAdvance={advanceWeek} />
    </div>
  );
}
