import { useRef, useState, type PointerEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import day1Sheet from "../assets/coast-plan/day1-sheet.svg";
import feeIcon from "../assets/coast-plan/itinerary-fee.svg";
import splitRule from "../assets/coast-plan/itinerary-rule.svg";
import kitIcon from "../assets/coast-plan/itinerary-kit.svg";
import arrowNext from "../assets/coast-plan/itinerary-arrow-next.svg";
import arrowPrev from "../assets/coast-plan/itinerary-arrow-prev.svg";
import outroSheet from "../assets/coast-plan/itinerary-sheet-118.svg";
import outroLine from "../assets/coast-plan/itinerary-line-16.svg";
import ringLogo from "../assets/coast-plan/itinerary-ring-logo.webp";
import spotBridge from "../assets/coast-plan/itinerary-spot-a.webp";
import spotCliff from "../assets/coast-plan/itinerary-spot-b.webp";
import coastPine from "../assets/coast-pine/coast-pine-poster.jpg";
import coastWave from "../assets/coast/coast-wave-poster.jpg";
import scheduleCliff from "../assets/coast-schedule/schedule-cliff.webp";
import ramadaExterior from "../assets/ramada/ramada-exterior.webp";
import ramadaTerrace from "../assets/ramada/ramada-terrace.webp";
import ramadaOcean from "../assets/ramada/ramada-room-ocean.webp";
import stem99 from "../assets/coast-plan/day3-stem-99.svg";
import stem42 from "../assets/coast-plan/day3-stem-42.svg";
import stem91 from "../assets/coast-plan/day3-stem-91.svg";
import stem55 from "../assets/coast-plan/day3-stem-55.svg";
import stem283 from "../assets/coast-plan/day3-stem-283.svg";
import stem61 from "../assets/coast-plan/day3-stem-61.svg";
import stem188 from "../assets/coast-plan/day3-stem-188.svg";
import routeArrow from "../assets/coast-plan/day3-route-arrow.svg";
import albumPhoto from "../assets/coast-plan/day3-album.jpg";
import orbitRing from "../assets/coast-plan/day3-orbit.svg";
import orbitPhoto from "../assets/coast-plan/day3-orbit-photo.webp";
import orbitDot from "../assets/coast-plan/day3-orbit-dot.svg";
import "../styles/viewport-full.css";
import "../styles/coast-plan-day1.css";
import "../styles/coast-plan-itinerary.css";
import "../styles/coast-plan-day2.css";
import "../styles/coast-plan-day3.css";

function Stem({ top, box, width, src }: { top: number; box: number; width: number; src: string }) {
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

const INCLUSIONS = [
  { top: 199, text: "•check out service" },
  { top: 227, text: "•조식, 점심 특선" },
  { top: 255, text: "•해상유람선" },
  { top: 283, text: "•역사문화체험센터" },
  { top: 311, text: "•first class" },
  { top: 339, text: "•우산고로쇠물, 멀미약 제공" },
  { top: 367, text: "•셔틀 모범택시 제공" },
  { top: 395, text: "•전문 인솔자 동행" },
  { top: 423, text: "•앨범패키지" },
  { top: 451, text: "•독도명예주민증" },
];

const ALBUM_ITEMS = [
  { top: 639, text: "4k 사진 15p" },
  { top: 657, text: "usb 원본 제공" },
  { top: 675, text: "독도명예주민증" },
  { top: 693, text: "몽블랑재질 패키지" },
];

export default function CoastPlanDay3ItineraryPage() {
  const navigate = useNavigate();
  const navState = useLocation().state as { fadeIn?: boolean; pullIn?: boolean } | null;
  const fadeIn = Boolean(navState?.fadeIn);
  const pullIn = Boolean(navState?.pullIn);
  const [spotIndex, setSpotIndex] = useState(0);
  const spotDragX = useRef<number | null>(null);
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
      className={`vf coast-plan-day1 coast-plan-itinerary coast-plan-day3${fadeIn ? " coast-plan-day1--fade-in" : ""}${pullIn ? " coast-plan-day1--pull-in" : ""}`}
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
            <p className="coast-plan-itinerary__sub">세번째 여정의 일정표입니다</p>
            <p className="coast-plan-itinerary__chip">여행일정</p>
            <div className="coast-plan-itinerary__rule coast-plan-itinerary__rule--top" />
            <p className="coast-plan-itinerary__depart">Tour</p>
            <p className="coast-plan-itinerary__depart-ko">울릉도</p>
            <p className="coast-plan-itinerary__day" style={{ left: "calc(327 / 434 * 100cqi)" }}>
              DAY THREE
            </p>
            <p className="coast-plan-itinerary__day-ko">오브,울릉의 세번째 여정</p>
            <div className="coast-plan-itinerary__rule coast-plan-itinerary__rule--mid" />

            <Stem top={334} box={55} width={57.6667} src={stem55} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(326 / 850 * 100cqb)" }}>
              breakfast
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(326 / 850 * 100cqb)" }}>
              check out & 조식
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(356 / 850 * 100cqb)" }}>
              <span>• </span>luggage storage (짐 보관 서비스)
            </p>
            <More top={355} />
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(378 / 850 * 100cqb)" }}>
              <span>• </span>
              <strong>오징어내장탕</strong>
            </p>
            <More top={376} />

            <Stem top={457} box={91} width={93.6667} src={stem91} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(450 / 850 * 100cqb)" }}>
              tour III
            </p>
            <p className="coast-plan-itinerary__clock" style={{ top: "calc(469 / 850 * 100cqb)" }}>
              2h ~ 3h
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(449 / 850 * 100cqb)" }}>
              {"<오브,울릉>의 세번째 여정"}
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(479 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>짙푸른 동해 위에서의 <strong>해상유람선</strong>
            </p>
            <More top={479} />
            <p className="coast-plan-itinerary__fee" style={{ top: "calc(498 / 850 * 100cqb)", left: "calc(181 / 434 * 100cqi)" }}>
              <img src={feeIcon} alt="" />
              입장료 포함
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(519 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>울릉도 근대사를 간직한 <strong>역사문화체험센터</strong>
            </p>
            <p className="coast-plan-itinerary__fee" style={{ top: "calc(538 / 850 * 100cqb)", left: "calc(181 / 434 * 100cqi)" }}>
              <img src={feeIcon} alt="" />
              tea time 1인 1회 제공
            </p>

            <Stem top={615} box={42} width={44.6667} src={stem42} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(609 / 850 * 100cqb)" }}>
              free time
            </p>
            <p className="coast-plan-itinerary__copy" style={{ top: "calc(609 / 850 * 100cqb)", left: "calc(156 / 434 * 100cqi)" }}>
              식사 전 약 1시간의 자유시간을 제공하고
              <br />
              있으며, 추가적 일정이 가능합니다
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(646 / 850 * 100cqb)", left: "calc(157 / 434 * 100cqi)" }}>
              <span>• </span>독도박물관 또는 울릉군수 옛관사
            </p>

            <Stem top={725} box={99} width={101.667} src={stem99} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(717 / 850 * 100cqb)" }}>
              lunch
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(718 / 850 * 100cqb)" }}>
              점심 특선
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(747 / 850 * 100cqb)" }}>
              <span>• </span>홍합밥 정식
            </p>
            <More top={744} />
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(769 / 850 * 100cqb)" }}>
              <span>• </span>명이나물, 부지깽이 무침
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(791 / 850 * 100cqb)" }}>
              <span>• </span>울릉가자미 구이
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(813 / 850 * 100cqb)" }}>
              <span>• </span>울릉도 돌미역국
            </p>
          </section>

          <section className="coast-plan-itinerary__screen">
            <img className="coast-plan-day1__sheet" src={day1Sheet} alt="" />
            <Stem top={104} box={188} width={190.667} src={stem188} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(97 / 850 * 100cqb)" }}>
              boarding
            </p>
            <p className="coast-plan-itinerary__clock" style={{ top: "calc(116 / 850 * 100cqb)" }}>
              14:40 leave
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(97 / 850 * 100cqb)", whiteSpace: "nowrap" }}>
              울릉도
            </p>
            <img className="coast-plan-day3__route-arrow" src={routeArrow} alt="" />
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(97 / 850 * 100cqb)", left: "calc(213 / 434 * 100cqi)", whiteSpace: "nowrap" }}>
              포항여객선터미널
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(127 / 850 * 100cqb)" }}>
              <span>• </span>first class (최고 등급)
            </p>
            <More top={127} />
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(148 / 850 * 100cqb)" }}>
              <span>• </span>ferry : 엘도라도 익스프레스호
            </p>
            <More top={147} />
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(170 / 850 * 100cqb)" }}>
              <span>• </span>멀미약 제공
            </p>
            <p className="coast-plan-itinerary__bullet" style={{ top: "calc(192 / 850 * 100cqb)" }}>
              <span>• </span>우산고로쇠물 제공
            </p>
            <More top={192} />
            <p className="coast-plan-itinerary__tip-label" style={{ left: "calc(164 / 434 * 100cqi)", top: "calc(229 / 850 * 100cqb)" }}>
              TIP
            </p>
            <p className="coast-plan-itinerary__tip" style={{ left: "calc(164 / 434 * 100cqi)", top: "calc(247 / 850 * 100cqb)" }}>
              울릉도에서 포항까지 소요시간은 약 3시간입니다
            </p>
            <p className="coast-plan-itinerary__copy" style={{ top: "calc(267 / 850 * 100cqb)", left: "calc(164 / 434 * 100cqi)", width: "calc(240 / 434 * 100cqi)" }}>
              멀미약 복용 시간은 인솔자의 판단에 의해 현장에서
              <br />
              결정됩니다
            </p>

            <Stem top={367} box={61} width={63.6667} src={stem61} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(359 / 850 * 100cqb)" }}>
              arrive
            </p>
            <p className="coast-plan-itinerary__clock" style={{ top: "calc(378 / 850 * 100cqb)" }}>
              17:20~17:40
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(359 / 850 * 100cqb)" }}>
              {"<오브,울릉>의 셔틀운영"}
            </p>
            <p className="coast-plan-itinerary__copy" style={{ top: "calc(389 / 850 * 100cqb)", width: "calc(216 / 434 * 100cqi)" }}>
              대중교통 편의를 위하여 모범택시를 이용해
              <br />
              포항KTX역 또는 버스터미널까지 안전하게
              <br />
              수송을 무료 지원해드립니다
            </p>

            <Stem top={498} box={283} width={285.667} src={stem283} />
            <p className="coast-plan-itinerary__label" style={{ top: "calc(492 / 850 * 100cqb)", left: "calc(28 / 434 * 100cqi)" }}>
              after service
            </p>
            <p className="coast-plan-itinerary__stop" style={{ top: "calc(490 / 850 * 100cqb)" }}>
              앨범패키지
            </p>
            <p className="coast-plan-itinerary__copy" style={{ top: "calc(520 / 850 * 100cqb)", left: "calc(162 / 434 * 100cqi)", width: "calc(240 / 434 * 100cqi)" }}>
              울릉도, 독도 여정이 종료 된 후 10일~15일
              <br />
              이내 고객님들의 소중한 앨범을 선물합니다
            </p>
            <div className="coast-plan-day3__album">
              <img src={albumPhoto} alt="앨범 패키지" />
            </div>
            {ALBUM_ITEMS.map((item) => (
              <p key={item.text} className="coast-plan-day3__album-item" style={{ top: `calc(${item.top} / 850 * 100cqb)` }}>
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
              새번째 여정의 포함사항입니다
            </p>
            {INCLUSIONS.map((item) => (
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
              {"album  package : 오브,울릉의 앨범패키지는 고객님들의 소중한 모습을 촬영하여\n                                고급스러운 패키지의 앨범으로 드리는 선물입니다"}
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
              <span>{`<오브, 울릉>의  세번째 여정은`}</span>
              <span>끊임없는 만족입니다</span>
            </h2>
            <img className="coast-plan-day3__orbit" src={orbitRing} alt="" />
            <div className="coast-plan-day3__donut">
              <img src={orbitPhoto} alt="" />
            </div>
            <div className="coast-plan-day3__logo">
              <img src={ringLogo} alt="AUBE" />
            </div>
            <img className="coast-plan-day3__dot" style={{ top: "calc(219.3 / 850 * 100cqb)", left: "calc(144.7 / 434 * 100cqi)" }} src={orbitDot} alt="" />
            <img className="coast-plan-day3__dot" style={{ top: "calc(248.4 / 850 * 100cqb)", left: "calc(314.8 / 434 * 100cqi)" }} src={orbitDot} alt="" />
            <img className="coast-plan-day3__dot" style={{ top: "calc(499 / 850 * 100cqb)", left: "calc(210 / 434 * 100cqi)" }} src={orbitDot} alt="" />
            <p className="coast-plan-day3__orbit-label coast-plan-day3__orbit-label--left">귀가까지 책임지는 서비스</p>
            <p className="coast-plan-day3__orbit-label coast-plan-day3__orbit-label--right">여정의 모든걸 제공</p>
            <p className="coast-plan-day3__orbit-label coast-plan-day3__orbit-label--bottom">
              <span>끝없는 책임과</span>
              <span>고객 만족을 위한 노력</span>
            </p>
            <img className="coast-plan-itinerary__outro-line coast-plan-day3__close-rule" src={outroLine} alt="" />
            <p className="coast-plan-itinerary__outro-copy coast-plan-day3__close">
              <span>{"<오브,울릉>은 고객의 만족을 위해 끊임없는 노력과 끝없는 책임을 다하며 여정이 끝난"}</span>
              <span>후에도 고객의 찬란했던 추억을 간직하기 위해 다양한 서비스를 제공하고 있습니다</span>
            </p>
            <p className="coast-plan-itinerary__outro-cta">Shall we move to the reservation page?</p>
            <button
              className="coast-plan-itinerary__outro-next"
              type="button"
              onClick={() => navigate("/coast/plan", { state: { instant: true } })}
            >
              NEXT
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
