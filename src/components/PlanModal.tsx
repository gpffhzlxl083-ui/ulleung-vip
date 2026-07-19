import { useEffect } from "react";
import { createPortal } from "react-dom";
import PlanContent from "./PlanContent";

type PlanModalProps = {
  onClose: () => void;
  onEnter: () => void;
};

export default function PlanModal({ onClose, onEnter }: PlanModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="plan-modal" role="presentation" onClick={onClose}>
      <div
        className="plan-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label="여행 계획"
        onClick={(event) => event.stopPropagation()}
      >
        <PlanContent onClose={onClose} onEnter={onEnter} />
      </div>
    </div>,
    document.body,
  );
}
