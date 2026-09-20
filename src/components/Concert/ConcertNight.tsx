import { assetUrl } from "../../lib/utils";
import type { Group } from "../../types/group";
import type { Member } from "../../types/member";
import type { MemberLook } from "../../types/look";
import type { ConcertRecord } from "../../types/concert";
import { venuesById } from "../../data/venues";
import { CharacterPortrait } from "../Shared/CharacterPortrait";
import { Lightstick } from "../Shared/Lightstick";
import { Waveform } from "../MusicPlayer/Waveform";

export function ConcertNight({
  group,
  members,
  looks,
  concert,
  playing,
}: {
  group: Group;
  members: Member[];
  looks: Record<string, MemberLook>;
  concert: ConcertRecord;
  playing: boolean;
}) {
  const venue = venuesById[concert.venueId];
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10">
      <div className="relative min-h-[420px] bg-black">
        <img
          src={assetUrl(venue?.image ?? "concerts/venue-arena.jpg")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <img
          src={assetUrl("concerts/crowd.jpg")}
          alt=""
          className="absolute inset-x-0 bottom-0 h-2/5 w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        <div className="absolute inset-x-0 top-8 flex justify-center gap-8">
          {["#ff2d95", "#3cefff", "#f4c45a"].map((color) => (
            <span
              key={color}
              className={`h-36 w-20 rounded-full blur-2xl ${playing ? "animate-pulse" : ""}`}
              style={{ background: color, opacity: 0.45 }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-28 flex items-end justify-center gap-3 px-6">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="w-16 overflow-hidden rounded-2xl border border-white/20 sm:w-24"
              style={{ transform: playing ? `translateY(${index % 2 === 0 ? -14 : 8}px)` : undefined }}
            >
              <CharacterPortrait member={member} look={looks[member.id]} label={false} />
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <Waveform playing={playing} color={group.color} />
          <p className="text-[10px] uppercase tracking-[0.28em] text-white">
            {group.name} · {concert.songTitle} · {venue?.name}
          </p>
        </div>
        <div className="absolute right-6 top-6">
          <Lightstick color={group.color} shape={group.lightstick} />
        </div>
      </div>
    </section>
  );
}
