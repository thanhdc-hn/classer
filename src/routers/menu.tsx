import { SettingOutlined } from '@ant-design/icons';
import DetailTeacher from '@pages/detailTeacher';
import Teacher from '@pages/teacher';
import { ReactNode } from 'react';

export interface menuProps {
  key: string;
  icon?: ReactNode;
  path: string;
  label: string;
  children?: menuProps[];
  element: ReactNode;
}

const menu: menuProps[] = [
  {
    key: 'teacher',
    path: 'teacher',
    label: 'Teacher',
    element: <Teacher />,
    children: [
      {
        key: 'detail-teacher',
        path: 'detail',
        label: 'Detail Teacher',
        element: <DetailTeacher />,
      },
    ],
  },
  {
    key: 'student',
    path: 'student',
    label: 'Student',
    element: <>Student router</>,
  },
  {
    key: 'setting',
    path: 'setting',
    label: 'setting',
    icon: <SettingOutlined />,
    element: <>Setting router</>,
  },
];

export default menu;
