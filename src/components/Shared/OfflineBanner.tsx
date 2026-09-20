import { useGameStore } from "../../store/gameStore";

export function OfflineBanner() {
  const directorOffline = useGameStore((state) => state.settings.directorOffline);
  if (!directorOffline) return null;

  return (
    <div className="mt-5 rounded-2xl border border-gold/25 bg-gold/8 px-4 py-3 text-sm text-gold">
      AI unavailable. No problem — STARDOM is in Creative Director Offline Mode. The full game still runs locally.
    </div>
  );
}
