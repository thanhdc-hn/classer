import DetailTeacher from '@pages/detailTeacher';
import Home from '@pages/Home';
import Teacher from '@pages/teacher';
import { ReactNode } from 'react';

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
    element: <Home />,
  },
  {
    key: 'teacher',
    path: 'teacher',
    element: <Teacher />,
    children: [
      {
        key: 'detail-teacher',
        path: 'detail',
        element: <DetailTeacher />,
      },
    ],
  },
  {
    key: 'student',
    path: 'student',
    element: <>Student router</>,
  },
  {
    key: 'setting',
    path: 'setting',
    element: <>Setting router</>,
  },
];

export default menu;
