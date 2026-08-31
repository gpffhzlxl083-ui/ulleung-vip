import { useCallback, useRef, useState } from "react";
import "../styles/premium-landing.css";

const CARD_MAIN = `/Image/${encodeURIComponent("card main")}/`;

const SLIDE_IMAGES = [
  "/Image/option/vip-van.webp",
  `${CARD_MAIN}dining-reserved.webp`,
  `${CARD_MAIN}infinity-pool-deck.webp`,
] as const;

const SWIPE_THRESHOLD = 48;

export default function PremiumLandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragRef = useRef({ startX: 0, moved: false });

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % SLIDE_IMAGES.length) + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragRef.current = { startX: event.clientX, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    if (Math.abs(event.clientX - dragRef.current.startX) > 6) {
      dragRef.current.moved = true;
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);

    const delta = event.clientX - dragRef.current.startX;
    if (dragRef.current.moved && Math.abs(delta) >= SWIPE_THRESHOLD) {
      goTo(activeIndex + (delta < 0 ? 1 : -1));
    }
  };

  return (
    <div className="premium-service premium-service--dark">
      <div className="premium-service__shell">
        <header className="premium-service__intro">
          <p className="premium-service__intro-top">Introduce our</p>
          <h1 className="premium-service__intro-title">
            <span className="premium-service__intro-em">PRIMIUM</span> Service
          </h1>
        </header>

        <div
          className="premium-service__carousel"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="premium-service__track"
            style={{ transform: `translateX(calc(12.47% - ${activeIndex * 75.06}%))` }}
          >
            {SLIDE_IMAGES.map((src, index) => (
              <figure
                key={src}
                className={`premium-service__slide${index === activeIndex ? " premium-service__slide--active" : ""}`}
              >
                <img src={src} alt="" decoding="async" draggable={false} />
              </figure>
            ))}
          </div>

          <div className="premium-service__dots" aria-hidden="true">
            {SLIDE_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`premium-service__dot${index === activeIndex ? " premium-service__dot--active" : ""}`}
                aria-label={`${index + 1}번째 이미지`}
                onClick={() => goTo(index)}
                onPointerDown={(event) => event.stopPropagation()}
              />
            ))}
          </div>
        </div>

        <p className="premium-service__swipe-hint">화면을 좌우로 쓸어넘겨보세요</p>

        <hr className="premium-service__divider" />

        <section className="premium-service__detail">
          <div className="premium-service__detail-head">
            <div className="premium-service__title-row">
              <span className="premium-service__title-line">Premium</span>
              <span className="premium-service__more">
                <span className="premium-service__more-icon" aria-hidden="true">
                  ▶
                </span>
                More
              </span>
            </div>
            <h2 className="premium-service__title-sub">Vehicle</h2>
          </div>

          <p className="premium-service__detail-desc">
            Experience and cherish the deep,
            <br />
            rich waters of the East Sea.
          </p>
        </section>
      </div>
    </div>
  );
}
