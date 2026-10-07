import { useRef, useState, type PointerEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import day1Sheet from "../assets/coast-plan/day1-sheet.svg";
import feeIcon from "../assets/coast-plan/itinerary-fee.svg";
import hotelLobby from "../assets/coast-plan/itinerary-hotel-a.webp";
import hotelTerrace from "../assets/coast-plan/itinerary-hotel-b.webp";
import pagerNext from "../assets/coast-plan/itinerary-pager-next.svg";
import pagerPrev from "../assets/coast-plan/itinerary-pager-prev.svg";
import splitRule from "../assets/coast-plan/itinerary-rule.svg";
import kitIcon from "../assets/coast-plan/itinerary-kit.svg";
import arrowNext from "../assets/coast-plan/itinerary-arrow-next.svg";
import arrowPrev from "../assets/coast-plan/itinerary-arrow-prev.svg";
import outroSheet from "../assets/coast-plan/itinerary-sheet-118.svg";
import outroLine from "../assets/coast-plan/itinerary-line-16.svg";
import spotBridge from "../assets/coast-plan/itinerary-spot-a.webp";
import spotCliff from "../assets/coast-plan/itinerary-spot-b.webp";
import coastPine from "../assets/coast-pine/coast-pine-poster.jpg";
import coastWave from "../assets/coast/coast-wave-poster.jpg";
import scheduleCliff from "../assets/coast-schedule/schedule-cliff.webp";
import ramadaExterior from "../assets/ramada/ramada-exterior.webp";
import ramadaTerrace from "../assets/ramada/ramada-terrace.webp";
import ramadaOcean from "../assets/ramada/ramada-room-ocean.webp";
import ramadaTwin from "../assets/ramada/ramada-room-twin.webp";
import stem174 from "../assets/coast-plan/day2-stem-174.svg";
import stem224 from "../assets/coast-plan/day2-stem-224.svg";
import stem78 from "../assets/coast-plan/day2-stem-78.svg";
import stem19 from "../assets/coast-plan/day2-stem-19.svg";
import stem237 from "../assets/coast-plan/day2-stem-237.svg";
import stem159 from "../assets/coast-plan/day2-stem-159.svg";
import stem405 from "../assets/coast-plan/day2-stem-405.svg";
import benefits from "../assets/coast-plan/day2-benefits.svg";
import "../styles/viewport-full.css";
import "../styles/coast-plan-day1.css";
import "../styles/coast-plan-itinerary.css";
import "../styles/coast-plan-day2.css";

function Stem({
  top,
  box,
  width,
  src,
}: {
  top: number;
  box: number;
  width: number;
  src: string;
}) {
  return (
    <span
      className="coast-plan-day2__stem"
      style={{
        top: `calc(${top} / 850 * 100cqb)`,
        height: `calc(${box} / 850 * 100cqb)`,
      }}
    >
      <img src={src} alt="" style={{ width: `calc(${width} / 850 * 100cqb)`, height: "calc(2.66667 / 434 * 100cqi)" }} />
    </span>
  );
}

function More({ top }: { top: number }) {
  return (
    <button className="coast-plan-itinerary__more" style={{ top: `calc(${top} / 850 * 100cqb)` }} type="button">
      더보기
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M8.33203 14.1668V5.8335L12.4987 10.0002L8.33203 14.1668Z" fill="#595655" />
      </svg>
    </button>
  );
}

const SPOT_SLIDES = [
  { src: spotBridge, alt: "관음도로 이어지는 다리" },
  { src: spotCliff, alt: "해안 절벽" },
  { src: scheduleCliff, alt: "울릉 해안 절벽" },
  { src: ramadaTerrace, alt: "라마다 테라스" },
  { src: ramadaExterior, alt: "라마다 외관" },
  { src: coastWave, alt: "동해 파도" },
  { src: ramadaOcean, alt: "오션뷰 객실" },
  { src: coastPine, alt: "울릉 소나무" },
];

const HOTEL_SLIDES = [
  { src: hotelLobby, alt: "라마다 울릉 로비" },
  { src: hotelTerrace, alt: "라마다 울릉 테라스" },
  { src: ramadaOcean, alt: "라마다 울릉 오션뷰 객실" },
  { src: ramadaTwin, alt: "라마다 울릉 트윈 객실" },
];

const HOTEL_INCLUSIONS = [
  { top: 686, text: "•bakery cafe 이용권" },
  { top: 714, text: "•hotel buffet 1회" },
  { top: 742, text: "•dokdo tour / business class" },
  { top: 770, text: "•dokdo goods" },
  { top: 798, text: "•special lunch 1회" },
];

const INCLUSION_DETAIL = [
  { top: 199, text: "•bakery cafe 이용권" },
  { top: 227, text: "•hotel buffet 1회" },
  { top: 255, text: "•dokdo tour / business class" },
  { top: 283, text: "•dokdo goods" },
  { top: 311, text: "•special lunch 1회" },
  { top: 339, text: "•심층수 1병, 미니 간식 제공" },
  { top: 367, text: "•Fine  dining 1" },
  { top: 395, text: "•Ramada hotel deluxe ocean view" },
  { top: 423, text: "•호박 막걸리, 음료 제공" },
  { top: 451, text: "•Premium Tour  5h / 입장료(모노레일, 예림원 포함)" },
  { top: 479, text: "•울릉울라 coffee 1회 제공" },
  { top: 507, text: "•전문 인솔자 동행" },
];

const BREAKFAST_MENU = ["베이커리", "샐러드 & 콜드 푸드", "한식코너 & 핫 푸드", "디저트", "메인 플레이트", "음료 코너"];
const GOODS = ["독도 티셔츠", "독도 타올", "독도 엽서", "독도 손거울", "독도 핀버튼"];
const DINNER_MENU = ["소라, 전복회", "보리새우, 가자미", "문어숙회", "오징어 냉채", "홍삼, 뿔소라 찜", "회", "매운탕"];

export default function CoastPlanDay2ItineraryPage() {
  const navigate = useNavigate();
  const navState = useLocation().state as { fadeIn?: boolean; pullIn?: boolean } | null;
  const fadeIn = Boolean(navState?.fadeIn);
  const pullIn = Boolean(navState?.pullIn);
  const [hotelIndex, setHotelIndex] = useState(0);
  const [spotIndex, setSpotIndex] = useState(0);
  const spotDragX = useRef<number | null>(null);
  const hotelMain = HOTEL_SLIDES[hotelIndex];
  const hotelNext = HOTEL_SLIDES[(hotelIndex + 1) % HOTEL_SLIDES.length];
  const spotMain = SPOT_SLIDES[spotIndex];
  const spotNext = SPOT_SLIDES[(spotIndex + 1) % SPOT_SLIDES.length];
  const stepSpot = (direction: number) => {
    setSpotIndex((index) => (index + direction + SPOT_SLIDES.length) % SPOT_SLIDES.length);
  };
  const onSpotPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    spotDragX.current = event.clientX;
  };
  const onSpotPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (spotDragX.current == null) return;
    const delta = event.clientX - spotDragX.current;
    spotDragX.current = null;
    if (delta <= -30) stepSpot(1);
    else if (delta >= 30) stepSpot(-1);
  };

  return (
    <main
      className={`vf coast-plan-day1 coast-plan-itinerary coast-plan-day2${fadeIn ? " coast-plan-day1--fade-in" : ""}${pullIn ? " coast-plan-day1--pull-in" : ""}`}
    >
      <div className="vf__stage coast-plan-day1__stage">
        <header
          className="coast-plan-day1__top coast-plan-itinerary__header"
          style={{ background: "linear-gradient(90deg, #74A7B5 0%, #27575E 42.3077%, #0E1F24 100%)" }}
        >
          <button className="coast-plan-day1__nav" type="button" onClick={() => navigate("/coast/plan")}>
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
            <p className="coast-plan-itinerary__sub">두 번째 여정의 일정표입니다</p>
            <p className="coast-plan-itinerary__chip">여행일정</p>
            <div className="coast-plan-itinerary__rule coast-plan-itinerary__rule--top" />
            <p className="coast-plan-itinerary__depart">Tour</p>
            <p className="coast-plan-itinerary__depart-ko">독도출발 / 울릉도</p>
            <p className="coast-plan-itinerary__day">DAY TWO</p>
            <p className="coast-plan-itinerary__day-ko">오브,울릉의 두번째 여정</p>
            <div className="coast-plan-itinerary__rule coast-plan-itinerary__rule--mid" />

            <Stem top={334} box={174} width={176.667} src={stem174} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(326 / 850 * 100cqb)" }}>
              breakfast
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(326 / 850 * 100cqb)" }}>
              cafe & buffet
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(356 / 850 * 100cqb)" }}>
              <span>• </span>cafe lounge 1매
            </p>
            <More top={355} />
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(378 / 850 * 100cqb)" }}>
              <span>• </span>
              <strong>조식뷔페</strong>
            </p>
            <More top={376} />
            {BREAKFAST_MENU.map((item, index) => (
              <p key={item} className="coast-plan-day2__line" style={{ top: `calc(${397 + index * 20} / 850 * 100cqb)` }}>
                {item}
              </p>
            ))}

            <Stem top={576} box={224} width={226.667} src={stem224} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(568 / 850 * 100cqb)" }}>
              dokdo
            </p>
            <p className="coast-plan-itinerary__clock" style={{ top: "calc(587 / 850 * 100cqb)" }}>
              08:20~12:30
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(568 / 850 * 100cqb)" }}>
              프리미엄 조기 승선
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(598 / 850 * 100cqb)" }}>
              <span>• </span>business class (최고 등급)
            </p>
            <More top={595} />
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(620 / 850 * 100cqb)" }}>
              <span>• </span>dokdo goods 제공
            </p>
            {GOODS.map((item, index) => (
              <p
                key={item}
                className="coast-plan-day2__line"
                style={{ top: `calc(${641 + index * 20} / 850 * 100cqb)`, left: "calc(168 / 434 * 100cqi)" }}
              >
                {item}
              </p>
            ))}
            <p className="coast-plan-itinerary__bullet coast-plan-day2__notice" style={{ top: "calc(763 / 850 * 100cqb)" }}>
              <span>• </span>
              {"특이사항\n   독도 입도 시간은 약 20분이며,\n   미 입도 시 선회로 대처됩니다"}
            </p>
          </section>

          <section className="coast-plan-itinerary__screen">
            <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
            <Stem top={104} box={78} width={80.6667} src={stem78} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(96 / 850 * 100cqb)" }}>
              lunch
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(97 / 850 * 100cqb)" }}>
              점심 특선
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(126 / 850 * 100cqb)" }}>
              <span>• </span>오삼불고기 정식
            </p>
            <More top={123} />
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(148 / 850 * 100cqb)" }}>
              <span>• </span>울릉도 산나물
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(170 / 850 * 100cqb)" }}>
              <span>• </span>호박막걸리 (또는 음료) 제공
            </p>

            <Stem top={247} box={19} width={21.6667} src={stem19} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(241 / 850 * 100cqb)" }}>
              premium
            </p>
            <p className="coast-plan-itinerary__copy" style={{ top: "calc(241 / 850 * 100cqb)", left: "calc(156 / 434 * 100cqi)" }}>
              {"<오브, 울릉>"}
              <br />
              no옵션, no쇼핑, no 팁입니다
            </p>

            <Stem top={330} box={237} width={239.667} src={stem237} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(323 / 850 * 100cqb)" }}>
              tour II
            </p>
            <p className="coast-plan-itinerary__clock" style={{ top: "calc(342 / 850 * 100cqb)" }}>
              4h ~ 5h
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(322 / 850 * 100cqb)" }}>
              {"<오브,울릉>의 두번째 여정"}
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(352 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>향나무 군락지와 거북바위 <strong>통구미 시티투어</strong>
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(374 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>울릉도의 나폴리 <strong>남양의 휴양지</strong>
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(396 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>우산국 전설의 시작 <strong>사자바위, 투구봉</strong>
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(418 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>대한민국 10대 비경 <strong>대풍감과 모노레일</strong>
            </p>
            <p className="coast-plan-itinerary__fee" style={{ top: "calc(437 / 850 * 100cqb)", left: "calc(181 / 434 * 100cqi)" }}>
              <img src={feeIcon} alt="" />
              입장료 포함
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(458 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>지평선 너머로 펼처진 <strong>흑해 현포마을</strong>
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(480 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>울릉도 자생식물 미술관 <strong>예림원</strong>
            </p>
            <p className="coast-plan-itinerary__fee" style={{ top: "calc(498 / 850 * 100cqb)", left: "calc(181 / 434 * 100cqi)" }}>
              <img src={feeIcon} alt="" />
              입장료 포함
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(519 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>송곳봉에서 차 한잔 <strong>울릉울라</strong>
            </p>
            <p className="coast-plan-itinerary__fee" style={{ top: "calc(538 / 850 * 100cqb)", left: "calc(181 / 434 * 100cqi)" }}>
              <img src={feeIcon} alt="" />
              tea time 1인 1회 제공
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(559 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>메밀꽃 필 무렵 여행스토리 <strong>나리분지</strong>
            </p>

            <Stem top={638} box={159} width={161.667} src={stem159} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(632 / 850 * 100cqb)", left: "calc(28 / 434 * 100cqi)" }}>
              dinner
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(630 / 850 * 100cqb)" }}>
              Fine dining
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(660 / 850 * 100cqb)" }}>
              <span>• </span>
              <strong>회정식</strong>
            </p>
            <More top={660} />
            {DINNER_MENU.map((item, index) => (
              <p key={item} className="coast-plan-itinerary__note" style={{ top: `calc(${679 + index * 18} / 850 * 100cqb)` }}>
                {item}
              </p>
            ))}
          </section>

          <section className="coast-plan-itinerary__screen">
            <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
            <Stem top={105} box={405} width={407.667} src={stem405} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(99 / 850 * 100cqb)" }}>
              hotel
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(94 / 850 * 100cqb)", left: "calc(165 / 434 * 100cqi)" }}>
              ramada by wyndham ulleung
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(124 / 850 * 100cqb)", left: "calc(165 / 434 * 100cqi)" }}>
              <span>• </span>ocean view
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(146 / 850 * 100cqb)", left: "calc(165 / 434 * 100cqi)" }}>
              <span>• </span>room check service
            </p>
            <More top={145} />
            <div className="coast-plan-itinerary__photo coast-plan-itinerary__photo--main">
              <img className={hotelIndex === 0 ? "is-crop-a" : "is-cover"} src={hotelMain.src} alt={hotelMain.alt} />
            </div>
            <div className="coast-plan-itinerary__photo coast-plan-itinerary__photo--next">
              <img className={hotelIndex === 0 ? "is-crop-b" : "is-cover"} src={hotelNext.src} alt="" />
            </div>
            <button
              className="coast-plan-itinerary__pager coast-plan-itinerary__pager--prev"
              type="button"
              aria-label="이전 사진"
              onClick={() => setHotelIndex((index) => (index + HOTEL_SLIDES.length - 1) % HOTEL_SLIDES.length)}
            >
              <img src={pagerPrev} alt="" />
            </button>
            <p className="coast-plan-itinerary__fraction" aria-label={`${hotelIndex + 1} / ${HOTEL_SLIDES.length}`}>
              <span>{hotelIndex + 1}</span>
              <span>/</span>
              <span>{HOTEL_SLIDES.length}</span>
            </p>
            <button
              className="coast-plan-itinerary__pager coast-plan-itinerary__pager--next"
              type="button"
              aria-label="다음 사진"
              onClick={() => setHotelIndex((index) => (index + 1) % HOTEL_SLIDES.length)}
            >
              <img src={pagerNext} alt="" />
            </button>
            <p className="coast-plan-itinerary__tip-label">TIP</p>
            <p className="coast-plan-itinerary__tip">
              오브, 울릉는 동해의 일출을 감상 할 수 있는
              <br />
              바다전망을 기본적으로 제공해드리고 있습니다
            </p>
            <img className="coast-plan-itinerary__split" src={splitRule} alt="" />
            <h2 className="coast-plan-itinerary__include-title">INCLUSIONS</h2>
            <p className="coast-plan-itinerary__chip coast-plan-itinerary__chip--inclusions">포함사항</p>
            <p className="coast-plan-itinerary__include-sub">두번째 여정의 포함사항입니다</p>
            {HOTEL_INCLUSIONS.map((item) => (
              <p key={item.text} className="coast-plan-itinerary__include-item" style={{ top: `calc(${item.top} / 850 * 100cqb)` }}>
                {item.text}
              </p>
            ))}
          </section>

          <section className="coast-plan-itinerary__screen">
            <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
            <img
              className="coast-plan-itinerary__split"
              style={{ top: "calc(96 / 850 * 100cqb)", left: "calc(32 / 434 * 100cqi)" }}
              src={splitRule}
              alt=""
            />
            <h2 className="coast-plan-itinerary__include-title" style={{ top: "calc(136 / 850 * 100cqb)", left: "calc(32 / 434 * 100cqi)" }}>
              INCLUSIONS
            </h2>
            <p className="coast-plan-itinerary__chip" style={{ top: "calc(136 / 850 * 100cqb)", left: "calc(339 / 434 * 100cqi)" }}>
              포함사항
            </p>
            <p className="coast-plan-itinerary__include-sub" style={{ top: "calc(165 / 850 * 100cqb)", left: "calc(31 / 434 * 100cqi)" }}>
              두번째 여정의 포함사항입니다
            </p>
            {INCLUSION_DETAIL.map((item) => (
              <p
                key={item.text}
                className="coast-plan-itinerary__include-item"
                style={{ top: `calc(${item.top} / 850 * 100cqb)`, left: "calc(27 / 434 * 100cqi)" }}
              >
                {item.text}
              </p>
            ))}
            <img
              className="coast-plan-itinerary__split"
              style={{ top: "calc(552 / 850 * 100cqb)", left: "calc(27 / 434 * 100cqi)" }}
              src={splitRule}
              alt=""
            />
            <img className="coast-plan-itinerary__kit-icon" src={kitIcon} alt="" />
            <p className="coast-plan-itinerary__kit-note">
              {"dokdo goods : 독도 굿즈는 사전에 신청한 독도티셔츠와 독도 타올, 독도엽서\n                           독도 손거을, 독도 핀버튼 등이 포함되어 있습니다"}
            </p>
            <img
              className="coast-plan-itinerary__split"
              style={{ top: "calc(603 / 850 * 100cqb)", left: "calc(26 / 434 * 100cqi)" }}
              src={splitRule}
              alt=""
            />
            <h2 className="coast-plan-itinerary__include-title" style={{ top: "calc(649 / 850 * 100cqb)", left: "calc(32 / 434 * 100cqi)" }}>
              TOURIST SPORT
            </h2>
            <p className="coast-plan-itinerary__chip" style={{ top: "calc(650 / 850 * 100cqb)", left: "calc(339 / 434 * 100cqi)" }}>
              주요관광
            </p>
            <p className="coast-plan-itinerary__include-sub" style={{ top: "calc(678 / 850 * 100cqb)", left: "calc(32 / 434 * 100cqi)" }}>
              첫번째 여정의 주요 관광지입니다
            </p>
            <div className="coast-plan-itinerary__peek coast-plan-itinerary__peek--main">
              <img className={spotIndex === 0 ? undefined : "is-cover"} src={spotMain.src} alt={spotMain.alt} />
            </div>
            <div className="coast-plan-itinerary__peek coast-plan-itinerary__peek--next">
              <img className={spotIndex === 0 ? undefined : "is-cover"} src={spotNext.src} alt="" />
            </div>
          </section>

          <section className="coast-plan-itinerary__screen">
            <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
            <img
              className="coast-plan-itinerary__split"
              style={{ top: "calc(93 / 850 * 100cqb)", left: "calc(27 / 434 * 100cqi)" }}
              src={splitRule}
              alt=""
            />
            <h2 className="coast-plan-itinerary__include-title" style={{ top: "calc(133 / 850 * 100cqb)", left: "calc(27 / 434 * 100cqi)" }}>
              TOURIST SPORT
            </h2>
            <p className="coast-plan-itinerary__chip" style={{ top: "calc(133 / 850 * 100cqb)", left: "calc(334 / 434 * 100cqi)" }}>
              주요관광
            </p>
            <p className="coast-plan-itinerary__include-sub" style={{ top: "calc(162 / 850 * 100cqb)", left: "calc(26 / 434 * 100cqi)" }}>
              첫번째 여정의 주요 관광지입니다
            </p>
            <div
              className="coast-plan-itinerary__spot coast-plan-itinerary__spot--main"
              onPointerDown={onSpotPointerDown}
              onPointerUp={onSpotPointerUp}
              onPointerCancel={() => {
                spotDragX.current = null;
              }}
            >
              <img className={spotIndex === 0 ? undefined : "is-cover"} src={spotMain.src} alt={spotMain.alt} />
            </div>
            <div
              className="coast-plan-itinerary__spot coast-plan-itinerary__spot--next"
              onPointerDown={onSpotPointerDown}
              onPointerUp={onSpotPointerUp}
              onPointerCancel={() => {
                spotDragX.current = null;
              }}
            >
              <img className={spotIndex === 0 ? undefined : "is-cover"} src={spotNext.src} alt="" />
            </div>
            <button
              className="coast-plan-itinerary__pager coast-plan-itinerary__pager--spot-prev"
              type="button"
              aria-label="이전 사진"
              onClick={() => stepSpot(-1)}
            >
              <img src={arrowPrev} alt="" />
            </button>
            <p className="coast-plan-itinerary__fraction coast-plan-itinerary__fraction--spot" aria-label={`${spotIndex + 1} / ${SPOT_SLIDES.length}`}>
              <span>{spotIndex + 1}</span>
              <span>/</span>
              <span>{SPOT_SLIDES.length}</span>
            </p>
            <button
              className="coast-plan-itinerary__pager coast-plan-itinerary__pager--spot-next"
              type="button"
              aria-label="다음 사진"
              onClick={() => stepSpot(1)}
            >
              <img src={arrowNext} alt="" />
            </button>
            <p className="coast-plan-itinerary__spot-name">관음도</p>
            <p className="coast-plan-itinerary__spot-copy">
              관음도는 울릉도 북동쪽에 위치한 작은 섬으로, ‘깍새섬’이라고도 불리며, 울릉도와 연결된 다리를 건너며 푸른 바다와 해안 절벽을 감상할 수 있습니다.
            </p>
            <ul className="coast-plan-itinerary__spot-meta">
              <li>입장료 : 1인 1매 포함</li>
              <li>소요시간 : 약 90분</li>
            </ul>
            <ul className="coast-plan-itinerary__spot-meta coast-plan-itinerary__spot-meta--side">
              <li>전문 인솔자 동행, 지질 해설</li>
            </ul>
            <img
              className="coast-plan-itinerary__split"
              style={{ top: "calc(770 / 850 * 100cqb)", left: "calc(24 / 434 * 100cqi)" }}
              src={splitRule}
              alt=""
            />
          </section>

          <section className="coast-plan-itinerary__screen">
            <img className="coast-plan-itinerary__outro-sheet" src={outroSheet} alt="" />
            <h2 className="coast-plan-itinerary__outro-title">
              <span>{`<오브, 울릉>의  두번째 여정은`}</span>
              <span>부족함 없는 울릉도,독도입니다</span>
            </h2>
            <img className="coast-plan-day2__diagram" src={benefits} alt="" />
            <p className="coast-plan-day2__num coast-plan-day2__num--1">1</p>
            <p className="coast-plan-day2__num coast-plan-day2__num--2">2</p>
            <p className="coast-plan-day2__num coast-plan-day2__num--3">3</p>
            <p className="coast-plan-day2__cap coast-plan-day2__cap--end" style={{ top: "calc(219 / 850 * 100cqb)" }}>
              Benefit
            </p>
            <p className="coast-plan-day2__blurb coast-plan-day2__blurb--end" style={{ top: "calc(249 / 850 * 100cqb)" }}>
              <span>비즈니스 독도투어를</span>
              <span>비롯해서 다양한 굿즈</span>
              <span>등을 부족함 없이 제공</span>
            </p>
            <p className="coast-plan-day2__cap coast-plan-day2__cap--start" style={{ top: "calc(345 / 850 * 100cqb)" }}>
              Give
            </p>
            <p className="coast-plan-day2__blurb coast-plan-day2__blurb--start" style={{ top: "calc(375 / 850 * 100cqb)" }}>
              <span>베이커리 카페, 티 그리고</span>
              <span>다양한 디저트와 고급요리</span>
              <span>까지 아낌없이 제공</span>
            </p>
            <p className="coast-plan-day2__cap coast-plan-day2__cap--end" style={{ top: "calc(467 / 850 * 100cqb)" }}>
              Special
            </p>
            <p className="coast-plan-day2__blurb coast-plan-day2__blurb--end" style={{ top: "calc(497 / 850 * 100cqb)" }}>
              <span>울릉도, 독도의 모든</span>
              <span>투어와 입장료까지</span>
              <span>포함한 특별한 여정</span>
            </p>
            <img className="coast-plan-itinerary__outro-line coast-plan-day2__rule" src={outroLine} alt="" />
            <p className="coast-plan-itinerary__outro-q coast-plan-day2__q">{`<오브, 울릉>의 두번째 여정은?`}</p>
            <p className="coast-plan-itinerary__outro-copy coast-plan-day2__body">
              <span>모든 입장료와 투어 그리고 커피와 디저트까지</span>
              <span>오브, 울릉의 여정에 있어 부족함은 없습니다</span>
            </p>
            <p className="coast-plan-itinerary__outro-cta">Want to check out the 2-day plan?</p>
            <button className="coast-plan-itinerary__outro-next" type="button" onClick={() => navigate("/coast/plan", { state: { instant: true } })}>
              NEXT
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
