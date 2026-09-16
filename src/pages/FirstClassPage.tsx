import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import firstClassAmenity from "../assets/first-class/first-class-amenity.webp";
import firstClassSeatDetail from "../assets/first-class/first-class-seat-detail.webp";
import firstClassSeatPod from "../assets/first-class/first-class-seat-pod.webp";
import firstClassSeatRow from "../assets/first-class/first-class-seat-row.webp";
import firstClassShipFirebird from "../assets/first-class/first-class-ship-firebird.webp";
import firstClassShip from "../assets/first-class/first-class-ship.webp";
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
    src: firstClassShip,
    title: "ELDORADO EX",
    lead: "<오브, 울릉>은 프리미엄 쾌속선을 이용합니다",
    meta: [
      { label: "ferry name", value: "eldorado express" },
      {
        label: "data",
        value: "소요 시간 : 2시간 50분\n최고 속도 : 93km\n승선 인원 : 970명",
        detail: "포항 출발 : 09시50분\n울릉 출발 : 14시20분",
      },
    ],
  },
  {
    src: firstClassShipFirebird,
    title: "ELDORADO EX",
    lead: "<오브, 울릉>은 멀미가 없는 여행을 약속드립니다",
    objectPosition: "center",
    meta: [
      { label: "ferry name", value: "eldorado express" },
      {
        label: "safety",
        value: "엘도라도EX는 쌍동선 구조로\n파도를 관통하는 기술이 적용\n되는 신기술입니다",
      },
    ],
  },
  {
    src: firstClassSeatPod,
    title: "FIRST CLASS",
    lead: "<오브, 울릉>은 퍼스트 클래스를 제공합니다",
    objectPosition: "center",
    meta: [
      { label: "class", value: "first (최고 등급)" },
      {
        label: "type",
        value:
          "우수한 전동리클라이너와 쉘형\n벙커 시트 그리고 넓은 레그룸을\n제공하는 퍼스트클래스 입니다\n\npower recliner\nshell shaped\nusb port",
      },
    ],
  },
  {
    src: firstClassSeatRow,
    title: "COMFORT",
    lead: "<오브, 울릉>은 편안한 시간을 약속 드립니다",
    objectPosition: "center",
    meta: [
      { label: "class", value: "first (최고 등급)" },
      {
        label: "object",
        value: "It offers comfort and a quiet,\nprivate space",
        detail: "안락함과 조용한 프라이빗 공간을\n울릉도까지 제공합니다",
      },
    ],
  },
  {
    src: firstClassSeatDetail,
    title: "PREMIUM",
    lead: "<오브, 울릉>의 좌석은 프리미엄입니다",
    objectPosition: "center",
    meta: [
      { label: "class", value: "first (최고 등급)" },
      {
        label: "service",
        value: "Even the seats for your travel time\nare premium",
        detail: "이동하는 시간마저도 프리미엄\n좌석과 함께 특별합니다",
      },
    ],
  },
  {
    src: firstClassAmenity,
    title: "WELCOME KIT",
    lead: "<오브, 울릉>은 고급 웰컴키트를 제공합니다",
    meta: [
      { label: "gitf", value: "welcome of aube" },
      {
        label: "item",
        value: "울릉도 여행의 깊이를 더해줄\n섬세한 배려를 전합니다",
        list: "sleep mask\nearplugs\nwater\nslippers",
      },
    ],
  },
];

const SWIPE_THRESHOLD = 56;

export default function FirstClassPage() {
  const navigate = useNavigate();
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
    <main className="vf ramada">
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
