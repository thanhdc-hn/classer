import { IdcardOutlined, SmileOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

export interface itemSideBarProps {
  key: string;
  icon?: ReactNode;
  label: string;
  path: string;
  children?: itemSideBarProps[];
}

export const itemSideBar: itemSideBarProps[] = [
  {
    key: 'identity',
    icon: <IdcardOutlined />,
    label: 'Identity',
    path: 'identity',
  },
  {
    key: 'relax',
    icon: <SmileOutlined />,
    label: 'Relax',
    path: 'relax',
    children: [
      {
        key: 'color',
        label: 'Color',
        path: 'path',
      },
      {
        key: 'vietlott',
        label: 'Vietlott',
        path: 'vietlott',
      },
    ],
  },
];
