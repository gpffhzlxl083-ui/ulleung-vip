import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import ramadaBathroom from "../assets/ramada/ramada-bathroom.webp";
import ramadaCafe from "../assets/ramada/ramada-cafe.webp";
import ramadaEdge from "../assets/ramada/ramada-edge.svg";
import ramadaExterior from "../assets/ramada/ramada-exterior.webp";
import ramadaHousekeeping from "../assets/ramada/ramada-housekeeping.webp";
import ramadaLobby from "../assets/ramada/ramada-lobby.webp";
import ramadaChecklist from "../assets/ramada/ramada-room-checklist.webp";
import ramadaOcean from "../assets/ramada/ramada-room-ocean.webp";
import ramadaTwin from "../assets/ramada/ramada-room-twin.webp";
import ramadaTerrace from "../assets/ramada/ramada-terrace.webp";
import "../styles/viewport-full.css";
import "../styles/ramada.css";

type MetaRow = { label: string; value: string };

type Slide = {
  src: string;
  title: [string, string];
  lead: string;
  meta: MetaRow[];
  objectPosition?: string;
};

const SLIDES: Slide[] = [
  {
    src: ramadaExterior,
    title: ["RAMADA", "HOTEL"],
    lead: "〈오브, 울릉〉의 숙소는 라마다호텔입니다",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "address",
        value:
          "560-1, Ulleungsunhwan-ro,\nUlleung-eup, Ulleung-gun\n베이커리 카페, 라운지, 레스토랑\n다양한 최고급 부대 시설을 겸비한\n라마다 울릉이 포함 되어 있습니다",
      },
    ],
  },
  {
    src: ramadaLobby,
    title: ["PREMIUM", "IN TOUR"],
    lead: "〈오브, 울릉〉는 고급 편의시설을 제공합니다",
    objectPosition: "center top",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "amenities",
        value:
          "비즈니스 연회장 : 230석\n워크숍 소회의실 : 70석\n베이커리 & 커피 라운지\n루프탑 카페\n라운지 비즈니스 룸",
      },
    ],
  },
  {
    src: ramadaTerrace,
    title: ["THE EAST", "SEA"],
    lead: "〈오브, 울릉〉의 호텔은 바다와 가장 가깝습니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "view",
        value:
          "The beautiful East Sea at a\nsingle glance\n2027년 오픈된 라마다 울릉호텔은\n동해의 아름다운 노을을 볼 수 있는\n바다와 함께하는 호텔입니다.",
      },
    ],
  },
  {
    src: ramadaOcean,
    title: ["OCEAN VIEW", "ROOM"],
    lead: "〈오브, 울릉〉의 객실은 바다 전망입니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "type",
        value:
          "프리미엄 패키지의 모든 객실은\n고층의 바다전망으로 제공됩니다\n\ndeluxe double\ndeluxe twin\ndeluxe ondol",
      },
    ],
  },
  {
    src: ramadaTwin,
    title: ["SUNSET VIEW", "DAY"],
    lead: "〈오브, 울릉〉의 객실은 노을을 볼 수 있습니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "view",
        value:
          "Every great journey ends\nwith a perfect sunset\n〈오브, 울릉〉는 동해의 붉은 노을이\n가득한 바다전망과 산빛을 감상 할 수\n있는 고층 객실을 제공합니다",
      },
    ],
  },
  {
    src: ramadaBathroom,
    title: ["CLEAN", "BATHROOM"],
    lead: "〈오브, 울릉〉는 청결한 샤워실을 제공합니다",
    objectPosition: "center",
    meta: [
      { label: "brand", value: "ramada ulleung" },
      {
        label: "service",
        value:
          "화장실 deep care\n에코 프레시 향기 케어\n\n라마다 울릉의 샤워실과 화장실은\n울릉도에서 볼 수 있는 청결함을\n유지하고 있습니다",
      },
    ],
  },
  {
    src: ramadaCafe,
    title: ["BAKERY", "CAFE"],
    lead: "〈오브, 울릉〉의 베이커리와 커피 라운지입니다",
    meta: [{ label: "brand", value: "ramada ulleung" }],
  },
  {
    src: ramadaChecklist,
    title: ["ROOM", "CHECKLIST"],
    lead: "〈오브, 울릉〉는 객실 하나하나를 점검합니다",
    meta: [{ label: "brand", value: "ramada ulleung" }],
  },
  {
    src: ramadaHousekeeping,
    title: ["HOUSE", "KEEPING"],
    lead: "〈오브, 울릉〉의 하우스키핑이 객실을 준비합니다",
    meta: [{ label: "brand", value: "ramada ulleung" }],
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
    setDragX(dx);
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
            transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
            transition: dragging ? "none" : "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {SLIDES.map((slide) => (
            <section key={slide.title.join("-")} className="ramada__page">
              <img className="ramada__edge" src={ramadaEdge} alt="" aria-hidden="true" />
              <div className="ramada__sheet">
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
                <h1 className="ramada__title">
                  <span>{slide.title[0]}</span>
                  <span>{slide.title[1]}</span>
                </h1>
                <p className="ramada__lead">{slide.lead}</p>
                <dl className="ramada__meta">
                  {slide.meta.map((row) => (
                    <div key={row.label} className="ramada__row">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
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
                  Back
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
