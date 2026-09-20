export type MemberRole =
  | "Main Vocal"
  | "Lead Vocal"
  | "Main Rapper"
  | "Lead Rapper"
  | "Main Dancer"
  | "Lead Dancer"
  | "Visual"
  | "Center"
  | "Maknae";

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  vocal: number;
  dance: number;
  rap: number;
  visual: number;
  charisma: number;
  color: string;
  bio: string;
  nationality: string;
  age: number;
}
