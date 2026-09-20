import { Link } from "react-router-dom";
import { ConceptBoard } from "../components/GroupCreator/ConceptBoard";
import { LogoStudio } from "../components/GroupCreator/LogoStudio";
import { PalettePicker } from "../components/GroupCreator/PalettePicker";
import { DirectorPanel } from "../components/Shared/DirectorPanel";
import { AlbumArt } from "../components/Shared/AlbumArt";
import { GroupLogo } from "../components/Shared/GroupLogo";
import { Lightstick } from "../components/Shared/Lightstick";
import { Photocard } from "../components/Shared/Photocard";
import { StageDesigner } from "../components/Shared/StageDesigner";
import { chemistryBonus, roleBalanceLabel } from "../engine/chemistryEngine";
import { resolveMembers } from "../engine/gameEngine";
import { formatMoney, formatNumber } from "../lib/utils";
import type { LightstickShape } from "../types/look";
import { resolveLook } from "../types/look";
import { useGameStore } from "../store/gameStore";

const stickShapes: LightstickShape[] = ["orb", "crown", "crystal"];

export function Group() {
  const group = useGameStore((state) => state.group);
  const memberIds = useGameStore((state) => state.memberIds);
  const songs = useGameStore((state) => state.songs);
  const fans = useGameStore((state) => state.fans);
  const money = useGameStore((state) => state.money);
  const week = useGameStore((state) => state.week);
  const demoMode = useGameStore((state) => state.demoMode);
  const looks = useGameStore((state) => state.looks);
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
    <div className="grid gap-10">
      <header
        className="relative overflow-hidden rounded-[2rem] border border-white/10 p-8"
        style={{ background: `linear-gradient(135deg, ${group.color}55, #07040f 62%)` }}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            {demoMode ? (
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Demo Mode · NEONIX</p>
            ) : (
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">Active group</p>
            )}
            <h1 className="font-display mt-2 text-6xl font-extrabold text-white">{group.name}</h1>
            <p className="mt-2 text-lg text-white/80">{group.eraName}</p>
            <p className="mt-2 text-sm text-white/65">
              {members.length} members · {songs.length} {songs.length === 1 ? "album" : "albums"} · {formatNumber(fans)} fans
            </p>
          </div>
          <GroupLogo group={group} size={132} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
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
      <ConceptBoard group={group} />
      <LogoStudio group={group} onChange={updateGroup} />
      <section className="glass grid gap-6 rounded-3xl p-6 md:grid-cols-[160px_1fr]">
        <Lightstick color={group.color} shape={group.lightstick} />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--theme-secondary)]">Fandom</p>
          <h2 className="font-display mt-1 text-3xl font-bold">{group.fandomName}</h2>
          <p className="mt-2 text-mist/70">{group.slogan}</p>
          <p className="mt-2 text-sm text-mist/55">{formatNumber(fans)} lights in the pit · {roleBalanceLabel(members)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {stickShapes.map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => updateGroup({ lightstick: shape })}
                className={`rounded-full px-3 py-1.5 text-sm capitalize ${
                  group.lightstick === shape ? "bg-white text-ink" : "bg-white/10"
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="glass rounded-3xl p-6">
        <PalettePicker
          value={group.paletteId}
          onChange={(palette) => updateGroup({ paletteId: palette.id, color: palette.accent })}
        />
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Photocards</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member) => (
            <Photocard key={member.id} member={member} group={group} look={looks[member.id] ?? resolveLook(member.id)} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl font-bold">Discography</h2>
        {songs.length === 0 ? (
          <p className="mt-3 text-mist/60">No title track yet. Open the studio.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {songs.map((song) => (
              <Link key={song.id} to="/song" className="overflow-hidden rounded-3xl border border-white/10">
                <AlbumArt song={song} group={group} className="aspect-square w-full" />
                <div className="p-3">
                  <p className="font-display text-xl font-bold">{song.title}</p>
                  <p className="text-xs text-mist/60">
                    {song.released ? `Peak #${song.chartPeak} · ${formatNumber(song.streams)}` : "Unreleased"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <StageDesigner group={group} onChange={updateGroup} />
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
