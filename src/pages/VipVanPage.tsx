import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import ramadaEdge from "../assets/ramada/ramada-edge.svg";
import vipVanCabin from "../assets/vip-van/vip-van-cabin.webp";
import vipVanFront from "../assets/vip-van/vip-van-front.webp";
import vipVanSeat from "../assets/vip-van/vip-van-seat.webp";
import vipVanSeatTablet from "../assets/vip-van/vip-van-seat-tablet.webp";
import vipVanSunset from "../assets/vip-van/vip-van-sunset.webp";
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
    src: vipVanSunset,
    title: "VIP VAN",
    lead: "<오브, 울릉>은 전용 리무진을 이용합니다",
    meta: [
      { label: "brand", value: "hyundai staria" },
      {
        label: "type",
        value: "vip limousine van\n4명 ~ 6명 단독 행사",
        detail: "오브, 울릉 전용 Vip 리무진으로\n쾌적한 일정을 제공합니다",
      },
    ],
  },
  {
    src: vipVanFront,
    title: "STARIA",
    lead: "<오브, 울릉>의 차량은 스타리아입니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "hyundai staria" },
      {
        label: "member",
        value: "4~6명 소수 단독 행사",
        detail: "쾌적한 일정을 위해 투어 맴버는\n4명~6명으로 구성된 단독 행사입니다",
      },
    ],
  },
  {
    src: vipVanSeatTablet,
    title: "COMFORT",
    lead: "<오브, 울릉>은 안락한 이동을 약속드립니다",
    objectPosition: "center",
    meta: [
      { label: "class", value: "vip (전용 리무진)" },
      {
        label: "service",
        value: "premium leather seat\ntablet\nbottle water",
        detail: "이동하는 시간에도 편의사항과 함께\n편안한 좌석을 제공합니다",
      },
    ],
  },
  {
    src: vipVanSeat,
    title: "PREMIUM",
    lead: "<오브, 울릉>의 좌석은 프리미엄입니다",
    objectPosition: "center",
    meta: [
      { label: "class", value: "vip (전용 리무진)" },
      {
        label: "seat",
        value: "It offers comfort and a quiet,\nprivate space",
        detail: "안락함과 조용한 프라이빗 공간을\n일정 내내 제공합니다",
      },
    ],
  },
  {
    src: vipVanCabin,
    title: "PRIVATE",
    lead: "<오브, 울릉>은 소수 단독 행사입니다",
    objectPosition: "center",
    meta: [
      { label: "class", value: "vip (전용 리무진)" },
      {
        label: "cabin",
        value: "4~6명 전용 캐빈",
        detail: "남들과 섞이지 않는 단독 차량으로\n프라이빗한 여정을 지켜 드립니다",
      },
    ],
  },
];

const SWIPE_THRESHOLD = 56;

export default function VipVanPage() {
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
