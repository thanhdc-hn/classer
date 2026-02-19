import { Modal, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Paragraph } = Typography;

export interface TarotCard {
  name?: string;
  description?: string;
  interpretation?: string;
  image?: string;
  suite?: string;
  reverse?: boolean;
}

export interface TarotCardModalProps {
  open: boolean;
  card?: TarotCard | null;
  onClose: () => void;
}

const Content = styled.div`
  max-height: 60vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
`;

const Preformatted = styled(Paragraph)<{ $dimmed?: boolean }>`
  white-space: pre-wrap;
  margin-bottom: 0;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.55 : 1)};
  transition: opacity 0.2s ease;
`;

const EmphasisBlock = styled.div<{ $active?: boolean }>`
  padding: 12px;
  border-left: 3px solid
    ${({ $active }) => ($active ? '#1677ff' : 'transparent')};
  background: ${({ $active }) =>
    $active ? 'rgba(22, 119, 255, 0.06)' : 'transparent'};
  border-radius: 4px;
`;

const normalizeLineBreaks = (value: string) =>
  value.replace(/<br\s*\/?>/gi, '\n');

const splitInterpretation = (value: string) => {
  const normalized = normalizeLineBreaks(value);
  const parts = normalized.split(/Reversed:\s*/i);
  if (parts.length > 1) {
    return {
      upright: parts[0].trim(),
      reversed: parts.slice(1).join(' ').trim(),
    };
  }
  return { upright: normalized.trim(), reversed: '' };
};

const TarotCardModal: React.FC<TarotCardModalProps> = ({
  open,
  card,
  onClose,
}) => {
  const title = card?.name ?? 'Card details';
  const descriptionText = card?.description
    ? normalizeLineBreaks(card.description)
    : '—';

  const { upright, reversed } = card?.interpretation
    ? splitInterpretation(card.interpretation)
    : { upright: '', reversed: '' };

  const hasUpright = Boolean(upright && upright.trim().length > 0);
  const hasReversed = Boolean(reversed && reversed.trim().length > 0);
  const hasBoth = hasUpright && hasReversed;
  const isReversed = Boolean(card?.reverse);

  const interpretationUprightText = hasUpright ? upright : '—';
  const interpretationReversedText = reversed;

  // Determine which part should be emphasized/dimmed
  const uprightActive = hasBoth ? !isReversed : hasUpright;
  const reversedActive = hasBoth ? isReversed : hasReversed;
  const uprightDimmed = hasBoth && isReversed;
  const reversedDimmed = hasBoth && !isReversed;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      title={title}
      width={720}
      destroyOnHidden
      centered
    >
      <Content>
        <Section>
          <Label>Description</Label>
          <Preformatted>{descriptionText}</Preformatted>
        </Section>

        {hasUpright && (
          <Section>
            <Label>Interpretation</Label>
            <EmphasisBlock $active={uprightActive}>
              <Preformatted $dimmed={uprightDimmed}>
                {interpretationUprightText}
              </Preformatted>
            </EmphasisBlock>
          </Section>
        )}

        {hasReversed && (
          <Section>
            <Label>Reversed</Label>
            <EmphasisBlock $active={reversedActive}>
              <Preformatted $dimmed={reversedDimmed}>
                {interpretationReversedText}
              </Preformatted>
            </EmphasisBlock>
          </Section>
        )}
      </Content>
    </Modal>
  );
};

export default TarotCardModal;
