import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import coastWave from "../assets/coast/coast-wave.mp4";
import coastWavePoster from "../assets/coast/coast-wave-poster.jpg";
import logoAube from "../assets/common/logo-aube.svg";
import brandPlace from "../assets/hotel-intro/brand.svg";
import dayArrow from "../assets/coast-plan/day-arrow.png";
import backArrow from "../assets/coast-schedule/schedule-back.svg";
import { useSwipeNav } from "../hooks/useSwipeNav";
import "../styles/viewport-full.css";
import "../styles/coast.css";
import "../styles/coast-plan.css";

const PLAN_DAYS: { en: string; ko: string; to?: string }[] = [
  { en: "Ready", ko: "출발 전 계획 보기", to: "/coast/plan/intro/ready" },
  { en: "Day 1", ko: "1일 계획 보기", to: "/coast/plan/intro/day1" },
  { en: "Day 2", ko: "2일 계획 보기", to: "/coast/plan/intro/day2" },
  { en: "Day 3", ko: "3일 계획 보기", to: "/coast/plan/intro/day3" },
];

function Arrow({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
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

export default function CoastPage() {
  const navigate = useNavigate();
  const [videoOn, setVideoOn] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [planSeen, setPlanSeen] = useState(false);
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

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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

  const swipe = useSwipeNav({
    onPrev: () => navigate("/coast/include"),
    onNext: () => navigate("/coast/pine"),
    disabled: planOpen,
  });

  return (
    <main {...swipe} className={`vf coast${planOpen ? " is-plan" : ""}${planSeen && !planOpen ? " is-restored" : ""}`}>
      <div className="vf__stage">
        <img className="vf__img coast__img" src={coastWavePoster} alt="" />
        <video
          ref={videoRef}
          className={`vf__img coast__img${videoOn ? " coast__img--on" : ""}`}
          src={coastWave}
          poster={coastWavePoster}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setVideoOn(true)}
        />
        <div className="coast__frost" aria-hidden="true">
          <svg
            className="coast__frost-defs"
            width="0"
            height="0"
            aria-hidden="true"
          >
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
          <div className="coast__frost-scene" ref={frostSceneRef}>
            <canvas
              ref={frostCanvasRef}
              className="coast__frost-img"
              style={{ filter: "url(#coast-glass-fx)" }}
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
                <Arrow dir="prev" onClick={() => navigate("/coast/include")} />
                <div className="coast__nav-copy">
                  <p className="coast__nav-title">2박3일 일정표</p>
                  <span className="coast__nav-line" />
                  <button
                    className="coast__nav-more"
                    type="button"
                    onClick={() => {
                      setPlanSeen(true);
                      setPlanOpen(true);
                    }}
                  >
                    더보기
                  </button>
                </div>
                <Arrow dir="next" onClick={() => navigate("/coast/pine")} />
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
          <div className="coast__plan" aria-hidden={!planOpen}>
            <p className="coast-plan__head-en">S&nbsp;&nbsp;C&nbsp;&nbsp;H&nbsp;&nbsp;E&nbsp;&nbsp;D&nbsp;&nbsp;U&nbsp;&nbsp;L&nbsp;&nbsp;E</p>
            <p className="coast-plan__label">premium package</p>
            <p className="coast-plan__body">
              프리미엄 패키지는 준비부터 여정의
              <br />
              참여까지 특별하고 차별된 프로그램
              <br />
              서비스로 운영되는 <span className="coast-plan__vip">VIP</span> 일정입니다
            </p>
            <ol className="coast-plan__days">
              {PLAN_DAYS.map((day) => (
                <li key={day.en} className="coast-plan__day">
                  <button
                    className="coast-plan__day-btn"
                    type="button"
                    onClick={() => day.to && navigate(day.to)}
                  >
                    <span className="coast-plan__day-en">{day.en}</span>
                    <span className="coast-plan__day-ko">
                      <img className="coast-plan__chevron" src={dayArrow} alt="" />
                      {day.ko}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <button className="coast-plan__back" type="button" onClick={() => setPlanOpen(false)}>
              <img className="coast-plan__back-icon" src={backArrow} alt="" width={5} height={10} />
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
