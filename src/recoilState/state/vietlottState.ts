import { GAMES, MAX_SAVED, NUMBER_COUNT } from '@pages/Vietlott/constants.ts';
import { SavedTicket } from '@pages/Vietlott/types.ts';
import { atom, AtomEffect } from 'recoil';

const STORAGE_KEY = 'vietlott-tickets';

const isValidTicket = (t: unknown): t is SavedTicket => {
  if (!t || typeof t !== 'object') return false;
  const { id, game, numbers, at } = t as Partial<SavedTicket>;
  if (typeof id !== 'string' || typeof at !== 'number') return false;
  if (!game || !(game in GAMES)) return false;
  if (!Array.isArray(numbers) || numbers.length !== NUMBER_COUNT) return false;
  const { max } = GAMES[game];
  return (
    numbers.every((n) => Number.isInteger(n) && n >= 1 && n <= max) &&
    new Set(numbers).size === NUMBER_COUNT
  );
};

const localStorageEffect: AtomEffect<SavedTicket[]> = ({ setSelf, onSet }) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved != null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setSelf(parsed.filter(isValidTicket).slice(0, MAX_SAVED));
      }
    }
  } catch {
    // Bỏ qua dữ liệu hỏng
  }

  onSet((newValue, _old, isReset) => {
    try {
      if (isReset || newValue.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      }
    } catch {
      // Bỏ qua lỗi ghi (vd hết quota)
    }
  });
};

export const vietlottTicketsState = atom<SavedTicket[]>({
  key: 'vietlottTicketsState',
  default: [],
  effects_UNSTABLE: [localStorageEffect],
});
