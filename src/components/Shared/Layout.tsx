import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { resolvePalette } from "../../data/palettes";
import { paletteStyle } from "../../lib/theme";
import { useGameStore } from "../../store/gameStore";
import { GroupLogo } from "./GroupLogo";
import { Starfield } from "./Starfield";
import { OfflineBanner } from "./OfflineBanner";

const links = [
  { to: "/", label: "Home" },
  { to: "/create", label: "Create" },
  { to: "/group", label: "Group" },
  { to: "/song", label: "Studio" },
  { to: "/concert", label: "Concert" },
  { to: "/career", label: "Career" },
  { to: "/explore", label: "Explore" },
];

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const group = useGameStore((state) => state.group);
  const draftPaletteId = useGameStore((state) => state.draftPaletteId);
  const palette = resolvePalette(draftPaletteId ?? group?.paletteId);

  return (
    <div
      className={`stage-bg relative min-h-screen overflow-hidden ${palette.mood === "pastel" ? "theme-pastel" : ""}`}
      style={paletteStyle(palette)}
    >
      <Starfield />
      <motion.div
        key={palette.id}
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background: palette.accent }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-16 pt-6 sm:px-8">
        <header className="flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            {group ? (
              <GroupLogo group={group} size={36} />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]">
                <Sparkles size={16} />
              </span>
            )}
            <span className="font-display text-xl font-extrabold tracking-[0.22em]">STARDOM</span>
          </NavLink>
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-1 text-sm md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 transition ${
                    isActive ? "bg-white text-ink" : "text-mist/70 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <p className="hidden text-xs uppercase tracking-[0.18em] text-mist/50 sm:block">
            {group ? group.name : "No group yet"}
          </p>
        </header>
        <div className="mt-4 md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`shrink-0 rounded-full px-3 py-1.5 ${
                  location.pathname === link.to ? "bg-white text-ink" : "bg-white/5 text-mist/70"
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
        <OfflineBanner />
        <main className="flex-1 pt-6">{children}</main>
      </div>
    </div>
  );
}
