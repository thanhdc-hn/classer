import { CSSProperties } from 'react';
import { GAME_OPTIONS } from '../constants.ts';
import { GameType } from '../types.ts';

interface Props {
  value: GameType;
  disabled?: boolean;
  onChange: (value: GameType) => void;
}

const GameSelector = ({ value, disabled, onChange }: Props) => {
  const activeIndex = Math.max(
    0,
    GAME_OPTIONS.findIndex((o) => o.value === value),
  );

  return (
    <div
      className={`game-switch${disabled ? ' is-disabled' : ''}`}
      role="radiogroup"
      aria-label="Loại vé"
      style={
        {
          '--count': GAME_OPTIONS.length,
          '--index': activeIndex,
        } as CSSProperties
      }
    >
      <span className="game-switch-thumb" aria-hidden="true" />
      {GAME_OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          className={`game-switch-option${o.value === value ? ' active' : ''}`}
          disabled={disabled}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

export default GameSelector;
