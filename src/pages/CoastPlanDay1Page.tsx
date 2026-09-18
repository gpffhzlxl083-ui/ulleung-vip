import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import day1Photo from "../assets/coast-plan/day1.webp";
import logoAube from "../assets/common/logo-aube.svg";
import "../styles/viewport-full.css";
import "../styles/coast-plan-day1.css";

const COLLAPSED_TOP = 455 / 850;
const EXPANDED_TOP = 72 / 850;

const INCLUSIONS = [
  "엘도라도 First Class",
  "Welcome kit",
  "전문 인솔자 동행",
  "오브, 울릉 Snack box",
  "심층수 1병",
  "Vip van (4명~6명 단독행사)",
  "Find dining 2",
  "Ramada hotel deluxe ocean view",
  "호박 막걸리, 음료 제공",
  "Premium Tour  5h / night tour 1h",
];

export default function CoastPlanDay1Page() {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const riseRef = useRef(0);
  const maxRiseRef = useRef(0);
  const dragRef = useRef<{ y: number; rise: number } | null>(null);
  const [rise, setRise] = useState(0);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    maxRiseRef.current = Math.max(0, (COLLAPSED_TOP - EXPANDED_TOP) * stage.clientHeight);
  }, []);

  const applyRise = useCallback((next: number) => {
    const clamped = Math.min(maxRiseRef.current, Math.max(0, next));
    riseRef.current = clamped;
    setRise(clamped);
  }, []);

  useEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;

    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      applyRise(riseRef.current + event.deltaY);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if ((event.target as HTMLElement | null)?.closest("button")) return;
      dragRef.current = { y: event.clientY, rise: riseRef.current };
      stage.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      applyRise(drag.rise + (drag.y - event.clientY));
    };

    const onPointerUp = () => {
      dragRef.current = null;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      ro.disconnect();
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [applyRise, measure]);

  const progress = maxRiseRef.current > 0 ? rise / maxRiseRef.current : 0;

  return (
    <main className="vf coast-plan-day1">
      <div ref={stageRef} className="vf__stage coast-plan-day1__stage">
        <img className="coast-plan-day1__photo" src={day1Photo} alt="" />
        <div
          className="coast-plan-day1__photo-dim"
          style={{ opacity: progress }}
          aria-hidden="true"
        />

        <header className="coast-plan-day1__top">
          <button
            className="coast-plan-day1__nav coast-plan-day1__nav--back"
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
          <button className="coast-plan-day1__nav coast-plan-day1__nav--next" type="button">
            Next
            <svg viewBox="0 0 6 11" width="6" height="11" aria-hidden="true">
              <path d="M.18.17l5 5.5-5 5" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </button>
        </header>

        <h1 className="coast-plan-day1__title" style={{ opacity: Math.max(0, 1 - progress * 1.35) }}>
          DAY 1
        </h1>
        <p className="coast-plan-day1__lead" style={{ opacity: Math.max(0, 1 - progress * 1.35) }}>
          〈오브, 울릉〉의 첫번째 여정입니다
        </p>

        <section
          className="coast-plan-day1__panel"
          style={
            {
              top: `calc(${COLLAPSED_TOP} * 100cqb - ${rise}px)`,
              "--rise": `${rise}px`,
            } as CSSProperties
          }
        >
          <div className="coast-plan-day1__frost">
            <svg className="coast-plan-day1__frost-defs" width="0" height="0" aria-hidden="true">
              <filter
                id="coast-plan-day1-glass-fx"
                x="-8%"
                y="-8%"
                width="116%"
                height="116%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.014 0.008"
                  numOctaves="2"
                  seed="2"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="14"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="refract"
                />
                <feGaussianBlur in="refract" stdDeviation="2" result="frost" />
                <feOffset in="frost" dx="2" dy="0" result="shiftR" />
                <feOffset in="frost" dx="-2" dy="0" result="shiftB" />
                <feColorMatrix
                  in="shiftR"
                  type="matrix"
                  values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="red"
                />
                <feColorMatrix
                  in="frost"
                  type="matrix"
                  values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                  result="green"
                />
                <feColorMatrix
                  in="shiftB"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                  result="blue"
                />
                <feBlend in="red" in2="green" mode="screen" result="rg" />
                <feBlend in="rg" in2="blue" mode="screen" />
              </filter>
            </svg>
            <div className="coast-plan-day1__frost-scene" aria-hidden="true">
              <img
                className="coast-plan-day1__frost-img"
                src={day1Photo}
                alt=""
                style={{ filter: "url(#coast-plan-day1-glass-fx)" }}
              />
            </div>
            <div className="coast-plan-day1__frost-shine" aria-hidden="true" />
            <div className="coast-plan-day1__glass-labels" style={{ opacity: 1 - progress }}>
              <span>Premium package</span>
              <span>Aube - ulleung, dokdo</span>
            </div>
            <p className="coast-plan-day1__glass-lead" style={{ opacity: progress }}>
              〈오브, 울릉〉의 첫번째 여정입니다
            </p>
          </div>
          <div className="coast-plan-day1__sheet">
            <div className="coast-plan-day1__handle" aria-hidden="true" />
            <div className="coast-plan-day1__sheet-inner">
              <div className="coast-plan-day1__depart-block" style={{ opacity: 1 - progress }}>
                <h2 className="coast-plan-day1__depart">Day 1 depart</h2>
                <p className="coast-plan-day1__depart-ko">여정 출발</p>
                <div className="coast-plan-day1__port">
                  <span>Port</span>
                  <span>
                    Pohang <em>(포항여객선터미널)</em>
                  </span>
                </div>
              </div>
              <div className="coast-plan-day1__incl-head">
                <h3>INCLUSIONS</h3>
                <span className="coast-plan-day1__chip">포함사항</span>
              </div>
              <p className="coast-plan-day1__incl-lead">첫번째 여정의 포항서행입니다</p>
              <ul className="coast-plan-day1__list">
                {INCLUSIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="coast-plan-day1__note">
                [+] welcome kit : 오브울릉 에코백, 염서 3종, 독도 핀버튼, 일회용 실내화,
                수면안대, 면이막, 독도손거울, 독도멀티슈가 들어 있습니다
              </p>
              <div className="coast-plan-day1__incl-head">
                <h3>TOURIST SPOT</h3>
                <span className="coast-plan-day1__chip">우산국관</span>
              </div>
              <p className="coast-plan-day1__incl-lead">첫번째 여정의 우산 관광입니다</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
