import { GameType } from '../types.ts';

const randomBuffer = new Uint32Array(1);

// Số nguyên đều trong [0, maxExclusive) bằng crypto, loại bỏ lệch modulo (rejection sampling).
const secureRandomInt = (maxExclusive: number) => {
  const limit = Math.floor(0x100000000 / maxExclusive) * maxExclusive;
  let value: number;
  do {
    crypto.getRandomValues(randomBuffer);
    value = randomBuffer[0];
  } while (value >= limit);
  return value % maxExclusive;
};

// Chọn `count` số khác nhau trong [1, max] (Fisher-Yates một phần), trả về đã sắp xếp tăng dần.
export const pickUniqueSorted = (max: number, count: number) => {
  const pool = Array.from({ length: max }, (_, i) => i + 1);
  for (let i = 0; i < count; i++) {
    const j = i + secureRandomInt(max - i);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).sort((a, b) => a - b);
};

// Số hiển thị khi đang quay (chỉ là hiệu ứng, không phải kết quả) trong [min, max].
export const randomBetween = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

export const ticketKey = (game: GameType, numbers: number[]) =>
  `${game}:${numbers.join('-')}`;
