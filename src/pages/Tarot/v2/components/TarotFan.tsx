import { CSSProperties, HTMLAttributes } from 'react';
import {
  getCardAngle,
  getFanInDelay,
  getSlotOffset,
  getZIndex,
  normalizeAngle,
} from '../fanGeometry.ts';
import { TarotCardV2 } from '../types.ts';
import CenterSlots from './CenterSlots.tsx';
import TarotFanCard from './TarotFanCard.tsx';

interface Props {
  cards: TarotCardV2[];
  rotation: number;
  isDragging?: boolean;
  /** Rotation changes every frame (drag or inertia). */
  isMoving?: boolean;
  animateIn: boolean;
  slotCount: number;
  onCardClick: (index: number) => void;
  onCardReturn: (index: number) => void;
  /** Returns true right after a drag so the trailing click is ignored. */
  didDrag?: () => boolean;
  bind?: HTMLAttributes<HTMLDivElement>;
}

/**
 * Cards sit evenly on a full 360° wheel whose pivot is near the bottom of the
 * area, so only the upper part is visible and dragging spins it endlessly.
 * Drawn cards stay in the same DOM node and only swap their transform to the
 * slot row above the wheel, so returning them is just dropping `is-drawn`.
 */
const TarotFan = ({
  cards,
  rotation,
  isDragging = false,
  isMoving = false,
  animateIn,
  slotCount,
  onCardClick,
  onCardReturn,
  didDrag,
  bind,
}: Props) => {
  const areaClass = [
    'fan-area',
    isDragging && 'is-dragging',
    isMoving && 'is-moving',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={areaClass} {...bind}>
      <CenterSlots count={slotCount} />
      <div
        className="fan"
        style={{ '--rotation': `${rotation}deg` } as CSSProperties}
      >
        {cards.map((card, index) => {
          const angle = getCardAngle(index, cards.length);
          const screenAngle = angle + rotation;
          // Drawn cards must cancel the wheel rotation (-rotation mod 360).
          // Pick the turn closest to the card's own angle so the fly-out
          // swings by at most 180° instead of spinning several turns.
          const drawnRotate = angle - normalizeAngle(screenAngle);
          return (
            <TarotFanCard
              key={card.name}
              card={card}
              angle={angle}
              drawnRotate={drawnRotate}
              zIndex={getZIndex(screenAngle, cards.length)}
              delayMs={getFanInDelay(screenAngle)}
              animateIn={animateIn}
              slotOffset={
                card.slot === null ? null : getSlotOffset(card.slot, slotCount)
              }
              onClick={() => {
                if (didDrag?.()) return;
                onCardClick(index);
              }}
              onReturn={() => onCardReturn(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TarotFan;
