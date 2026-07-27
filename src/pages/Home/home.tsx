import {
  ArrowRightOutlined,
  DollarOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { CSSProperties, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeStyled from './home.styled.ts';

interface Feature {
  key: string;
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  accent: string;
}

const features: Feature[] = [
  {
    key: 'tarot',
    title: 'Tarot',
    description: 'Rút và luận giải các lá bài Tarot theo trực giác của bạn.',
    icon: <StarOutlined />,
    path: '/tarot',
    accent: '#a855f7',
  },
  {
    key: 'poker',
    title: 'Poker Cash Flow',
    description:
      'Quản lí buy-in, cash-out và chia tiền buổi poker cùng bạn bè.',
    icon: <DollarOutlined />,
    path: '/poker',
    accent: '#38bdf8',
  },
];

const Home = () => {
  document.title = 'Classer';
  const navigate = useNavigate();

  return (
    <HomeStyled>
      <div className="container">
        <header className="hero">
          <span className="hero-badge">✦ Classer</span>
          <h1>Chọn một tính năng để bắt đầu</h1>
          <p>Bộ công cụ nhỏ gọn cho những buổi vui cùng bạn bè.</p>
        </header>

        <div className="feature-grid">
          {features.map((f) => (
            <button
              key={f.key}
              type="button"
              className="feature-card"
              style={{ '--accent': f.accent } as CSSProperties}
              onClick={() => navigate(f.path)}
            >
              <span className="feature-icon">{f.icon}</span>
              <span className="feature-body">
                <span className="feature-title">{f.title}</span>
                <span className="feature-desc">{f.description}</span>
              </span>
              <span className="feature-arrow">
                <ArrowRightOutlined />
              </span>
            </button>
          ))}
        </div>
      </div>
    </HomeStyled>
  );
};

export default Home;
