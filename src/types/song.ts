export interface LineShare {
  memberId: string;
  share: number;
}

export interface Song {
  id: string;
  title: string;
  concept: string;
  genre: string;
  audioKey: string;
  artwork: string;
  lines: LineShare[];
  released: boolean;
  weekReleased: number | null;
  streams: number;
  chartPeak: number | null;
}
