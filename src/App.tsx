import { Outlet } from 'react-router-dom';
import GlobalStyled from './globalStyled.tsx';

const App = () => {
  return (
    <>
      <GlobalStyled />
      <Outlet />
    </>
  );
};

export default App;
