import { Outlet } from 'react-router-dom';
import GlobalStyled from './globalStyled.tsx';

const App = () => {
  return (
    <>
      <GlobalStyled />
      This is app
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
