import { Link } from "react-router-dom";
import { useEffect } from "react";
import ScheduleDetailContent from "../components/ScheduleDetailContent";
import { SCHEDULE_DAYS } from "../data/schedule";
import "../styles/viewport-full.css";
import "../styles/schedule-index.css";
import "../styles/schedule-day.css";

function NavChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === "left" ? (
        <path
          d="M14 6L8 12l6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M10 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function scrollToDay(day: number) {
  document.getElementById(`schedule-day-${day}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ScheduleIndexPage() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash.startsWith("schedule-day-")) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="vf schedule-index">
      <div className="vf__stage schedule-index__stage">
        <section className="schedule-index__hero" aria-label="프리미엄 일정표">
          <img
            className="schedule-index__bg"
            src="/Image/inclusion2/coast-cliff-view.webp"
            alt=""
            decoding="async"
          />

          <header className="schedule-index__header">
            <Link className="schedule-index__nav schedule-index__nav--back" to="/inclusion">
              <NavChevron direction="left" />
              BACK
            </Link>
            <Link className="schedule-index__nav schedule-index__nav--next" to="/option">
              NEXT
              <NavChevron direction="right" />
            </Link>
          </header>

          <div className="schedule-index__copy">
            <h1 className="schedule-index__headline">
              <span className="schedule-index__title">PREMIUM&nbsp;&nbsp;OF&nbsp;&nbsp;ULLEUNGDO</span>
              <span className="schedule-index__subtitle">프리미엄 일정표</span>
            </h1>
          </div>

          <p className="schedule-index__credit">Premium by ulleung_sketch</p>
        </section>

        <section className="schedule-index__list" aria-label="일차별 일정">
          {SCHEDULE_DAYS.map((day, index) => (
            <div key={day.day} className="schedule-index__day-wrap">
              {index > 0 && <hr className="schedule-index__divider" aria-hidden="true" />}
              <button
                type="button"
                className="schedule-index__day"
                onClick={() => scrollToDay(day.day)}
              >
                <p className="schedule-index__day-label">Premium, Ulleung_Sketch</p>
                <h2 className="schedule-index__day-title">{day.listTitle}</h2>
                <span className="schedule-index__day-link">
                  자세히보기
                  <span aria-hidden="true"> →</span>
                </span>
              </button>
            </div>
          ))}
        </section>

        <div className="schedule-index__detail-wrap">
          <ScheduleDetailContent />
        </div>

        <footer className="schedule-index__footer">
          <Link className="schedule-index__book" to="/reservations">
            <span aria-hidden="true">🛒 </span>
            바로예약
          </Link>
          <Link className="schedule-index__next" to="/option">
            NEXT
            <span aria-hidden="true"> →</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
