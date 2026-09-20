import type { CareerLogEntry } from "../../types/game";
import { formatMoney, formatNumber } from "../../lib/utils";

export function CareerTimeline({
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
      <button type="button" onClick={onAdvance} className="rounded-full bg-[var(--theme-accent)] px-5 py-3 font-semibold text-white">
        Simulate next week
      </button>
      <ol className="relative ml-3 border-l border-white/15 pl-6">
        {log.map((entry) => (
          <li key={entry.id} className="relative mb-6">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[var(--theme-accent)]" />
            <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Week {entry.week}</p>
            <h3 className="font-display text-2xl font-bold">{entry.title}</h3>
            <p className="mt-1 text-sm text-mist/70">{entry.description}</p>
            <p className="mt-2 text-xs text-[var(--theme-secondary)]">
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
