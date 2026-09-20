export function Waveform({ playing, color }: { playing: boolean; color: string }) {
  const bars = Array.from({ length: 28 }, (_, index) => index);
  return (
    <div className="flex h-16 items-end justify-center gap-1" aria-hidden>
      {bars.map((bar) => (
        <span
          key={bar}
          className="w-1.5 rounded-full"
          style={{
            background: color,
            height: playing ? `${18 + ((bar * 17) % 42)}px` : "10px",
            transformOrigin: "bottom",
            animation: playing ? `wave 0.9s ease-in-out ${bar * 0.04}s infinite alternate` : "none",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
