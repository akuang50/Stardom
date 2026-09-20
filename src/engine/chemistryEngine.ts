import type { Member } from "../types/member";

export function chemistryBonus(members: Member[]): number {
  if (members.length < 2) return 0;
  const vocals = members.filter((member) => member.role.includes("Vocal")).length;
  const dancers = members.filter((member) => member.role.includes("Dancer")).length;
  const rappers = members.filter((member) => member.role.includes("Rap")).length;
  const coverage = [vocals, dancers, rappers].filter((count) => count > 0).length;
  const visualMean = members.reduce((sum, member) => sum + member.visual, 0) / members.length;
  const spread =
    members.reduce((sum, member) => sum + member.charisma, 0) / members.length / 20;
  return Math.round(coverage * 6 + visualMean * 0.08 + spread);
}

export function roleBalanceLabel(members: Member[]): string {
  const bonus = chemistryBonus(members);
  if (bonus >= 24) return "Explosive chemistry";
  if (bonus >= 16) return "Tight unit";
  if (bonus >= 10) return "Promising mix";
  return "Still finding the blend";
}
