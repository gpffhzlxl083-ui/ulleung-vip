import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import fineDiningBanchan from "../assets/fine-dining/fine-dining-banchan.webp";
import fineDiningGrill from "../assets/fine-dining/fine-dining-grill.webp";
import fineDiningHanwoo from "../assets/fine-dining/fine-dining-hanwoo.webp";
import fineDiningMulhoe from "../assets/fine-dining/fine-dining-mulhoe.webp";
import fineDiningSandwich from "../assets/fine-dining/fine-dining-sandwich.webp";
import fineDiningSteak from "../assets/fine-dining/fine-dining-steak.webp";
import ramadaEdge from "../assets/ramada/ramada-edge.svg";
import "../styles/viewport-full.css";
import "../styles/ramada.css";

type MetaRow = { label: string; value: string; detail?: string; list?: string };

type Slide = {
  src: string;
  title: string;
  lead: string;
  meta: MetaRow[];
  objectPosition?: string;
};

const SLIDES: Slide[] = [
  {
    src: fineDiningBanchan,
    title: "BREAKFAST",
    lead: "<오브, 울릉>의 조식은 라마다입니다",
    meta: [
      { label: "place", value: "ramada ulleung" },
      {
        label: "menu",
        value: "cafe lounge 1매\n조식뷔페",
        detail: "라마다 호텔의 카페 라운지와\n조식 뷔페가 포함되어 있습니다",
      },
    ],
  },
  {
    src: fineDiningSandwich,
    title: "SNACK BOX",
    lead: "<오브, 울릉>은 스낵박스를 제공합니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "aube ulleung" },
      {
        label: "item",
        value: "오브, 울릉 Snack box",
        detail: "이동하는 시간에도 즐길 수 있는\n샌드위치와 물티슈를 드립니다",
      },
    ],
  },
  {
    src: fineDiningMulhoe,
    title: "SPECIAL LUNCH",
    lead: "<오브, 울릉>은 제철 특식을 제공합니다",
    objectPosition: "center",
    meta: [
      { label: "meal", value: "special & coffee" },
      {
        label: "menu",
        value: "울릉 한치물회\n농어매운탕",
        detail: "tea time 1인 1회가 함께\n제공됩니다",
      },
    ],
  },
  {
    src: fineDiningGrill,
    title: "GRILL",
    lead: "<오브, 울릉>은 프리미엄 구이를 제공합니다",
    objectPosition: "center",
    meta: [
      { label: "meal", value: "fine dining" },
      {
        label: "menu",
        value: "charcoal grill\npremium beef",
        detail: "숯불 위에서 구워내는 고기와 함께\n특별한 저녁을 드립니다",
      },
    ],
  },
  {
    src: fineDiningHanwoo,
    title: "ULLEUNG BEEF",
    lead: "<오브, 울릉>은 울릉약소를 제공합니다",
    objectPosition: "center",
    meta: [
      { label: "meal", value: "fine dining" },
      {
        label: "menu",
        value: "울릉약소 불고기\n생고기",
        detail: "울릉에서 자란 약소를 특식으로\n구성해 드립니다",
      },
    ],
  },
  {
    src: fineDiningSteak,
    title: "FINE DINING",
    lead: "<오브, 울릉>의 식사는 프리미엄입니다",
    objectPosition: "center",
    meta: [
      { label: "meal", value: "fine dining 1회" },
      {
        label: "course",
        value: "코스요리",
        list: "자연산 전복죽\n울릉 돌문어 & 냉채\n홍합밥 & 돌미역국\n호박식혜",
      },
    ],
  },
];

const SWIPE_THRESHOLD = 56;

export default function FineDiningPage() {
  const navigate = useNavigate();
  const navState = useLocation().state as { fadeIn?: boolean; pullIn?: boolean } | null;
  const fadeIn = Boolean(navState?.fadeIn);
  const pullIn = Boolean(navState?.pullIn);
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, tracking: false, width: 0 });

  const goTo = useCallback((next: number) => {
    setIndex(Math.min(SLIDES.length - 1, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    dragRef.current = {
      startX: event.clientX,
      tracking: true,
      width: event.currentTarget.getBoundingClientRect().width,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.tracking) return;
    let dx = event.clientX - dragRef.current.startX;
    if (index === 0 && dx > 0) dx *= 0.28;
    if (index === SLIDES.length - 1 && dx < 0) dx *= 0.28;
    setDragX(Math.round(dx));
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.tracking) return;
    dragRef.current.tracking = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const dx = event.clientX - dragRef.current.startX;
    const width = dragRef.current.width || 1;
    if (dx <= -SWIPE_THRESHOLD || dx <= -width * 0.18) goTo(index + 1);
    else if (dx >= SWIPE_THRESHOLD || dx >= width * 0.18) goTo(index - 1);
    setDragX(0);
  };

  return (
    <main className={`vf ramada${fadeIn ? " ramada--fade-in" : ""}${pullIn ? " ramada--pull-in" : ""}`}>
      <div
        ref={stageRef}
        className={`vf__stage ramada__stage${dragging ? " ramada__stage--drag" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="ramada__track"
          style={{
            transform:
              dragX === 0
                ? `translateX(${-index * 100}%)`
                : `translateX(calc(${-index * 100}% + ${dragX}px))`,
            transition: dragging ? "none" : "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {SLIDES.map((slide, slideIndex) => (
            <section key={slide.src} className="ramada__page">
              <img className="ramada__edge" src={ramadaEdge} alt="" aria-hidden="true" />
              <div className="ramada__sheet">
                <div className="ramada__hero-wrap">
                  <img
                    className="ramada__hero"
                    src={slide.src}
                    alt=""
                    draggable={false}
                    style={
                      slide.objectPosition
                        ? { objectPosition: slide.objectPosition }
                        : undefined
                    }
                  />
                </div>
                <div className="ramada__pager">
                  <button
                    className="ramada__pager-btn ramada__pager-btn--prev"
                    type="button"
                    aria-label="이전"
                    disabled={slideIndex === 0}
                    onClick={() => goTo(slideIndex - 1)}
                  >
                    <svg
                      className="ramada__pager-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 7 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M5.69141 10.8535L0.691407 5.35352L5.69141 0.353516" stroke="currentColor" />
                    </svg>
                  </button>
                  <span className="ramada__pager-num">
                    {slideIndex + 1} / {SLIDES.length}
                  </span>
                  <button
                    className="ramada__pager-btn ramada__pager-btn--next"
                    type="button"
                    aria-label="다음"
                    disabled={slideIndex === SLIDES.length - 1}
                    onClick={() => goTo(slideIndex + 1)}
                  >
                    <svg
                      className="ramada__pager-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 7 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M0.371094 0.336426L5.37109 5.83643L0.371094 10.8364" stroke="currentColor" />
                    </svg>
                  </button>
                </div>
                <h1 className="ramada__title">{slide.title}</h1>
                <p className="ramada__lead">{slide.lead}</p>
                <dl className="ramada__meta">
                  {slide.meta.map((row) => (
                    <div key={row.label} className="ramada__row">
                      <dt>{row.label}</dt>
                      <dd>
                        <span className="ramada__value">{row.value}</span>
                        {row.list ? (
                          <>
                            <span className="ramada__rule" aria-hidden="true" />
                            <span className="ramada__value">{row.list}</span>
                          </>
                        ) : null}
                        {row.detail ? (
                          <p className="ramada__detail">{row.detail}</p>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
                <button
                  className="ramada__back"
                  type="button"
                  onClick={() => navigate("/coast/schedule")}
                >
                  <img
                    className="ramada__back-icon"
                    src={backArrow}
                    alt=""
                    width={5}
                    height={10}
                    draggable={false}
                  />
                  Main
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
