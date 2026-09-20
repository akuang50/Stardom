export interface ConcertRecord {
  id: string;
  venueId: string;
  songTitle: string;
  week: number;
  attendance: number;
  capacity: number;
  soldOut: boolean;
  fansDelta: number;
  moneyDelta: number;
}
