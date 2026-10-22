import { GameType } from './types.ts';

export const NUMBER_COUNT = 6;
export const MAX_SAVED = 50;

export const GAMES: Record<GameType, { label: string; max: number }> = {
  '645': { label: '6/45', max: 45 },
  '655': { label: '6/55', max: 55 },
};

export const GAME_OPTIONS = (Object.keys(GAMES) as GameType[]).map((key) => ({
  value: key,
  label: GAMES[key].label,
}));

// Thời gian (ms) cho hiệu ứng quay
export const ROLL_INTERVAL = 60; // tốc độ đổi số khi đang chạy
export const FIRST_LOCK_DELAY = 900; // ô đầu tiên dừng sau
export const LOCK_STEP = 650; // mỗi ô tiếp theo dừng cách nhau

// Màu bi theo khoảng chục: 1-9, 10-19, 20-29, 30-39, 40-49, 50+
const BALL_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#a855f7',
];

export const getBallColor = (n: number) =>
  BALL_COLORS[Math.min(Math.floor(n / 10), BALL_COLORS.length - 1)];
