import { InputNumber } from 'antd';
import { formatChips } from '../utils/format.ts';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const BuyInConfig = ({ value, onChange }: Props) => {
  return (
    <div className="card buyin-config">
      <div className="config-row">
        <span className="config-label">Số chip mỗi buy-in</span>
        <InputNumber
          min={0}
          value={value}
          style={{ width: 120 }}
          addonAfter="chip"
          onChange={(v) => onChange(v ?? 0)}
        />
      </div>
      <p className="config-hint">
        {value > 0
          ? `Mỗi lần buy-in = ${formatChips(value)}. Chỉ cần bấm "Buy-in" 1 lần.`
          : 'Nhập số chip mỗi buy-in để bật nút buy-in nhanh.'}
      </p>
    </div>
  );
};

export default BuyInConfig;
