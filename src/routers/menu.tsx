import { withSuspense } from '@src/HOC';
import { lazy, ReactNode } from 'react';

const Home = lazy(() => import('@pages/Home'));
const Tarot = lazy(() => import('@pages/Tarot'));

export interface menuProps {
  key: string;
  path: string;
  children?: menuProps[];
  element: ReactNode;
}

const menu: menuProps[] = [
  {
    key: '',
    path: '',
    element: withSuspense(<Home />),
  },
  {
    key: 'tarot',
    path: 'tarot',
    element: withSuspense(<Tarot />),
  },
];

export default menu;
