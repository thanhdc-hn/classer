import { CopyOutlined } from '@ant-design/icons';
import TarotStyled from '@pages/Tarot/tarot.styled.ts';
import TarotCardModal, { TarotCard } from '@src/components/TarotCardModal.tsx';
import { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import fullDeck from './deck.json';

interface TarotCardExtended extends TarotCard {
  show: boolean;
}

const SHUFFLE_DURATION_MS = 3500; // ~3.5s effect
const ENTRY_STAGGER_MS = 30; // delay between cards
const ENTRY_DURATION_MS = 680; // animation duration per card
const MAX_STAGGER_INDEX = 60; // cap stagger for large decks

const Tarot = () => {
  document.title = 'Tarot';
  const [cards, setCards] = useState<TarotCardExtended[]>([]);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [justShuffled, setJustShuffled] = useState<boolean>(false);
  const [isDrawModePopupOpen, setIsDrawModePopupOpen] =
    useState<boolean>(false);
  const [isMobileDrawSheetOpen, setIsMobileDrawSheetOpen] =
    useState<boolean>(false);
  const [maxDrawCount, setMaxDrawCount] = useState<number>(3);
  const [cardDetail, setCardDetail] = useState<TarotCardExtended | null>(null);

  const shuffle = () => {
    if (isShuffling) return;
    setIsDrawModePopupOpen(true);
  };

  const startShuffle = (drawCount: number) => {
    if (isShuffling) return;

    setMaxDrawCount(drawCount);
    setIsDrawModePopupOpen(false);
    setIsMobileDrawSheetOpen(false);
    setCardDetail(null);
    setIsShuffling(true);

    // Prepare a new deck with initial properties
    const deck: TarotCardExtended[] = fullDeck.map((card) => ({
      ...card,
      reverse: Math.random() < 0.4, // 50% chance of being reversed
      show: false, // Always false initially
      image: card.image
        ? new URL(`./${card.image}`, import.meta.url).toString()
        : undefined,
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

    const currentShownCount = cards.filter((item) => item.show).length;
    if (!cards[index].show) {
      if (currentShownCount >= maxDrawCount) {
        toast.dismiss();
        toast.info(
          <div className="toast-draw-limit">
            <p>You have drawn enough {maxDrawCount} cards.</p>
            <div className="toast-actions">
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
        return;
      }
      const updatedCards = [...cards];
      updatedCards[index].show = true;
      setCards(updatedCards);
    } else {
      setCardDetail(cards[index]);
    }
  };

  const getCardFlip = cards
    .filter((item) => item.show)
    .map((item) => (item.reverse ? `${item.name} (reversed)` : item.name))
    .join(', ');
  const shownCardCount = cards.filter((item) => item.show).length;

  const copyCard = () => {
    // handle copy to clipboard getCardFlip
    navigator.clipboard.writeText(getCardFlip).then(() => {
      toast.dismiss();
      toast.success('Copied to clipboard', {
        position: 'top-center',
        transition: Bounce,
      });
    });
  };

  const closeModalDetail = () => {
    setCardDetail(null);
  };

  const reshuffle = () => {
    toast.dismiss();
    setCardDetail(null);

    // Shuffle current deck again without the 3.5s animation
    const deck = [...cards].map((card) => ({
      ...card,
      show: false,
      reverse: Math.random() < 0.4,
    }));

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);

    // Small entry animation
    const totalEntryMs =
      ENTRY_STAGGER_MS * MAX_STAGGER_INDEX + ENTRY_DURATION_MS + 120;
    setJustShuffled(true);
    window.setTimeout(() => setJustShuffled(false), totalEntryMs);
  };

  return (
    <>
      <TarotStyled>
        <div className="layout">
          <div className="main-panel">
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
                    onClick={() => handleCardClick(index)}
                  >
                    <div
                      className={`card-inner ${card.show ? 'show' : ''} ${card.reverse ? 'reverse' : ''}`}
                    >
                      <div className="card-face card-back"></div>
                      <div className="card-face card-front">
                        <img
                          className="card-illustration"
                          src={card.image}
                          alt={card.name}
                          loading="lazy"
                        />
                        <div className="card-name">{card.name}</div>
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
          </div>

          <aside className="side-panel">
            <div className="side-panel-header">
              <div className="side-panel-title">Drawn Cards</div>
              {getCardFlip && (
                <button
                  className="copy-btn"
                  onClick={copyCard}
                  title="Copy cards"
                >
                  <CopyOutlined />
                </button>
              )}
            </div>
            <div className={'cards-showed'}>
              {getCardFlip || 'No cards drawn yet'}
            </div>
          </aside>
        </div>

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
                  style={{
                    animationDelay: `${(i % 6) * 0.08}s`,
                    zIndex: 12 - i,
                  }}
                />
              ))}
            </div>
            <div className="shuffle-text">Shuffling the deck...</div>
          </div>
        )}

        {isDrawModePopupOpen && (
          <div className="draw-mode-popup-overlay">
            <div className="draw-mode-popup" role="dialog" aria-modal="true">
              <h3>Choose how to draw</h3>
              <div className="draw-mode-actions">
                <button onClick={() => startShuffle(3)}>Draw 3 cards</button>
                <button onClick={() => startShuffle(1)}>Draw 1 card</button>
              </div>
            </div>
          </div>
        )}

        <button
          className="mobile-draw-toggle"
          onClick={() => setIsMobileDrawSheetOpen(true)}
          aria-label="Open drawn cards list"
        >
          {`Drawn ${shownCardCount}/${maxDrawCount}`}
        </button>

        {isMobileDrawSheetOpen && (
          <div
            className="mobile-draw-sheet-backdrop"
            onClick={() => setIsMobileDrawSheetOpen(false)}
          >
            <div
              className="mobile-draw-sheet"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-draw-sheet-header">
                <h4>Drawn Cards</h4>
                <div className="mobile-draw-sheet-actions">
                  {getCardFlip && (
                    <button
                      className="copy-btn"
                      onClick={copyCard}
                      aria-label="Copy cards"
                    >
                      <CopyOutlined />
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileDrawSheetOpen(false)}
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="mobile-draw-sheet-content">
                {getCardFlip || 'No cards drawn yet'}
              </div>
            </div>
          </div>
        )}
      </TarotStyled>
      <ToastContainer limit={1} />
      <TarotCardModal
        open={!!cardDetail}
        card={cardDetail}
        onClose={closeModalDetail}
      />
    </>
  );
};

export default Tarot;
