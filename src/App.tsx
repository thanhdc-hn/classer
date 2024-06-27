import { Outlet } from 'react-router-dom';
import GlobalStyled from './globalStyled.tsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'; // Optional

const App = () => {
  return (
    <>
      <GlobalStyled />
      <Outlet />
    </>
  );
};

export default App;
