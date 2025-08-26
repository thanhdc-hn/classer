import { IdcardOutlined } from '@ant-design/icons';
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
    key: 'tarot',
    icon: <IdcardOutlined />,
    label: 'Tarot',
    path: 'tarot',
  },
];
