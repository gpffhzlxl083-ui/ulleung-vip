import { useCallback, useRef, useState } from "react";
import "../styles/premium-landing.css";

const CARD_MAIN = `/Image/${encodeURIComponent("card main")}/`;

const SLIDE_IMAGES = [
  `${SERVICE}/hotel-facade-coast.webp`,
  `${SERVICE}/premium-room-twin.webp`,
  `${SERVICE}/pool-shilla-monogram.webp`,
] as const;

const SWIPE_THRESHOLD = 48;

export default function PremiumLandingPage() {
  const [activeIndex, setActiveIndex] = useState(1);
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
    <div className="benefit-page" data-name="Benefit_hotel">
      <div className="benefit-page__shell">
        <nav className="benefit-page__category-nav" aria-label="프리미엄 카테고리">
          <div className="benefit-page__category-bar">
            {CATEGORIES.map((label) => (
              <button
                key={label}
                type="button"
                className={`benefit-page__category-item${label === "Hotel" ? " benefit-page__category-item--active" : ""}`}
                aria-current={label === "Hotel" ? "page" : undefined}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <header className="benefit-page__intro">
          <p className="benefit-page__intro-line">Introduce</p>
          <p className="benefit-page__intro-line">our</p>
          <p className="benefit-page__intro-brand">PRIMIUM Service</p>
        </header>

        <div
          className="benefit-page__carousel"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="benefit-page__track"
            style={{ transform: `translateX(calc(11.5% - ${activeIndex * 69.25}%))` }}
          >
            {SLIDE_IMAGES.map((src, index) => (
              <figure
                key={src}
                className={`benefit-page__slide${index === activeIndex ? " benefit-page__slide--active" : ""}`}
              >
                <img src={src} alt="" decoding="async" draggable={false} />
              </figure>
            ))}
          </div>

          <div className="benefit-page__dots" aria-hidden="true">
            {SLIDE_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`benefit-page__dot${index === activeIndex ? " benefit-page__dot--active" : ""}`}
                aria-label={`${index + 1}번째 이미지`}
                onClick={() => goTo(index)}
                onPointerDown={(event) => event.stopPropagation()}
              />
            ))}
          </div>
        </div>

        <p className="benefit-page__swipe-hint">화면을 좌우로 쓸어넘겨보세요</p>

        <hr className="benefit-page__divider" />

        <section className="benefit-page__detail">
          <div className="benefit-page__detail-head">
            <h2 className="benefit-page__title">
              <span>Hotel</span>
              <span>Ramada</span>
            </h2>
            <span className="benefit-page__more">
              <span className="benefit-page__more-icon" aria-hidden="true">
                ▶
              </span>
              More
            </span>
          </div>

          <p className="benefit-page__desc">
            Experience and cherish the deep,
            <br />
            rich waters of the East Sea.
          </p>
        </section>
      </div>
    </div>
  );
}
