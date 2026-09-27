import { CSSProperties, useState } from 'react';
import { TarotCardV2 } from '../types.ts';

interface Props {
  card: TarotCardV2;
  angle: number; // deg on the wheel, 0 = top
  /** Rotation (deg) that cancels the wheel's rotation while drawn. */
  drawnRotate: number;
  zIndex: number;
  delayMs: number;
  animateIn: boolean;
  /** Horizontal slot position relative to the centre slot (e.g. -1, 0, 1). */
  slotOffset: number | null;
  onClick: () => void;
  onReturn: () => void;
}

const DRAWN_Z_INDEX = 1000;

const TarotFanCard = ({
  card,
  angle,
  drawnRotate,
  zIndex,
  delayMs,
  animateIn,
  slotOffset,
  onClick,
  onReturn,
}: Props) => {
  // Flip only once the face is decoded, so it never turns over blank
  const [imageReady, setImageReady] = useState(false);
  const isFaceUp = card.show && (imageReady || !card.image);

  const style = {
    '--angle': `${angle}deg`,
    '--drawn-rotate': `${drawnRotate}deg`,
    '--fan-delay': `${delayMs}ms`,
    ...(slotOffset !== null && { '--slot-offset': slotOffset }),
    zIndex: card.drawn ? DRAWN_Z_INDEX : zIndex,
  } as CSSProperties;

  const innerClass = [
    'card-inner',
    isFaceUp && 'show',
    card.reverse && 'reverse',
  ]
    .filter(Boolean)
    .join(' ');

  const cardClass = [
    'fan-card',
    animateIn && 'fan-in',
    card.drawn && 'is-drawn',
  ]
    .filter(Boolean)
    .join(' ');

  const label = card.show
    ? `${card.name}${card.reverse ? ' (reversed)' : ''}`
    : 'hidden card';

  return (
    <div
      className={cardClass}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={card.drawn ? `${label}, show details` : label}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={innerClass}>
        <div className="card-face card-back" />
        <div className="card-face card-front">
          {card.show && (
            <>
              <img
                className="card-illustration"
                src={card.image}
                alt={card.name}
                decoding="async"
                draggable={false}
                onLoad={() => setImageReady(true)}
                onError={() => setImageReady(true)}
              />
              <div className="card-name">{card.name}</div>
            </>
          )}
        </div>
      </div>
      {card.drawn && (
        <button
          type="button"
          className="return-btn"
          aria-label={`Return ${card.name} to the deck`}
          title="Return to deck"
          onClick={(e) => {
            e.stopPropagation();
            onReturn();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TarotFanCard;
