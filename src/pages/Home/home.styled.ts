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
      display: flex;
      align-items: center;
      padding-left: 2rem;

      .anticon {
        color: #fff;
        font-size: 30px;
        cursor: pointer;
      }
    }

    .menus {
      padding: 1rem;
      user-select: none;

      .menu-ul {
        padding-left: 0;

        .menu-li-parent {
          transition: 0.3s;
          list-style: none;
          padding: 0.7rem 1rem;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1rem;

          &:hover {
            background: ${theme.colorPrimaryDark};
          }

          .anticon {
            font-size: 24px;
          }
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .menu-li-parent {
        .menu-label {
          visibility: hidden;
        }
      }
    }
  }

  .ant-layout-header {
    height: 100px;
  }
`;

export default HomeStyled;
