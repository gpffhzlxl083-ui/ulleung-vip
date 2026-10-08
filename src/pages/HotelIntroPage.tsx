import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import base from "../assets/hotel-intro/base.svg";
import baseTeal from "../assets/hotel-intro/base-teal.svg";
import brand from "../assets/hotel-intro/brand.svg";
import coastWavePoster from "../assets/coast/coast-wave-poster.jpg";
import coastReservePoster from "../assets/coast-reserve/coast-reserve-poster.jpg";
import "../styles/viewport-full.css";
import "../styles/hotel-intro.css";

/** edge: 왼쪽 그라데이션 띠만 남김(라마다 레이아웃), top: 위쪽 헤더만 남김(일정 레이아웃) */
type SheetKind = "edge" | "top";

/**
 * slide: 스케줄 화면의 오른쪽 패널이 늘어나 화면을 덮은 뒤 로고 → 문구 순으로 나타남
 * stone: 예약 페이지의 베이지 패널 그대로 늘어나 세로 그라데이션으로 끝남
 */
type IntroPage = {
  text: string;
  next?: string;
  teal?: boolean;
  sheet?: SheetKind;
  slide?: boolean;
  stone?: boolean;
};

const PAGES: Record<string, IntroPage> = {
  hotel: { text: "호텔 포함사항입니다", next: "/coast/hotel", sheet: "edge" },
  cruise: { text: "선박 포함사항입니다", next: "/coast/first-class", sheet: "edge" },
  dokdo: { text: "독도 포함사항입니다", next: "/coast/business-class", sheet: "edge" },
  van: { text: "차량 포함사항입니다" },
  tour: { text: "행사 포함사항입니다" },
  dining: { text: "식사 포함사항입니다" },
  trip: { text: "여행 포함사항입니다" },
  service: { text: "서비스 포함사항입니다" },
  ready: { text: "출발 전 서비스입니다", next: "/coast/plan/ready", teal: true, slide: true },
  day1: { text: "첫번째 여정입니다", next: "/coast/plan/day1", teal: true, sheet: "top", slide: true },
  day2: {
    text: "두번째 여정입니다",
    next: "/coast/plan/day2",
    teal: true,
    sheet: "top",
    slide: true,
  },
  day3: {
    text: "세번째 여정입니다",
    next: "/coast/plan/day3",
    teal: true,
    sheet: "top",
    slide: true,
  },
  consult: {
    text: "상담 요청하기입니다",
    next: "/coast/reserve/consult/form",
    sheet: "top",
    slide: true,
    stone: true,
  },
  booking: { text: "패키지 예약하기입니다", slide: true, stone: true },
};

const HOLD_MS = 1500;
const PULL_MS = 900;
/** hotel-intro.css의 slide 등장 애니메이션이 끝나는 시점(문구 0.7s 지연 1.6s) */
const SLIDE_IN_MS = 2300;

export default function HotelIntroPage() {
  const navigate = useNavigate();
  const { kind = "hotel" } = useParams();
  const page = PAGES[kind];
  const next = page?.next;
  const slide = Boolean(page?.slide);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!next) return;
    setLeaving(false);
    const hold = HOLD_MS + (slide ? SLIDE_IN_MS : 0);
    const pull = window.setTimeout(() => setLeaving(true), hold);
    const go = window.setTimeout(
      () => navigate(next, { replace: true, state: { pullIn: true } }),
      hold + PULL_MS,
    );
    return () => {
      window.clearTimeout(pull);
      window.clearTimeout(go);
    };
  }, [navigate, next, slide]);

  if (!page) return <Navigate to="/coast/include" replace />;

  return (
    <main
      className={`vf hotel-intro${page.teal ? " hotel-intro--teal" : ""}${page.sheet === "top" ? " hotel-intro--rise" : ""}${slide ? " hotel-intro--slide" : ""}${page.stone ? " hotel-intro--stone" : ""}`}
    >
      <div className={`vf__stage hotel-intro__stage${leaving ? " is-pulling" : ""}`}>
        {slide ? (
          <>
            <img
              className="hotel-intro__photo"
              src={page.stone ? coastReservePoster : coastWavePoster}
              alt=""
            />
            <div className="hotel-intro__panel">
              {page.stone ? null : <img className="hotel-intro__base-teal" src={baseTeal} alt="" />}
            </div>
          </>
        ) : page.teal ? (
          <img className="hotel-intro__base-teal" src={baseTeal} alt="" />
        ) : (
          <img className="hotel-intro__base" src={base} alt="" />
        )}
        <img className="hotel-intro__logo" src={logoAube} alt="AUBE" />
        <img className="hotel-intro__brand" src={brand} alt="Ulleungdo, Dokdo" />
        <p className="hotel-intro__text">{page.text}</p>
        {page.sheet ? (
          <div className={`hotel-intro__sheet hotel-intro__sheet--${page.sheet}`} aria-hidden="true" />
        ) : null}
      </div>
    </main>
  );
}
