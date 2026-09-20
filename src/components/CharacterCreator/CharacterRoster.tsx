import { characters } from "../../data/characters";
import { MemberCard } from "../Shared/MemberCard";

export function CharacterRoster({
  selectedIds,
  onToggle,
}: {
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          selected={selectedIds.includes(member.id)}
          onToggle={() => onToggle(member.id)}
        />
      ))}
    </div>
  );
}
