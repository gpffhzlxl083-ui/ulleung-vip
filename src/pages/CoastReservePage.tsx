import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import coastReserve from "../assets/coast-reserve/coast-reserve.mp4";
import coastReservePoster from "../assets/coast-reserve/coast-reserve-poster.jpg";
import reserveBack from "../assets/common/back-chevron.svg";
import reserveTagline from "../assets/coast-reserve/reserve-tagline.png";
import logoAube from "../assets/common/logo-aube.svg";
import brandPlace from "../assets/hotel-intro/brand.svg";
import { useSwipeNav } from "../hooks/useSwipeNav";
import "../styles/viewport-full.css";
import "../styles/coast.css";
import "../styles/coast-reserve.css";

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const label = dir === "prev" ? "이전" : "다음";
  return (
    <button
      className={`coast__arrow coast__arrow--${dir}`}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
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

function secondsFromCss(value: string, fallback: number) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function resizeFrostCanvas(canvas: HTMLCanvasElement, scene: HTMLElement) {
  const rect = scene.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
}

function drawVideoCover(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx || !video.videoWidth || !video.videoHeight) return;

  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const cw = canvas.width;
  const ch = canvas.height;
  const videoRatio = vw / vh;
  const canvasRatio = cw / ch;

  let sx = 0;
  let sy = 0;
  let sw = vw;
  let sh = vh;

  if (videoRatio > canvasRatio) {
    sw = vh * canvasRatio;
    sx = 0;
  } else {
    sh = vw / canvasRatio;
    sy = (vh - sh) / 2;
  }

  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, cw, ch);
}

const RESERVE_MENU = [
  { en: "Consulting", ko: "상담요청 하기", to: "/coast/reserve/consult" },
  { en: "Booking", ko: "패키지 예약하기", to: "/coast/reserve/booking" },
];

export default function CoastReservePage() {
  const navigate = useNavigate();
  const [videoOn, setVideoOn] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveSeen, setReserveSeen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frostCanvasRef = useRef<HTMLCanvasElement>(null);
  const frostSceneRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = frostCanvasRef.current;
    const scene = frostSceneRef.current;
    const panel = panelRef.current;
    if (!video || !canvas || !scene || !panel) return;

    video.muted = true;
    video.loop = false;

    let raf = 0;

    const paint = () => {
      resizeFrostCanvas(canvas, scene);
      drawVideoCover(canvas, video);
    };

    const tick = () => {
      paint();
      if (!video.paused && !video.ended) {
        raf = requestAnimationFrame(tick);
      }
    };

    const startPaint = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.pause();
      paint();
      return;
    }

    const fitPlaybackToPanel = () => {
      const styles = getComputedStyle(panel);
      const hold = secondsFromCss(styles.getPropertyValue("--panel-hold"), 1.8);
      const slide = secondsFromCss(styles.getPropertyValue("--panel-in"), 2.6);
      const total = hold + slide;
      if (video.duration > 0 && video.duration < total) {
        video.playbackRate = video.duration / total;
      }
    };

    const onPanelEnd = (event: AnimationEvent) => {
      if (event.animationName !== "coast-panel-in") return;
      video.pause();
      paint();
    };

    const onReady = () => {
      fitPlaybackToPanel();
      paint();
      void video.play().then(startPaint);
    };

    video.addEventListener("play", startPaint);
    video.addEventListener("pause", paint);
    video.addEventListener("loadedmetadata", onReady);
    panel.addEventListener("animationend", onPanelEnd);
    if (video.readyState >= 1) onReady();

    const observer = new ResizeObserver(paint);
    observer.observe(scene);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      video.removeEventListener("play", startPaint);
      video.removeEventListener("pause", paint);
      video.removeEventListener("loadedmetadata", onReady);
      panel.removeEventListener("animationend", onPanelEnd);
      video.pause();
    };
  }, []);

  const goCoast = () => navigate("/coast");
  const goPine = () => navigate("/coast/pine");
  const openReserve = () => {
    setReserveSeen(true);
    setReserveOpen(true);
  };
  const swipe = useSwipeNav({ onPrev: goCoast, onNext: goPine, disabled: reserveOpen });

  return (
    <main
      {...swipe}
      className={`vf coast coast-reserve${reserveOpen ? " is-reserve" : ""}${reserveSeen && !reserveOpen ? " is-restored" : ""}`}
    >
      <div className="vf__stage">
        <img className="vf__img coast__img" src={coastReservePoster} alt="" />
        <video
          ref={videoRef}
          className={`vf__img coast__img${videoOn ? " coast__img--on" : ""}`}
          src={coastReserve}
          poster={coastReservePoster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setVideoOn(true)}
        />
        <div className="coast__frost" aria-hidden="true">
          <svg className="coast__frost-defs" width="0" height="0" aria-hidden="true">
            <filter
              id="coast-reserve-glass-fx"
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
          <div className="coast__frost-scene" ref={frostSceneRef}>
            <canvas
              ref={frostCanvasRef}
              className="coast__frost-img"
              style={{ filter: "url(#coast-reserve-glass-fx)" }}
            />
          </div>
          <div className="coast__frost-shine" />
        </div>
        <div className="coast__sheet" ref={panelRef}>
          <div className="coast__glass" aria-hidden="true" />
          <div className="coast__tint" aria-hidden="true" />
          <div className="coast__content">
            <div className="coast__brand">
              <img className="coast__logo" src={logoAube} alt="AUBE" />
              <img className="coast__place" src={brandPlace} alt="Ulleungdo, Dokdo" />
            </div>
            <img
              className="coast-reserve__tagline"
              src={reserveTagline}
              alt="Premium Island Journey"
              width={163}
              height={15}
            />
            <div className="coast__mid">
              <div className="coast__nav">
                <Arrow dir="prev" onClick={goCoast} />
                <div className="coast__nav-copy">
                  <button className="coast__nav-title coast-reserve__open" type="button" onClick={openReserve}>
                    패키지 예약하기
                  </button>
                  <span className="coast__nav-line" />
                  <button className="coast__nav-more" type="button" onClick={openReserve}>
                    더보기
                  </button>
                </div>
                <Arrow dir="next" onClick={goPine} />
              </div>
              <p className="coast__hint">화면을 좌우로 넘겨보세요</p>
            </div>
          </div>
          <div className="coast-reserve__panel" aria-hidden={!reserveOpen}>
            <p className="coast-reserve__title">R E S E R V A T I O N</p>
            <p className="coast-reserve__lead">
              프리미엄 패키지는 전문 MD가 배정
              <br />
              되어 친절한 상담과 질의응답 관련 등
              <br />
              여행업무를 지원 서비스하고 있습니다
            </p>
            <ul className="coast-reserve__menu">
              {RESERVE_MENU.map((item) => (
                <li key={item.en} className="coast-reserve__item">
                  <button
                    className="coast-reserve__item-btn"
                    type="button"
                    onClick={() => navigate(item.to)}
                  >
                    <span className="coast-reserve__item-en">{item.en}</span>
                    <span className="coast-reserve__item-ko">
                      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                        <path d="M10 17V7L15 12L10 17Z" fill="#fff" />
                      </svg>
                      {item.ko}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className="coast-reserve__back"
          type="button"
          aria-hidden={!reserveOpen}
          tabIndex={reserveOpen ? 0 : -1}
          onClick={() => setReserveOpen(false)}
        >
          <img src={reserveBack} alt="" width={3.51893} height={7.81253} />
          Back
        </button>
      </div>
    </main>
  );
}
