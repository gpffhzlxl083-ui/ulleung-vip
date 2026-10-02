import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import base from "../assets/hotel-intro/base.svg";
import baseTeal from "../assets/hotel-intro/base-teal.svg";
import brand from "../assets/hotel-intro/brand.svg";
import "../styles/viewport-full.css";
import "../styles/hotel-intro.css";

/** edge: 왼쪽 그라데이션 띠만 남김(라마다 레이아웃), top: 위쪽 헤더만 남김(일정 레이아웃) */
type SheetKind = "edge" | "top";

type IntroPage = { text: string; next?: string; teal?: boolean; sheet?: SheetKind };

const PAGES: Record<string, IntroPage> = {
  hotel: { text: "호텔 포함사항입니다", next: "/coast/hotel", sheet: "edge" },
  cruise: { text: "선박 포함사항입니다", next: "/coast/first-class", sheet: "edge" },
  dokdo: { text: "독도 포함사항입니다", next: "/coast/business-class", sheet: "edge" },
  van: { text: "차량 포함사항입니다" },
  tour: { text: "행사 포함사항입니다" },
  dining: { text: "식사 포함사항입니다" },
  trip: { text: "여행 포함사항입니다" },
  service: { text: "서비스 포함사항입니다" },
  ready: { text: "출발 전 서비스입니다", next: "/coast/plan/ready", teal: true },
  day1: { text: "첫번째 여정입니다", next: "/coast/plan/day1", teal: true, sheet: "top" },
  day2: { text: "두번째 여정입니다", next: "/coast/plan/day2/itinerary", teal: true, sheet: "top" },
  day3: { text: "새번째 여정입니다", next: "/coast/plan/day3/itinerary", teal: true, sheet: "top" },
};

const HOLD_MS = 1500;
const PULL_MS = 900;

export default function HotelIntroPage() {
  const navigate = useNavigate();
  const { kind = "hotel" } = useParams();
  const page = PAGES[kind];
  const next = page?.next;
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!next) return;
    setLeaving(false);
    const pull = window.setTimeout(() => setLeaving(true), HOLD_MS);
    const go = window.setTimeout(
      () => navigate(next, { replace: true, state: { pullIn: true } }),
      HOLD_MS + PULL_MS,
    );
    return () => {
      window.clearTimeout(pull);
      window.clearTimeout(go);
    };
  }, [navigate, next]);

  if (!page) return <Navigate to="/coast/include" replace />;

  return (
    <main
      className={`vf hotel-intro${page.teal ? " hotel-intro--teal" : ""}${page.sheet === "top" ? " hotel-intro--rise" : ""}`}
    >
      <div className={`vf__stage hotel-intro__stage${leaving ? " is-pulling" : ""}`}>
        {page.teal ? (
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
