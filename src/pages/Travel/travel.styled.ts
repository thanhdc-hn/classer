import styled from 'styled-components';

export const TravelStyled = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%);
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem 1rem;

  .container {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;

    h1 {
      font-size: 2.5rem;
      color: #00796b;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .subtitle {
      font-size: 1.1rem;
      color: #666;
      font-style: italic;
    }
  }

  .day-section {
    margin-bottom: 3rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -15px;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #4db6ac;
      border-radius: 2px;
    }

    h2 {
      font-size: 1.8rem;
      color: #004d40;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;

      span {
        background: #00796b;
        color: white;
        padding: 0.2rem 0.8rem;
        border-radius: 50px;
        font-size: 0.9rem;
        margin-right: 10px;
      }
    }
  }

  .activity-card {
    background: white;
    border-radius: 12px;
    padding: 1.2rem;
    margin-bottom: 1rem;
    border: 1px solid #e0f2f1;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 121, 107, 0.1);
    }

    h3 {
      font-size: 1.1rem;
      color: #00796b;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      line-height: 1.6;
      color: #555;
    }

    ul {
      margin: 0.5rem 0 0 1.2rem;
      padding: 0;

      li {
        margin-bottom: 0.3rem;
        color: #444;
      }
    }

    a {
      color: #00796b;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .tag {
    display: inline-block;
    padding: 0.2rem 0.6rem;
    background: #e0f2f1;
    color: #00796b;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .container {
      padding: 1.5rem;
    }

    .header h1 {
      font-size: 2rem;
    }
  }
`;
