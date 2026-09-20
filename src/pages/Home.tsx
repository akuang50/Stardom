import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Disc3, Sparkles, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export function Home() {
  const navigate = useNavigate();
  const loadDemo = useGameStore((state) => state.loadDemo);
  const group = useGameStore((state) => state.group);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-gold">Create your own K-pop universe</p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display mt-4 text-6xl font-extrabold leading-[0.9] sm:text-8xl"
        >
          STAR
          <span className="text-pink">DOM</span>
        </motion.h1>
        <p className="mt-6 max-w-xl text-lg text-mist/75">
          Form a group. Cast trainees. Write a title track. Split the lines. Drop the debut.
          Then watch the career catch fire — entirely in the browser.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              loadDemo();
              navigate("/group");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 font-semibold text-white shadow-[0_0_40px_rgba(255,45,149,0.35)]"
          >
            Demo Mode
            <Sparkles size={16} />
          </button>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink"
          >
            Create your group
            <ArrowRight size={16} />
          </Link>
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
      <div className="grid gap-3">
        <Feature icon={<Users size={18} />} title="Create groups" copy="Name the unit, pick a concept, cast 4–7 trainees." />
        <Feature icon={<Disc3 size={18} />} title="Make songs" copy="Title tracks, line splits, and a local demo preview." />
        <Feature icon={<Sparkles size={18} />} title="Build a career" copy="Releases, charts, fans, and a timeline that persists." />
      </div>
    </div>
  );
}

function Feature({ icon, title, copy }: { icon: ReactNode; title: string; copy: string }) {
  return (
    <article className="glass flex items-start gap-3 rounded-2xl p-4">
      <span className="mt-0.5 text-cyan">{icon}</span>
      <div>
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <p className="text-sm text-mist/65">{copy}</p>
      </div>
    </article>
  );
}
