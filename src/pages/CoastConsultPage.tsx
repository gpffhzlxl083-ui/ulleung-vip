import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import backChevron from "../assets/common/back-chevron.svg";
import brand from "../assets/hotel-intro/brand.svg";
import consultHeader from "../assets/coast-reserve/consult-header.svg";
import consultStep from "../assets/coast-reserve/consult-step.svg";
import "../styles/viewport-full.css";
import "../styles/coast-consult.css";

const at = (y: number): CSSProperties => ({ top: `calc(${y} / 850 * 100cqb)` });
const atX = (x: number, y: number): CSSProperties => ({ ...at(y), left: `calc(${x} / 434 * 100cqi)` });

function Label({ y, children }: { y: number; children: ReactNode }) {
  return (
    <span className="coast-consult__label" style={at(y)}>
      {children}
    </span>
  );
}

function Hint({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <p className="coast-consult__hint" style={atX(x, y)}>
      {children}
    </p>
  );
}

const digits = (value: string, max: number) => value.replace(/\D/g, "").slice(0, max);

function formatTime(value: string) {
  const raw = digits(value, 4);
  return raw.length > 2 ? `${raw.slice(0, 2)} : ${raw.slice(2)}` : raw;
}

export default function CoastConsultPage() {
  const navigate = useNavigate();
  const fadeIn = Boolean((useLocation().state as { pullIn?: boolean } | null)?.pullIn);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(1);
  const [tourDay, setTourDay] = useState("");
  const [time, setTime] = useState("");

  const goReserve = () => navigate("/coast/reserve");

  return (
    <main className={`vf coast-consult${fadeIn ? " coast-consult--fade-in" : ""}`}>
      <div className="vf__stage coast-consult__stage">
        <img className="coast-consult__header" src={consultHeader} alt="" />
        <div className="coast-consult__brand">
          <img className="coast-consult__brand-bg" src={brand} alt="" />
          <img className="coast-consult__logo" src={logoAube} alt="AUBE" />
        </div>

        <button className="coast-consult__back" type="button" onClick={goReserve}>
          <img src={backChevron} alt="" width={3.51893} height={7.81253} />
          Back
        </button>

        <h1 className="coast-consult__title">CONSULTING</h1>
        <p className="coast-consult__lead">{"<오브,울릉>에서는 고객님만을 위한  전문 여행상담이 시작됩니다"}</p>
        <p className="coast-consult__code">Code : 20270121 AUBE</p>
        <span className="coast-consult__rule" style={at(281)} aria-hidden="true" />

        <form className="coast-consult__form" onSubmit={(event) => event.preventDefault()}>
          <Label y={321.5}>Name</Label>
          <input
            className="coast-consult__box"
            style={at(308)}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="김정달"
            aria-label="이름"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Label y={378.5}>Phone No</Label>
          <input
            className="coast-consult__box"
            style={at(365)}
            type="tel"
            name="phone"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="01093371792"
            aria-label="전화번호"
            value={phone}
            onChange={(event) => setPhone(digits(event.target.value, 11))}
          />
          <Hint x={283} y={403.5}>- 없이 입력해주세요</Hint>

          <Label y={453.5}>People</Label>
          <div className="coast-consult__box coast-consult__people" style={at(443)}>
            <button
              className="coast-consult__step coast-consult__step--minus"
              type="button"
              aria-label="인원 줄이기"
              disabled={people <= 1}
              onClick={() => setPeople((count) => Math.max(1, count - 1))}
            >
              <img src={consultStep} alt="" width={14} height={14} />
              <span>-</span>
            </button>
            <p className="coast-consult__count" aria-live="polite">
              {people}
            </p>
            <button
              className="coast-consult__step coast-consult__step--plus"
              type="button"
              aria-label="인원 늘리기"
              onClick={() => setPeople((count) => count + 1)}
            >
              <img src={consultStep} alt="" width={14} height={14} />
              <span>+</span>
            </button>
          </div>
          <Hint x={286} y={484.5}>성인,소아 구분없습니다</Hint>

          <Label y={540.5}>Tour day</Label>
          <input
            className="coast-consult__box"
            style={at(527)}
            type="text"
            name="tourDay"
            inputMode="numeric"
            placeholder="20270815"
            aria-label="여행 날짜"
            value={tourDay}
            onChange={(event) => setTourDay(digits(event.target.value, 8))}
          />
          <Hint x={288} y={569.5}>- 없이 입력해주세요</Hint>

          <Label y={628.5}>Time</Label>
          <input
            className="coast-consult__box"
            style={at(614)}
            type="text"
            name="time"
            inputMode="numeric"
            placeholder="13 : 50"
            aria-label="상담 희망 시간"
            value={time}
            onChange={(event) => setTime(formatTime(event.target.value))}
          />
          <Hint x={286} y={661.5}>
            MD상담을 원하는
            <br />
            시간을 설정해주세요
          </Hint>

          <span className="coast-consult__rule" style={at(723)} aria-hidden="true" />

          <p className="coast-consult__ask">전문MD에게 상담을 신청하시겠습니까?</p>
          <button className="coast-consult__answer coast-consult__answer--yes" type="submit">
            YES
          </button>
          <button className="coast-consult__answer coast-consult__answer--no" type="button" onClick={goReserve}>
            NO
          </button>
        </form>
      </div>
    </main>
  );
}
