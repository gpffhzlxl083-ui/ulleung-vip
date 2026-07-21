import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/option-page.css";

const OPTION_BASE = "/Image/option";

const OPTION_CARDS = [
  {
    image: `${OPTION_BASE}/inroom-service-book.webp`,
    imagePosition: "center 72%",
    eyebrow: "Food of Ulleung",
    subtitle: "산해진미",
    title: "울릉도의 미식",
    descLines: ["제철음식으로 가득한", "울릉도 특식을 제공합니다"],
  },
  {
    image: `${OPTION_BASE}/buffet-station.webp`,
    imagePosition: "center bottom",
    eyebrow: "Premium Dining",
    subtitle: "조식 뷔페",
    title: "섬바디의 아침",
    descLines: ["신선한 재료로 준비하는", "프리미엄 뷔페를 제공합니다"],
  },
  {
    image: `${OPTION_BASE}/pumpkin-bath.webp`,
    imagePosition: "center bottom",
    eyebrow: "Rest & Spa",
    subtitle: "족욕 스파",
    title: "노을 속 휴식",
    descLines: ["바다를 바라보며 즐기는 아로마 족욕", "서비스"],
  },
  {
    image: `${OPTION_BASE}/ulleung-staff.webp`,
    imagePosition: "center 88%",
    eyebrow: "Ulleung Experience",
    subtitle: "현지 가이드",
    title: "울릉의 풍경",
    descLines: ["섬의 명소와 이야기를 전해드리는", "프리미엄 투어"],
  },
  {
    image: `${OPTION_BASE}/vip-van.webp`,
    imagePosition: "center bottom",
    eyebrow: "VIP Transport",
    subtitle: "프리미엄 이동",
    title: "편안한 이동",
    descLines: ["항구부터 숙소까지 VIP", "전용 차량을 제공합니다"],
  },
  {
    image: `${OPTION_BASE}/latte-by-sea.webp`,
    imagePosition: "center bottom",
    eyebrow: "Ocean Lounge",
    subtitle: "바다 뷰 카페",
    title: "일몰 커피",
    descLines: ["노을과 함께 즐기는 울릉 스케치의", "커피 타임"],
  },
] as const;

const CARD_COUNT = OPTION_CARDS.length;
const SWIPE_THRESHOLD = 48;

const PANEL_TOP_PATH =
  "M141,0a14.994,14.994,0,0,1,13.151,7.782l.349-.122c.957,2.975,2.5,6.924,7.5,7.661H375V361H0V15A15,15,0,0,1,15,0Z";

const PANEL_FRONT_PATH =
  "M375,327.485H0V35.108a15,15,0,0,1,15-15H142.479A25.008,25.008,0,0,1,167,0H375Z";

const PANEL_FRONT_Y = 361 - 327.485;

function OptionCard({ index }: { index: number }) {
  const card = OPTION_CARDS[index];

  return (
    <article className="option-page__card" aria-label={`${index + 1}번째 옵션`}>
      <div className="option-page__media">
        <img
          src={card.image}
          alt=""
          decoding="async"
          draggable={false}
          style={{ objectPosition: card.imagePosition }}
        />
      </div>

      <div className="option-page__sheet">
        <svg
          className="option-page__svg"
          viewBox="0 0 375 361"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path id="Union" d={PANEL_TOP_PATH} fill="#3b2624" />
          <path id="Union2" d={PANEL_FRONT_PATH} fill="#ddd1c3" transform={`translate(0 ${PANEL_FRONT_Y})`} />
        </svg>

        <div className="option-page__overlay">
          <p className="option-page__page-label">{index + 1} PAGE</p>

          <div className="option-page__copy">
            <div className="option-page__copy-main">
              <p className="option-page__eyebrow">{card.eyebrow}</p>
              <div className="option-page__headline">
                <p className="option-page__subtitle">{card.subtitle}</p>
                <h2 className="option-page__title">{card.title}</h2>
              </div>
            </div>
            <div className="option-page__bottom">
              <p className="option-page__desc">
                {card.descLines.map((line, lineIndex) => (
                  <span key={`${line}-${lineIndex}`} className="option-page__desc-line">
                    {line}
                  </span>
                ))}
              </p>
              <span className="option-page__more">
                more
                <svg
                  className="option-page__more-arrow"
                  width="18"
                  height="8"
                  viewBox="0 0 18 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 4h12M9 1.5 14.5 4 9 6.5"
                    stroke="currentColor"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OptionPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragRef = useRef({ startX: 0, moved: false });

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT);
  }, []);

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

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
    <div className="option-page">
      <div className="option-page__shell">
        <div
          className="option-page__viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <header className="option-page__top">
            <div className="option-page__top-row">
              <Link className="option-page__back" to="/premium" aria-label="이전 화면">
                BACK
              </Link>
              <span aria-hidden="true" />
            </div>

            <div className="option-page__nav">
              <button
                type="button"
                className="option-page__nav-btn"
                aria-label="이전 카드"
                onClick={goPrev}
                onPointerDown={(event) => event.stopPropagation()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M14 6L8 12l6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="option-page__nav-btn"
                aria-label="다음 카드"
                onClick={goNext}
                onPointerDown={(event) => event.stopPropagation()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </header>

          <div
            className="option-page__track"
            style={{ transform: `translateX(calc(${-activeIndex} * 100%))` }}
          >
            {OPTION_CARDS.map((_, index) => (
              <div key={index} className="option-page__slide">
                <OptionCard index={index} />
              </div>
            ))}
          </div>

          <div className="option-page__dots" aria-hidden="true">
            {OPTION_CARDS.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`option-page__dot${index === activeIndex ? " option-page__dot--active" : ""}`}
                aria-label={`${index + 1}번째 카드`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
