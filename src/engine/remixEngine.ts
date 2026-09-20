import { conceptsById } from "../data/concepts";
import { exploreGroups } from "../data/explore";
import type { Group } from "../types/group";

export function remixFromExplore(group: Group, exploreId: string): Group {
  const source = exploreGroups.find((item) => item.id === exploreId);
  if (!source) return group;
  const concept = conceptsById[source.concept];
  return {
    ...group,
    concept: source.concept,
    color: concept ? colorFromConcept(concept.id) : group.color,
  };
}

function colorFromConcept(conceptId: string): string {
  switch (conceptId) {
    case "dark":
      return "#7c3aed";
    case "summer":
      return "#f59e0b";
    case "elegant":
      return "#f5d0a6";
    case "fierce":
      return "#fb7185";
    default:
      return "#ec4899";
  }
}
