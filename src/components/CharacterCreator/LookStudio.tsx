import type { Member } from "../../types/member";
import { hairColors, hairOptions, outfitOptions, styleOptions, type MemberLook } from "../../types/look";
import { CharacterPortrait } from "../Shared/CharacterPortrait";

export function LookStudio({
  member,
  look,
  onChange,
}: {
  member: Member;
  look: MemberLook;
  onChange: (patch: Partial<MemberLook>) => void;
}) {
  return (
    <section className="glass grid gap-6 rounded-3xl p-6 lg:grid-cols-[220px_1fr]">
      <div className="overflow-hidden rounded-3xl">
        <CharacterPortrait member={member} look={look} />
      </div>
      <div className="grid gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Hair</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hairOptions.map((option) => (
              <Chip key={option.id} active={look.hair === option.id} onClick={() => onChange({ hair: option.id })}>
                {option.label}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Hair color</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hairColors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={color}
                onClick={() => onChange({ hairColor: color })}
                className={`h-8 w-8 rounded-full border ${look.hairColor === color ? "border-white" : "border-white/20"}`}
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Style</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {styleOptions.map((option) => (
              <Chip key={option.id} active={look.style === option.id} onClick={() => onChange({ style: option.id })}>
                {option.label}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Outfit</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {outfitOptions.map((option) => (
              <Chip key={option.id} active={look.outfit === option.id} onClick={() => onChange({ outfit: option.id })}>
                {option.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm ${active ? "bg-white text-ink" : "bg-white/10"}`}
    >
      {children}
    </button>
  );
}
