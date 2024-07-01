import NotFound from '@pages/notFound/not-found.tsx';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import menu, { menuProps } from './menu.tsx';

const renderRouter = (menuRender: menuProps[]) => {
  return menuRender.map(({ path, element, children }: menuProps) => {
    if (children && children.length) {
      return {
        path,
        element,
        children: renderRouter(children),
      };
    } else {
      return {
        path,
        element,
      };
    }
  });
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: renderRouter(menu),
    errorElement: <NotFound />,
  },
]);

export default router;
