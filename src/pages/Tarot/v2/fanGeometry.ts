import { ARC_DEG, FAN_IN_SPREAD_MS } from './constants.ts';

/**
 * Angle (deg) of card `index`. A full circle spaces cards evenly without a
 * duplicate at 360°; a partial arc is centred on 0 (top).
 */
export const getCardAngle = (
  index: number,
  total: number,
  arcDeg: number = ARC_DEG,
) => {
  if (total <= 1) return 0;
  if (arcDeg >= 360) return (360 / total) * index;
  return -arcDeg / 2 + (arcDeg / (total - 1)) * index;
};

/** Wraps an angle into [-180, 180). */
export const normalizeAngle = (deg: number) =>
  ((((deg + 180) % 360) + 360) % 360) - 180;

/**
 * Stacking by on-screen angle: cards further clockwise lie on top, so the
 * unavoidable overlap seam of a full circle always sits at the hidden bottom.
 */
export const getZIndex = (screenAngle: number, total: number) =>
  Math.floor(((normalizeAngle(screenAngle) + 180) / 360) * total) + 1;

/** Horizontal position of `slot` in a centred row of `count` slots. */
export const getSlotOffset = (slot: number, count: number) =>
  slot - (count - 1) / 2;

/** Entry stagger spreading outwards from the top of the wheel. */
export const getFanInDelay = (screenAngle: number) =>
  Math.round((Math.abs(normalizeAngle(screenAngle)) / 180) * FAN_IN_SPREAD_MS);
