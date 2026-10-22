import { ThunderboltFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import GameSelector from './components/GameSelector.tsx';
import NumberSlots from './components/NumberSlots.tsx';
import ResultPanel from './components/ResultPanel.tsx';
import { GAMES, MAX_SAVED } from './constants.ts';
import { GameType } from './types.ts';
import { useSpinner } from './useSpinner.ts';
import { useVietlott } from './useVietlott.ts';
import { VietlottStyled } from './vietlott.styled.ts';

const Vietlott = () => {
  document.title = 'Quay số Vietlott';

  const [game, setGame] = useState<GameType>('645');
  const { tickets, saveTicket, removeTicket, clearTickets } = useVietlott();

  const handleDone = useCallback(
    (doneGame: GameType, numbers: number[]) => {
      toast.dismiss();
      const result = saveTicket(doneGame, numbers);
      if (result === 'duplicate') {
        toast.warning('Dãy số trùng với dãy đã lưu, không lưu lại');
      } else if (result === 'full') {
        toast.warning(
          `Đã đủ ${MAX_SAVED} dãy, không thể lưu thêm. Hãy xoá bớt để tiếp tục lưu.`,
        );
      }
    },
    [saveTicket],
  );

  const { phase, slots, spin, reset } = useSpinner({ onDone: handleDone });
  const isSpinning = phase === 'spinning';

  const handleChangeGame = (value: GameType) => {
    setGame(value);
    reset();
  };

  return (
    <VietlottStyled>
      <div className="container">
        <header className="header">
          <h1>
            <span className="title-icon" aria-hidden="true">
              🎱
            </span>{' '}
            <span className="title-text">Quay số Vietlott</span>
          </h1>
          <p className="subtitle">
            Chọn loại vé và quay để nhận dãy số ngẫu nhiên
          </p>
        </header>

        <div className="layout">
          <section className="card main-area">
            <GameSelector
              value={game}
              disabled={isSpinning}
              onChange={handleChangeGame}
            />
            <p className="range-hint">
              Chọn 6 số khác nhau trong khoảng 01 – {GAMES[game].max}
            </p>

            <NumberSlots slots={slots} />

            <Button
              type="primary"
              size="large"
              className="spin-btn"
              icon={<ThunderboltFilled />}
              loading={isSpinning}
              onClick={() => spin(game)}
            >
              Quay số
            </Button>
          </section>

          <ResultPanel
            tickets={tickets}
            onRemove={removeTicket}
            onClear={clearTickets}
          />
        </div>
      </div>
    </VietlottStyled>
  );
};

export default Vietlott;
