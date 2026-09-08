import coast from "../assets/coast.webp";
import logoAube from "../assets/logo-aube.svg";
import "../styles/viewport-full.css";
import "../styles/coast.css";

function Arrow({ dir }: { dir: "prev" | "next" }) {
  const label = dir === "prev" ? "이전" : "다음";
  return (
    <button className={`coast__arrow coast__arrow--${dir}`} type="button" aria-label={label}>
      <svg viewBox="0 0 7 11" width="7" height="11" aria-hidden="true">
        {dir === "prev" ? (
          <path d="M6.4.4 1 5.5l5.4 5.1z" fill="#fff" />
        ) : (
          <path d="M.6.4 6 5.5.6 10.6z" fill="#fff" />
        )}
      </svg>
    </button>
  );
}

export default function CoastPage() {
  return (
    <main className="vf coast">
      <div className="vf__stage">
        <img className="vf__img coast__img" src={coast} alt="" width={522} height={1024} />
        <div className="coast__frost" aria-hidden="true">
          <svg className="coast__frost-defs" width="0" height="0" aria-hidden="true">
            <filter
              id="coast-glass-fx"
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
              src={coast}
              alt=""
              width={522}
              height={1024}
              style={{ filter: "url(#coast-glass-fx)" }}
            />
          </div>
          <div className="coast__frost-shine" />
        </div>
        <div className="coast__sheet">
          <div className="coast__glass" aria-hidden="true" />
          <div className="coast__tint" aria-hidden="true" />
          <div className="coast__content">
            <div className="coast__brand">
              <img className="coast__logo" src={logoAube} alt="AUBE" width={203} height={28} />
              <p className="coast__place">Ulleungdo, Dokdo</p>
              <p className="coast__journey">PREMIUM ISLAND JOURNEY</p>
            </div>
            <div className="coast__mid">
              <div className="coast__nav">
                <Arrow dir="prev" />
                <div className="coast__nav-copy">
                  <p className="coast__nav-title">패키지 포함사항</p>
                  <span className="coast__nav-line" />
                  <p className="coast__nav-more">더보기</p>
                </div>
                <Arrow dir="next" />
              </div>
              <p className="coast__hint">화면을 좌우로 넘겨보세요</p>
            </div>
            <div className="coast__story">
              <p className="coast__story-title">바다 해(海)</p>
              <span className="coast__story-dash">-</span>
              <p className="coast__story-body">
                육지의 소음이 닿지 않는 곳,
                <br />
                오랜 외로움이 빚어낸
                <br />
                깊고 푸른 울릉 앞바다
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
