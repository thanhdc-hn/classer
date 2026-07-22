import { ClearOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useMemo } from 'react';
import AddPlayerForm from './components/AddPlayerForm.tsx';
import BuyInConfig from './components/BuyInConfig.tsx';
import PlayerCard from './components/PlayerCard.tsx';
import SettlementResult from './components/SettlementResult.tsx';
import SummaryBar from './components/SummaryBar.tsx';
import { PokerStyled } from './poker.styled.ts';
import { usePoker } from './usePoker.ts';
import { computeSettlement } from './utils/settlement.ts';

const Poker = () => {
  document.title = 'Poker Cash Flow';

  const {
    players,
    defaultBuyIn,
    setDefaultBuyIn,
    addPlayer,
    removePlayer,
    addDefaultBuyIn,
    removeBuyIn,
    setCashOut,
    setBanker,
    reset,
  } = usePoker();

  const hasCashOut = players.some((p) => p.cashOut != null);
  const transactions = useMemo(() => computeSettlement(players), [players]);

  return (
    <PokerStyled>
      <div className="container">
        <header className="header">
          <h1>♠ Poker Cash Flow</h1>
          <p className="subtitle">Quản lí dòng tiền buổi poker cùng bạn bè</p>
        </header>

        <BuyInConfig value={defaultBuyIn} onChange={setDefaultBuyIn} />

        <AddPlayerForm
          onAdd={addPlayer}
          existingNames={players.map((p) => p.name)}
        />

        {players.length === 0 ? (
          <p className="empty-hint">
            Chưa có người chơi. Thêm người chơi để bắt đầu.
          </p>
        ) : (
          <>
            <SummaryBar players={players} />

            <div className="players">
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  defaultBuyIn={defaultBuyIn}
                  onAddBuyIn={addDefaultBuyIn}
                  onRemoveBuyIn={removeBuyIn}
                  onSetCashOut={setCashOut}
                  onSetBanker={setBanker}
                  onRemove={removePlayer}
                />
              ))}
            </div>

            <SettlementResult
              transactions={transactions}
              hasCashOut={hasCashOut}
            />

            <div className="footer-actions">
              <Popconfirm
                title="Reset toàn bộ buổi chơi?"
                description="Toàn bộ người chơi và dữ liệu sẽ bị xoá."
                okText="Reset"
                cancelText="Huỷ"
                okButtonProps={{ danger: true }}
                onConfirm={reset}
              >
                <Button danger icon={<ClearOutlined />}>
                  Reset buổi chơi
                </Button>
              </Popconfirm>
            </div>
          </>
        )}
      </div>
    </PokerStyled>
  );
};

export default Poker;
