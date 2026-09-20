import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AlbumArt } from "../components/Shared/AlbumArt";
import { CharacterPortrait } from "../components/Shared/CharacterPortrait";
import { GroupLogo } from "../components/Shared/GroupLogo";
import { charactersById, neonixMemberIds } from "../data/characters";
import { resolveLook } from "../types/look";
import { useGameStore } from "../store/gameStore";

const featuredFallback = {
  id: "featured",
  name: "NEONIX",
  concept: "neon",
  fandomName: "NXLIGHT",
  color: "#ff2d95",
  paletteId: "ink-pink",
  memberIds: neonixMemberIds,
  debuted: true,
  eraName: "AFTERGLOW ERA",
  slogan: "Stay in the light.",
  logoStyle: "futuristic" as const,
  logoSymbol: "star" as const,
  lightstick: "orb" as const,
  lighting: "laser" as const,
  led: "grid" as const,
};

export function Home() {
  const navigate = useNavigate();
  const loadDemo = useGameStore((state) => state.loadDemo);
  const group = useGameStore((state) => state.group);
  const looks = useGameStore((state) => state.looks);
  const featured = group ?? featuredFallback;
  const lineup = (group?.memberIds ?? neonixMemberIds).slice(0, 5);

  return (
    <div className="relative">
      <div className="hero-orb pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-[var(--theme-accent)]/25 blur-3xl" />
      <div className="hero-orb pointer-events-none absolute -left-10 bottom-10 h-56 w-56 rounded-full bg-[var(--theme-secondary)]/20 blur-3xl" />
      <section className="relative grid min-h-[70vh] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--theme-secondary)]">Create your K-pop universe</p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display mt-5 text-7xl font-extrabold leading-[0.86] sm:text-8xl"
          >
            STAR
            <span className="text-[var(--theme-accent)]">DOM</span>
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg text-mist/75">
            A cinematic studio for original groups, eras, songs, and stages. If you create it, you see it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink glow-ring"
            >
              Create group
              <Sparkles size={16} />
            </Link>
            <button
              type="button"
              onClick={() => {
                loadDemo();
                navigate("/group");
              }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
              style={{ background: "var(--theme-accent)" }}
            >
              Demo Mode
              <ArrowRight size={16} />
            </button>
            {group ? (
              <>
                <Link to="/group" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3">
                  Continue {group.name}
                </Link>
                <button
                  type="button"
                  onClick={() => useGameStore.getState().reset()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-mist/70"
                >
                  Reset save
                </button>
              </>
            ) : null}
          </div>
        </div>
        <motion.article
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass overflow-hidden rounded-[2rem] p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-mist/50">Featured universe</p>
              <h2 className="font-display text-3xl font-bold">{featured.name}</h2>
              <p className="text-sm text-mist/60">{featured.eraName}</p>
            </div>
            <GroupLogo group={featured} size={72} />
          </div>
          <div className="mt-4 overflow-hidden rounded-[1.6rem]">
            <AlbumArt song={{ title: "AFTERGLOW", concept: featured.concept }} group={featured} className="h-56 w-full" />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {lineup.map((id) => {
              const member = charactersById[id];
              return member ? (
                <div key={id} className="overflow-hidden rounded-2xl border border-white/10">
                  <CharacterPortrait member={member} look={looks[id] ?? resolveLook(id)} label={false} />
                </div>
              ) : null;
            })}
          </div>
        </motion.article>
      </section>
    </div>
  );
}
