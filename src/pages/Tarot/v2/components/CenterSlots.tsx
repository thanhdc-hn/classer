import { CSSProperties } from 'react';
import { getSlotOffset } from '../fanGeometry.ts';

interface Props {
  count: number;
}

/** Faint placeholders marking where drawn cards land in the centre. */
const CenterSlots = ({ count }: Props) => (
  <div className="center-slots" aria-hidden="true">
    {Array.from({ length: count }, (_, slot) => (
      <div
        key={slot}
        className="center-slot"
        style={{ '--slot-offset': getSlotOffset(slot, count) } as CSSProperties}
      />
    ))}
  </div>
);

export default CenterSlots;
