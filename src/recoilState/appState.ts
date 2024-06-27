import { atom } from 'recoil';

export const collapsedState = atom<boolean>({
  key: 'collapsedState',
  default: false,
});
