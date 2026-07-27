import {
  CrownFilled,
  CrownOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, InputNumber, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Player } from '../types.ts';
import { formatChips, formatNet, netOf, totalBuyIn } from '../utils/format.ts';

interface Props {
  player: Player;
  defaultBuyIn: number;
  onAddBuyIn: (id: string) => void;
  onRemoveBuyIn: (playerId: string, buyInId: string) => void;
  onSetCashOut: (id: string, value: number | null) => void;
  onSetBanker: (id: string) => void;
  onRemove: (id: string) => void;
}

const PlayerCard = ({
  player,
  defaultBuyIn,
  onAddBuyIn,
  onRemoveBuyIn,
  onSetCashOut,
  onSetBanker,
  onRemove,
}: Props) => {
  const buyIn = totalBuyIn(player);
  const net = netOf(player);
  const hasCashOut = player.cashOut != null;
  const netClass = net > 0 ? 'positive' : net < 0 ? 'negative' : '';

  return (
    <div className={`card player-card${player.isBanker ? ' is-banker' : ''}`}>
      <div className="player-head">
        <h3 className="player-name">
          {player.name}
          {player.isBanker && <span className="banker-badge">👑 Nhà cái</span>}
        </h3>
        <div className="head-actions">
          <Tooltip title={player.isBanker ? 'Gỡ nhà cái' : 'Đặt làm nhà cái'}>
            <Button
              size="small"
              type={player.isBanker ? 'primary' : 'default'}
              icon={player.isBanker ? <CrownFilled /> : <CrownOutlined />}
              onClick={() => onSetBanker(player.id)}
            />
          </Tooltip>
          <Popconfirm
            title="Xoá người chơi này?"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => onRemove(player.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      </div>

      <div className="player-stats">
        <div className="stat">
          <span className="stat-label">Tổng buy-in</span>
          <span className="stat-value">{formatChips(buyIn)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Cash-out</span>
          <span className="stat-value">
            {hasCashOut ? formatChips(player.cashOut as number) : '—'}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Lãi / Lỗ</span>
          <span className={`stat-value ${hasCashOut ? netClass : ''}`}>
            {hasCashOut ? formatNet(net) : '—'}
          </span>
        </div>
      </div>

      <div className="player-actions">
        <Button
          size="small"
          type="primary"
          ghost
          icon={<PlusOutlined />}
          disabled={defaultBuyIn <= 0}
          onClick={() => onAddBuyIn(player.id)}
        >
          Buy-in {defaultBuyIn > 0 ? formatChips(defaultBuyIn) : ''}
        </Button>
        <div className="cashout-wrap">
          <span>Cash-out (chip):</span>
          <InputNumber
            size="small"
            min={0}
            inputMode="numeric"
            placeholder="—"
            value={player.cashOut}
            style={{ width: 90 }}
            onChange={(v) => onSetCashOut(player.id, v ?? null)}
          />
        </div>
      </div>

      {player.buyIns.length > 0 && (
        <div className="buyin-history">
          Lịch sử buy-in:
          {player.buyIns.map((b) => (
            <Tooltip key={b.id} title={dayjs(b.at).format('HH:mm DD/MM')}>
              <span
                className="buyin-chip"
                style={{ cursor: 'pointer' }}
                onClick={() => onRemoveBuyIn(player.id, b.id)}
              >
                {formatChips(b.amount)} ✕
              </span>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
