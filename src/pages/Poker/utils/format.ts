import { Player } from '../types.ts';

/**
 * Hiển thị số chip: 100 -> "100 chip", -50 -> "-50 chip".
 */
export const formatChips = (value: number): string => {
  const rounded = Math.round(value);
  return `${rounded.toLocaleString('vi-VN')} chip`;
};

/**
 * Hiển thị net kèm dấu +/-.
 */
export const formatNet = (value: number): string => {
  const rounded = Math.round(value);
  if (rounded > 0) return `+${formatChips(rounded)}`;
  return formatChips(rounded);
};

/**
 * Tổng buy-in của 1 người (theo chip).
 */
export const totalBuyIn = (player: Player): number =>
  player.buyIns.reduce((sum, b) => sum + b.amount, 0);

/**
 * Net của 1 người = cashOut - tổng buyIn. Nếu chưa cash-out, coi cashOut = 0.
 */
export const netOf = (player: Player): number =>
  (player.cashOut ?? 0) - totalBuyIn(player);
