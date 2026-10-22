import styled from 'styled-components';

const BALL_SHINE = `radial-gradient(
    circle at 30% 25%,
    rgba(255, 255, 255, 0.65) 0%,
    rgba(255, 255, 255, 0.12) 28%,
    transparent 48%
  ),
  radial-gradient(
    circle at 70% 80%,
    rgba(0, 0, 0, 0.28) 0%,
    transparent 55%
  ),
  var(--ball-color)`;

export const VietlottStyled = styled.div`
  --surface: rgba(30, 41, 59, 0.6);
  --surface-strong: rgba(15, 23, 42, 0.7);
  --border: rgba(148, 163, 184, 0.16);
  --text-muted: #94a3b8;
  --accent: #f59e0b;
  --accent-2: #f97316;

  min-height: 100vh;
  background: radial-gradient(
      circle at 12% 8%,
      rgba(245, 158, 11, 0.16),
      transparent 38%
    ),
    radial-gradient(circle at 88% 14%, rgba(99, 102, 241, 0.2), transparent 40%),
    linear-gradient(160deg, #0f172a 0%, #111827 100%);
  color: #e2e8f0;
  font-family:
    'Inter',
    'Segoe UI',
    system-ui,
    -apple-system,
    Roboto,
    'Helvetica Neue',
    sans-serif;
  padding: 2.5rem 1rem 4rem;

  .container {
    max-width: 1040px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: clamp(1.7rem, 4vw, 2.4rem);
      font-weight: 800;
      margin: 0 0 0.4rem;
      letter-spacing: -0.5px;
      color: #f8fafc;

      /* Chỉ phần chữ dùng gradient; emoji nằm ngoài để không bị ẩn do color: transparent */
      .title-text {
        background: linear-gradient(90deg, #fde68a, #f59e0b 50%, #fb923c);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }
    }

    .subtitle {
      margin: 0;
      color: var(--text-muted);
      font-size: 1rem;
    }
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 1.25rem 1.4rem;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.05) inset,
      0 24px 48px -28px rgba(0, 0, 0, 0.7);
  }

  .layout {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
    gap: 1.25rem;
    align-items: start;
  }

  /* ---------- Switch 6/45 - 6/55 ---------- */
  .game-switch {
    --pad: 5px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--count), 1fr);
    width: 100%;
    max-width: 280px;
    padding: var(--pad);
    border-radius: 999px;
    background: var(--surface-strong);
    border: 1px solid var(--border);
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.35);

    .game-switch-thumb {
      position: absolute;
      top: var(--pad);
      bottom: var(--pad);
      left: var(--pad);
      width: calc((100% - var(--pad) * 2) / var(--count));
      border-radius: 999px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      box-shadow:
        0 6px 18px -4px rgba(249, 115, 22, 0.65),
        0 1px 0 rgba(255, 255, 255, 0.35) inset;
      transform: translateX(calc(var(--index) * 100%));
      transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1);
    }

    .game-switch-option {
      position: relative;
      z-index: 1;
      padding: 0.6rem 0;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--text-muted);
      font: inherit;
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      cursor: pointer;
      transition: color 0.25s ease;

      &:hover:not(:disabled):not(.active) {
        color: #e2e8f0;
      }

      &.active {
        color: #1f1300;
      }

      &:focus-visible {
        outline: 2px solid #fde68a;
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    &.is-disabled {
      opacity: 0.75;
    }
  }

  /* ---------- Khu vực chính ---------- */
  .main-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 1.4rem 2.25rem;

    .range-hint {
      margin: -0.6rem 0 0;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .slots {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: clamp(0.4rem, 1.6vw, 0.8rem);
      width: 100%;
      max-width: 560px;
      padding: clamp(0.7rem, 2vw, 1.1rem);
      border-radius: 22px;
      background: var(--surface-strong);
      border: 1px solid var(--border);
      box-shadow: inset 0 3px 14px rgba(0, 0, 0, 0.45);
    }

    .slot {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: clamp(1.05rem, 3.8vw, 1.85rem);
      font-weight: 800;
      font-variant-numeric: tabular-nums;
      color: #475569;
      background: rgba(30, 41, 59, 0.6);
      border: 2px dashed rgba(148, 163, 184, 0.28);
      transition:
        background 0.25s ease,
        border-color 0.25s ease,
        color 0.25s ease,
        box-shadow 0.25s ease;

      &.rolling {
        color: #f1f5f9;
        border: 2px solid rgba(251, 191, 36, 0.5);
        background: rgba(30, 41, 59, 0.9);
        box-shadow: 0 0 18px -2px rgba(251, 191, 36, 0.35);
        filter: blur(0.5px);
      }

      &.locked {
        color: #fff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
        border: 2px solid rgba(255, 255, 255, 0.35);
        background: ${BALL_SHINE};
        box-shadow:
          0 10px 22px -8px var(--ball-color),
          0 0 0 4px color-mix(in srgb, var(--ball-color) 22%, transparent);
        animation: slot-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
    }

    .spin-btn.ant-btn {
      min-width: 220px;
      height: 54px;
      border: 0;
      border-radius: 999px;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.3px;
      color: #1f1300;
      background: linear-gradient(135deg, #fbbf24, #f97316);
      box-shadow:
        0 14px 28px -10px rgba(249, 115, 22, 0.7),
        0 1px 0 rgba(255, 255, 255, 0.4) inset;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        filter 0.2s ease;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        filter: brightness(1.06);
        box-shadow:
          0 18px 32px -10px rgba(249, 115, 22, 0.85),
          0 1px 0 rgba(255, 255, 255, 0.4) inset;
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &.ant-btn-loading {
        opacity: 0.85;
        color: #1f1300;
      }
    }
  }

  @keyframes slot-pop {
    0% {
      transform: scale(0.5);
    }
    60% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }

  /* ---------- Khu vực phụ ---------- */
  .result-panel {
    padding: 1rem 0.85rem;

    .panel-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 1rem;

      h3 {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 700;
        color: #f8fafc;

        .count {
          margin-left: 0.25rem;
          padding: 0.1rem 0.5rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          background: rgba(148, 163, 184, 0.14);
        }
      }
    }

    /* Nút "Xoá tất cả": đảm bảo đủ tương phản cả khi disabled */
    .clear-btn.ant-btn {
      border-radius: 999px;
      font-weight: 600;

      &:not(:disabled) {
        color: #fca5a5;
        background: rgba(239, 68, 68, 0.12);
        border-color: rgba(239, 68, 68, 0.4);

        &:hover {
          color: #fff;
          background: #ef4444;
          border-color: #ef4444;
        }
      }

      &:disabled {
        color: #94a3b8;
        background: rgba(148, 163, 184, 0.1);
        border-color: rgba(148, 163, 184, 0.28);
        cursor: not-allowed;
      }
    }

    .empty-hint {
      text-align: center;
      color: var(--text-muted);
      padding: 2rem 0.5rem;
      margin: 0;
      font-size: 0.92rem;
      line-height: 1.5;
      border: 1px dashed var(--border);
      border-radius: 16px;
    }

    .ticket-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      max-height: 60vh;
      overflow-y: auto;
      padding-right: 0.3rem;
      scrollbar-width: thin;
      scrollbar-color: rgba(148, 163, 184, 0.35) transparent;

      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(148, 163, 184, 0.35);
        border-radius: 999px;
      }
    }

    .ticket {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--surface-strong);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 0.5rem 0.45rem 0.5rem 0.6rem;
      transition:
        transform 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;
      animation: ticket-in 0.35s ease-out;

      &:hover {
        transform: translateY(-1px);
        border-color: rgba(251, 191, 36, 0.4);
        box-shadow: 0 10px 24px -16px rgba(251, 191, 36, 0.6);
      }

      .ticket-meta {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        min-width: 50px;

        .ticket-game {
          align-self: flex-start;
          padding: 0.05rem 0.5rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.8rem;
          color: #1f1300;
          background: linear-gradient(135deg, #fbbf24, #f97316);
        }

        .ticket-time {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
      }

      .ticket-balls {
        flex: 1;
        min-width: 0;
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 0.25rem;
      }

      .ball {
        width: 100%;
        max-width: 30px;
        aspect-ratio: 1;
        justify-self: center;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(0.6rem, 2.7vw, 0.78rem);
        font-weight: 700;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        font-variant-numeric: tabular-nums;
        background: ${BALL_SHINE};
        box-shadow: 0 3px 8px -3px var(--ball-color);
      }
    }
  }

  @keyframes ticket-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 860px) {
    padding: 1.75rem 0.85rem 3rem;

    .layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .result-panel .ticket-list {
      max-height: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .main-area .slot.locked,
    .result-panel .ticket {
      animation: none;
    }

    .game-switch .game-switch-thumb {
      transition: none;
    }
  }
`;
