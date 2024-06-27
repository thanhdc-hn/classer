import theme from '@src/lib/theme.ts';
import { Layout } from 'antd';
import styled from 'styled-components';

const HomeStyled = styled(Layout)`
  .ant-layout-sider,
  .ant-layout-header {
    transition: 0.2s;
    background: ${theme.colorPrimary};
    color: ${theme.textColorPrimary};
  }

  .ant-layout-sider {
    height: 100vh;

    .app-logo {
      height: 100px;
    }

    .menus {
      padding: 2rem 1rem;
    }
  }

  .ant-layout-header {
    height: 100px;
  }
`;

export default HomeStyled;
