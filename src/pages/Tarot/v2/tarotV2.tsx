import { CopyOutlined } from '@ant-design/icons';
import TarotCardModal, { TarotCard } from '@src/components/TarotCardModal.tsx';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import DrawModeDialog from './components/DrawModeDialog.tsx';
import ShuffleOverlay from './components/ShuffleOverlay.tsx';
import TarotFan from './components/TarotFan.tsx';
import TarotV2Styled from './tarotV2.styled.ts';
import useFanRotation from './useFanRotation.ts';
import useTarotDeck from './useTarotDeck.tsx';

const TarotV2 = () => {
  document.title = 'Tarot';
  const deck = useTarotDeck();
  const fan = useFanRotation();
  const { reset: resetRotation } = fan;
  const [isDrawModeOpen, setIsDrawModeOpen] = useState(false);
  const [cardDetail, setCardDetail] = useState<TarotCard | null>(null);

  // Every fresh deck (shuffle or reshuffle) starts centred
  useEffect(() => {
    if (deck.justShuffled) resetRotation();
  }, [deck.justShuffled, resetRotation]);

  const handleSelectMode = (drawCount: number) => {
    setIsDrawModeOpen(false);
    deck.startShuffle(drawCount);
  };

  // Card on the arc -> draw it; card already in the centre -> show details
  const handleCardClick = (index: number) => {
    const card = deck.cards[index];
    if (!card) return;
    if (card.drawn) setCardDetail(card);
    else deck.drawCard(index);
  };

  return (
    <>
      <TarotV2Styled>
        <div className="layout">
          <div className="main-panel">
            <div className="controls">
              <button
                type="button"
                onClick={() => setIsDrawModeOpen(true)}
                disabled={deck.isShuffling}
              >
                {deck.isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
              </button>
              {/* Side panel is hidden on mobile, so copy lives in the toolbar */}
              {deck.getCardFlip && (
                <button
                  type="button"
                  className="mobile-copy-btn"
                  onClick={deck.copyCard}
                  title={deck.getCardFlip}
                  aria-label={`Copy drawn cards: ${deck.getCardFlip}`}
                >
                  <CopyOutlined />
                  <span>
                    Copy {deck.shownCardCount}/{deck.maxDrawCount}
                  </span>
                </button>
              )}
            </div>
            {deck.cards.length > 0 ? (
              <TarotFan
                cards={deck.cards}
                rotation={fan.rotation}
                isDragging={fan.isDragging}
                isMoving={fan.isMoving}
                animateIn={deck.justShuffled}
                slotCount={deck.maxDrawCount}
                onCardClick={handleCardClick}
                onCardReturn={deck.returnCard}
                didDrag={fan.didDrag}
                bind={fan.bind}
              />
            ) : (
              <div className="empty-state">Click "Shuffle Deck" to start</div>
            )}
          </div>
          <aside className="side-panel">
            <div className="side-panel-header">
              <div className="side-panel-title">Drawn Cards</div>
              {deck.getCardFlip && (
                <button
                  className="copy-btn"
                  onClick={deck.copyCard}
                  title="Copy cards"
                  aria-label="Copy cards"
                >
                  <CopyOutlined />
                </button>
              )}
            </div>
            <div className="cards-showed">
              {deck.getCardFlip || 'No cards drawn yet'}
            </div>
          </aside>
        </div>

        <ShuffleOverlay visible={deck.isShuffling} />
        <DrawModeDialog
          open={isDrawModeOpen}
          onSelect={handleSelectMode}
          onClose={() => setIsDrawModeOpen(false)}
        />
        <TarotCardModal
          open={Boolean(cardDetail)}
          card={cardDetail}
          onClose={() => setCardDetail(null)}
        />
      </TarotV2Styled>
      <ToastContainer limit={1} />
    </>
  );
};

export default TarotV2;
