import { Link } from "react-router-dom";
import "../styles/viewport-full.css";
import "../styles/plan-page.css";

type PlanContentProps = {
  onClose: () => void;
  onEnter: () => void;
};

export default function PlanContent({ onClose, onEnter }: PlanContentProps) {
  return (
    <div className="vf plan-page">
      <div className="vf__stage plan-page__stage">
        <div className="plan-page__main">
          <img className="plan-page__bg" src="/Image/premium1.webp" alt="" decoding="async" />

          <header className="plan-page__header">
            <button type="button" className="plan-page__back" aria-label="닫기" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 6L8 12l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="plan-page__title">PLAN</h1>
            <p className="plan-page__subtitle">Premium Journey</p>
          </header>

          <div className="plan-page__hero-ui">
            <p className="plan-page__guide">TOUR 일정표 안내입니다</p>
            <button type="button" className="plan-page__enter" onClick={onEnter}>
              Enter
            </button>
          </div>
        </div>

        <footer className="plan-page__footer">
          <Link className="plan-page__book" to="/reservations">
            <span className="plan-page__book-label">
              바로 예약하기
              <span className="plan-page__book-arrow" aria-hidden="true">
                →
              </span>
            </span>
            <span className="plan-page__book-line" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </div>
  );
}
