import styled from 'styled-components';

const TarotStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #3f1d8c;
  min-height: 100vh;
  position: relative;

  .controls {
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
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;

    &.is-shuffling {
      filter: blur(1px);
      pointer-events: none;
      user-select: none;
    }

    &.just-shuffled .card {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
      animation: cardIn 680ms cubic-bezier(0.2, 0.7, 0.2, 1) var(--stagger, 0ms)
        both;
      will-change: transform, opacity;
    }
  }

  .empty-state {
    margin-top: 2rem;
    text-align: center;
    color: #666;
  }

  .card {
    aspect-ratio: 3/5;
    perspective: 1000px;
    cursor: pointer;

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;

      &.show {
        transform: rotateY(180deg);
      }

      &.reverse:not(.show) .card-back {
        transform: rotate(180deg);
      }

      /* When reversed, flip only the illustration on the front so the name stays readable */

      &.reverse .card-front .card-illustration {
        transform: rotate(180deg);
      }
    }

    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .card-front {
      background: linear-gradient(to bottom, #f8f5ff, #eee6ff);
      transform: rotateY(180deg);
      text-align: center;
      padding: 0.6rem;
      border: 1px solid rgba(138, 110, 255, 0.3);
      /* Use vertical layout: image on top, name at bottom */
      justify-content: space-between;
      gap: 0;

      /* Mystical border pattern */

      &::before {
        content: '';
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        right: 0.5rem;
        bottom: 0.5rem;
        border: 1px solid rgba(138, 110, 255, 0.2);
        border-radius: 4px;
        z-index: 0;
        background-image: radial-gradient(
            circle at top left,
            rgba(138, 110, 255, 0.1) 3px,
            transparent 4px
          ),
          radial-gradient(
            circle at top right,
            rgba(138, 110, 255, 0.1) 3px,
            transparent 4px
          ),
          radial-gradient(
            circle at bottom left,
            rgba(138, 110, 255, 0.1) 3px,
            transparent 4px
          ),
          radial-gradient(
            circle at bottom right,
            rgba(138, 110, 255, 0.1) 3px,
            transparent 4px
          );
        background-size: 20px 20px;
        background-position:
          0 0,
          100% 0,
          0 100%,
          100% 100%;
        background-repeat: no-repeat;
      }

      /* Image fills the available space above the name and stays above the decorative border */

      .card-illustration {
        width: 100%;
        flex: 1 1 auto;
        object-fit: contain;
        border-radius: 6px;
        position: relative;
        z-index: 1;
        transition: transform 0.3s ease;
        /* Prevent the image from being stretched taller than the card; height controlled by flex */
        max-height: 90%;
      }

      .card-name {
        font-size: 0.8rem;
        font-weight: 500;
        position: relative;
        z-index: 1;

        @media (max-width: 480px) {
          font-size: 0.6rem;
        }
      }

      .card-status {
        font-size: 0.8rem;
        color: #d32f2f;
        position: relative;
        z-index: 1;
      }
    }

    .card-back {
      background-size: cover;
      background: linear-gradient(135deg, #654ea3, #da98ff) center;

      /* Mystical pattern overlay */

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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
        border-radius: 8px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 80%;
        height: 85%;
        border: 2px solid rgba(255, 255, 255, 0.4);
        border-radius: 6px;

        /* Celestial corner decorations */
        background-image: radial-gradient(
            circle at top left,
            rgba(255, 255, 255, 0.9) 3px,
            transparent 4px
          ),
          radial-gradient(
            circle at top right,
            rgba(255, 255, 255, 0.9) 3px,
            transparent 4px
          ),
          radial-gradient(
            circle at bottom left,
            rgba(255, 255, 255, 0.9) 3px,
            transparent 4px
          ),
          radial-gradient(
            circle at bottom right,
            rgba(255, 255, 255, 0.9) 3px,
            transparent 4px
          );
        background-size: 30px 30px;
        background-position:
          0 0,
          100% 0,
          0 100%,
          100% 100%;
        background-repeat: no-repeat;
      }
    }
  }

  .cards-showed {
    margin-top: 48px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: #fff;
  }

  /* Shuffle overlay */

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
    pointer-events: none; /* block interactions beneath via is-shuffling on container */
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
    animation: riffle 0.6s ease-in-out infinite alternate;
  }

  /* Fan the stack a bit for visual depth */

  .shuffle-card:nth-child(1) {
    transform: translateX(-32%) rotate(-12deg);
  }

  .shuffle-card:nth-child(2) {
    transform: translateX(-26%) rotate(-10deg);
  }

  .shuffle-card:nth-child(3) {
    transform: translateX(-20%) rotate(-8deg);
  }

  .shuffle-card:nth-child(4) {
    transform: translateX(-14%) rotate(-6deg);
  }

  .shuffle-card:nth-child(5) {
    transform: translateX(-8%) rotate(-4deg);
  }

  .shuffle-card:nth-child(6) {
    transform: translateX(-2%) rotate(-2deg);
  }

  .shuffle-card:nth-child(7) {
    transform: translateX(2%) rotate(2deg);
  }

  .shuffle-card:nth-child(8) {
    transform: translateX(8%) rotate(4deg);
  }

  .shuffle-card:nth-child(9) {
    transform: translateX(14%) rotate(6deg);
  }

  .shuffle-card:nth-child(10) {
    transform: translateX(20%) rotate(8deg);
  }

  .shuffle-card:nth-child(11) {
    transform: translateX(26%) rotate(10deg);
  }

  .shuffle-card:nth-child(12) {
    transform: translateX(32%) rotate(12deg);
  }

  @keyframes riffle {
    0% {
      transform: translateY(-6%) rotate(var(--angle, 0deg));
    }
    100% {
      transform: translateY(6%) rotate(calc(var(--angle, 0deg) * -1));
    }
  }

  @keyframes cardIn {
    0% {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shuffle-card,
    .cards-container.just-shuffled .card {
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .cards-container {
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 2rem;
    }
  }

  @media (max-width: 480px) {
    .cards-container {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 2rem;
    }
  }
`;

export default TarotStyled;
