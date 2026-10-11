import tarotBg from '@assets/images/tarot_bg.webp';
import tarotCardBg from '@assets/images/tarot_card_bg.webp';
import styled from 'styled-components';
import { CARD_K, RADIUS_K, WHEEL_SHOW_K } from './constants.ts';

const TarotV2Styled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #3f1d8c;
  background-image: url(${tarotBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .layout {
    display: grid;
    grid-template-columns: 4fr 1fr;
    gap: 1.2rem;
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  .main-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .side-panel {
    min-height: 0;
    height: 100%;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(20, 10, 46, 0.45);
    backdrop-filter: blur(2px);
    padding: 1rem;
    overflow-y: auto;
  }

  .side-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.65rem;
  }

  .side-panel-title {
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 2rem;

    button {
      padding: 0.75rem 1.5rem;
      background-color: #8a6eff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition:
        background-color 0.3s,
        opacity 0.2s;
      box-shadow: 0 2px 4px rgba(138, 110, 255, 0.3);

      &:hover {
        background-color: #7254e5;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .mobile-copy-btn {
      display: none;
      align-items: center;
      gap: 0.4rem;
      margin-left: auto;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: none;

      &:hover,
      &:focus-visible {
        background-color: rgba(255, 255, 255, 0.12);
      }
    }
  }

  .empty-state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    text-align: center;
  }

  .cards-showed {
    font-size: 1.05rem;
    line-height: 1.55;
    font-weight: 600;
    color: #fff;
    word-break: break-word;
  }

  .copy-btn {
    border: none;
    background: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
  }

  .draw-mode-popup-overlay {
    position: fixed;
    inset: 0;
    z-index: 1200;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(20, 12, 52, 0.55);
    backdrop-filter: blur(3px);
  }

  .draw-mode-popup {
    width: min(92vw, 420px);
    border-radius: 12px;
    background: linear-gradient(145deg, #f8f5ff, #ece3ff);
    border: 1px solid rgba(101, 78, 163, 0.25);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    padding: 1.2rem;
    text-align: center;

    h3 {
      margin: 0 0 1rem;
      color: #35205f;
      font-size: 1.1rem;
    }
  }

  .draw-mode-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem;

    button {
      border: none;
      border-radius: 8px;
      padding: 0.75rem 0.9rem;
      background: linear-gradient(135deg, #6f52cc, #8a6eff);
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      transition:
        transform 0.15s ease,
        filter 0.2s ease;
      box-shadow: 0 8px 20px rgba(111, 82, 204, 0.35);
    }

    button:hover {
      filter: brightness(1.05);
      transform: translateY(-1px);
    }
  }

  .shuffle-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    background: rgba(22, 12, 56, 0.35);
    backdrop-filter: blur(2px);
    z-index: 1000;
  }

  .shuffle-text {
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }

  .shuffle-stack {
    position: relative;
    width: min(52vw, 260px);
    aspect-ratio: 3 / 5;
  }

  .shuffle-card {
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: linear-gradient(135deg, #654ea3, #da98ff);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
    transform-origin: center;
    transform: translateX(var(--fan-x)) rotate(var(--fan-angle));
    animation: riffle 0.6s ease-in-out infinite alternate;
  }

  @keyframes riffle {
    0% {
      transform: translateX(var(--fan-x)) translateY(-6%)
        rotate(var(--fan-angle));
    }
    100% {
      transform: translateX(var(--fan-x)) translateY(6%)
        rotate(calc(var(--fan-angle) * -1));
    }
  }

  .fan-area {
    /* Wheel geometry is sized from this box (container query units) */
    container: fan / size;
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    touch-action: none;
    user-select: none;
    cursor: grab;
    margin: -2rem;

    @media (max-width: 768px) {
      margin: -1rem;
    }

    &.is-dragging {
      cursor: grabbing;

      .fan-card:not(.is-drawn),
      .fan-card:not(.is-drawn):hover {
        cursor: grabbing;
        transform: var(--card-transform);
      }
    }

    /* Drawn cards counter-rotate against --rotation; a transition would lag */
    &.is-moving .fan-card.is-drawn {
      transition: none;
    }
  }

  /* ---------- 360° wheel ----------
     Geometry lives on the pivot elements so cq units resolve against
     .fan-area. --u mirrors readRadiusPx() in useFanRotation.ts. */
  .fan,
  .center-slots {
    --u: min(1cqw, 0.8cqh);
    --radius-k: ${RADIUS_K};
    --card-k: ${CARD_K};
    --wheel-show-k: ${WHEEL_SHOW_K};
    --radius: calc(var(--radius-k) * var(--u));
    --card-w: calc(var(--card-k) * var(--u));
    --card-h: calc(var(--card-w) * 5 / 3);
    /* A big wheel spreads cards out; its pivot sits far below the area so
       only a band of --wheel-show (to the card centres) stays visible */
    --wheel-show: calc(var(--wheel-show-k) * var(--u));
    --pivot-drop: calc(var(--radius) - var(--wheel-show));
    /* Slot row: drawn cards are scaled up and laid out above the wheel */
    --slot-scale: 1.25;
    --slot-gap: calc(9 * var(--u));
    --slot-step: calc(var(--card-w) * var(--slot-scale) + 2 * var(--u));
    --slot-y: calc(
      (
          var(--radius) + var(--card-h) / 2 + var(--slot-gap) + var(--card-h) *
            var(--slot-scale) / 2
        ) * -1
    );
    position: absolute;
    left: 50%;
    bottom: calc(var(--pivot-drop) * -1);
    width: 0;
    height: 0;
  }

  /* Portrait: bigger cards relative to the width, like a phone deck */
  @container fan (orientation: portrait) {
    .fan,
    .center-slots {
      --radius-k: 150;
      --card-k: 26;
      --wheel-show-k: 34;
      --slot-scale: 1.1;
    }
  }

  .center-slots {
    pointer-events: none;
  }

  .center-slot {
    position: absolute;
    width: var(--card-w);
    aspect-ratio: 3 / 5;
    left: calc(var(--card-w) / -2);
    top: calc(var(--card-w) * -5 / 6);
    box-sizing: border-box;
    border: 1px dashed rgba(255, 255, 255, 0.35);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    transform: translate(
        calc(var(--slot-offset) * var(--slot-step)),
        var(--slot-y)
      )
      scale(var(--slot-scale));
  }

  /* Pivot of the wheel */
  .fan {
    transform: rotate(var(--rotation, 0deg));
    will-change: transform;
  }

  .fan-card {
    /* Same function list as --drawn-transform so the fly-out interpolates
       rotate/translate/scale individually (curved swing, no matrix blend) */
    --card-transform: rotate(var(--angle))
      translate(0, calc(var(--radius) * -1)) scale(1);
    /* Parent .fan is rotated by --rotation; --drawn-rotate cancels it
       (computed in JS as the nearest equivalent turn) */
    --drawn-transform: rotate(var(--drawn-rotate, 0deg))
      translate(calc(var(--slot-offset, 0) * var(--slot-step)), var(--slot-y))
      scale(var(--slot-scale));
    position: absolute;
    width: var(--card-w);
    aspect-ratio: 3 / 5;
    left: calc(var(--card-w) / -2);
    top: calc(var(--card-w) * -5 / 6);
    transform: var(--card-transform);
    transition: transform 0.25s ease;
    perspective: 1000px;
    cursor: pointer;
    outline: none;

    &:not(.is-drawn):hover,
    &:not(.is-drawn):focus-visible {
      transform: var(--card-transform) translateY(calc(-1.5 * var(--u)));
    }

    &.is-drawn {
      transform: var(--drawn-transform);
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      /* Cancel the entry animation so its fill-mode cannot pin the card */
      animation: none;
    }

    &:focus-visible .card-face {
      box-shadow: 0 0 0 2px #fff;
    }

    &.fan-in:not(.is-drawn) {
      animation: fanIn 0.6s ease-out both;
      animation-delay: var(--fan-delay, 0ms);
    }
  }

  /* Return-to-deck button, only rendered on drawn cards */
  .return-btn {
    position: absolute;
    top: -0.45rem;
    right: -0.45rem;
    z-index: 2;
    width: 1.1rem;
    height: 1.1rem;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    background: #35205f;
    color: #fff;
    font-size: 0.75rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
    transition: background-color 0.2s;

    &:hover,
    &:focus-visible {
      background: #8a6eff;
      outline: none;
    }
  }

  @keyframes fanIn {
    from {
      opacity: 0;
      transform: rotate(var(--angle)) translate(0, calc(var(--radius) * -0.85))
        scale(0.6);
    }
    to {
      opacity: 1;
      transform: var(--card-transform);
    }
  }

  /* Flip + reverse (ported from V1) */
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;

    &.show {
      transform: rotateY(180deg);
    }

    /* Back face is NOT rotated for reversed cards, so every card back looks identical */

    /* Only the illustration flips so the name stays readable */
    &.reverse .card-front .card-illustration {
      transform: rotate(180deg);
    }
  }

  .card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }

  .card-front {
    background: linear-gradient(to bottom, #f8f5ff, #eee6ff);
    transform: rotateY(180deg);
    text-align: center;
    padding: 0.3rem;
    box-sizing: border-box;
    border: 1px solid rgba(138, 110, 255, 0.3);
    justify-content: space-between;

    .card-illustration {
      width: 100%;
      flex: 1 1 auto;
      min-height: 0;
      max-height: 90%;
      object-fit: contain;
      border-radius: 4px;
      transition: transform 0.3s ease;
    }

    .card-name {
      font-size: 0.6rem;
      font-weight: 500;
    }
  }

  .card-back {
    background:
      url(${tarotCardBg}) center / cover no-repeat,
      linear-gradient(135deg, #654ea3, #da98ff) center;
    border: 1px solid rgba(255, 255, 255, 0.35);

    /* Mystical pattern overlay */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.1;
      background-image: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.8) 2px,
          transparent 2px
        ),
        radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
      background-size:
        18px 18px,
        30px 30px;
      background-position:
        0 0,
        15px 15px;
    }

    &::after {
      content: '';
      position: absolute;
      width: 78%;
      height: 85%;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 4px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shuffle-card,
    .fan-card.fan-in {
      animation: none !important;
    }

    .fan-card,
    .card-inner {
      transition: none !important;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .layout {
      grid-template-columns: 1fr;
    }

    .side-panel {
      display: none;
    }

    .controls .mobile-copy-btn {
      display: inline-flex;
    }
  }

  @media (max-width: 480px) {
    .controls {
      margin-bottom: 1rem;
    }
  }
`;

export default TarotV2Styled;
