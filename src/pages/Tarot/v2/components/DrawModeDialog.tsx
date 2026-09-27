interface DrawModeDialogProps {
  open: boolean;
  onSelect: (drawCount: number) => void;
  onClose: () => void;
}

const DrawModeDialog = ({ open, onSelect, onClose }: DrawModeDialogProps) => {
  if (!open) return null;
  return (
    <div className="draw-mode-popup-overlay" onClick={onClose}>
      <div
        className="draw-mode-popup"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Choose how to draw</h3>
        <div className="draw-mode-actions">
          <button onClick={() => onSelect(3)}>Draw 3 cards</button>
          <button onClick={() => onSelect(1)}>Draw 1 card</button>
        </div>
      </div>
    </div>
  );
};

export default DrawModeDialog;
