import type { Group } from "../../types/group";
import type { Song } from "../../types/song";

export function AlbumArt({
  song,
  group,
  className = "",
}: {
  song: Pick<Song, "title" | "concept">;
  group: Pick<Group, "name" | "color">;
  className?: string;
}) {
  const a = group.color;
  const b = song.concept === "dark" ? "#1a0b22" : song.concept === "summer" ? "#f4c45a" : "#3cefff";
  const gid = `art-${group.name}-${song.title}`.replace(/[^a-z0-9]/gi, "").slice(0, 28);
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={`${song.title} artwork`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor="#07040f" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${gid})`} />
      <circle cx="300" cy="90" r="70" fill={b} opacity="0.55" />
      <circle cx="80" cy="320" r="110" fill={a} opacity="0.35" />
      <rect x="36" y="248" width="240" height="10" fill="white" opacity="0.7" />
      <text x="36" y="80" fill="white" fontSize="22" fontFamily="Syne, sans-serif" letterSpacing="6">
        {group.name}
      </text>
      <text x="36" y="230" fill="white" fontSize="42" fontFamily="Syne, sans-serif">
        {song.title.slice(0, 14)}
      </text>
      <text x="36" y="360" fill="white" opacity="0.7" fontSize="16" fontFamily="Figtree, sans-serif">
        {song.concept.toUpperCase()} · 2026
      </text>
    </svg>
  );
}
