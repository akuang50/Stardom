import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterRoster } from "../components/CharacterCreator/CharacterRoster";
import { LookStudio } from "../components/CharacterCreator/LookStudio";
import { GroupCreatorForm } from "../components/GroupCreator/GroupCreatorForm";
import { LogoStudio } from "../components/GroupCreator/LogoStudio";
import { defaultPaletteId, resolvePalette } from "../data/palettes";
import { chemistryBonus, roleBalanceLabel } from "../engine/chemistryEngine";
import { resolveMembers } from "../engine/gameEngine";
import type { LogoStyle, LogoSymbol } from "../types/look";
import { resolveLook } from "../types/look";
import { useGameStore } from "../store/gameStore";

export function CreateGroup() {
  const navigate = useNavigate();
  const createGroup = useGameStore((state) => state.createGroup);
  const setDraftPalette = useGameStore((state) => state.setDraftPalette);
  const looks = useGameStore((state) => state.looks);
  const setLook = useGameStore((state) => state.setLook);
  const [name, setName] = useState("NEONIX");
  const [concept, setConcept] = useState("neon");
  const [fandomName, setFandomName] = useState("NXLIGHT");
  const [eraName, setEraName] = useState("DEBUT ERA");
  const [slogan, setSlogan] = useState("We were always stars.");
  const [paletteId, setPaletteId] = useState(defaultPaletteId);
  const [logoStyle, setLogoStyle] = useState<LogoStyle>("futuristic");
  const [logoSymbol, setLogoSymbol] = useState<LogoSymbol>("star");
  const [memberIds, setMemberIds] = useState<string[]>(["nova", "rin", "mira", "sage", "yuna"]);
  const [focusId, setFocusId] = useState("nova");

  const members = resolveMembers(memberIds);
  const palette = resolvePalette(paletteId);
  const ready = name.trim().length > 0 && memberIds.length >= 4 && memberIds.length <= 7;
  const focus = members.find((member) => member.id === focusId) ?? members[0];
  const draftGroup = useMemo(
    () => ({
      id: "draft",
      name,
      concept,
      fandomName,
      color: palette.accent,
      paletteId,
      memberIds,
      debuted: false,
      eraName,
      slogan,
      logoStyle,
      logoSymbol,
      lightstick: "orb" as const,
      lighting: "laser" as const,
      led: "grid" as const,
    }),
    [name, concept, fandomName, palette.accent, paletteId, memberIds, eraName, slogan, logoStyle, logoSymbol],
  );

  useEffect(() => {
    setDraftPalette(paletteId);
    return () => setDraftPalette(null);
  }, [paletteId, setDraftPalette]);

  return (
    <div className="grid gap-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em]" style={{ color: palette.accent }}>
          Group creation
        </p>
        <h1 className="font-display mt-2 text-5xl font-extrabold">Cast the lineup</h1>
        <p className="mt-3 max-w-2xl text-mist/70">
          Name the unit, pick a palette, design the logo, then style every member. Palettes borrow public color moods, not logos or photos.
        </p>
      </header>
      <GroupCreatorForm
        name={name}
        concept={concept}
        fandomName={fandomName}
        paletteId={paletteId}
        eraName={eraName}
        slogan={slogan}
        onChange={(patch) => {
          if (patch.name !== undefined) setName(patch.name);
          if (patch.concept !== undefined) setConcept(patch.concept);
          if (patch.fandomName !== undefined) setFandomName(patch.fandomName);
          if (patch.eraName !== undefined) setEraName(patch.eraName);
          if (patch.slogan !== undefined) setSlogan(patch.slogan);
          if (patch.palette) setPaletteId(patch.palette.id);
        }}
      />
      <LogoStudio
        group={draftGroup}
        onChange={(patch) => {
          if (patch.logoStyle) setLogoStyle(patch.logoStyle);
          if (patch.logoSymbol) setLogoSymbol(patch.logoSymbol);
        }}
      />
      {focus ? (
        <LookStudio
          member={focus}
          look={resolveLook(focus.id, looks[focus.id])}
          onChange={(patch) => setLook(focus.id, patch)}
        />
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-mist/70">
          {memberIds.length} selected · {roleBalanceLabel(members)} · chemistry {chemistryBonus(members)}
        </p>
        <button
          type="button"
          disabled={!ready}
          onClick={() => {
            createGroup({
              name,
              concept,
              fandomName,
              color: palette.accent,
              paletteId,
              memberIds,
              eraName,
              slogan,
              logoStyle,
              logoSymbol,
            });
            navigate("/group");
          }}
          className="rounded-full px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: palette.accent }}
        >
          Form group
        </button>
      </div>
      <CharacterRoster
        selectedIds={memberIds}
        looks={looks}
        onToggle={(id) => {
          setFocusId(id);
          setMemberIds((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
          );
        }}
      />
    </div>
  );
}
