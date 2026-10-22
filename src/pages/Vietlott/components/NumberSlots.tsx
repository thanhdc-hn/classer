import { CSSProperties } from 'react';
import { getBallColor } from '../constants.ts';

interface Props {
  slots: { value: number | null; locked: boolean }[];
}

const pad = (n: number) => String(n).padStart(2, '0');

const NumberSlots = ({ slots }: Props) => {
  return (
    <div className="slots" role="group" aria-label="Kết quả quay số">
      {slots.map(({ value, locked }, idx) => (
        <div
          key={idx}
          className={`slot${locked ? ' locked' : ''}${
            value != null && !locked ? ' rolling' : ''
          }`}
          style={
            locked && value != null
              ? ({ '--ball-color': getBallColor(value) } as CSSProperties)
              : undefined
          }
        >
          {value != null ? pad(value) : '--'}
        </div>
      ))}
    </div>
  );
};

export default NumberSlots;
