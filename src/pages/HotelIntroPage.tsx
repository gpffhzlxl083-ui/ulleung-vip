import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import base from "../assets/hotel-intro/base.svg";
import baseTeal from "../assets/hotel-intro/base-teal.svg";
import brand from "../assets/hotel-intro/brand.svg";
import "../styles/viewport-full.css";
import "../styles/hotel-intro.css";

type IntroPage = { text: string; next?: string; teal?: boolean };

const PAGES: Record<string, IntroPage> = {
  hotel: { text: "호텔 포함사항입니다", next: "/coast/hotel" },
  cruise: { text: "선박 포함사항입니다", next: "/coast/first-class" },
  dokdo: { text: "독도 포함사항입니다", next: "/coast/business-class" },
  van: { text: "차량 포함사항입니다" },
  tour: { text: "행사 포함사항입니다" },
  dining: { text: "식사 포함사항입니다" },
  trip: { text: "여행 포함사항입니다" },
  service: { text: "서비스 포함사항입니다" },
  ready: { text: "출발 전 서비스입니다", next: "/coast/plan/ready", teal: true },
  day1: { text: "첫번째 여정입니다", next: "/coast/plan/day1", teal: true },
  day2: { text: "두번째 여정입니다", next: "/coast/plan/day2/itinerary", teal: true },
  day3: { text: "새번째 여정입니다", next: "/coast/plan/day3/itinerary", teal: true },
};

const HOLD_MS = 1500;
const FADE_MS = 700;

export default function HotelIntroPage() {
  const navigate = useNavigate();
  const { kind = "hotel" } = useParams();
  const page = PAGES[kind];
  const next = page?.next;
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!next) return;
    setLeaving(false);
    const fade = window.setTimeout(() => setLeaving(true), HOLD_MS);
    const go = window.setTimeout(
      () => navigate(next, { replace: true, state: { fadeIn: true } }),
      HOLD_MS + FADE_MS,
    );
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(go);
    };
  }, [navigate, next]);

  if (!page) return <Navigate to="/coast/include" replace />;

  return (
    <main className={`vf hotel-intro${page.teal ? " hotel-intro--teal" : ""}`}>
      <div className={`vf__stage hotel-intro__stage${leaving ? " is-leaving" : ""}`}>
        {page.teal ? (
          <img className="hotel-intro__base-teal" src={baseTeal} alt="" />
        ) : (
          <img className="hotel-intro__base" src={base} alt="" />
        )}
        <img className="hotel-intro__logo" src={logoAube} alt="AUBE" />
        <img className="hotel-intro__brand" src={brand} alt="Ulleungdo, Dokdo" />
        <p className="hotel-intro__text">{page.text}</p>
      </div>
    </main>
  );
}
