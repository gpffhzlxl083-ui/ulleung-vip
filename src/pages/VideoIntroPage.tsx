import { useCallback, useLayoutEffect, useRef, useState } from "react";
import "../styles/viewport-full.css";
import "../styles/video-intro.css";

type CaptionLine = {
  text: string;
  role: "eyebrow" | "title" | "sub";
};

type IntroSegment = {
  start: number;
  end: number;
  lines?: CaptionLine[];
};

const INTRO_SEGMENTS: IntroSegment[] = [
  {
    start: 0,
    end: 2,
    lines: [
      { text: "THIS IS A LUXURY", role: "eyebrow" },
      { text: "PACKAGE", role: "title" },
    ],
  },
  {
    start: 2.06,
    end: 3.90,
    lines: [
      { text: "WITH", role: "eyebrow" },
      { text: "FIRST CLASS", role: "title" },
      { text: "& Amenity", role: "sub" },
    ],
  },
  {
    start: 3.92,
    end: 5.94,
    lines: [
      { text: "CLEAN SERVICE", role: "eyebrow" },
      { text: "& RAMADA", role: "title" },
    ],
  },
  {
    start: 5.96,
    end: 7.68,
    lines: [
      { text: "PREMIUM", role: "eyebrow" },
      { text: "DOKDO &", role: "title" },
      { text: "ULLEUNG", role: "title" },
    ],
  },
  {
    start: 7.8,
    end: 10.05,
    lines: [
      { text: "AMAZING", role: "eyebrow" },
      { text: "Delicious", role: "title" },
    ],
  },
  {
    start: 10.07,
    end: 12.17,
    lines: [
      { text: "LOVELY", role: "eyebrow" },
      { text: "COFFEE", role: "title" },
      { text: "DAYS", role: "sub" },
    ],
  },
  {
    start: 12.19,
    end: 14.21,
    lines: [
      { text: "INSPIRING", role: "eyebrow" },
      { text: "NATURE", role: "title" },
    ],
  },
];

const SKIP_APPEAR_AT = 9;

function getActiveSegment(currentTime: number) {
  return INTRO_SEGMENTS.find((segment) => currentTime >= segment.start && currentTime < segment.end);
}

function renderTitleLetters(text: string, lineKey: string, startIndex = 0) {
  const baseDelay = 0.28;
  const stagger = 0.065;
  const words = text.split(" ");
  let charIndex = startIndex;

  const renderChar = (char: string, key: string) => {
    const delay = baseDelay + charIndex * stagger;
    charIndex += 1;

    return (
      <span key={key} className="video-intro__char-wrap">
        <span
          className="video-intro__char"
          style={{ "--char-delay": `${delay}s` } as React.CSSProperties}
        >
          {char}
        </span>
      </span>
    );
  };

  return words.map((word, wordIndex) => (
    <span key={`${lineKey}-word-${wordIndex}`} className="video-intro__word" aria-hidden="true">
      {word.split("").map((char, index) => renderChar(char, `${lineKey}-${wordIndex}-${index}`))}
      {wordIndex < words.length - 1 && renderChar("\u00A0", `${lineKey}-space-${wordIndex}`)}
    </span>
  ));
}

function useFitCaptionLine(text: string, enabled: boolean, minSize: number) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!enabled) return;

    const el = ref.current;
    const container = el?.parentElement;
    if (!el || !container) return;

    const fit = () => {
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize);
      const maxWidth = container.clientWidth;

      while (el.scrollWidth > maxWidth && size > minSize) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [text, enabled, minSize]);

  return ref;
}

function CaptionLine({
  line,
  lineKey,
  titleCharOffset = 0,
  hideAria = false,
}: {
  line: CaptionLine;
  lineKey: string;
  titleCharOffset?: number;
  hideAria?: boolean;
}) {
  const shouldFit = line.role === "title" || line.role === "eyebrow";
  const minSize = line.role === "title" ? 12 : 9;
  const fitRef = useFitCaptionLine(line.text, shouldFit, minSize);

  if (line.role === "title") {
    return (
      <p
        ref={fitRef}
        className="video-intro__line video-intro__line--title"
        aria-label={hideAria ? undefined : line.text}
        aria-hidden={hideAria ? true : undefined}
      >
        {renderTitleLetters(line.text, lineKey, titleCharOffset)}
      </p>
    );
  }

  return (
    <p ref={shouldFit ? fitRef : undefined} className={`video-intro__line video-intro__line--${line.role}`}>
      {line.text}
    </p>
  );
}

function renderCaptionLines(caption: CaptionLine[], activeSegment: number) {
  const elements: React.ReactNode[] = [];
  let index = 0;

  while (index < caption.length) {
    const line = caption[index];
    const lineKey = `${activeSegment}-${index}`;

    if (line.role === "title") {
      const titleLines: CaptionLine[] = [];
      let titleIndex = index;

      while (titleIndex < caption.length && caption[titleIndex].role === "title") {
        titleLines.push(caption[titleIndex]);
        titleIndex += 1;
      }

      let charOffset = 0;

      elements.push(
        <div
          key={`${activeSegment}-titles-${index}`}
          className={`video-intro__title-stack${titleLines.length > 1 ? " video-intro__title-stack--multi" : ""}`}
          aria-label={titleLines.map((titleLine) => titleLine.text).join(" ")}
        >
          {titleLines.map((titleLine, titleLineIndex) => {
            const key = `${activeSegment}-${index + titleLineIndex}`;
            const node = (
              <CaptionLine
                key={key}
                line={titleLine}
                lineKey={key}
                titleCharOffset={charOffset}
                hideAria={titleLines.length > 1}
              />
            );
            charOffset += titleLine.text.length;
            return node;
          })}
        </div>
      );

      index = titleIndex;
      continue;
    }

    elements.push(<CaptionLine key={lineKey} line={line} lineKey={lineKey} />);
    index += 1;
  }

  return elements;
}

export default function VideoIntroPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [motionDuration, setMotionDuration] = useState("16s");
  const [frameIntroDone, setFrameIntroDone] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const skipUsedRef = useRef(false);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    setMotionDuration(`${video.duration}s`);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const segment = getActiveSegment(video.currentTime);
    const nextSegment = segment ? INTRO_SEGMENTS.indexOf(segment) : -1;
    setActiveSegment((prev) => (prev === nextSegment ? prev : nextSegment));

    if (video.currentTime < SKIP_APPEAR_AT) {
      skipUsedRef.current = false;
    }

    if (!skipUsedRef.current) {
      setShowSkip((prev) => {
        const next = video.currentTime >= SKIP_APPEAR_AT;
        return prev === next ? prev : next;
      });
    }
  }, []);

  const handleSkip = useCallback(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    skipUsedRef.current = true;
    setShowSkip(false);
    video.currentTime = Math.max(video.duration - 0.05, SKIP_APPEAR_AT);
  }, []);

  const caption =
    activeSegment >= 0 ? INTRO_SEGMENTS[activeSegment].lines ?? null : null;

  return (
    <div className="vf video-intro">
      <div className="vf__stage">
        <div
          className="video-intro__ken-burns"
          style={{ "--intro-motion-duration": motionDuration } as React.CSSProperties}
        >
          <video
            ref={videoRef}
            className="vf__video video-intro__video"
            src="/video/intro/intro2.mp4"
            poster="/Image/premiumintro.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="울릉스케치 인트로 영상"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>

        <div
          className={`video-intro__frame-shell${frameIntroDone ? "" : " video-intro__frame-shell--intro"}`}
          aria-hidden="true"
          onAnimationEnd={() => setFrameIntroDone(true)}
        >
          <div className="video-intro__frame" />
        </div>

        {activeSegment >= 0 && caption && (
          <div key={activeSegment} className="video-intro__caption-wrap" aria-live="polite">
            <div className="video-intro__caption">
              {renderCaptionLines(caption, activeSegment)}
            </div>
          </div>
        )}

        {activeSegment === 0 && (
          <p className="video-intro__footer" aria-hidden="true">
            ULLEUNG-SKETCH.com
          </p>
        )}

        {showSkip && (
          <button type="button" className="video-intro__skip" onClick={handleSkip}>
            SKIP
          </button>
        )}
      </div>
    </div>
  );
}
