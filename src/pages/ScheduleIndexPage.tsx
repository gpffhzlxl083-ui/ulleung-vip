import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScheduleDetailContent from "../components/ScheduleDetailContent";
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

export default function ScheduleIndexPage() {
  const location = useLocation();
  const backTo = (location.state as { fromSchedule?: boolean } | null)?.fromSchedule ? "/premium" : "/inclusion";

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
            <Link className="schedule-index__nav schedule-index__nav--back" to={backTo}>
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
