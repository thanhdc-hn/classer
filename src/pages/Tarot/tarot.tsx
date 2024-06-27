import TarotStyled from '@pages/Tarot/tarot.styled.ts';
import { useState } from 'react';
import fullDeck from './deck.json';

type TarotCard = {
  name: string;
  reverse: boolean;
  show: boolean;
  image?: string;
};

const SHUFFLE_DURATION_MS = 3500; // ~3.5s effect
const ENTRY_STAGGER_MS = 30; // delay between cards
const ENTRY_DURATION_MS = 680; // animation duration per card
const MAX_STAGGER_INDEX = 60; // cap stagger for large decks

const Tarot = () => {
  document.title = 'Tarot';
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [justShuffled, setJustShuffled] = useState(false);

  const shuffle = () => {
    if (isShuffling) return;

    setIsShuffling(true);

    // Prepare a new deck with initial properties
    const deck: TarotCard[] = fullDeck.map((card) => ({
      name: card.name,
      reverse: Math.random() < 0.5, // 50% chance of being reversed
      show: false, // Always false initially
      image: card.image,
    }));

    // Shuffle the deck using Fisher-Yates algorithm
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Delay applying the shuffled deck to show the animation
    window.setTimeout(() => {
      setCards(deck); // Update the state with the shuffled deck
      setIsShuffling(false);

      // Keep the just-shuffled class long enough for the last card to finish
      const totalEntryMs =
        ENTRY_STAGGER_MS * MAX_STAGGER_INDEX + ENTRY_DURATION_MS + 120;
      setJustShuffled(true);
      window.setTimeout(() => setJustShuffled(false), totalEntryMs);
    }, SHUFFLE_DURATION_MS);
  };

  const handleCardClick = (index: number) => {
    if (isShuffling) return;
    const updatedCards = [...cards];
    updatedCards[index].show = true;
    setCards(updatedCards);
  };

  return (
    <TarotStyled>
      <div className="controls">
        <button onClick={shuffle} disabled={isShuffling}>
          {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
        </button>
      </div>

      {cards.length > 0 ? (
        <div
          className={`cards-container ${isShuffling ? 'is-shuffling' : ''} ${justShuffled ? 'just-shuffled' : ''}`}
        >
          {cards.map((card, index) => (
            <div
              key={`${card.name}-${index}`}
              className="card"
              style={{
                ['--stagger' as any]: `${Math.min(index, MAX_STAGGER_INDEX) * ENTRY_STAGGER_MS}ms`,
              }}
              onClick={() =>
                !card.show && !isShuffling && handleCardClick(index)
              }
            >
              <div
                className={`card-inner ${card.show ? 'show' : ''} ${card.reverse ? 'reverse' : ''}`}
              >
                <div className="card-face card-back"></div>
                <div className="card-face card-front">
                  <div className="card-name">{card.name}</div>
                  {card.reverse && (
                    <div className="card-status">(Reversed)</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Click "Shuffle Deck" to start</p>
        </div>
      )}

      {isShuffling && (
        <div
          className="shuffle-overlay"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="shuffle-stack">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="shuffle-card"
                style={{ animationDelay: `${(i % 6) * 0.08}s`, zIndex: 12 - i }}
              />
            ))}
          </div>
          <div className="shuffle-text">Shuffling the deck...</div>
        </div>
      )}

      <div className={'cards-showed'}>
        {cards
          .filter((item) => item.show)
          .map((item) => (item.reverse ? `${item.name} ngược` : item.name))
          .join(', ')}
      </div>
    </TarotStyled>
  );
};

export default Tarot;
