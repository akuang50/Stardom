import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterRoster } from "../components/CharacterCreator/CharacterRoster";
import { GroupCreatorForm } from "../components/GroupCreator/GroupCreatorForm";
import { defaultPaletteId, resolvePalette } from "../data/palettes";
import { chemistryBonus, roleBalanceLabel } from "../engine/chemistryEngine";
import { resolveMembers } from "../engine/gameEngine";
import { useGameStore } from "../store/gameStore";

export function CreateGroup() {
  const navigate = useNavigate();
  const createGroup = useGameStore((state) => state.createGroup);
  const setDraftPalette = useGameStore((state) => state.setDraftPalette);
  const [name, setName] = useState("NEONIX");
  const [concept, setConcept] = useState("neon");
  const [fandomName, setFandomName] = useState("NXLIGHT");
  const [paletteId, setPaletteId] = useState(defaultPaletteId);
  const [memberIds, setMemberIds] = useState<string[]>(["nova", "rin", "mira", "sage", "yuna"]);

  const members = resolveMembers(memberIds);
  const palette = resolvePalette(paletteId);
  const ready = name.trim().length > 0 && memberIds.length >= 4 && memberIds.length <= 7;

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
          Pick a name, a pastel or night palette, and 4–7 original trainees. Palettes borrow public color moods, not logos or photos.
        </p>
      </header>
      <GroupCreatorForm
        name={name}
        concept={concept}
        fandomName={fandomName}
        paletteId={paletteId}
        onChange={(patch) => {
          if (patch.name !== undefined) setName(patch.name);
          if (patch.concept !== undefined) setConcept(patch.concept);
          if (patch.fandomName !== undefined) setFandomName(patch.fandomName);
          if (patch.palette) setPaletteId(patch.palette.id);
        }}
      />
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
        onToggle={(id) => {
          setMemberIds((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
          );
        }}
      />
    </div>
  );
}
