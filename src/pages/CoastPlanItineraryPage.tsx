import { useRef, useState, type PointerEvent } from "react";
import { useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import day1Sheet from "../assets/coast-plan/day1-sheet.svg";
import feeIcon from "../assets/coast-plan/itinerary-fee.svg";
import hotelLobby from "../assets/coast-plan/itinerary-hotel-a.png";
import hotelTerrace from "../assets/coast-plan/itinerary-hotel-b.png";
import pagerNext from "../assets/coast-plan/itinerary-pager-next.svg";
import pagerPrev from "../assets/coast-plan/itinerary-pager-prev.svg";
import splitRule from "../assets/coast-plan/itinerary-rule.svg";
import kitIcon from "../assets/coast-plan/itinerary-kit.svg";
import stem111 from "../assets/coast-plan/itinerary-stem-111.svg";
import stem133 from "../assets/coast-plan/itinerary-stem-133.svg";
import stem139 from "../assets/coast-plan/itinerary-stem-139.svg";
import stem168 from "../assets/coast-plan/itinerary-stem-168.svg";
import stem203 from "../assets/coast-plan/itinerary-stem-203.svg";
import stem408 from "../assets/coast-plan/itinerary-stem.svg";
import stem52 from "../assets/coast-plan/itinerary-stem-52.svg";
import arrowNext from "../assets/coast-plan/itinerary-arrow-next.svg";
import arrowPrev from "../assets/coast-plan/itinerary-arrow-prev.svg";
import outroSheet from "../assets/coast-plan/itinerary-sheet-118.svg";
import processRing from "../assets/coast-plan/itinerary-ring.svg";
import orbitDot from "../assets/coast-plan/itinerary-dot.svg";
import orbitDotActive from "../assets/coast-plan/itinerary-dot-active.svg";
import ringLogo from "../assets/coast-plan/itinerary-ring-logo.png";
import introPhoto from "../assets/coast-plan/itinerary-intro-photo.png";
import outroLine from "../assets/coast-plan/itinerary-line-16.svg";
import spotBridge from "../assets/coast-plan/itinerary-spot-a.png";
import spotCliff from "../assets/coast-plan/itinerary-spot-b.png";
import coastPine from "../assets/coast-pine/coast-pine-poster.jpg";
import coastWave from "../assets/coast/coast-wave-poster.jpg";
import scheduleCliff from "../assets/coast-schedule/schedule-cliff.webp";
import ramadaExterior from "../assets/ramada/ramada-exterior.webp";
import ramadaTerrace from "../assets/ramada/ramada-terrace.webp";
import ramadaOcean from "../assets/ramada/ramada-room-ocean.webp";
import ramadaTwin from "../assets/ramada/ramada-room-twin.webp";
import "../styles/viewport-full.css";
import "../styles/coast-plan-day1.css";
import "../styles/coast-plan-itinerary.css";

function Stem({ top, height, left = 119, src }: { top: number; height: number; left?: number; src: string }) {
  return (
    <img
      className="coast-plan-itinerary__stem"
      style={{
        top: `calc(${top} / 850 * 100cqb)`,
        left: `calc(${left} / 434 * 100cqi)`,
        height: `calc(${height} / 850 * 100cqb)`,
      }}
      src={src}
      alt=""
    />
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

const INCLUSIONS = [
  { top: 686, text: "•엘도라도 First Class" },
  { top: 714, text: "•Welcome kit" },
  { top: 742, text: "•전문 인솔자 동행" },
  { top: 770, text: "•오브, 울릉 Snack box" },
  { top: 798, text: "•심층수 1병" },
];

const INCLUSION_DETAIL = [
  { top: 199, left: 27, text: "•엘도라도 First Class" },
  { top: 227, left: 27, text: "•Welcome kit" },
  { top: 255, left: 27, text: "•전문 인솔자 동행" },
  { top: 283, left: 27, text: "•오브, 울릉 Snack box" },
  { top: 311, left: 27, text: "•심층수 1병, 미니 간식 제공" },
  { top: 339, left: 27, text: "•Vip van (4명~6명 단독행사)" },
  { top: 367, left: 27, text: "•Special lunch 1회" },
  { top: 395, left: 30, text: "•Fine  dining 1회" },
  { top: 423, left: 30, text: "•Ramada hotel deluxe ocean view 2박" },
  { top: 451, left: 29, text: "•호박 식혜, 음료 제공" },
  { top: 479, left: 30, text: "•coffee 1회, herbal tea 1회 제공" },
  { top: 507, left: 30, text: "•Premium Tour  5h / night tour 1h / spa 1회" },
];

export default function CoastPlanItineraryPage() {
  const navigate = useNavigate();
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
    <main className="vf coast-plan-day1 coast-plan-itinerary">
      <div className="vf__stage coast-plan-day1__stage">
        <header
          className="coast-plan-day1__top coast-plan-itinerary__header"
          style={{ background: "linear-gradient(90deg, #74A7B5 0%, #27575E 42.3077%, #0E1F24 100%)" }}
        >
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

        <Stem top={334} height={111} src={stem111} />
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

        <Stem top={512} height={133} src={stem133} />
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

        <Stem top={716} height={52} src={stem52} />
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
          <Stem top={111} height={139} left={122} src={stem139} />
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

          <Stem top={320} height={168} left={122} src={stem168} />
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

          <Stem top={559} height={203} left={122} src={stem203} />
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

        <section className="coast-plan-itinerary__screen">
          <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
          <Stem top={105} height={408} src={stem408} />
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
          <p className="coast-plan-itinerary__include-sub">첫번째 여정의 포함사항입니다</p>
          {INCLUSIONS.map((item) => (
            <p
              key={item.text}
              className="coast-plan-itinerary__include-item"
              style={{ top: `calc(${item.top} / 850 * 100cqb)` }}
            >
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
          <h2
            className="coast-plan-itinerary__include-title"
            style={{ top: "calc(136 / 850 * 100cqb)", left: "calc(32 / 434 * 100cqi)" }}
          >
            INCLUSIONS
          </h2>
          <p
            className="coast-plan-itinerary__chip"
            style={{ top: "calc(136 / 850 * 100cqb)", left: "calc(339 / 434 * 100cqi)" }}
          >
            포함사항
          </p>
          <p
            className="coast-plan-itinerary__include-sub"
            style={{ top: "calc(165 / 850 * 100cqb)", left: "calc(31 / 434 * 100cqi)" }}
          >
            첫번째 여정의 포함사항입니다
          </p>
          {INCLUSION_DETAIL.map((item) => (
            <p
              key={item.text}
              className="coast-plan-itinerary__include-item"
              style={{
                top: `calc(${item.top} / 850 * 100cqb)`,
                left: `calc(${item.left} / 434 * 100cqi)`,
              }}
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
            {"welcome kit : 오브울릉 에코백, 엽서 3종, 독도 핀버튼, 일회용 실내화, 수면안대, \n                         멀미약, 독도손거울, 독도물티슈가 들어 있습니다"}
          </p>
          <img
            className="coast-plan-itinerary__split"
            style={{ top: "calc(603 / 850 * 100cqb)", left: "calc(26 / 434 * 100cqi)" }}
            src={splitRule}
            alt=""
          />
          <h2
            className="coast-plan-itinerary__include-title"
            style={{ top: "calc(649 / 850 * 100cqb)", left: "calc(32 / 434 * 100cqi)" }}
          >
            TOURIST SPORT
          </h2>
          <p
            className="coast-plan-itinerary__chip"
            style={{ top: "calc(650 / 850 * 100cqb)", left: "calc(339 / 434 * 100cqi)" }}
          >
            주요관광
          </p>
          <p
            className="coast-plan-itinerary__include-sub"
            style={{ top: "calc(678 / 850 * 100cqb)", left: "calc(32 / 434 * 100cqi)" }}
          >
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
          <h2
            className="coast-plan-itinerary__include-title"
            style={{ top: "calc(133 / 850 * 100cqb)", left: "calc(27 / 434 * 100cqi)" }}
          >
            TOURIST SPORT
          </h2>
          <p
            className="coast-plan-itinerary__chip"
            style={{ top: "calc(133 / 850 * 100cqb)", left: "calc(334 / 434 * 100cqi)" }}
          >
            주요관광
          </p>
          <p
            className="coast-plan-itinerary__include-sub"
            style={{ top: "calc(162 / 850 * 100cqb)", left: "calc(26 / 434 * 100cqi)" }}
          >
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
            <span>{`<오브, 울릉>의  첫번째 여정은`}</span>
            <span>남들과 다른 울릉도입니다</span>
          </h2>
          <img className="coast-plan-itinerary__ring" src={processRing} alt="" />
          <img className="coast-plan-itinerary__orbit-dot" style={{ top: "calc(229.89 / 850 * 100cqb)", left: "calc(133.22 / 434 * 100cqi)" }} src={orbitDot} alt="" />
          <img className="coast-plan-itinerary__orbit-dot" style={{ top: "calc(313.74 / 850 * 100cqb)", left: "calc(143.44 / 434 * 100cqi)" }} src={orbitDot} alt="" />
          <img className="coast-plan-itinerary__orbit-dot" style={{ top: "calc(346.8 / 850 * 100cqb)", left: "calc(210.17 / 434 * 100cqi)" }} src={orbitDotActive} alt="" />
          <img className="coast-plan-itinerary__orbit-dot" style={{ top: "calc(313.74 / 850 * 100cqb)", left: "calc(277.19 / 434 * 100cqi)" }} src={orbitDot} alt="" />
          <img className="coast-plan-itinerary__orbit-dot" style={{ top: "calc(229.89 / 850 * 100cqb)", left: "calc(287.1 / 434 * 100cqi)" }} src={orbitDot} alt="" />
          <p className="coast-plan-itinerary__orbit" style={{ top: "calc(224 / 850 * 100cqb)", left: "calc(92 / 434 * 100cqi)" }}>
            <span>special</span>
            <span>특별한 투어</span>
          </p>
          <p className="coast-plan-itinerary__orbit" style={{ top: "calc(305 / 850 * 100cqb)", left: "calc(92 / 434 * 100cqi)" }}>
            <span>mamber</span>
            <span>소수 단독행사</span>
          </p>
          <p className="coast-plan-itinerary__orbit" style={{ top: "calc(362 / 850 * 100cqb)", left: "calc(215 / 434 * 100cqi)" }}>
            <span>dilicious</span>
            <span>제철음식 제공</span>
          </p>
          <p className="coast-plan-itinerary__orbit" style={{ top: "calc(221 / 850 * 100cqb)", left: "calc(338 / 434 * 100cqi)" }}>
            <span>goods</span>
            <span>다양한 선물</span>
          </p>
          <p className="coast-plan-itinerary__orbit" style={{ top: "calc(305 / 850 * 100cqb)", left: "calc(338 / 434 * 100cqi)" }}>
            <span>service</span>
            <span>전문적 서비스</span>
          </p>
          <div className="coast-plan-itinerary__ring-logo">
            <img src={ringLogo} alt="AUBE" />
          </div>
          <img className="coast-plan-itinerary__outro-line" src={outroLine} alt="" />
          <div className="coast-plan-itinerary__outro-photo">
            <img src={introPhoto} alt="" />
          </div>
          <p className="coast-plan-itinerary__outro-q">{`<오브, 울릉>의 첫번째 여정은?`}</p>
          <p className="coast-plan-itinerary__outro-copy">
            <span>프미리엄 울릉도 패키지 {`<오브, 울릉>`}은 전문</span>
            <span className="is-tracked">인솔자 동행을 비롯해 4~6명의 소규모 여행</span>
            <span>으로 안락하고 프라이빗한 vip 행사입니다</span>
          </p>
          <p className="coast-plan-itinerary__outro-copy coast-plan-itinerary__outro-copy--next">
            <span>퍼스트 클래스를 타고 편안한 이동시간을 즐기며</span>
            <span>웰컴키트와 스낵박스 그리고 나이트투어와 힐링</span>
            <span>트래킹 투어를 통해서 마음이 즐거운 여정입니다</span>
          </p>
          <p className="coast-plan-itinerary__outro-cta">Want to check out the 2-day plan?</p>
          <button className="coast-plan-itinerary__outro-next" type="button" onClick={() => navigate("/coast/plan")}>
            NEXT
          </button>
        </section>
        </div>
      </div>
    </main>
  );
}
