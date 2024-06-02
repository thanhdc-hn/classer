import NotFound from '@pages/notFound/not-found.tsx';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import menu, { menuProps } from './menu.tsx';

const renderRouter: (menuRender: menuProps[]) => (
  | {
      path: string;
      children: any;
      element:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | boolean
        | undefined
        | null;
    }
  | {
      path: string;
      element:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | boolean
        | undefined
        | null;
    }
)[] = (menuRender: menuProps[]) => {
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
