import type { Group } from "../../types/group";
import type { LogoStyle, LogoSymbol } from "../../types/look";
import { GroupLogo } from "../Shared/GroupLogo";

const styles: LogoStyle[] = ["minimal", "futuristic", "luxury", "cute", "dark", "retro", "cyber", "dreamy"];
const symbols: LogoSymbol[] = ["star", "orbit", "heart", "bolt", "moon"];

export function LogoStudio({
  group,
  onChange,
}: {
  group: Group;
  onChange: (patch: Partial<Group>) => void;
}) {
  return (
    <section className="glass grid gap-6 rounded-3xl p-6 md:grid-cols-[140px_1fr]">
      <GroupLogo group={group} size={120} />
      <div className="grid gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Typography / style</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {styles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => onChange({ logoStyle: style })}
                className={`rounded-full px-3 py-1.5 text-sm capitalize ${
                  group.logoStyle === style ? "bg-white text-ink" : "bg-white/10"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Symbol</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {symbols.map((symbol) => (
              <button
                key={symbol}
                type="button"
                onClick={() => onChange({ logoSymbol: symbol })}
                className={`rounded-full px-3 py-1.5 text-sm capitalize ${
                  group.logoSymbol === symbol ? "bg-white text-ink" : "bg-white/10"
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
