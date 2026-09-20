import type { Member } from "../../types/member";

const looks: Record<string, { hair: string; skin: string; cut: Cut }> = {
  nova: { hair: "#2a1020", skin: "#f1c7ae", cut: "wave" },
  rin: { hair: "#1b2430", skin: "#e8c2ab", cut: "crop" },
  mira: { hair: "#3b2158", skin: "#f0c4a8", cut: "pony" },
  sage: { hair: "#c9a24a", skin: "#d9a57a", cut: "bob" },
  yuna: { hair: "#7ad9b8", skin: "#f6d2bc", cut: "twins" },
  kai: { hair: "#d45a28", skin: "#c98a5a", cut: "crop" },
  hana: { hair: "#8a2038", skin: "#efc3ad", cut: "wolf" },
  jules: { hair: "#6f8fff", skin: "#f0c9b0", cut: "curtain" },
  aera: { hair: "#f0b7d4", skin: "#f4d0bc", cut: "straight" },
  theo: { hair: "#1c2744", skin: "#cfa27c", cut: "messy" },
  lumi: { hair: "#f0d25a", skin: "#f1c6a6", cut: "bun" },
  vesper: { hair: "#6b4ca0", skin: "#e4b79a", cut: "wave" },
  niko: { hair: "#1f8f7a", skin: "#e0b394", cut: "mullet" },
  sol: { hair: "#f0a04a", skin: "#f3c8ae", cut: "shag" },
};

type Cut = "wave" | "crop" | "pony" | "bob" | "twins" | "wolf" | "curtain" | "straight" | "messy" | "bun" | "mullet" | "shag";

export function CharacterPortrait({ member }: { member: Member }) {
  const look = looks[member.id] ?? { hair: member.color, skin: "#efc3ad", cut: "bob" as const };
  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" role="img" aria-label={`${member.name} portrait`}>
      <defs>
        <linearGradient id={`${member.id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={member.color} stopOpacity="0.95" />
          <stop offset="1" stopColor="#0b0614" />
        </linearGradient>
      </defs>
      <rect width="200" height="240" rx="22" fill={`url(#${member.id}-bg)`} />
      <circle cx="142" cy="46" r="28" fill="white" opacity="0.14" />
      <Hair cut={look.cut} color={look.hair} />
      <ellipse cx="100" cy="118" rx="34" ry="40" fill={look.skin} />
      <ellipse cx="88" cy="116" rx="3.2" ry="4" fill="#1b1320" />
      <ellipse cx="112" cy="116" rx="3.2" ry="4" fill="#1b1320" />
      <path d="M90 132c6 6 14 6 20 0" fill="none" stroke="#b56b6b" strokeWidth="2" strokeLinecap="round" />
      <rect x="78" y="156" width="44" height="62" rx="12" fill={member.color} />
      <path d="M70 168h60v80H70z" fill="#111018" opacity="0.45" />
      <text x="16" y="222" fill="white" fontSize="11" fontFamily="Syne, sans-serif" letterSpacing="2">
        {member.name.toUpperCase()}
      </text>
    </svg>
  );
}

function Hair({ cut, color }: { cut: Cut; color: string }) {
  switch (cut) {
    case "wave":
      return <path d="M58 108c-10-44 18-72 42-72s52 24 44 70c-18-22-70-20-86 2z" fill={color} />;
    case "crop":
      return <path d="M66 98c2-40 68-44 70-2-18-16-52-14-70 2z" fill={color} />;
    case "pony":
      return (
        <>
          <path d="M64 104c4-46 72-48 74 0-22-18-54-16-74 0z" fill={color} />
          <path d="M132 70c18-8 28 18 18 48-16-10-22-28-18-48z" fill={color} />
        </>
      );
    case "twins":
      return (
        <>
          <path d="M66 100c6-42 64-42 70 0-24-14-48-14-70 0z" fill={color} />
          <path d="M58 96c-16 18-10 70 6 78 4-24 8-52 8-78z" fill={color} />
          <path d="M142 96c16 18 10 70-6 78-4-24-8-52-8-78z" fill={color} />
        </>
      );
    case "bob":
      return <path d="M60 112c6-48 76-50 82 0-8 18-70 20-82 0z" fill={color} />;
    case "wolf":
      return <path d="M54 120c8-56 86-58 94 2-20 8-36-18-48-6-12-16-30 2-46 4z" fill={color} />;
    case "curtain":
      return <path d="M62 108c10-50 68-50 78 2-18-24-40-8-40-8S80 88 62 108z" fill={color} />;
    case "straight":
      return <path d="M58 128c4-62 80-64 86 0v18c-28-22-60-20-86-4z" fill={color} />;
    case "messy":
      return <path d="M60 104l8-28 18 12 16-22 18 20 20-16 10 34c-18-12-54-10-90 0z" fill={color} />;
    case "bun":
      return (
        <>
          <circle cx="100" cy="52" r="16" fill={color} />
          <path d="M64 104c6-40 66-40 74 0-24-16-52-14-74 0z" fill={color} />
        </>
      );
    case "mullet":
      return <path d="M62 102c8-40 70-38 78 4 8 26-6 46-14 54-8-22-40-28-64-20z" fill={color} />;
    default:
      return <path d="M60 110c8-46 74-46 82 2-16 10-64 12-82-2z" fill={color} />;
  }
}
