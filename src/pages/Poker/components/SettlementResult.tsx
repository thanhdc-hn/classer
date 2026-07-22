import { ArrowRightOutlined } from '@ant-design/icons';
import { Transaction } from '../types.ts';
import { formatChips } from '../utils/format.ts';

interface Props {
  transactions: Transaction[];
  hasCashOut: boolean;
}

const SettlementResult = ({ transactions, hasCashOut }: Props) => {
  return (
    <div className="card settlement">
      <h3>💸 Ai trả ai</h3>
      {!hasCashOut ? (
        <p className="settled">Nhập cash-out để tính toán chia tiền.</p>
      ) : transactions.length === 0 ? (
        <p className="settled">Đã cân bằng, không ai cần trả ai.</p>
      ) : (
        transactions.map((t, idx) => (
          <div className="settlement-row" key={idx}>
            <span className="from">{t.fromName}</span>
            <ArrowRightOutlined style={{ color: '#94a3b8' }} />
            <span className="to">{t.toName}</span>
            <span className="amount">{formatChips(t.amount)}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default SettlementResult;
