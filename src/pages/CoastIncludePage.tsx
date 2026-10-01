import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import coastBrown from "../assets/coast-include/coast-brown.mp4";
import coastBrownPoster from "../assets/coast-include/coast-brown-poster.jpg";
import logoAube from "../assets/common/logo-aube.svg";
import brandPlace from "../assets/hotel-intro/brand.svg";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import "../styles/viewport-full.css";
import "../styles/coast.css";
import "../styles/coast-include.css";
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
  { en: "Service", ko: "스파 / 굿즈 / 어메니티", to: "/coast/include/service" },
];

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

export default function CoastIncludePage() {
  const navigate = useNavigate();
  const openedSchedule = Boolean((useLocation().state as { schedule?: boolean } | null)?.schedule);
  const [scheduleOpen, setScheduleOpen] = useState(openedSchedule);
  const [scheduleSeen, setScheduleSeen] = useState(openedSchedule);
  const [videoOn, setVideoOn] = useState(false);
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

  return (
    <main
      className={`vf coast coast-include${scheduleOpen ? " is-schedule" : ""}${openedSchedule && scheduleOpen ? " is-direct" : ""}${scheduleSeen && !scheduleOpen ? " is-restored" : ""}`}
    >
      <div className="vf__stage">
        <img className="vf__img coast__img" src={coastBrownPoster} alt="" />
        <video
          ref={videoRef}
          className={`vf__img coast__img${videoOn ? " coast__img--on" : ""}`}
          src={coastBrown}
          poster={coastBrownPoster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setVideoOn(true)}
        />
        <div className="coast__frost" aria-hidden="true">
          <svg className="coast__frost-defs" width="0" height="0" aria-hidden="true">
            <filter
              id="coast-include-glass-fx"
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
              style={{ filter: "url(#coast-include-glass-fx)" }}
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
            <div className="coast__mid">
              <div className="coast__nav">
                <Arrow dir="prev" onClick={goPine} />
                <div className="coast__nav-copy">
                  <p className="coast__nav-title">패키지 포함사항</p>
                  <span className="coast__nav-line" />
                  <button
                    className="coast__nav-more"
                    type="button"
                    onClick={() => {
                      setScheduleSeen(true);
                      setScheduleOpen(true);
                    }}
                  >
                    더보기
                  </button>
                </div>
                <Arrow dir="next" onClick={goCoast} />
              </div>
              <p className="coast__hint">화면을 좌우로 넘겨보세요</p>
            </div>
            <div className="coast__story">
              <p className="coast__story-title">바위 암(岩)</p>
              <span className="coast__story-dash">-</span>
              <p className="coast__story-body">
                파도와 바람이 깎아낸 섬,
                <br />
                세상에 남겨진 가장
                <br />
                단단한 조각, 주상절리
              </p>
            </div>
          </div>
          <div className="coast__schedule" aria-hidden={!scheduleOpen}>
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
            <button className="coast-schedule__back" type="button" onClick={() => setScheduleOpen(false)}>
              <img className="coast-schedule__back-icon" src={backArrow} alt="" width={5} height={10} />
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
