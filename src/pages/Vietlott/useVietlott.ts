import { vietlottTicketsState } from '@src/recoilState';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { MAX_SAVED } from './constants.ts';
import { GameType, SavedTicket, SaveResult } from './types.ts';
import { ticketKey } from './utils/random.ts';

export const useVietlott = () => {
  const tickets = useRecoilValue(vietlottTicketsState);
  const setTickets = useSetRecoilState(vietlottTicketsState);

  // Tự động lưu: bỏ qua nếu trùng dãy đã lưu (cùng loại) hoặc đã đủ giới hạn.
  const saveTicket = useRecoilCallback(
    ({ snapshot, set }) =>
      (game: GameType, numbers: number[]): SaveResult => {
        const current = snapshot.getLoadable(vietlottTicketsState).getValue();
        const key = ticketKey(game, numbers);

        if (current.some((t) => ticketKey(t.game, t.numbers) === key)) {
          return 'duplicate';
        }
        if (current.length >= MAX_SAVED) {
          return 'full';
        }

        const ticket: SavedTicket = {
          id: uuidv4(),
          game,
          numbers,
          at: Date.now(),
        };
        set(vietlottTicketsState, [ticket, ...current]);
        return 'saved';
      },
    [],
  );

  const removeTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const clearTickets = () => setTickets([]);

  return { tickets, saveTicket, removeTicket, clearTickets };
};
