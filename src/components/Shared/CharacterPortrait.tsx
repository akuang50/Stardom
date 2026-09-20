import type { HairCut, MemberLook, OutfitLook, StageStyle } from "../../types/look";
import { resolveLook } from "../../types/look";
import type { Member } from "../../types/member";

const skins: Record<string, string> = {
  nova: "#f1c7ae",
  rin: "#e8c2ab",
  mira: "#f0c4a8",
  sage: "#d9a57a",
  yuna: "#f6d2bc",
  kai: "#c98a5a",
  hana: "#efc3ad",
  jules: "#f0c9b0",
  aera: "#f4d0bc",
  theo: "#cfa27c",
  lumi: "#f1c6a6",
  vesper: "#e4b79a",
  niko: "#e0b394",
  sol: "#f3c8ae",
};

export function CharacterPortrait({
  member,
  look,
  label = true,
}: {
  member: Member;
  look?: Partial<MemberLook>;
  label?: boolean;
}) {
  const resolved = resolveLook(member.id, look);
  const skin = skins[member.id] ?? "#efc3ad";
  const uid = `${member.id}-${resolved.hair}-${resolved.outfit}-${resolved.style}`;

  return (
    <svg viewBox="0 0 200 260" className="h-full w-full" role="img" aria-label={`${member.name} portrait`}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={member.color} />
          <stop offset="1" stopColor="#09040f" />
        </linearGradient>
      </defs>
      <rect width="200" height="260" rx="18" fill={`url(#${uid}-bg)`} />
      <StyleFx style={resolved.style} color={member.color} />
      <Hair cut={resolved.hair} color={resolved.hairColor} />
      <ellipse cx="100" cy="112" rx="34" ry="40" fill={skin} />
      <ellipse cx="88" cy="110" rx="3.4" ry="4.2" fill="#1b1320" />
      <ellipse cx="112" cy="110" rx="3.4" ry="4.2" fill="#1b1320" />
      <path d="M90 126c6 7 14 7 20 0" fill="none" stroke="#b56b6b" strokeWidth="2" strokeLinecap="round" />
      <Outfit outfit={resolved.outfit} color={member.color} />
      {label ? (
        <text x="16" y="244" fill="white" fontSize="12" fontFamily="Syne, sans-serif" letterSpacing="2.2">
          {member.name.toUpperCase()}
        </text>
      ) : null}
    </svg>
  );
}

function StyleFx({ style, color }: { style: StageStyle; color: string }) {
  if (style === "street") {
    return <path d="M0 40h200l-40 220H0z" fill={color} opacity="0.18" />;
  }
  if (style === "futuristic") {
    return (
      <>
        <circle cx="160" cy="42" r="26" fill="white" opacity="0.12" />
        <circle cx="36" cy="210" r="40" fill="white" opacity="0.08" />
      </>
    );
  }
  if (style === "retro") {
    return <rect width="200" height="260" fill="white" opacity="0.06" />;
  }
  return <circle cx="150" cy="36" r="30" fill="white" opacity="0.14" />;
}

function Outfit({ outfit, color }: { outfit: OutfitLook; color: string }) {
  if (outfit === "award") {
    return (
      <>
        <rect x="72" y="150" width="56" height="70" rx="10" fill="#f4c45a" />
        <rect x="78" y="156" width="44" height="58" rx="8" fill={color} />
      </>
    );
  }
  if (outfit === "mv") {
    return <path d="M62 158h76l-8 70H70z" fill={color} />;
  }
  if (outfit === "casual") {
    return <rect x="74" y="152" width="52" height="66" rx="16" fill="#d9d2e8" />;
  }
  return (
    <>
      <rect x="76" y="150" width="48" height="68" rx="12" fill={color} />
      <path d="M68 166h64v70H68z" fill="#111018" opacity="0.4" />
    </>
  );
}

function Hair({ cut, color }: { cut: HairCut; color: string }) {
  switch (cut) {
    case "crop":
      return <path d="M66 96c2-40 68-44 70-2-18-16-52-14-70 2z" fill={color} />;
    case "pony":
      return (
        <>
          <path d="M64 100c4-46 72-48 74 0-22-18-54-16-74 0z" fill={color} />
          <path d="M132 66c18-8 28 18 18 48-16-10-22-28-18-48z" fill={color} />
        </>
      );
    case "twins":
      return (
        <>
          <path d="M66 96c6-42 64-42 70 0-24-14-48-14-70 0z" fill={color} />
          <path d="M58 92c-16 18-10 70 6 78 4-24 8-52 8-78z" fill={color} />
          <path d="M142 92c16 18 10 70-6 78-4-24-8-52-8-78z" fill={color} />
        </>
      );
    case "bob":
      return <path d="M60 108c6-48 76-50 82 0-8 18-70 20-82 0z" fill={color} />;
    case "wolf":
      return <path d="M54 116c8-56 86-58 94 2-20 8-36-18-48-6-12-16-30 2-46 4z" fill={color} />;
    default:
      return <path d="M58 104c-10-44 18-72 42-72s52 24 44 70c-18-22-70-20-86 2z" fill={color} />;
  }
}
