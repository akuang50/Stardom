import type { Group } from "../../types/group";
import type { LogoStyle, LogoSymbol } from "../../types/look";

export function GroupLogo({
  group,
  size = 120,
}: {
  group: Pick<Group, "name" | "color" | "logoStyle" | "logoSymbol">;
  size?: number;
}) {
  const letter = group.name.slice(0, 1).toUpperCase();
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label={`${group.name} logo`}>
      <rect width="120" height="120" rx={group.logoStyle === "cute" ? 40 : 16} fill="#0b0612" />
      <rect x="4" y="4" width="112" height="112" rx={group.logoStyle === "cute" ? 36 : 12} fill={frameFill(group.logoStyle, group.color)} />
      <SymbolMark symbol={group.logoSymbol} color={group.color} />
      <text
        x="60"
        y={group.logoStyle === "minimal" ? 72 : 88}
        textAnchor="middle"
        fill="white"
        fontFamily="Syne, sans-serif"
        fontSize={group.logoStyle === "luxury" ? 18 : 22}
        letterSpacing="2"
      >
        {group.logoStyle === "minimal" ? group.name.slice(0, 4).toUpperCase() : letter}
      </text>
    </svg>
  );
}

function frameFill(style: LogoStyle, color: string): string {
  if (style === "dark" || style === "cyber") return "#050308";
  if (style === "dreamy" || style === "cute") return color;
  if (style === "luxury") return "#1a140c";
  if (style === "retro") return "#241018";
  return "#12081a";
}

function SymbolMark({ symbol, color }: { symbol: LogoSymbol; color: string }) {
  if (symbol === "orbit") return <circle cx="60" cy="44" r="16" fill="none" stroke={color} strokeWidth="4" />;
  if (symbol === "heart") return <path d="M60 58c14-16 28 2 14 16L60 86 46 74C32 60 46 42 60 58z" fill={color} />;
  if (symbol === "bolt") return <path d="M66 24 44 58h18l-8 30 28-40H66z" fill={color} />;
  if (symbol === "moon") return <circle cx="62" cy="42" r="16" fill={color} />;
  return <path d="M60 22l6 16h18l-14 12 6 18-16-10-16 10 6-18-14-12h18z" fill={color} />;
}
