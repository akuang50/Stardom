import { Link } from "react-router-dom";
import { PalettePicker } from "../components/GroupCreator/PalettePicker";
import { DirectorPanel } from "../components/Shared/DirectorPanel";
import { MemberCard } from "../components/Shared/MemberCard";
import { chemistryBonus, roleBalanceLabel } from "../engine/chemistryEngine";
import { resolveMembers } from "../engine/gameEngine";
import { formatMoney, formatNumber } from "../lib/utils";
import { useGameStore } from "../store/gameStore";

export function Group() {
  const group = useGameStore((state) => state.group);
  const memberIds = useGameStore((state) => state.memberIds);
  const songs = useGameStore((state) => state.songs);
  const fans = useGameStore((state) => state.fans);
  const money = useGameStore((state) => state.money);
  const week = useGameStore((state) => state.week);
  const demoMode = useGameStore((state) => state.demoMode);
  const updateGroup = useGameStore((state) => state.updateGroup);
  const members = resolveMembers(memberIds);

  if (!group) {
    return (
      <Empty
        title="No group on the roster"
        body="Form a unit or load the NEONIX demo."
        action={{ to: "/create", label: "Create group" }}
      />
    );
  }

  return (
    <div className="grid gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {demoMode ? (
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Demo Mode · NEONIX</p>
          ) : (
            <p className="text-xs uppercase tracking-[0.22em] text-cyan">Active group</p>
          )}
          <h1 className="font-display mt-2 text-6xl font-extrabold" style={{ color: group.color }}>
            {group.name}
          </h1>
          <p className="mt-2 text-mist/70">
            Fandom {group.fandomName} · {group.concept} · {group.debuted ? "Debuted" : "Pre-debut"} · {roleBalanceLabel(members)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/song" className="rounded-full bg-white px-5 py-3 font-semibold text-ink">
            Song studio
          </Link>
          <Link to="/career" className="rounded-full px-5 py-3 font-semibold text-white" style={{ background: group.color }}>
            Career
          </Link>
        </div>
      </header>
      <div className="grid gap-3 sm:grid-cols-4">
        <Mini label="Week" value={`${week}`} />
        <Mini label="Fans" value={formatNumber(fans)} />
        <Mini label="Cash" value={formatMoney(money)} />
        <Mini label="Chemistry" value={`${chemistryBonus(members)}`} />
      </div>
      <section className="glass rounded-3xl p-6">
        <PalettePicker
          value={group.paletteId}
          onChange={(palette) => updateGroup({ paletteId: palette.id, color: palette.accent })}
        />
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Members</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} selected />
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Discography</h2>
        {songs.length === 0 ? (
          <p className="mt-3 text-mist/60">No title track yet. Open the studio.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {songs.map((song) => (
              <li key={song.id} className="glass flex items-center justify-between rounded-2xl p-4">
                <div>
                  <p className="font-display text-xl font-bold">{song.title}</p>
                  <p className="text-sm text-mist/60">
                    {song.genre}
                    {song.released ? ` · Peak #${song.chartPeak} · ${formatNumber(song.streams)} streams` : " · Unreleased"}
                  </p>
                </div>
                <Link to="/song" className="text-sm text-cyan">
                  Open
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <DirectorPanel />
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-mist/50">{label}</p>
      <p className="font-display mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: { to: string; label: string };
}) {
  return (
    <div className="glass max-w-lg rounded-3xl p-8">
      <h1 className="font-display text-4xl font-bold">{title}</h1>
      <p className="mt-3 text-mist/70">{body}</p>
      <Link to={action.to} className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-semibold text-ink">
        {action.label}
      </Link>
    </div>
  );
}
