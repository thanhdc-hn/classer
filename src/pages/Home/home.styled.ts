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
      padding-left: 0.5rem;

      .anticon {
        color: #fff;
        font-size: 30px;
        cursor: pointer;
      }
    }

    .menus {
      padding: 1rem 1rem 1rem 0;
      user-select: none;

      .menu-ul {
        padding-left: 0;

        .menu-li-parent {
          transition: 0.3s;
          list-style: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 1.5rem;

          &:hover {
            background: ${theme.colorPrimaryDark};
          }

          .anticon {
            font-size: 24px;
          }
        }

        .menu-ul-child {
          padding-left: 20px; /* Indent child items */
          list-style-type: none;
        }

        .menu-group {
          margin-bottom: 10px; /* Space between menu groups */
        }

        .menu-children {
          list-style-type: none;
          padding-left: 20px; /* Indent child items */
          margin-top: 5px;
        }

        .menu-li-child {
          padding: 5px 0;
          font-size: 0.9em; /* Slightly smaller than parent */
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
