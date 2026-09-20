import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConcertNight } from "../components/Concert/ConcertNight";
import { venues } from "../data/venues";
import { resolveMembers } from "../engine/gameEngine";
import { playTrack, stopTrack } from "../engine/musicEngine";
import { assetUrl, formatMoney, formatNumber } from "../lib/utils";
import { resolveLook } from "../types/look";
import type { ConcertRecord } from "../types/concert";
import { useGameStore } from "../store/gameStore";

export function Concert() {
  const group = useGameStore((state) => state.group);
  const memberIds = useGameStore((state) => state.memberIds);
  const songs = useGameStore((state) => state.songs);
  const fans = useGameStore((state) => state.fans);
  const money = useGameStore((state) => state.money);
  const concerts = useGameStore((state) => state.concerts);
  const looks = useGameStore((state) => state.looks);
  const holdConcert = useGameStore((state) => state.holdConcert);
  const members = resolveMembers(memberIds);
  const [venueId, setVenueId] = useState(venues[0].id);
  const [songId, setSongId] = useState(songs.at(-1)?.id ?? "");
  const [live, setLive] = useState<ConcertRecord | null>(null);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const venue = venues.find((item) => item.id === venueId) ?? venues[0];
  const song = songs.find((item) => item.id === songId) ?? songs.at(-1);
  const resolvedLooks = Object.fromEntries(members.map((member) => [member.id, resolveLook(member.id, looks[member.id])]));

  useEffect(() => {
    return () => stopTrack();
  }, []);

  if (!group) {
    return (
      <div className="glass max-w-lg rounded-3xl p-8">
        <h1 className="font-display text-4xl font-bold">No act to book</h1>
        <p className="mt-3 text-mist/70">Form a group, then take them onstage.</p>
        <Link to="/create" className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-semibold text-ink">
          Create group
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <header className="overflow-hidden rounded-[2rem] border border-white/10">
        <div className="relative min-h-[280px]">
          <img src={assetUrl("concerts/group-stage.jpg")} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
          <div className="relative p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--theme-secondary)]">Live circuit</p>
            <h1 className="font-display mt-2 text-5xl font-extrabold text-white">Hold a concert</h1>
            <p className="mt-3 max-w-xl text-white/75">
              Book a room, pick the title track, and watch the pit fill. Original venue stills — no real arenas, no real idols.
            </p>
            <p className="mt-4 text-sm text-white/70">
              {formatNumber(fans)} fans · {formatMoney(money)} on the books
            </p>
          </div>
        </div>
      </header>

      {live ? <ConcertNight group={group} members={members} looks={resolvedLooks} concert={live} playing={playing} /> : null}

      <section>
        <h2 className="font-display text-2xl font-bold">Venues</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {venues.map((item) => {
            const locked = fans < item.minFans || money < item.cost;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setVenueId(item.id)}
                className={`overflow-hidden rounded-3xl border text-left ${
                  venueId === item.id ? "border-[var(--theme-accent)]" : "border-white/10"
                }`}
              >
                <img src={assetUrl(item.image)} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-mist/50">{item.city}</p>
                  <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                  <p className="mt-1 text-sm text-mist/70">{item.vibe}</p>
                  <p className="mt-2 text-xs text-mist/55">
                    {formatNumber(item.capacity)} cap · {formatMoney(item.cost)} · {formatNumber(item.minFans)} fans
                    {locked ? " · locked" : ""}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="glass grid gap-4 rounded-3xl p-6 md:grid-cols-[1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm">
          Setlist opener
          <select
            value={song?.id ?? ""}
            onChange={(event) => setSongId(event.target.value)}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none"
          >
            {songs.length === 0 ? <option value="">Create a song first</option> : null}
            {songs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
                {item.released ? "" : " (unreleased)"}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            const result = holdConcert(venue.id, song?.id);
            if (typeof result === "string") {
              setMessage(result);
              return;
            }
            setMessage(null);
            setLive(result);
            setPlaying(true);
            if (song) playTrack(song.audioKey);
            window.setTimeout(() => setPlaying(false), 9000);
          }}
          className="rounded-full px-6 py-3 font-semibold text-white"
          style={{ background: group.color }}
        >
          Hold concert at {venue.name}
        </button>
        {message ? <p className="md:col-span-2 text-sm text-gold">{message}</p> : null}
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold">Tour archive</h2>
        {concerts.length === 0 ? (
          <p className="mt-3 text-mist/60">No dates yet. Book the first night.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {concerts.map((concert) => {
              const room = venues.find((item) => item.id === concert.venueId);
              return (
                <article key={concert.id} className="overflow-hidden rounded-3xl border border-white/10">
                  <img src={assetUrl(room?.image ?? "concerts/poster.jpg")} alt="" className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-mist/50">Week {concert.week}</p>
                    <h3 className="font-display text-xl font-bold">{room?.name ?? "Venue"}</h3>
                    <p className="text-sm text-mist/70">
                      {concert.songTitle} · {formatNumber(concert.attendance)} / {formatNumber(concert.capacity)}
                      {concert.soldOut ? " · sold out" : ""}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
