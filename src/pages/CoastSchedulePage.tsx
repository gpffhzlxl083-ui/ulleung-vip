import { useNavigate } from "react-router-dom";
import backArrow from "../assets/common/back-chevron.svg";
import scheduleCliff from "../assets/coast-schedule/schedule-cliff.webp";
import scheduleGlow from "../assets/coast-schedule/schedule-glow.svg";
import "../styles/viewport-full.css";
import "../styles/coast.css";
import "../styles/coast-schedule.css";

const TRANSPORT = [
  { en: "Hotel", ko: "라마다 울릉", to: "/coast/include/hotel" },
  { en: "Cruise ship", ko: "퍼스트 클래스", to: "/coast/include/cruise" },
  { en: "Dokdo ship", ko: "비즈니스 클래스", to: "/coast/include/dokdo" },
  { en: "Vip van", ko: "고급 리무진 차량", to: "/coast/include/van" },
  { en: "Private tour", ko: "4~6명 단독행사", to: "/coast/include/tour" },
];

const EXPERIENCE = [
  { en: "Fine dining", ko: "전체 특식", to: "/coast/include/dining" },
  { en: "Tour", ko: "모든 입장료 포함", to: "/coast/include/trip" },
  { en: "Service", ko: "스파 / 굿즈 / 어메니티", to: "/coast/include/service", service: true },
];

export default function CoastSchedulePage() {
  const navigate = useNavigate();

  return (
    <main className="vf coast coast-schedule">
      <div className="vf__stage">
        <img className="vf__img coast-schedule__photo" src={scheduleCliff} alt="" />
        <img className="coast-schedule__glow" src={scheduleGlow} alt="" />
        <div className="coast__frost" aria-hidden="true">
          <svg className="coast__frost-defs" width="0" height="0" aria-hidden="true">
            <filter
              id="coast-schedule-glass-fx"
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
          <div className="coast__frost-scene">
            <img
              className="coast__frost-img"
              src={scheduleCliff}
              alt=""
              style={{ filter: "url(#coast-schedule-glass-fx)" }}
            />
          </div>
          <div className="coast__frost-shine" />
        </div>
        <div className="coast__sheet">
          <div className="coast__glass" aria-hidden="true" />
          <div className="coast__tint" aria-hidden="true" />
          <div className="coast__content coast-schedule__content">
            <div className="coast-schedule__head">
              <p className="coast-schedule__head-en">Inclusioins</p>
              <p className="coast-schedule__head-ko">포함사항</p>
            </div>
            <span className="coast-schedule__rule" />
            <ul className="coast-schedule__list">
              {TRANSPORT.map((item) => (
                <li key={item.en} className="coast-schedule__item">
                  <button
                    className="coast-schedule__item-btn"
                    type="button"
                    onClick={() => navigate(item.to)}
                  >
                    <span className="coast-schedule__en">{item.en}</span>
                    <span className="coast-schedule__ko">{item.ko}</span>
                  </button>
                </li>
              ))}
            </ul>
            <span className="coast-schedule__rule" />
            <ul className="coast-schedule__list">
              {EXPERIENCE.map((item) => (
                <li key={item.en} className={`coast-schedule__item${"service" in item && item.service ? " coast-schedule__item--service" : ""}`}>
                  <button
                    className="coast-schedule__item-btn"
                    type="button"
                    onClick={() => navigate(item.to)}
                  >
                    <span className="coast-schedule__en">{item.en}</span>
                    <span className="coast-schedule__ko">{item.ko}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="coast__top-back"
          type="button"
          onClick={() => navigate("/coast/include", { state: { restored: true } })}
        >
          <img src={backArrow} alt="" />
          Back
        </button>
      </div>
    </main>
  );
}
