import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import ramadaTerrace from "../assets/ramada/ramada-terrace.webp";
import "../styles/viewport-full.css";
import "../styles/coast-plan-day1.css";

type PlanItem = {
  text: string;
  detail?: string;
};

type PlanStop = {
  label: string;
  time?: string;
  title?: string;
  note?: string;
  items: PlanItem[];
  more?: boolean;
};

const STOPS: PlanStop[] = [
  {
    label: "meeting",
    time: "08:30~09:50",
    title: "포항여객선터미널 미팅",
    more: true,
    items: [
      { text: "aube, snack box 제공" },
      { text: "울릉도 청아라 심층수 1병 제공" },
      { text: "address", detail: "포항시 북구 해안로 44(항구동)" },
    ],
  },
  {
    label: "boarding",
    time: "12:30 arrive",
    title: "프리미엄 조기 승선",
    more: true,
    items: [
      { text: "first class (최고 등급)" },
      { text: "welcome kit 제공" },
      { text: "Vip 브릿지 투어" },
      { text: "ferry", detail: "엘도라도 익스프레스호" },
    ],
  },
  {
    label: "lunch",
    title: "special & coffee",
    more: true,
    items: [{ text: "울릉 한치물회, 농어매운탕" }, { text: "tea time 1인 1회 제공" }],
  },
  {
    label: "member",
    title: "울릉도 전문 해설사와 함께하는 프리미엄 울릉도 투어",
    note: "<vip van> 쾌적한 일정을 위해 투어 맴버는 4명~6명 으로 구성된 단독 행사입니다",
    items: [{ text: "4~6명 소수 단독 행사" }, { text: "오브, 울릉 전용 Vip 리무진" }],
  },
  {
    label: "tour",
    time: "4h ~ 5h",
    note: "입장료 포함",
    more: true,
    items: [
      { text: "울릉도 10대 비경 삼선암 투어" },
      { text: "바다 위의 또 다른 비경 관음도 투어" },
      { text: "용출수의 봉래폭포와 삼나무 숲길 치유 트래킹" },
      { text: "오징어 배와 등대의 보금자리 저동항 시티투어" },
    ],
  },
  {
    label: "dinner",
    title: "fine dining & spa",
    items: [
      { text: "코스요리" },
      { text: "spa & herbal tea" },
      { text: "호박식혜" },
      { text: "홍합밥 & 돌미역국" },
      { text: "울릉 돌문어 & 냉채" },
      { text: "자연산 전복죽" },
    ],
  },
  {
    label: "night tour",
    items: [
      { text: "미디어파사드 투어" },
      { text: "태고의 신비 화산지질 슬로우 트래킹" },
    ],
  },
  {
    label: "hotel",
    title: "ramada by wyndham ulleung",
    items: [{ text: "room check service" }, { text: "ocean view" }],
  },
];

const PLAN_PAGES = [STOPS.slice(0, 3), STOPS.slice(3)];
const SCROLL_LOCK_MS = 700;

function MoreButton() {
  return (
    <span className="coast-plan-day1__more">
      더보기
      <svg viewBox="0 0 6 11" width="6" height="11" aria-hidden="true">
        <path d="M.18.17l5 5.5-5 5" stroke="currentColor" strokeWidth="0.8" fill="none" />
      </svg>
    </span>
  );
}

function StopList({ stops }: { stops: PlanStop[] }) {
  return (
    <ol className="coast-plan-day1__stops">
      {stops.map((stop) => (
        <li key={stop.label} className="coast-plan-day1__stop">
          <div className="coast-plan-day1__rail">
            <span>{stop.label}</span>
            {stop.time ? <em>{stop.time}</em> : null}
          </div>
          <div className="coast-plan-day1__body">
            {stop.title ? <h2>{stop.title}</h2> : null}
            {stop.note ? <p className="coast-plan-day1__note">{stop.note}</p> : null}
            <div className="coast-plan-day1__items">
              <ul>
                {stop.items.map((item) => (
                  <li key={item.text}>
                    {item.text}
                    {item.detail ? <span>{item.detail}</span> : null}
                  </li>
                ))}
              </ul>
              {stop.more ? <MoreButton /> : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function CoastPlanDay1Page() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let locked = false;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (locked || event.deltaY === 0) return;

      const panels = [...el.querySelectorAll<HTMLElement>(".coast-plan-day1__panel")];
      const panelTop = (panel: HTMLElement) =>
        panel.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop;
      const index = panels.reduce((current, panel, panelIndex) => {
        return panelTop(panel) <= el.scrollTop + 8 ? panelIndex : current;
      }, 0);
      const next = Math.min(panels.length - 1, Math.max(0, index + (event.deltaY > 0 ? 1 : -1)));
      if (next === index) return;

      locked = true;
      el.scrollTo({ top: panelTop(panels[next]), behavior: "smooth" });
      window.setTimeout(() => {
        locked = false;
      }, SCROLL_LOCK_MS);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <main className="vf coast-plan-day1">
      <div className="vf__stage coast-plan-day1__stage">
        <header className="coast-plan-day1__top">
          <button
            className="coast-plan-day1__nav"
            type="button"
            onClick={() => navigate("/coast/plan")}
          >
            <svg viewBox="0 0 6 11" width="6" height="11" aria-hidden="true">
              <path d="M5.18.17.18 5.67l5 5" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
            Back
          </button>
          <div className="coast-plan-day1__brand">
            <img className="coast-plan-day1__logo" src={logoAube} alt="AUBE" />
            <p>Ulleungdo, Dokdo</p>
          </div>
        </header>

        <div className="coast-plan-day1__scroll" ref={scrollRef}>
          <section className="coast-plan-day1__panel">
            <div className="coast-plan-day1__hotel">
              <h1>RAMADA HOTEL</h1>
              <p>{"<오브, 울릉>의 숙소는 라마다호텔입니다"}</p>
              <img src={ramadaTerrace} alt="라마다 호텔 테라스" />
            </div>
          </section>

          <section className="coast-plan-day1__panel coast-plan-day1__panel--plan">
            <div className="coast-plan-day1__intro">
              <div>
                <h1>TOUR PLAN</h1>
                <p>첫번째 여정의 일정표입니다</p>
              </div>
              <span className="coast-plan-day1__chip">여행일정</span>
            </div>

            <div className="coast-plan-day1__meta">
              <div>
                <span>Depart</span>
                <strong>포항출발 / 엘도라도EX</strong>
              </div>
              <div>
                <span>DAY ONE</span>
                <strong>오브,울릉의 첫번째 여정</strong>
              </div>
            </div>

            <StopList stops={PLAN_PAGES[0]} />
          </section>

          <section className="coast-plan-day1__panel coast-plan-day1__panel--plan">
            <StopList stops={PLAN_PAGES[1]} />
          </section>
        </div>
      </div>
    </main>
  );
}
