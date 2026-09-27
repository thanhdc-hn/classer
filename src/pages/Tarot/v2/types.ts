import { TarotCard } from '@src/components/TarotCardModal.tsx';

export interface TarotCardV2 extends TarotCard {
  show: boolean;
  drawn: boolean;
  slot: number | null;
}
