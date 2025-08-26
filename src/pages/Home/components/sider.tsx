import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { itemSideBar, itemSideBarProps } from '@pages/Home/constants.tsx';
import { collapsedState } from '@src/recoilState';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useRecoilState(collapsedState);
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  const renderMenuItem = (menu: itemSideBarProps[]) => {
    return menu.map((menuParent: itemSideBarProps, index: number) => (
      <div key={`menu-group-${index}`} className="menu-group">
        <li
          className="menu-li-parent"
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigation(menuParent.path)}
        >
          {menuParent.icon}
          <span className="menu-label">{menuParent.label}</span>
        </li>

        {/* If there are children, render them in a separate list below the parent */}
        {menuParent.children && menuParent.children.length > 0 && (
          <ul className="menu-children">
            {menuParent.children.map(
              (childItem: itemSideBarProps, childIndex: number) => (
                <li
                  key={`child-${index}-${childIndex}`}
                  className="menu-li-child"
                  onClick={() => handleNavigation(childItem.path)}
                  style={{ cursor: 'pointer' }}
                >
                  {childItem.icon}
                  <span className="menu-label">{childItem.label}</span>
                </li>
              ),
            )}
          </ul>
        )}
      </div>
    ));
  };

  return (
    <Sider collapsed={collapsed}>
      <div className="app-logo">
        {collapsed ? (
          <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
        ) : (
          <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
        )}
      </div>
      <div className="menus">
        <ul className="menu-ul">{renderMenuItem(itemSideBar)}</ul>
      </div>
    </Sider>
  );
};

export default Sidebar;
