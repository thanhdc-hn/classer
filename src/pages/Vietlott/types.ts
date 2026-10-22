export type GameType = '645' | '655';

export interface SavedTicket {
  id: string;
  game: GameType;
  numbers: number[]; // đã sắp xếp tăng dần
  at: number; // timestamp
}

export type SaveResult = 'saved' | 'duplicate' | 'full';

export type SpinPhase = 'idle' | 'spinning' | 'done';
