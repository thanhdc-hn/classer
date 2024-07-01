import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { itemSideBar, itemSideBarProps } from '@pages/Home/constants.tsx';
import { collapsedState } from '@src/recoilState/appState.ts';
import { Layout } from 'antd';
import { useRecoilState } from 'recoil';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);

  const renderMenuItem = (menu: itemSideBarProps[]) => {
    return menu.map((menuParent: itemSideBarProps) => {
      if (menuParent.children) {
        return (
          <>
            <li className={'menu-li-parent'}>
              {menuParent.icon}
              <span className={'menu-label'}>{menuParent.label}</span>
            </li>
          </>
        );
      } else {
        return (
          <li className={'menu-li-parent'}>
            {menuParent.icon}
            <span className={'menu-label'}>{menuParent.label}</span>
          </li>
        );
      }
    });
  };

  return (
    <Sider collapsed={collapsed}>
      <div className={'app-logo'}>
        {collapsed ? (
          <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
        )}
      </div>
      <div className={'menus'}>
        <ul className={'menu-ul'}>{renderMenuItem(itemSideBar)}</ul>
      </div>
    </Sider>
  );
};

export default Sidebar;
