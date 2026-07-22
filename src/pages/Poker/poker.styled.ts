import styled from 'styled-components';

export const PokerStyled = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1b2a4a 0%, #0f172a 100%);
  color: #e2e8f0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1.5rem 1rem 4rem;

  .container {
    max-width: 720px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 1.5rem;

    h1 {
      font-size: 2rem;
      margin: 0 0 0.25rem;
      color: #f8fafc;
      letter-spacing: 1px;
    }

    .subtitle {
      margin: 0;
      color: #94a3b8;
      font-size: 0.95rem;
    }
  }

  .card {
    background: rgba(30, 41, 59, 0.75);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 16px;
    padding: 1.1rem 1.2rem;
    margin-bottom: 1rem;
    backdrop-filter: blur(6px);
  }

  .add-player-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .buyin-config {
    .config-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;

      .config-label {
        font-weight: 600;
        color: #f8fafc;
      }
    }

    .config-hint {
      margin: 0.6rem 0 0;
      font-size: 0.8rem;
      color: #94a3b8;
    }
  }

  .players {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .player-card.is-banker {
    border-color: rgba(251, 191, 36, 0.55);
    box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.3);
  }

  .player-card {
    .player-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.75rem;

      .player-name {
        font-size: 1.15rem;
        font-weight: 700;
        color: #f8fafc;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .banker-badge {
        font-size: 0.72rem;
        font-weight: 700;
        color: #0f172a;
        background: #fbbf24;
        border-radius: 999px;
        padding: 0.1rem 0.55rem;
        letter-spacing: 0.3px;
      }

      .head-actions {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        flex-shrink: 0;
      }
    }

    .player-stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 0.75rem;

      .stat {
        background: rgba(15, 23, 42, 0.6);
        border-radius: 10px;
        padding: 0.5rem 0.6rem;
        text-align: center;

        .stat-label {
          display: block;
          font-size: 0.72rem;
          color: #94a3b8;
          margin-bottom: 0.15rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 700;
        }

        .stat-value.positive {
          color: #4ade80;
        }

        .stat-value.negative {
          color: #f87171;
        }
      }
    }

    .player-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;

      .cashout-wrap {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin-left: auto;

        span {
          font-size: 0.8rem;
          color: #94a3b8;
        }
      }
    }

    .buyin-history {
      margin-top: 0.6rem;
      font-size: 0.8rem;
      color: #94a3b8;

      .buyin-chip {
        display: inline-block;
        background: rgba(148, 163, 184, 0.12);
        border-radius: 6px;
        padding: 0.1rem 0.45rem;
        margin: 0.15rem 0.3rem 0 0;
      }
    }
  }

  .summary-bar {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;

    .summary-item {
      text-align: center;

      .summary-label {
        display: block;
        font-size: 0.75rem;
        color: #94a3b8;
        margin-bottom: 0.2rem;
      }

      .summary-value {
        font-size: 1.1rem;
        font-weight: 700;
        color: #f8fafc;
      }
    }
  }

  .settlement {
    h3 {
      margin: 0 0 0.75rem;
      font-size: 1.1rem;
      color: #f8fafc;
    }

    .settlement-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0;
      border-bottom: 1px dashed rgba(148, 163, 184, 0.15);
      font-size: 0.95rem;

      &:last-child {
        border-bottom: none;
      }

      .from {
        color: #f87171;
        font-weight: 600;
      }

      .to {
        color: #4ade80;
        font-weight: 600;
      }

      .amount {
        margin-left: auto;
        font-weight: 700;
        color: #fbbf24;
      }
    }

    .settled {
      color: #94a3b8;
      font-style: italic;
      margin: 0;
    }
  }

  .footer-actions {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .empty-hint {
    text-align: center;
    color: #94a3b8;
    padding: 1.5rem 0;
    margin: 0;
  }

  @media (max-width: 600px) {
    .player-card .player-stats {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
