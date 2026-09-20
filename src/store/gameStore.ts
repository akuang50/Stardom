import { create } from "zustand";
import { persist } from "zustand/middleware";
import { neonixMemberIds } from "../data/characters";
import { catalogSongs } from "../data/songs";
import { parseDirectorCommand } from "../ai/parser";
import { createGroupDraft, resolveMembers } from "../engine/gameEngine";
import { remixFromExplore, visualForConcept } from "../engine/remixEngine";
import { simulateRelease, simulateWeek } from "../engine/careerEngine";
import { createSong, evenLines, setMemberShare } from "../engine/musicEngine";
import type { GameSnapshot } from "../types/game";
import type { Group } from "../types/group";
import type { Song } from "../types/song";
import type { MemberLook } from "../types/look";
import { resolveLook } from "../types/look";

const emptyState: GameSnapshot = {
  group: null,
  memberIds: [],
  songs: [],
  week: 1,
  money: 50_000,
  fans: 1_200,
  careerLog: [],
  settings: {
    audioEnabled: true,
    directorOffline: true,
  },
  demoMode: false,
  looks: {},
};

interface GameStore extends GameSnapshot {
  createGroup: (input: Parameters<typeof createGroupDraft>[0]) => void;
  updateGroup: (patch: Partial<Group>) => void;
  setMemberIds: (memberIds: string[]) => void;
  addSong: (title: string, concept?: string) => string | null;
  updateSong: (songId: string, patch: Partial<Song>) => void;
  setLineShare: (songId: string, memberId: string, share: number) => void;
  releaseSong: (songId: string) => void;
  advanceWeek: () => void;
  remix: (exploreId: string) => void;
  applyDirector: (prompt: string) => string;
  loadDemo: () => void;
  reset: () => void;
  draftPaletteId: string | null;
  setDraftPalette: (id: string | null) => void;
  setLook: (id: string, patch: Partial<MemberLook>) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...emptyState,
      draftPaletteId: null,

      createGroup: (input) => {
        const group = createGroupDraft(input);
        set({
          group,
          memberIds: input.memberIds,
          songs: [],
          week: 1,
          money: 50_000,
          fans: 1_200,
          careerLog: [
            {
              id: "formed",
              week: 1,
              title: `${group.name} is formed`,
              description: `${input.memberIds.length} members. Fandom: ${group.fandomName}.`,
              fansDelta: 1_200,
              moneyDelta: 0,
            },
          ],
          demoMode: false,
        });
      },

      updateGroup: (patch) => {
        const group = get().group;
        if (!group) return;
        set({ group: { ...group, ...patch } });
      },

      setMemberIds: (memberIds) => {
        const group = get().group;
        set({
          memberIds,
          group: group ? { ...group, memberIds } : group,
        });
      },

      addSong: (title, concept) => {
        const { group, memberIds } = get();
        if (!group || memberIds.length === 0) return null;
        const song = createSong({
          title,
          concept: concept ?? group.concept,
          memberIds,
        });
        set({ songs: [...get().songs, song] });
        return song.id;
      },

      updateSong: (songId, patch) => {
        set({
          songs: get().songs.map((song) => (song.id === songId ? { ...song, ...patch } : song)),
        });
      },

      setLineShare: (songId, memberId, share) => {
        set({
          songs: get().songs.map((song) =>
            song.id === songId ? { ...song, lines: setMemberShare(song.lines, memberId, share) } : song,
          ),
        });
      },

      releaseSong: (songId) => {
        const state = get();
        const song = state.songs.find((item) => item.id === songId);
        if (!song || song.released) return;
        const members = resolveMembers(state.memberIds);
        const result = simulateRelease(song, members, state.week, state.fans, state.money);
        set({
          songs: state.songs.map((item) => (item.id === songId ? result.song : item)),
          fans: result.fans,
          money: result.money,
          group: state.group ? { ...state.group, debuted: true } : state.group,
          careerLog: [result.entry, ...state.careerLog],
        });
      },

      advanceWeek: () => {
        const state = get();
        const nextWeek = state.week + 1;
        const result = simulateWeek(nextWeek, state.fans, state.money, state.songs);
        set({
          week: nextWeek,
          fans: result.fans,
          money: result.money,
          songs: result.songs,
          careerLog: [result.entry, ...state.careerLog],
        });
      },

      remix: (exploreId) => {
        const group = get().group;
        if (!group) return;
        const remixed = remixFromExplore(group, exploreId);
        set({
          group: remixed,
          careerLog: [
            {
              id: `remix-${exploreId}`,
              week: get().week,
              title: "Concept remix",
              description: `${group.name} absorbs a new concept direction.`,
              fansDelta: 4000,
              moneyDelta: -2500,
            },
            ...get().careerLog,
          ],
          fans: get().fans + 4000,
          money: Math.max(0, get().money - 2500),
        });
      },

      applyDirector: (prompt) => {
        const command = parseDirectorCommand(prompt);
        const state = get();
        const latest = state.songs.at(-1);

        switch (command.action) {
          case "change_concept":
            if (state.group) {
              get().updateGroup({ concept: command.concept, ...visualForConcept(command.concept) });
              if (latest && !latest.released) {
                const song = createSong({
                  title: latest.title,
                  concept: command.concept,
                  memberIds: state.memberIds,
                });
                get().updateSong(latest.id, {
                  concept: song.concept,
                  genre: song.genre,
                  audioKey: song.audioKey,
                  artwork: song.artwork,
                });
              }
            }
            return `Concept shifted to ${command.concept}. Creative Director Offline Mode.`;
          case "rename_song":
            if (latest) get().updateSong(latest.id, { title: command.title });
            return latest ? `Title track is now ${command.title}.` : "Create a song first.";
          case "boost_lines":
            if (latest) {
              const current = latest.lines.find((line) => line.memberId === command.memberId);
              get().setLineShare(latest.id, command.memberId, (current?.share ?? 20) + 18);
            }
            return `Boosted lines for ${command.memberId}.`;
          case "even_lines":
            if (latest) get().updateSong(latest.id, { lines: evenLines(state.memberIds) });
            return "Line distribution balanced.";
          case "rename_group":
            get().updateGroup({ name: command.name });
            return `Group renamed to ${command.name}.`;
          default:
            return "Couldn't map that. Try: make it darker, give nova more lines, balance the lines.";
        }
      },

      loadDemo: () => {
        const group = createGroupDraft({
          name: "NEONIX",
          concept: "neon",
          fandomName: "NXLIGHT",
          color: "#ff2d95",
          paletteId: "ink-pink",
          memberIds: [...neonixMemberIds],
        });
        group.debuted = true;
        group.eraName = "AFTERGLOW ERA";
        group.slogan = "Stay in the light.";

        const debut = createSong({
          title: catalogSongs[0].title,
          concept: "neon",
          memberIds: [...neonixMemberIds],
        });
        const released = simulateRelease(debut, resolveMembers([...neonixMemberIds]), 4, 128_000, 210_000);

        set({
          group,
          memberIds: [...neonixMemberIds],
          songs: [released.song],
          week: 8,
          money: released.money + 64_000,
          fans: released.fans + 42_000,
          demoMode: true,
          careerLog: [
            {
              id: "demo-tour",
              week: 8,
              title: "Showcase encore",
              description: "NEONIX closes the hall in matching chrome. NXLIGHT stays for the outro.",
              fansDelta: 22000,
              moneyDelta: 18000,
            },
            {
              id: "demo-trophy",
              week: 6,
              title: "First music-show win",
              description: "NEON HEART takes the trophy. Nova cries. Rin pretends not to.",
              fansDelta: 36000,
              moneyDelta: 24000,
            },
            released.entry,
            {
              id: "demo-debut",
              week: 4,
              title: "Debut week",
              description: "Five members. One neon heart. Pre-orders vanish overnight.",
              fansDelta: 128000,
              moneyDelta: 90000,
            },
            {
              id: "demo-form",
              week: 1,
              title: "NEONIX is formed",
              description: "The agency green-lights a five-member unit with a city-night concept.",
              fansDelta: 8000,
              moneyDelta: 0,
            },
          ],
        });
      },

      reset: () => set({ ...emptyState, draftPaletteId: null }),
      setDraftPalette: (id) => set({ draftPaletteId: id }),
      setLook: (id, patch) => {
        const current = get().looks[id] ?? resolveLook(id);
        set({ looks: { ...get().looks, [id]: { ...current, ...patch } } });
      },
    }),
    {
      name: "stardom-save",
      version: 3,
      migrate: (persisted) => {
        const state = persisted as { group?: Record<string, unknown>; looks?: Record<string, MemberLook> };
        if (state.group) {
          state.group.paletteId ??= "ink-pink";
          state.group.eraName ??= "DEBUT ERA";
          state.group.slogan ??= "We were always stars.";
          state.group.logoStyle ??= "futuristic";
          state.group.logoSymbol ??= "star";
          state.group.lightstick ??= "orb";
          state.group.lighting ??= "laser";
          state.group.led ??= "grid";
        }
        state.looks ??= {};
        return persisted;
      },
      partialize: (state) => ({
        group: state.group,
        memberIds: state.memberIds,
        songs: state.songs,
        week: state.week,
        money: state.money,
        fans: state.fans,
        careerLog: state.careerLog,
        settings: state.settings,
        demoMode: state.demoMode,
        looks: state.looks,
      }),
    },
  ),
);
