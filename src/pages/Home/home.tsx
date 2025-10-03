import Sidebar from '@pages/Home/components/sider.tsx';
import HomeStyled from '@pages/Home/home.styled.ts';
import { Layout } from 'antd';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const Home = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    navigate('/tarot');
  }, []);

  return (
    <HomeStyled>
      <Sidebar />
      <Layout>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </HomeStyled>
  );
};

export default Home;
