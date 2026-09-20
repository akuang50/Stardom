import type { LightingMode, LedMode, LightstickShape, LogoStyle, LogoSymbol } from "./look";

export interface Group {
  id: string;
  name: string;
  concept: string;
  fandomName: string;
  color: string;
  paletteId: string;
  memberIds: string[];
  debuted: boolean;
  eraName: string;
  slogan: string;
  logoStyle: LogoStyle;
  logoSymbol: LogoSymbol;
  lightstick: LightstickShape;
  lighting: LightingMode;
  led: LedMode;
}
