import {
  DollarOutlined,
  IdcardOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
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
  {
    key: 'poker',
    icon: <DollarOutlined />,
    label: 'Poker',
    path: 'poker',
  },
  {
    key: 'vietlott',
    icon: <TrophyOutlined />,
    label: 'Vietlott',
    path: 'vietlott',
  },
];
