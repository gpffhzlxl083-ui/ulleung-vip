import { useEffect, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import backChevron from "../assets/coast-booking/back.svg";
import headerBase from "../assets/coast-booking/header-base.svg";
import dateCaret from "../assets/coast-booking/calendar.svg";
import selectCaret from "../assets/coast-booking/caret.svg";
import logo from "../assets/coast-booking/logo.png";
import pagerNext from "../assets/coast-booking/pager-next.svg";
import pagerPrev from "../assets/coast-booking/pager-prev.svg";
import rowChevron from "../assets/coast-booking/row-chevron.svg";
import confirmRule from "../assets/coast-booking/rule.svg";
import serviceBack from "../assets/coast-booking/service-back.png";
import serviceFront from "../assets/coast-booking/service-front.png";
import sheet from "../assets/coast-booking/sheet.svg";
import submitIcon from "../assets/coast-booking/submit-icon.svg";
import "../styles/viewport-full.css";
import "../styles/coast-booking.css";

const at = (y: number): CSSProperties => ({ top: `calc(${y} / 434 * 100cqi)` });

const SLIDES = 8;

const INCLUSIONS = [
  { no: "01", en: "Ocean View Suite", ko: "프리미엄 호텔" },
  { no: "02", en: "Private Van", ko: "최고급 밴" },
  { no: "03", en: "First Class Cabin", ko: "퍼스트 클래스 좌석" },
  { no: "04", en: "Premium Boarding", ko: "우선 승선 서비스" },
  { no: "05", en: "Exclusive Group Event", ko: "소수 단독행사" },
  { no: "06", en: "Fine Dining", ko: "파인 다이닝" },
  { no: "07", en: "Premium Tour", ko: "프리미엄 투어" },
  { no: "08", en: "Personal Care", ko: "퍼스널 케어" },
  { no: "09", en: "Safety Tour", ko: "안전한 여행" },
  { no: "10", en: "Goods & Amenity", ko: "굿즈 및 어메니티 제공" },
];

const PERKS = ["특별한 이벤트", "여행자보험 2억원", "응급키트", "CPR 구조 자격증", "건강 사전체크", "알러지 케어"];

const METHODS = ["전화", "문자", "카카오톡", "이메일"];
const TIMES = ["오전 9시 – 12시", "오후 12시 – 6시", "저녁 6시 – 9시"];

const digits = (value: string, max: number) => value.replace(/\D/g, "").slice(0, max);

function formatDot(value: string) {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "";
  return `${year}.${month}.${day}`;
}

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="coast-booking__stepper">
      <span className="coast-booking__stepper-label">{label}</span>
      <button
        type="button"
        aria-label={`${label} 줄이기`}
        disabled={value <= 0}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <span className="coast-booking__stepper-value">{value}</span>
      <button
        type="button"
        aria-label={`${label} 늘리기`}
        disabled={value >= 9}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}

export default function CoastBookingPage() {
  const navigate = useNavigate();
  const fadeIn = Boolean((useLocation().state as { pullIn?: boolean } | null)?.pullIn);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [slide, setSlide] = useState(1);
  const [pullDir, setPullDir] = useState<1 | -1>(1);
  const [leaving, setLeaving] = useState(false);
  const [tried, setTried] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!leaving) return;
    const id = window.setTimeout(() => {
      setSlide((current) => current + pullDir);
      setLeaving(false);
    }, 480);
    return () => window.clearTimeout(id);
  }, [leaving, pullDir]);

  const pullCard = (dir: 1 | -1) => {
    if (leaving) return;
    const next = slide + dir;
    if (next < 1 || next > SLIDES) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSlide(next);
      return;
    }
    setPullDir(dir);
    setLeaving(true);
  };

  const total = adults + children + infants;
  const range =
    start && end ? `${formatDot(start)} – ${formatDot(end)}` : "2026.11.08 – 2026.11.10";
  const datesInvalid = Boolean(start && end && end < start);
  const applicantDone =
    name.trim().length > 0 && phone.length >= 10 && email.includes("@") && method !== "" && time !== "";
  const nameInvalid = tried && name.trim().length === 0;
  const phoneInvalid = tried && phone.length < 10;
  const emailInvalid = tried && !email.includes("@");
  const methodInvalid = tried && method === "";
  const timeInvalid = tried && time === "";
  const agreeInvalid = tried && !agreed;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitted) return;
    const form = event.currentTarget;
    const missing = (
      [
        [datesInvalid, "start"],
        [name.trim().length === 0, "name"],
        [phone.length < 10, "phone"],
        [!email.includes("@"), "email"],
        [method === "", "method"],
        [time === "", "time"],
        [!agreed, "agree"],
      ] as const
    ).find(([bad]) => bad);
    setTried(true);
    if (!missing) {
      setSubmitted(true);
      return;
    }
    const field = form.elements.namedItem(missing[1]);
    if (field instanceof HTMLElement) {
      field.scrollIntoView({ block: "center", behavior: "smooth" });
      field.focus();
    }
  };

  return (
    <main className={`vf coast-booking${fadeIn ? " coast-booking--fade-in" : ""}`}>
      <div className="vf__stage coast-booking__stage">
        <form className="coast-booking__canvas" onSubmit={onSubmit} noValidate>
          <div className="coast-booking__header" aria-hidden="true">
            <img className="coast-booking__header-base" src={headerBase} alt="" />
          </div>
          <img className="coast-booking__sheet" src={sheet} alt="" />

          <button className="coast-booking__back" type="button" onClick={() => navigate("/coast/reserve")}>
            <img src={backChevron} alt="" />
            Back
          </button>
          <div className="coast-booking__brand">
            <img className="coast-booking__logo" src={logo} alt="AUBE" />
            <p className="coast-booking__place">Ulleungdo, Dokdo</p>
          </div>

          <h1 className="coast-booking__title">RESERVATION</h1>
          <p className="coast-booking__lead">예약에 필요한 항목들을 작성해주세요</p>
          <p className="coast-booking__intro-title">소수만을 위한, 특별한 여정</p>
          <p className="coast-booking__intro-copy">
            한정된 인원, 섬세한 케어
            <br />
            오직 당신을 위해 준비한
            <br />
            프리미엄 울릉 여행을 시작하세요
          </p>

          <h2 className="coast-booking__section" style={at(345)}>
            SCHEDULE
          </h2>
          <p className="coast-booking__status" style={{ ...at(352), left: "calc(391 / 434 * 100cqi)" }}>
            완료
          </p>
          <hr className="coast-booking__rule" style={at(380)} />
          <p className="coast-booking__range">{range}</p>

          <div className={`coast-booking__dates${datesInvalid ? " is-invalid" : ""}`}>
            <label className="coast-booking__date">
              <input
                type="date"
                name="start"
                aria-label="출발일"
                value={start}
                className={start ? undefined : "is-empty"}
                onChange={(event) => setStart(event.target.value)}
              />
              {start ? null : <span className="coast-booking__date-placeholder">날짜를 선택해주세요</span>}
              <img className="coast-booking__date-caret" src={dateCaret} alt="" />
            </label>
            <span className="coast-booking__slash" aria-hidden="true">
              /
            </span>
            <label className="coast-booking__date">
              <input
                type="date"
                name="end"
                aria-label="도착일"
                value={end}
                className={end ? undefined : "is-empty"}
                onChange={(event) => setEnd(event.target.value)}
              />
              {end ? null : <span className="coast-booking__date-placeholder">날짜를 선택해주세요</span>}
              <img className="coast-booking__date-caret" src={dateCaret} alt="" />
            </label>
          </div>
          <p className="coast-booking__note" style={at(523.2)}>
            출발 희망일은 현지 예약 상황에 따라 최종 일정이 일부 조정될 수 있습니다.
          </p>

          <h2 className="coast-booking__section" style={at(590.86)}>
            PERSON
          </h2>
          <p className="coast-booking__status" style={{ ...at(596.93), left: "calc(391 / 434 * 100cqi)" }}>
            완료
          </p>
          <hr className="coast-booking__rule" style={at(626)} />
          <p className="coast-booking__count">
            <span className="coast-booking__count-who">성인</span>
            <span className="coast-booking__count-sum">{` ${adults} · 총 ${total}명`}</span>
          </p>
          <div className="coast-booking__people">
            <Stepper label="성인" value={adults} onChange={setAdults} />
            <Stepper label="소아" value={children} onChange={setChildren} />
            <Stepper label="유아" value={infants} onChange={setInfants} />
          </div>
          <p className="coast-booking__note" style={at(768)}>
            인원은 현지 예약 상황에 따라 일부 변동될 수 있습니다.
          </p>

          <h2 className="coast-booking__section" style={at(862.7)}>
            APPLICANT INFROMATION
          </h2>
          <p className="coast-booking__status" style={{ ...at(869.07), left: "calc(382 / 434 * 100cqi)" }}>
            {applicantDone ? "완료" : "작성중"}
          </p>
          <hr className="coast-booking__rule" style={at(898.14)} />

          <label className="coast-booking__control" style={at(936.04)}>
            <span className="coast-booking__label">
              NAME <i className="coast-booking__req">*</i>
            </span>
            <span className={`coast-booking__box${nameInvalid ? " is-invalid" : ""}`}>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="이름을 입력해 주세요"
                aria-label="이름"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </span>
          </label>

          <label className="coast-booking__control" style={at(1015.04)}>
            <span className="coast-booking__label">
              CONTACT <i className="coast-booking__req">*</i>
            </span>
            <span className={`coast-booking__box${phoneInvalid ? " is-invalid" : ""}`}>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="연락처를 입력해주세요"
                aria-label="연락처"
                value={phone}
                onChange={(event) => setPhone(digits(event.target.value, 11))}
              />
            </span>
          </label>

          <label className="coast-booking__control" style={at(1088.7)}>
            <span className="coast-booking__label">
              E-MAIL <i className="coast-booking__req">*</i>
            </span>
            <span className={`coast-booking__box${emailInvalid ? " is-invalid" : ""}`}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="이메일을 입력해주세요"
                aria-label="이메일"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </span>
          </label>

          <label className="coast-booking__control" style={at(1172.04)}>
            <span className="coast-booking__label">
              CONTACT METHOD <i className="coast-booking__req">*</i>
            </span>
            <span className={`coast-booking__box${methodInvalid ? " is-invalid" : ""}`}>
              <select
                name="method"
                aria-label="연락 방식"
                value={method}
                className={method ? undefined : "is-empty"}
                onChange={(event) => setMethod(event.target.value)}
              >
                <option value="">연락 방식을 선택해주세요</option>
                {METHODS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <img className="coast-booking__select-caret" src={selectCaret} alt="" />
            </span>
          </label>

          <label className="coast-booking__control" style={at(1250.04)}>
            <span className="coast-booking__label">
              CONTACT AVAILABLE TIME <i className="coast-booking__req">*</i>
            </span>
            <span className={`coast-booking__box${timeInvalid ? " is-invalid" : ""}`}>
              <select
                name="time"
                aria-label="연락 가능 시간"
                value={time}
                className={time ? undefined : "is-empty"}
                onChange={(event) => setTime(event.target.value)}
              >
                <option value="">연락 가능한 시간대를 선택해주세요</option>
                {TIMES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <img className="coast-booking__select-caret" src={selectCaret} alt="" />
            </span>
          </label>

          <h2 className="coast-booking__section" style={at(1332)}>
            PREMIUM INCLUSIONS
          </h2>
          <hr className="coast-booking__rule" style={at(1366)} />
          <ul className="coast-booking__inclusions">
            {INCLUSIONS.map((item) => (
              <li key={item.no} className="coast-booking__inclusion">
                <span className="coast-booking__inclusion-no">{item.no}</span>
                <span>
                  <span className="coast-booking__inclusion-en">{item.en}</span>
                  <span className="coast-booking__inclusion-ko">{item.ko}</span>
                </span>
                <img className="coast-booking__inclusion-chevron" src={rowChevron} alt="" />
              </li>
            ))}
          </ul>

          <h2 className="coast-booking__section" style={at(1748)}>
            PREMIUM SERVICE
          </h2>
          <hr className="coast-booking__rule" style={at(1782)} />

          <img className="coast-booking__photo coast-booking__photo--back" src={serviceBack} alt="" />
          <img
            className={`coast-booking__photo coast-booking__photo--front${leaving ? " is-leaving" : ""}`}
            src={serviceFront}
            alt="퍼스널 케어"
          />
          <p className="coast-booking__care-title">Personal Care</p>
          <p className="coast-booking__care-kicker">[ 편안한 휴식까지 배려하는 여행 ]</p>
          <p className="coast-booking__care-copy">
            당신의 여행을 더욱 더 특별하게 만들어 드립니다.
            <br />
            효도관광 / 기념일 등 여행목적 / 계기에 맞춰
            <br />
            전담 매니저가 가능한 서비스를 제공해드립니다.
          </p>
          <ul className="coast-booking__perks">
            {PERKS.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>

          <div className="coast-booking__pager">
            <button
              className="coast-booking__pager-btn coast-booking__pager-btn--prev"
              type="button"
              aria-label="이전 서비스"
              disabled={slide <= 1 || leaving}
              onClick={() => pullCard(-1)}
            >
              <img src={pagerPrev} alt="" />
            </button>
            <p className="coast-booking__fraction" aria-live="polite">
              <span className="coast-booking__fraction-n">{slide}</span>
              <span className="coast-booking__fraction-slash">/</span>
              <span className="coast-booking__fraction-d">{SLIDES}</span>
            </p>
            <button
              className="coast-booking__pager-btn"
              type="button"
              aria-label="다음 서비스"
              disabled={slide >= SLIDES || leaving}
              onClick={() => pullCard(1)}
            >
              <img src={pagerNext} alt="" />
            </button>
          </div>

          <img className="coast-booking__confirm-rule" src={confirmRule} alt="" />
          <label className={`coast-booking__agree${agreeInvalid ? " is-invalid" : ""}`}>
            <input
              type="checkbox"
              name="agree"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span className="coast-booking__check" aria-hidden="true" />
            작성 정보를 확인했으며, 예약을 신청합니다.
          </label>

          <button className="coast-booking__submit" type="submit" disabled={submitted}>
            {submitted ? "신청이 접수되었습니다" : "예약 신청하기"}
            {submitted ? null : <img src={submitIcon} alt="" />}
          </button>
        </form>
      </div>
    </main>
  );
}
