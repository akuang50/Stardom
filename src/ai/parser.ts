export type DirectorAction =
  | { action: "change_concept"; concept: string }
  | { action: "rename_song"; title: string }
  | { action: "boost_lines"; memberId: string }
  | { action: "even_lines" }
  | { action: "rename_group"; name: string }
  | { action: "unknown"; raw: string };

export function parseDirectorCommand(input: string): DirectorAction {
  const text = input.trim().toLowerCase();
  if (!text) return { action: "unknown", raw: input };

  if (/(darker|dark|noir|velvet)/.test(text)) return { action: "change_concept", concept: "dark" };
  if (/(brighter|neon|sparkle|glitter)/.test(text)) return { action: "change_concept", concept: "neon" };
  if (/(summer|sunny|festival)/.test(text)) return { action: "change_concept", concept: "summer" };
  if (/(elegant|couture|classy)/.test(text)) return { action: "change_concept", concept: "elegant" };
  if (/(fierce|aggressive|sharp)/.test(text)) return { action: "change_concept", concept: "fierce" };

  if (/even|balance.*lines|equal/.test(text)) return { action: "even_lines" };

  const boost = text.match(/(?:give|boost|more lines? (?:to |for )?)\s+([a-z]+)/);
  if (boost?.[1]) return { action: "boost_lines", memberId: boost[1] };

  const song = text.match(/(?:rename (?:the )?song|title(?: track)?(?: is| to)?|call it)\s+(.+)/);
  if (song?.[1]) return { action: "rename_song", title: titleCase(song[1]) };

  const group = text.match(/(?:rename (?:the )?group|group name(?: is| to)?)\s+(.+)/);
  if (group?.[1]) return { action: "rename_group", name: group[1].trim().toUpperCase() };

  return { action: "unknown", raw: input };
}

function titleCase(value: string): string {
  return value
    .replace(/[."']/g, "")
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
