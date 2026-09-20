import type { Member } from "../../types/member";
import type { Song } from "../../types/song";

export function LineDistribution({
  song,
  members,
  onChange,
  playing = false,
}: {
  song: Song;
  members: Member[];
  onChange: (memberId: string, share: number) => void;
  playing?: boolean;
}) {
  return (
    <section className="glass rounded-3xl p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-pink">Line distribution</p>
      <h3 className="font-display mt-1 text-2xl font-bold">Who owns the chorus?</h3>
      <div className="mt-5 grid gap-4">
        {members.map((member) => {
          const share = song.lines.find((line) => line.memberId === member.id)?.share ?? 0;
          return (
            <label key={member.id} className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold tracking-[0.12em] uppercase">{member.name}</span>
                <span className="text-mist/60">{share.toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={share}
                onChange={(event) => onChange(member.id, Number(event.target.value))}
                className="accent-pink"
              />
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${share}%`,
                    background: member.color,
                    boxShadow: playing ? `0 0 16px ${member.color}` : undefined,
                    transition: "width 0.4s ease, box-shadow 0.3s ease",
                  }}
                />
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
