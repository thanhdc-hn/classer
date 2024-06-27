import { collapsedState } from '@src/recoilState/appState.ts';
import { Layout } from 'antd';
import { useRecoilState } from 'recoil';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, _setCollapsed] = useRecoilState(collapsedState);
  return (
    <Sider collapsed={collapsed}>
      <div className={'app-logo'}></div>
      <div className={'menus'}>123</div>
    </Sider>
  );
};

export default Sidebar;
