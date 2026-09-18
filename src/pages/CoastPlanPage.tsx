import { useNavigate } from "react-router-dom";
import cardFrame from "../assets/coast-plan/card-frame.png";
import line15 from "../assets/coast-plan/line-15.png";
import panelBase from "../assets/coast-plan/panel-base.png";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import coastWavePoster from "../assets/coast/coast-wave-poster.jpg";
import "../styles/viewport-full.css";
import "../styles/coast.css";
import "../styles/coast-plan.css";

const DAYS: { en: string; ko: string; to?: string }[] = [
  { en: "Day  1", ko: "1일 계획 보기", to: "/coast/plan/day1" },
  { en: "Day  2", ko: "2일 계획 보기" },
  { en: "Day  3", ko: "3일 계획 보기" },
];

export default function CoastPlanPage() {
  const navigate = useNavigate();

  return (
    <main className="vf coast coast-plan">
      <div className="vf__stage">
        <img className="vf__img coast-plan__photo" src={coastWavePoster} alt="" />
        <p className="coast-plan__copy">
          남들과
          <br />
          다른 울릉도, 독도
        </p>
        <div className="coast__frost" aria-hidden="true">
          <svg className="coast__frost-defs" width="0" height="0" aria-hidden="true">
            <filter
              id="coast-plan-glass-fx"
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
              src={coastWavePoster}
              alt=""
              style={{ filter: "url(#coast-plan-glass-fx)" }}
            />
          </div>
          <div className="coast__frost-shine" />
        </div>
        <div className="coast__sheet">
          <img className="coast-plan__panel" src={panelBase} alt="" />
          <div className="coast__content coast-plan__content">
            <div className="coast-plan__card">
              <img className="coast-plan__card-frame" src={cardFrame} alt="" />
              <div className="coast-plan__head">
                <p className="coast-plan__head-en">SCHEDULE</p>
                <p className="coast-plan__head-ko">여행계획</p>
              </div>
              <p className="coast-plan__label">premium package</p>
              <p className="coast-plan__body">
                &lt;오브, 울릉&gt; 프리미엄 패키지는 최고급
                <br />
                리조트와 교통, 식사는 물론 전문 인솔자
                <br />
                한정판 굿즈, 체계적인 안전 시스템까지
                <br />
                갖추어 고급스러운 여행을 약속 드립니다
              </p>
            </div>
            <img className="coast-plan__days-line" src={line15} alt="" />
            <ol className="coast-plan__days">
              {DAYS.map((day) => (
                <li key={day.en} className="coast-plan__day">
                  <button
                    className="coast-plan__day-btn"
                    type="button"
                    onClick={() => day.to && navigate(day.to)}
                  >
                    <span className="coast-plan__day-copy">
                      <span className="coast-plan__day-en">{day.en}</span>
                      <span className="coast-plan__day-ko">{day.ko}</span>
                    </span>
                    <svg
                      className="coast-plan__chevron"
                      width="6"
                      height="11"
                      viewBox="0 0 6 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M0.183594 0.167969L5.18359 5.66797L0.183594 10.668"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ol>
            <button
              className="coast-plan__back"
              type="button"
              onClick={() => navigate("/coast")}
            >
              <img
                className="coast-plan__back-icon"
                src={backArrow}
                alt=""
                width={5}
                height={10}
              />
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
