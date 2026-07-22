import { Player } from '@pages/Poker/types.ts';
import { atom, AtomEffect } from 'recoil';

const STORAGE_KEY = 'poker-session';

/**
 * Effect đồng bộ atom với localStorage: đọc khi khởi tạo, ghi mỗi khi thay đổi.
 */
const localStorageEffect: AtomEffect<Player[]> = ({ setSelf, onSet }) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved != null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setSelf(parsed as Player[]);
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

export const pokerPlayersState = atom<Player[]>({
  key: 'pokerPlayersState',
  default: [],
  effects_UNSTABLE: [localStorageEffect],
});

// ---- Cấu hình buổi chơi (mức buy-in cố định) ----

export interface PokerConfig {
  defaultBuyIn: number; // theo k
}

const CONFIG_KEY = 'poker-config';
const DEFAULT_CONFIG: PokerConfig = { defaultBuyIn: 100 };

const configStorageEffect: AtomEffect<PokerConfig> = ({ setSelf, onSet }) => {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved != null) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.defaultBuyIn === 'number') {
        setSelf(parsed as PokerConfig);
      }
    }
  } catch {
    // Bỏ qua dữ liệu hỏng
  }

  onSet((newValue) => {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(newValue));
    } catch {
      // Bỏ qua lỗi ghi
    }
  });
};

export const pokerConfigState = atom<PokerConfig>({
  key: 'pokerConfigState',
  default: DEFAULT_CONFIG,
  effects_UNSTABLE: [configStorageEffect],
});
