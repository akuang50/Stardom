import type { LightstickShape } from "../../types/look";

export function Lightstick({ color, shape }: { color: string; shape: LightstickShape }) {
  return (
    <svg viewBox="0 0 120 180" className="h-44 w-28" role="img" aria-label="Fandom lightstick">
      <defs>
        <radialGradient id={`glow-${shape}`} cx="50%" cy="30%" r="50%">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="58" r="48" fill={`url(#glow-${shape})`} opacity="0.55" />
      {shape === "crown" ? (
        <path d="M28 70 44 38l16 22 16-22 16 32-64 8z" fill={color} />
      ) : shape === "crystal" ? (
        <path d="M60 18 92 70 60 92 28 70z" fill={color} />
      ) : (
        <circle cx="60" cy="58" r="28" fill={color} />
      )}
      <rect x="54" y="92" width="12" height="70" rx="6" fill="#d7d0e2" />
      <rect x="48" y="88" width="24" height="10" rx="4" fill="#8a8298" />
    </svg>
  );
}
