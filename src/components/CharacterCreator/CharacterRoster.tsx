import { characters } from "../../data/characters";
import type { MemberLook } from "../../types/look";
import { MemberCard } from "../Shared/MemberCard";

export function CharacterRoster({
  selectedIds,
  onToggle,
  looks,
}: {
  selectedIds: string[];
  onToggle: (id: string) => void;
  looks?: Record<string, MemberLook>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          look={looks?.[member.id]}
          selected={selectedIds.includes(member.id)}
          onToggle={() => onToggle(member.id)}
        />
      ))}
    </div>
  );
}
