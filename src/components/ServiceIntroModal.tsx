import { useEffect } from "react";
import { createPortal } from "react-dom";
import ServiceIntroContent from "./ServiceIntroContent";

type ServiceIntroModalProps = {
  onClose: () => void;
};

export default function ServiceIntroModal({ onClose }: ServiceIntroModalProps) {
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
    <div className="service-intro-modal" role="presentation" onClick={onClose}>
      <div
        className="service-intro-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label="프리미엄 패키지 소개"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="service-intro-modal__close" aria-label="닫기" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <ServiceIntroContent />
      </div>
    </div>,
    document.body,
  );
}
