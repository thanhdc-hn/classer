import { Player } from '../types.ts';
import { formatChips, totalBuyIn } from '../utils/format.ts';

interface Props {
  players: Player[];
}

const SummaryBar = ({ players }: Props) => {
  const totalIn = players.reduce((sum, p) => sum + totalBuyIn(p), 0);
  const totalOut = players.reduce((sum, p) => sum + (p.cashOut ?? 0), 0);
  const diff = totalOut - totalIn;

  return (
    <div className="card summary-bar">
      <div className="summary-item">
        <span className="summary-label">Tổng buy-in</span>
        <span className="summary-value">{formatChips(totalIn)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Tổng cash-out</span>
        <span className="summary-value">{formatChips(totalOut)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Chênh lệch</span>
        <span className="summary-value">{formatChips(diff)}</span>
      </div>
    </div>
  );
};

export default SummaryBar;
