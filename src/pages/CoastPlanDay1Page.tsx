import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import day1Sheet from "../assets/coast-plan/day1-sheet.svg";
import ramadaBathroom from "../assets/ramada/ramada-bathroom.webp";
import ramadaCafe from "../assets/ramada/ramada-cafe.webp";
import ramadaExterior from "../assets/ramada/ramada-exterior.webp";
import ramadaHousekeeping from "../assets/ramada/ramada-housekeeping.webp";
import ramadaLobby from "../assets/ramada/ramada-lobby.webp";
import ramadaOcean from "../assets/ramada/ramada-room-ocean.webp";
import ramadaTwin from "../assets/ramada/ramada-room-twin.webp";
import ramadaTerrace from "../assets/ramada/ramada-terrace.webp";
import "../styles/viewport-full.css";
import "../styles/coast-plan-day1.css";

const IMAGES = [
  ramadaLobby,
  ramadaExterior,
  ramadaTerrace,
  ramadaOcean,
  ramadaTwin,
  ramadaBathroom,
  ramadaCafe,
  ramadaHousekeeping,
];

const SLIDES = [...IMAGES, ...IMAGES, ...IMAGES];
const COUNT = IMAGES.length;
const MIDDLE = COUNT;

const SIDE_SCALE = 0.84;
const SWIPE_THRESHOLD = 18;
const FLICK_VELOCITY = 0.28;
const SLIDE_EASE = "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)";

type Props = { itinerary?: string; day?: number };

export default function CoastPlanDay1Page({
  itinerary = "/coast/plan/day1/itinerary",
  day = 1,
}: Props) {
  const navigate = useNavigate();
  const navState = useLocation().state as { fadeIn?: boolean; pullIn?: boolean } | null;
  const fadeIn = Boolean(navState?.fadeIn);
  const pullIn = Boolean(navState?.pullIn);
  const frameRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(MIDDLE);
  const dragRef = useRef({
    startX: 0,
    lastX: 0,
    startTime: 0,
    tracking: false,
    width: 0,
    moved: false,
  });
  const [pos, setPos] = useState(MIDDLE);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [instant, setInstant] = useState(false);
  const [step, setStep] = useState(0);

  posRef.current = pos;
  const realIndex = ((pos % COUNT) + COUNT) % COUNT;

  const goTo = useCallback((next: number) => {
    const target = ((next % COUNT) + COUNT) % COUNT;
    setPos(MIDDLE + target);
  }, []);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => {
      const slide = el.querySelector<HTMLElement>(".coast-plan-day1__slide");
      if (!slide) return;
      const gap = Number.parseFloat(getComputedStyle(slide).marginRight) || 0;
      setStep(slide.offsetWidth + gap);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!instant) return;
    setInstant(false);
  }, [instant]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setPos((current) => Math.min(SLIDES.length - 1, current + 1));
      if (event.key === "ArrowLeft") setPos((current) => Math.max(0, current - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const x = -pos * step + dragX;

  const onTrackTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    const current = posRef.current;
    if (current < COUNT) {
      setInstant(true);
      setPos(current + COUNT);
    } else if (current >= COUNT * 2) {
      setInstant(true);
      setPos(current - COUNT);
    }
  };

  const finishDrag = (clientX: number) => {
    const drag = dragRef.current;
    if (!drag.tracking) return;
    drag.tracking = false;
    setDragging(false);
    const dx = clientX - drag.startX;
    const width = drag.width || 1;
    const elapsed = Math.max(performance.now() - drag.startTime, 1);
    const flicked = Math.abs(dx) / elapsed >= FLICK_VELOCITY && Math.abs(dx) > 8;
    if (dx < 0 && (flicked || dx <= -SWIPE_THRESHOLD || dx <= -width * 0.08)) {
      setPos((current) => Math.min(SLIDES.length - 1, current + 1));
    } else if (dx > 0 && (flicked || dx >= SWIPE_THRESHOLD || dx >= width * 0.08)) {
      setPos((current) => Math.max(0, current - 1));
    }
    setDragX(0);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const startX = event.clientX;
    dragRef.current = {
      startX,
      lastX: startX,
      startTime: performance.now(),
      tracking: true,
      width: event.currentTarget.getBoundingClientRect().width,
      moved: false,
    };
    setDragging(true);

    const onMove = (ev: PointerEvent) => {
      dragRef.current.lastX = ev.clientX;
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > 6) dragRef.current.moved = true;
      setDragX(dx);
    };
    const onUp = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      const lastDx = dragRef.current.lastX - startX;
      const eventDx = ev.clientX - startX;
      finishDrag(Math.abs(eventDx) >= Math.abs(lastDx) ? ev.clientX : dragRef.current.lastX);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  return (
    <main
      className={`vf coast-plan-day1${fadeIn ? " coast-plan-day1--fade-in" : ""}${pullIn ? " coast-plan-day1--pull-in" : ""}`}
    >
      <div className="vf__stage coast-plan-day1__stage">
        <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
        <header className="coast-plan-day1__top">
          <button
            className="coast-plan-day1__nav"
            type="button"
            onClick={() => navigate("/coast/plan")}
          >
            <svg viewBox="0 0 6 11" width="6" height="11" aria-hidden="true">
              <path d="M5.18.17.18 5.67l5 5" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
            Back
          </button>
          <div className="coast-plan-day1__brand">
            <img className="coast-plan-day1__logo" src={logoAube} alt="AUBE" />
            <p>Ulleungdo, Dokdo</p>
          </div>
        </header>

        <div className="coast-plan-day1__body">
          <h1>FIRST CLASS</h1>
          <p className="coast-plan-day1__lead">{"<오브, 울릉>은 퍼스트 클래스를 제공합니다"}</p>

          <div
            ref={frameRef}
            className={`coast-plan-day1__carousel${dragging ? " is-dragging" : ""}`}
            role="region"
            aria-label="호텔 사진"
            onPointerDown={onPointerDown}
          >
            <div
              className="coast-plan-day1__track"
              style={{
                transform: step ? `translateX(${x}px)` : undefined,
                transition: dragging || instant || !step ? "none" : SLIDE_EASE,
              }}
              onTransitionEnd={onTrackTransitionEnd}
            >
              {SLIDES.map((src, imageIndex) => {
                const offset = step ? imageIndex - pos - dragX / step : imageIndex - pos;
                const distance = Math.min(Math.abs(offset), 1);
                const scale = 1 - (1 - SIDE_SCALE) * distance;
                const origin =
                  offset < -0.02 ? "right center" : offset > 0.02 ? "left center" : "center center";
                const active = imageIndex === pos;
                return (
                  <div
                    key={`${src}-${imageIndex}`}
                    className={`coast-plan-day1__slide${active ? " is-active" : ""}`}
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: origin,
                      transition: dragging || instant || !step ? "none" : SLIDE_EASE,
                    }}
                  >
                    <img src={src} alt="" draggable={false} />
                    {active ? (
                      <div className="coast-plan-day1__dots">
                        {IMAGES.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            type="button"
                            className={dotIndex === realIndex ? "is-active" : undefined}
                            aria-label={`${dotIndex + 1}번째 사진`}
                            aria-current={dotIndex === realIndex ? "true" : undefined}
                            onClick={() => {
                              if (dragRef.current.moved) return;
                              goTo(dotIndex);
                            }}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="coast-plan-day1__hint">화면을 좌우로 쓸어넘겨보세요</p>

          <dl className="coast-plan-day1__meta">
            <div className="coast-plan-day1__rule" aria-hidden="true" />
            <div className="coast-plan-day1__row">
              <dt>ferry name</dt>
              <dd>eldorado express</dd>
            </div>
            <div className="coast-plan-day1__row coast-plan-day1__row--safety">
              <dt>safety</dt>
              <dd>
                엘도라도EX는 쌍동선 구조로 파도를
                <br />
                관통하는 기술이 적용 되는 신기술
              </dd>
            </div>
            <div className="coast-plan-day1__rule" aria-hidden="true" />
          </dl>

          <button
            className="coast-plan-day1__more"
            type="button"
            onClick={() => navigate(itinerary)}
          >
            {`제${day}일 일정표 바로보기`}
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M10 17V7L15 12L10 17Z" fill="#595655" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
