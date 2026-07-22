import styled from 'styled-components';

const HomeStyled = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at 15% 15%, rgba(168, 85, 247, 0.18), transparent 40%),
    radial-gradient(circle at 85% 20%, rgba(56, 189, 248, 0.18), transparent 40%),
    linear-gradient(135deg, #0f172a 0%, #111827 100%);
  color: #e2e8f0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 4rem 1.25rem 5rem;
  display: flex;
  justify-content: center;

  .container {
    width: 100%;
    max-width: 900px;
  }

  .hero {
    text-align: center;
    margin-bottom: 3rem;

    .hero-badge {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #cbd5e1;
      background: rgba(148, 163, 184, 0.14);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 999px;
      padding: 0.35rem 0.9rem;
      margin-bottom: 1.25rem;
    }

    h1 {
      font-size: 2.4rem;
      line-height: 1.15;
      margin: 0 0 0.75rem;
      color: #f8fafc;
      font-weight: 800;
    }

    p {
      margin: 0;
      color: #94a3b8;
      font-size: 1.05rem;
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.1rem;
  }

  .feature-card {
    --accent: #38bdf8;
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
    width: 100%;
    cursor: pointer;
    padding: 1.4rem 1.3rem;
    border-radius: 18px;
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(148, 163, 184, 0.15);
    backdrop-filter: blur(8px);
    color: inherit;
    font-family: inherit;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 18px;
      padding: 1px;
      background: linear-gradient(135deg, var(--accent), transparent 60%);
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-4px);
      border-color: transparent;
      box-shadow: 0 18px 40px -18px var(--accent);

      &::before {
        opacity: 1;
      }

      .feature-arrow {
        background: var(--accent);
        color: #0f172a;
        transform: translateX(2px);
      }

      .feature-icon {
        transform: scale(1.05);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .feature-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px;
      height: 54px;
      border-radius: 14px;
      font-size: 26px;
      color: var(--accent);
      background: color-mix(in srgb, var(--accent) 16%, transparent);
      transition: transform 0.2s ease;
    }

    .feature-body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      flex: 1;
      min-width: 0;

      .feature-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #f8fafc;
      }

      .feature-desc {
        font-size: 0.9rem;
        color: #94a3b8;
        line-height: 1.4;
      }
    }

    .feature-arrow {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      color: #cbd5e1;
      background: rgba(148, 163, 184, 0.14);
      transition:
        background 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;
    }
  }

  @media (max-width: 600px) {
    padding: 3rem 1rem 4rem;

    .hero h1 {
      font-size: 1.9rem;
    }
  }
`;

export default HomeStyled;
