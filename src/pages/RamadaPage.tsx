import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import ramadaBathroom from "../assets/ramada/ramada-bathroom.webp";
import ramadaCafe from "../assets/ramada/ramada-cafe.webp";
import ramadaEdge from "../assets/ramada/ramada-edge.svg";
import ramadaExterior from "../assets/ramada/ramada-exterior.webp";
import ramadaLobby from "../assets/ramada/ramada-lobby.webp";
import ramadaChecklist from "../assets/ramada/ramada-room-checklist.webp";
import ramadaOcean from "../assets/ramada/ramada-room-ocean.webp";
import ramadaTwin from "../assets/ramada/ramada-room-twin.webp";
import ramadaTerrace from "../assets/ramada/ramada-terrace.webp";
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
    src: ramadaExterior,
    title: "RAMADA HOTEL",
    lead: "<오브, 울릉>의 숙소는 라마다호텔입니다",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "address",
        value: "560-1, Ulleungsunhwan-ro,\nUlleung-eup, Ulleung-gun",
        detail:
          "베이커리 카페, 라운지, 레스토랑\n다양한 최고급 부대 시설을 겸비한\n라마다 울릉이 포함 되어 있습니다",
      },
    ],
  },
  {
    src: ramadaLobby,
    title: "VIP HOTEL",
    lead: "<오브, 울릉>은 고급 편의시설을 제공합니다",
    objectPosition: "center top",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "amenities",
        value:
          "비즈니스 연회장 : 230석\n워크숍 소회의장 : 70석\n베이커리 & 커피 라운지\n루프탑 카페\n라운지 비즈니스 룸",
      },
    ],
  },
  {
    src: ramadaTerrace,
    title: "THE EAST SEA",
    lead: "<오브, 울릉>의 호텔은 바다와 가장 가깝습니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "view",
        value: "The beautiful East Sea at a\nsingle glance",
        detail:
          "2027년 오픈한 라마다 울릉호텔은\n동해의 아름다운 노을을 볼 수 있는\n바다와 함께하는 호텔입니다.",
      },
    ],
  },
  {
    src: ramadaOcean,
    title: "OCEAN VIEW",
    lead: "<오브, 울릉>의 전 객실은 바다 전망입니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "type",
        value: "deluxe double\ndeluxe twin\ndeluxe ondol",
        detail: "프리미엄 패키지의 모든 객실은\n고층의 바다전망으로 제공됩니다",
      },
    ],
  },
  {
    src: ramadaTwin,
    title: "SUNSET VIEW",
    lead: "<오브, 울릉>의 객실에서 노을을 볼 수 있습니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "view",
        value: "Every great journey ends\nwith a perfect sunset",
        detail:
          "<오브, 울릉>는 동해의 붉은 노을이\n가득한 바다전망과 선셋을 감상 할 수\n있는 고층 객실를 제공합니다",
      },
    ],
  },
  {
    src: ramadaBathroom,
    title: "CLEAN & SERVICE",
    lead: "<오브, 울릉>은 다양한 서비스를 제공합니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "service",
        value:
          "화장실 deep care\n에코 프레시 향기 케어\n\nWifi 무료 제공\n헤어드라이기, 어메니티\nfree water, clean seal",
      },
    ],
  },
  {
    src: ramadaCafe,
    title: "CAFE COUPON",
    lead: "<오브, 울릉>은 카페라운지 이용권을 제공합니다",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "coupon",
        value:
          "1인 1매 베이커리 카페 이용권\n커피 & 베이커리 택 1\n\n라마다 호텔의 베이커리 카페\n이용 기프트 카드를 제공합니다",
      },
    ],
  },
  {
    src: ramadaChecklist,
    title: "ROOM CHECK",
    lead: "<오브, 울릉>은 객실의 컨디션을 점검 합니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "room check",
        value: "객실의 냉난방, 위생, 어메니티 등을\n전문 인솔자가 매일 체크합니다",
        list: "entrance & security\nbathroom\nbedroom & Living Area",
      },
    ],
  },
];

const SWIPE_THRESHOLD = 56;

export default function RamadaPage() {
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
