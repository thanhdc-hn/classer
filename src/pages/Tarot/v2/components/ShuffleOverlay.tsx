import { SHUFFLE_OVERLAY_CARDS } from '../constants.ts';

const ShuffleOverlay = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;
  const mid = (SHUFFLE_OVERLAY_CARDS - 1) / 2;
  return (
    <div
      className="shuffle-overlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="shuffle-stack">
        {Array.from({ length: SHUFFLE_OVERLAY_CARDS }).map((_, i) => {
          const offset = i - mid;
          return (
            <div
              key={i}
              className="shuffle-card"
              style={{
                ['--fan-x' as string]: `${offset * 6}%`,
                ['--fan-angle' as string]: `${offset * 2}deg`,
                animationDelay: `${(i % 6) * 0.08}s`,
                zIndex: SHUFFLE_OVERLAY_CARDS - i,
              }}
            />
          );
        })}
      </div>
      <div className="shuffle-text">Shuffling the deck...</div>
    </div>
  );
};

export default ShuffleOverlay;
