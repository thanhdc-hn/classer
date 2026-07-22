import { pokerConfigState, pokerPlayersState } from '@src/recoilState';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { BuyIn, Player } from './types.ts';

export const usePoker = () => {
  const [players, setPlayers] = useRecoilState(pokerPlayersState);
  const [config, setConfig] = useRecoilState(pokerConfigState);

  const setDefaultBuyIn = (amount: number) => {
    setConfig((prev) => ({ ...prev, defaultBuyIn: amount }));
  };

  const addPlayer = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    const newPlayer: Player = {
      id: uuidv4(),
      name: trimmed,
      buyIns: [],
      cashOut: null,
      isBanker: false,
    };
    setPlayers((prev) => [...prev, newPlayer]);
    return true;
  };

  const removePlayer = (id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const addBuyIn = (id: string, amount: number) => {
    const buyIn: BuyIn = { id: uuidv4(), amount, at: Date.now() };
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, buyIns: [...p.buyIns, buyIn] } : p,
      ),
    );
  };

  // Buy-in 1 click theo mức cố định đã cấu hình.
  const addDefaultBuyIn = (id: string) => {
    if (config.defaultBuyIn > 0) addBuyIn(id, config.defaultBuyIn);
  };

  const removeBuyIn = (playerId: string, buyInId: string) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === playerId
          ? { ...p, buyIns: p.buyIns.filter((b) => b.id !== buyInId) }
          : p,
      ),
    );
  };

  const setCashOut = (id: string, cashOut: number | null) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cashOut } : p)),
    );
  };

  // Đặt/gỡ nhà cái. Mỗi buổi chỉ có 1 nhà cái: bấm lại chính người đó để gỡ.
  const setBanker = (id: string) => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, isBanker: p.id === id ? !p.isBanker : false })),
    );
  };

  const reset = () => setPlayers([]);

  return {
    players,
    defaultBuyIn: config.defaultBuyIn,
    setDefaultBuyIn,
    addPlayer,
    removePlayer,
    addBuyIn,
    addDefaultBuyIn,
    removeBuyIn,
    setCashOut,
    setBanker,
    reset,
  };
};
