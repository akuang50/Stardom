import { formatMoney, formatNumber } from "../../lib/utils";
import type { CareerLogEntry } from "../../types/game";

export function CareerFeed({
  week,
  fans,
  money,
  log,
  onAdvance,
}: {
  week: number;
  fans: number;
  money: number;
  log: CareerLogEntry[];
  onAdvance: () => void;
}) {
  return (
    <section className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Week" value={`${week}`} />
        <Stat label="Fans" value={formatNumber(fans)} />
        <Stat label="Agency cash" value={formatMoney(money)} />
      </div>
      <button
        type="button"
        onClick={onAdvance}
        className="rounded-full bg-gold px-5 py-3 font-semibold text-ink"
      >
        Simulate next week
      </button>
      <ol className="grid gap-3">
        {log.map((entry) => (
          <li key={entry.id} className="glass rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Week {entry.week}</p>
            <h3 className="font-display text-xl font-bold">{entry.title}</h3>
            <p className="mt-1 text-sm text-mist/70">{entry.description}</p>
            <p className="mt-2 text-xs text-cyan">
              Fans {entry.fansDelta >= 0 ? "+" : ""}
              {formatNumber(entry.fansDelta)} · Money {entry.moneyDelta >= 0 ? "+" : ""}
              {formatMoney(entry.moneyDelta)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-mist/50">{label}</p>
      <p className="font-display mt-1 text-3xl font-bold">{value}</p>
    </div>
  );
}
