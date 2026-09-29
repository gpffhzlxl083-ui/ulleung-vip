import { useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import day1Sheet from "../assets/coast-plan/day1-sheet.svg";
import feeIcon from "../assets/coast-plan/itinerary-fee.svg";
import "../styles/viewport-full.css";
import "../styles/coast-plan-day1.css";
import "../styles/coast-plan-itinerary.css";

function More({ top }: { top: number }) {
  return (
    <button className="coast-plan-itinerary__more" style={{ top: `calc(${top} / 850 * 100cqb)` }} type="button">
      더보기
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 17V7L15 12L10 17Z" fill="#595655" />
      </svg>
    </button>
  );
}

export default function CoastPlanItineraryPage() {
  const navigate = useNavigate();

  return (
    <main className="vf coast-plan-day1 coast-plan-itinerary">
      <div className="vf__stage coast-plan-day1__stage">
        <header className="coast-plan-day1__top coast-plan-itinerary__header">
          <button className="coast-plan-day1__nav" type="button" onClick={() => navigate("/coast/plan/day1")}>
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

        <div className="coast-plan-itinerary__scroll">
        <section className="coast-plan-itinerary__screen">
        <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
        <h1 className="coast-plan-itinerary__title">TOUR PLAN</h1>
        <p className="coast-plan-itinerary__sub">첫번째 여정의 일정표입니다</p>
        <p className="coast-plan-itinerary__chip">여행일정</p>

        <div className="coast-plan-itinerary__rule coast-plan-itinerary__rule--top" />
        <p className="coast-plan-itinerary__depart">Depart</p>
        <p className="coast-plan-itinerary__depart-ko">포항출발 / 엘도라도EX</p>
        <p className="coast-plan-itinerary__day">DAY ONE</p>
        <p className="coast-plan-itinerary__day-ko">오브,울릉의 첫번째 여정</p>
        <div className="coast-plan-itinerary__rule coast-plan-itinerary__rule--mid" />

        <div className="coast-plan-itinerary__stem" style={{ top: "calc(334 / 850 * 100cqb)", height: "calc(108 / 850 * 100cqb)" }} />
        <p className="coast-plan-itinerary__label" style={{ top: "calc(326 / 850 * 100cqb)" }}>
          meeting
        </p>
        <p className="coast-plan-itinerary__clock" style={{ top: "calc(345 / 850 * 100cqb)" }}>
          08:30~09:50
        </p>
        <p className="coast-plan-itinerary__stop" style={{ top: "calc(326 / 850 * 100cqb)" }}>
          포항여객선터미널 미팅
        </p>
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(356 / 850 * 100cqb)" }}>
          <span>• </span>aube, snack box 제공
        </p>
        <More top={355} />
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(378 / 850 * 100cqb)" }}>
          <span>• </span>울릉도 청아라 심층수 1병 제공
        </p>
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(420 / 850 * 100cqb)" }}>
          <span>• </span>address
        </p>
        <p className="coast-plan-itinerary__detail" style={{ top: "calc(436 / 850 * 100cqb)" }}>
          포항시 북구 해안로 44(항구동)
        </p>

        <div className="coast-plan-itinerary__stem" style={{ top: "calc(512 / 850 * 100cqb)", height: "calc(130 / 850 * 100cqb)" }} />
        <p className="coast-plan-itinerary__label" style={{ top: "calc(504 / 850 * 100cqb)" }}>
          boarding
        </p>
        <p className="coast-plan-itinerary__clock" style={{ top: "calc(523 / 850 * 100cqb)" }}>
          12:30 arrive
        </p>
        <p className="coast-plan-itinerary__stop" style={{ top: "calc(504 / 850 * 100cqb)" }}>
          프리미엄 조기 승선
        </p>
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(534 / 850 * 100cqb)" }}>
          <span>• </span>first class (최고 등급)
        </p>
        <More top={531} />
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(556 / 850 * 100cqb)" }}>
          <span>• </span>welcome kit 제공
        </p>
        <More top={556} />
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(578 / 850 * 100cqb)" }}>
          <span>• </span>Vip 브릿지 투어
        </p>
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(620 / 850 * 100cqb)" }}>
          <span>• </span>ferry
        </p>
        <p className="coast-plan-itinerary__detail" style={{ top: "calc(636 / 850 * 100cqb)" }}>
          엘도라도 익스프레스호
        </p>
        <More top={622} />

        <div className="coast-plan-itinerary__stem" style={{ top: "calc(716 / 850 * 100cqb)", height: "calc(49 / 850 * 100cqb)" }} />
        <p className="coast-plan-itinerary__label" style={{ top: "calc(706 / 850 * 100cqb)" }}>
          lunch
        </p>
        <p className="coast-plan-itinerary__stop" style={{ top: "calc(704 / 850 * 100cqb)" }}>
          special & coffee
        </p>
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(734 / 850 * 100cqb)" }}>
          <span>• </span>울릉 한치물회, 농어매운탕
        </p>
        <More top={733} />
        <p className="coast-plan-itinerary__bullet" style={{ top: "calc(756 / 850 * 100cqb)" }}>
          <span>• </span>tea time 1인 1회 제공
        </p>
        </section>

        <section className="coast-plan-itinerary__screen">
          <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
          <p className="coast-plan-itinerary__label" style={{ top: "calc(105 / 850 * 100cqb)" }}>
            member
          </p>
          <p className="coast-plan-itinerary__copy" style={{ top: "calc(105 / 850 * 100cqb)" }}>
            울릉도 전문 해설사와 함께하는
            <br />
            프리미엄 울릉도 투어
          </p>
          <div className="coast-plan-itinerary__stem" style={{ top: "calc(111 / 850 * 100cqb)", height: "calc(136 / 850 * 100cqb)" }} />
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(146 / 850 * 100cqb)" }}>
            <span>• </span>
            <strong>4~6명 소수 단독 행사</strong>
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(168 / 850 * 100cqb)" }}>
            <span>• </span>오브, 울릉 <strong>전용 Vip 리무진</strong>
          </p>
          <More top={167} />
          <p className="coast-plan-itinerary__copy" style={{ top: "calc(210 / 850 * 100cqb)" }}>
            {"<vip van>"}
            <br />
            쾌적한 일정을 위해 투어 맴버는 4명~6명
            <br />
            으로 구성된 단독 행사입니다
          </p>

          <div className="coast-plan-itinerary__stem" style={{ top: "calc(320 / 850 * 100cqb)", height: "calc(165 / 850 * 100cqb)" }} />
          <p className="coast-plan-itinerary__label" style={{ top: "calc(309 / 850 * 100cqb)" }}>
            tour I
          </p>
          <p className="coast-plan-itinerary__clock" style={{ top: "calc(328 / 850 * 100cqb)" }}>
            4h ~ 5h
          </p>
          <p className="coast-plan-itinerary__stop" style={{ top: "calc(312 / 850 * 100cqb)" }}>
            {"<오브,울릉>의 첫번째 여정"}
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(353 / 850 * 100cqb)" }}>
            <span>• </span>태고의 신비 화산지질 <strong>슬로우 트래킹</strong>
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(375 / 850 * 100cqb)" }}>
            <span>• </span>오징어 배와 등대의 보금자리 <strong>저동항 시티투어</strong>
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(397 / 850 * 100cqb)" }}>
            <span>• </span>용출수의 봉래폭포와 삼나무 숲길 <strong>치유 트래킹</strong>
          </p>
          <p className="coast-plan-itinerary__fee" style={{ top: "calc(415 / 850 * 100cqb)" }}>
            <img src={feeIcon} alt="" />
            입장료 포함
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(438 / 850 * 100cqb)" }}>
            <span>• </span>바다 위의 또 다른 비경 <strong>관음도 투어</strong>
          </p>
          <p className="coast-plan-itinerary__fee" style={{ top: "calc(457 / 850 * 100cqb)" }}>
            <img src={feeIcon} alt="" />
            입장료 포함
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(479 / 850 * 100cqb)" }}>
            <span>• </span>울릉도 10대 비경 <strong>삼선암 투어</strong>
          </p>
          <More top={478} />

          <div className="coast-plan-itinerary__stem" style={{ top: "calc(559 / 850 * 100cqb)", height: "calc(200 / 850 * 100cqb)" }} />
          <p className="coast-plan-itinerary__label" style={{ top: "calc(553 / 850 * 100cqb)" }}>
            dinner
          </p>
          <p className="coast-plan-itinerary__stop" style={{ top: "calc(551 / 850 * 100cqb)" }}>
            Fine dining  & Spa
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(581 / 850 * 100cqb)" }}>
            <span>• </span>spa & herbal tea
          </p>
          <More top={580} />
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(603 / 850 * 100cqb)" }}>
            <span>• </span>
            <strong>코스요리</strong>
          </p>
          <More top={602} />
          <p className="coast-plan-itinerary__note" style={{ top: "calc(622 / 850 * 100cqb)" }}>
            자연산 전복죽
          </p>
          <p className="coast-plan-itinerary__note" style={{ top: "calc(641 / 850 * 100cqb)" }}>
            울릉 돌문어 & 냉채
          </p>
          <p className="coast-plan-itinerary__note" style={{ top: "calc(660 / 850 * 100cqb)" }}>
            홍합밥 & 돌미역국
          </p>
          <p className="coast-plan-itinerary__note" style={{ top: "calc(679 / 850 * 100cqb)" }}>
            호박식혜
          </p>

          <p className="coast-plan-itinerary__label" style={{ top: "calc(751 / 850 * 100cqb)" }}>
            night tour
          </p>
          <p className="coast-plan-itinerary__bullet" style={{ top: "calc(751 / 850 * 100cqb)" }}>
            <span>• </span>미디어파사드 투어
          </p>
        </section>
        </div>
      </div>
    </main>
  );
}
