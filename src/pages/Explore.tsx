import { Link } from "react-router-dom";
import { RemixBoard } from "../components/Remix/RemixBoard";
import { useGameStore } from "../store/gameStore";

export function Explore() {
  const group = useGameStore((state) => state.group);
  const remix = useGameStore((state) => state.remix);

  return (
    <div className="grid gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-violet">Explore / Remix</p>
        <h1 className="font-display mt-2 text-5xl font-extrabold">Borrow a universe</h1>
        <p className="mt-3 max-w-2xl text-mist/70">
          Other fictional agencies exist in the catalog. Remix their concept onto your group without leaving the page.
        </p>
      </header>
      {group ? (
        <p className="text-sm text-mist/70">
          Active unit: <span className="text-white">{group.name}</span>
        </p>
      ) : (
        <p className="text-sm text-gold">
          Form a group to apply a remix. You can still browse the catalog.{" "}
          <Link to="/create" className="underline">
            Create group
          </Link>
        </p>
      )}
      <RemixBoard onRemix={remix} />
    </div>
  );
}
