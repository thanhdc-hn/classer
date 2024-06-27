import Sidebar from '@pages/Home/components/sider.tsx';
import HomeStyled from '@pages/Home/home.styled.ts';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const Home = () => {
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
