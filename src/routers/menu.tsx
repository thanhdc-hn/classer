import { withSuspense } from '@src/HOC';
import { lazy, ReactNode } from 'react';

const Home = lazy(() => import('@pages/Home'));
const Tarot = lazy(() => import('@pages/Tarot'));
const Travel = lazy(() => import('@pages/Travel'));
const Poker = lazy(() => import('@pages/Poker'));

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
  {
    key: 'quang-binh',
    path: 'quang-binh',
    element: withSuspense(<Travel />),
  },
  {
    key: 'poker',
    path: 'poker',
    element: withSuspense(<Poker />),
  },
];

export default menu;
