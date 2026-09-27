import { useEffect, useMemo, useRef, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import fullDeck from '../deck.json';
import { preloadCardImages } from './cardImage.ts';
import {
  ENTRY_ANIMATION_MS,
  REVERSE_PROBABILITY,
  SHUFFLE_DURATION_MS,
} from './constants.ts';
import { TarotCardV2 } from './types.ts';

const fisherYates = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const resetCard = (card: TarotCardV2): TarotCardV2 => ({
  ...card,
  reverse: Math.random() < REVERSE_PROBABILITY,
  show: false,
  drawn: false,
  slot: null,
});

const buildDeck = (): TarotCardV2[] =>
  fullDeck.map((card) =>
    resetCard({
      ...card,
      image: card.image ? `/${card.image}` : undefined,
      show: false,
      drawn: false,
      slot: null,
    }),
  );

const useTarotDeck = () => {
  const [cards, setCards] = useState<TarotCardV2[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [justShuffled, setJustShuffled] = useState(false);
  const [maxDrawCount, setMaxDrawCount] = useState(3);
  const [drawnOrder, setDrawnOrder] = useState<number[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const markJustShuffled = () => {
    setJustShuffled(true);
    later(() => setJustShuffled(false), ENTRY_ANIMATION_MS);
  };

  const startShuffle = (drawCount: number) => {
    if (isShuffling) return;
    toast.dismiss();
    setMaxDrawCount(drawCount);
    setDrawnOrder([]);
    setIsShuffling(true);
    const deck = fisherYates(buildDeck());
    // Fetch all faces while the shuffle overlay plays
    preloadCardImages(deck.map((card) => card.image));
    later(() => {
      setCards(deck);
      setIsShuffling(false);
      markJustShuffled();
    }, SHUFFLE_DURATION_MS);
  };

  // Shuffle the current deck again without the long overlay animation
  // (functional updates keep it safe when called from a stale toast closure)
  const reshuffle = () => {
    toast.dismiss();
    setDrawnOrder([]);
    setCards((prev) => fisherYates(prev.map(resetCard)));
    markJustShuffled();
  };

  const showDrawLimitToast = () => {
    toast.dismiss();
    toast.info(
      <div className="toast-draw-limit" style={{ textAlign: 'center' }}>
        <p style={{ margin: 0 }}>You have drawn enough {maxDrawCount} cards.</p>
        <div className="toast-actions" style={{ marginTop: '1rem' }}>
          <button onClick={() => reshuffle()}>Draw Again</button>
        </div>
      </div>,
      {
        position: 'top-center',
        transition: Bounce,
        autoClose: false,
        closeOnClick: false,
      },
    );
  };

  /** Returns true when the card was drawn. */
  const drawCard = (index: number): boolean => {
    if (isShuffling || !cards[index] || cards[index].drawn) return false;
    if (drawnOrder.length >= maxDrawCount) {
      showDrawLimitToast();
      return false;
    }
    const used = new Set(drawnOrder.map((i) => cards[i].slot));
    let slot = 0;
    while (used.has(slot)) slot++;
    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, show: true, drawn: true, slot } : card,
      ),
    );
    setDrawnOrder((prev) => [...prev, index]);
    return true;
  };

  const returnCard = (index: number) => {
    if (!cards[index]?.drawn) return;
    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, show: false, drawn: false, slot: null } : card,
      ),
    );
    setDrawnOrder((prev) => prev.filter((i) => i !== index));
  };

  const drawnCards = useMemo(
    () => drawnOrder.map((i) => cards[i]).filter(Boolean),
    [drawnOrder, cards],
  );

  const getCardFlip = drawnCards
    .map((item) => (item.reverse ? `${item.name} (reversed)` : item.name))
    .join(', ');

  const copyCard = () => {
    navigator.clipboard.writeText(getCardFlip).then(() => {
      toast.dismiss();
      toast.success('Copied to clipboard', {
        position: 'top-center',
        transition: Bounce,
      });
    });
  };

  return {
    cards,
    isShuffling,
    justShuffled,
    maxDrawCount,
    drawnOrder,
    drawnCards,
    shownCardCount: drawnOrder.length,
    getCardFlip,
    startShuffle,
    reshuffle,
    drawCard,
    returnCard,
    copyCard,
  };
};

export default useTarotDeck;
