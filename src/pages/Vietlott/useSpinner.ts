import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FIRST_LOCK_DELAY,
  GAMES,
  LOCK_STEP,
  NUMBER_COUNT,
  ROLL_INTERVAL,
} from './constants.ts';
import { GameType, SpinPhase } from './types.ts';
import { pickUniqueSorted, randomBetween } from './utils/random.ts';

interface Options {
  onDone: (game: GameType, numbers: number[]) => void;
}

/**
 * Quản lý hiệu ứng quay: kết quả được chọn sẵn khi bắt đầu quay,
 * các ô chạy số ngẫu nhiên rồi dừng lần lượt từ ô đầu đến ô cuối.
 */
export const useSpinner = ({ onDone }: Options) => {
  const [phase, setPhase] = useState<SpinPhase>('idle');
  const [result, setResult] = useState<number[]>([]);
  const [rolling, setRolling] = useState<number[]>(() =>
    Array(NUMBER_COUNT).fill(0),
  );
  const [lockedCount, setLockedCount] = useState(0);

  const intervalRef = useRef<number>();
  const timeoutsRef = useRef<number[]>([]);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const clearTimers = useCallback(() => {
    window.clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  // Dọn timer khi unmount
  useEffect(() => clearTimers, [clearTimers]);

  const spin = useCallback(
    (game: GameType) => {
      clearTimers();
      const { max } = GAMES[game];
      const final = pickUniqueSorted(max, NUMBER_COUNT);

      // Số đã khoá của ô trước, dùng để các ô đang chạy luôn hiển thị số lớn hơn (kết quả tăng dần)
      let locked = 0;

      setResult(final);
      setLockedCount(0);
      setPhase('spinning');
      setRolling(
        Array.from({ length: NUMBER_COUNT }, () => randomBetween(1, max)),
      );

      intervalRef.current = window.setInterval(() => {
        const floor = locked > 0 ? final[locked - 1] + 1 : 1;
        setRolling(() =>
          Array.from({ length: NUMBER_COUNT }, () => randomBetween(floor, max)),
        );
      }, ROLL_INTERVAL);

      for (let i = 0; i < NUMBER_COUNT; i++) {
        const id = window.setTimeout(
          () => {
            locked = i + 1;
            setLockedCount(locked);
            if (locked === NUMBER_COUNT) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = undefined;
              setPhase('done');
              onDoneRef.current(game, final);
            }
          },
          FIRST_LOCK_DELAY + i * LOCK_STEP,
        );
        timeoutsRef.current.push(id);
      }
    },
    [clearTimers],
  );

  const reset = useCallback(() => {
    clearTimers();
    setPhase('idle');
    setResult([]);
    setLockedCount(0);
    setRolling(Array(NUMBER_COUNT).fill(0));
  }, [clearTimers]);

  // Giá trị hiển thị cho từng ô: đã khoá -> kết quả, đang chạy -> số ngẫu nhiên, idle -> null
  const slots = Array.from({ length: NUMBER_COUNT }, (_, i) => {
    if (i < lockedCount) return { value: result[i], locked: true };
    if (phase === 'spinning') return { value: rolling[i], locked: false };
    return { value: null as number | null, locked: false };
  });

  return { phase, slots, spin, reset };
};
