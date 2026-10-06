import type { CSSProperties, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoAube from "../assets/common/logo-aube.svg";
import backIcon from "../assets/coast-ready/ready-back.svg";
import divider from "../assets/coast-ready/ready-divider.svg";
import dot from "../assets/coast-ready/ready-dot.svg";
import dotAlt from "../assets/coast-ready/ready-dot-alt.svg";
import logoBlack from "../assets/coast-ready/ready-logo.png";
import mdDot from "../assets/coast-ready/ready-md-dot.svg";
import mdLine from "../assets/coast-ready/ready-md-line.svg";
import header from "../assets/coast-ready/ready-header.svg";
import orbit from "../assets/coast-ready/ready-orbit.svg";
import route from "../assets/coast-ready/ready-path.svg";
import brand from "../assets/hotel-intro/brand.svg";
import "../styles/viewport-full.css";
import "../styles/coast-ready.css";

type TextProps = {
  top: number;
  left: number;
  className?: string;
  align?: "mid" | "right";
  children: ReactNode;
};

function Text({ top, left, className = "", align, children }: TextProps) {
  const alignClass = align ? ` coast-ready__text--${align}` : "";
  return (
    <p
      className={`coast-ready__text ${className}${alignClass}`}
      style={{ top: `calc(${top} / 850 * 100cqb)`, left: `calc(${left} / 434 * 100cqi)` }}
    >
      {children}
    </p>
  );
}

const D_DAY_DOTS = [
  { top: 356, left: 55, src: dot },
  { top: 414, left: 368, src: dot },
  { top: 520, left: 55, src: dot },
  { top: 629, left: 368, src: dotAlt },
  { top: 686, left: 51, src: dot },
];

const MD_STEPS = [
  { no: "01", title: "MD배정", lines: ["문의부터 여정의 끝남과 사후관리까지", "단 1명의 전문 상담사가 서비스를 지원"], mid: 319.5, desc: 340, tight: true },
  { no: "02", title: "상담지원", lines: ["고객님 원하는 시간대에 맞춰 경력 7년", "이상의 MD(상담사)가 여행서비스 지원"], mid: 418.5, desc: 439 },
  { no: "03", title: "예약보조", lines: ["지정된 MD가 예약부터 결제, 현금영수증", "까지 일괄 업무를 지원해드리는 서비스"], mid: 517.5, desc: 538 },
  { no: "04", title: "여행업무", lines: ["준비물부터 여행계획까지 여행에 필요한", "모든 체크리스트를 확인해주는 비즈니스"], mid: 618.5, desc: 639, soft: true },
  { no: "05", title: "사후관리", lines: ["여행 종료 후 앨범선물관리와 울릉도 여행", "만족도 및 개선사항 등을 지속적으로 관리"], mid: 719.5, desc: 740, soft: true },
];

const MD_DOT_TOPS = [315, 415, 515, 615, 715];

const PREMIUM_GROUPS = [
  {
    title: "안전여행",
    left: 65,
    mid: 233.5,
    desc: 254,
    lines: ["울릉도 경력 60회 이상의 CPR교육을 이수한", "전문인솔자가 동행하는 VIP 울릉도입니다"],
    tags: ["guide", "vip van", "safety"],
    tagMid: 305.5,
  },
  {
    title: "특별 서비스",
    left: 24,
    mid: 437.5,
    desc: 458,
    lines: ["여행상담부터 굿즈, 스파, 커피 등", "최상의 부가 서비스가 제공됩니다"],
    tags: ["goods", "spa & tea", "premium"],
    tagMid: 509.5,
  },
  {
    title: "프리미엄",
    left: 65,
    mid: 631.5,
    desc: 652,
    lines: ["퍼스트클래스부터 오션뷰 그리고 파인다이닝", "단독행사까지 모든 제반사항이 최고급입니다"],
    tags: ["first class", "ramada hotel", "fine dining"],
    tagMid: 706.5,
  },
];

function Screen({ backTop, onBack, children }: { backTop: number; onBack: () => void; children: ReactNode }) {
  return (
    <section className="coast-ready__screen">
      {children}
      <img className="coast-ready__header" src={header} alt="" />
      <div className="coast-ready__header-logo">
        <img className="coast-ready__header-brand" src={brand} alt="" />
        <img className="coast-ready__header-aube" src={logoAube} alt="AUBE" />
      </div>
      <button
        className="coast-ready__back"
        type="button"
        style={{ "--back-top": backTop } as CSSProperties}
        onClick={onBack}
      >
        <img className="coast-ready__back-icon" src={backIcon} alt="" />
        Back
      </button>
    </section>
  );
}

export default function CoastReadyPage() {
  const navigate = useNavigate();
  const navState = useLocation().state as { fadeIn?: boolean; pullIn?: boolean } | null;
  const fadeIn = Boolean(navState?.fadeIn);
  const pullIn = Boolean(navState?.pullIn);
  const goBack = () => navigate("/coast");

  return (
    <main
      className={`vf coast-ready${fadeIn ? " coast-ready--fade-in" : ""}${pullIn ? " coast-ready--pull-in" : ""}`}
    >
      <div className="vf__stage coast-ready__stage">
        <Screen backTop={28} onBack={goBack}>
          <div className="coast-ready__title" style={{ top: "calc(129 / 850 * 100cqb)" }}>
            <p>{"<오브,울릉>은 출발 전 부터"}</p>
            <p>전문상담사가 안내를 도와드립니다</p>
          </div>
          <img className="coast-ready__divider" src={divider} alt="" style={{ left: "calc(34 / 434 * 100cqi)" }} />
          <img className="coast-ready__route" src={route} alt="" />
          {D_DAY_DOTS.map((item) => (
            <img
              key={`${item.top}-${item.left}`}
              className="coast-ready__dot"
              src={item.src}
              alt=""
              style={{ top: `calc(${item.top} / 850 * 100cqb)`, left: `calc(${item.left} / 434 * 100cqi)` }}
            />
          ))}

          <Text top={287.5} left={56} className="coast-ready__label" align="mid">D-15</Text>
          <Text top={312.5} left={56} className="coast-ready__body" align="mid">
            항구까지 오실 수 있도록 전용상담사가 교통편를 안내해드립니다
          </Text>
          <Text top={324} left={56} className="coast-ready__note">
            포항 KTX 시간안내, 항구 주차장 이용안내 및 주차장 요금 미팅 안내
          </Text>

          <Text top={409.5} left={348} className="coast-ready__label" align="right">D-10</Text>
          <Text top={428.5} left={348} className="coast-ready__label coast-ready__label--dim" align="right">
            준비물, 여행일정 등 다양한 상담이 시작됩니다
          </Text>

          <Text top={516.5} left={84} className="coast-ready__label" align="mid">D-7</Text>
          <Text top={535.5} left={84} className="coast-ready__label coast-ready__label--dim" align="mid">
            독도티셔츠, 명찰, 굿즈제작 등 물품이 준비됩니다
          </Text>

          <Text top={624.5} left={348} className="coast-ready__label" align="right">D-5</Text>
          <Text top={643.5} left={348} className="coast-ready__label" align="right">
            기상상황, 보험가입 등 안전에 관한 준비를 합니다
          </Text>

          <Text top={726.5} left={56} className="coast-ready__label" align="mid">D-1</Text>
          <Text top={751.5} left={55} className="coast-ready__body" align="mid">
            전문상담사가 최종적으로 여행 전 모든 체크리스트를 확인합니다
          </Text>
          <Text top={763} left={55} className="coast-ready__note coast-ready__note--narrow">
            인솔자 배정, 준비물 재확인, 보험 및 물품 구성 등 여행에 관한 재안내
          </Text>
        </Screen>

        <Screen backTop={27} onBack={goBack}>
          <Text top={141} left={68} className="coast-ready__heading" align="mid">MD 전문상담사 서비스</Text>
          <Text top={162} left={68} className="coast-ready__lead">
            {"<오브,울릉>에서는 고객님만을 위한  전용 MD가 다양한 상담을 지원합니다"}
          </Text>
          <img className="coast-ready__divider" src={divider} alt="" style={{ left: "calc(40 / 434 * 100cqi)" }} />
          <img className="coast-ready__md-line" src={mdLine} alt="" />
          {MD_DOT_TOPS.map((top) => (
            <img
              key={top}
              className="coast-ready__md-dot"
              src={mdDot}
              alt=""
              style={{ top: `calc(${top} / 850 * 100cqb)` }}
            />
          ))}
          {MD_STEPS.map((step) => (
            <div key={step.no} className={step.soft ? "coast-ready__md-step--soft" : undefined}>
              <Text top={step.mid} left={100} className="coast-ready__step coast-ready__md-no" align="mid">{step.no}</Text>
              <Text top={step.mid} left={180} className="coast-ready__step coast-ready__md-title" align="mid">{step.title}</Text>
              <Text
                top={step.desc}
                left={180}
                className={`coast-ready__note coast-ready__md-desc${step.tight ? " coast-ready__note--tight" : ""}`}
              >
                {step.lines[0]}
                <br />
                {step.lines[1]}
              </Text>
            </div>
          ))}
        </Screen>

        <Screen backTop={27} onBack={goBack}>
          <p className="coast-ready__title coast-ready__title--wide" style={{ top: "calc(122 / 850 * 100cqb)" }}>
            {"<오브,울릉> 프리미엄 패키지입니다"}
          </p>
          <img className="coast-ready__orbit" src={orbit} alt="" />
          <img className="coast-ready__logo" src={logoBlack} alt="AUBE" />
          <p className="coast-ready__logo-sub">Ulleungdo, Dokdo</p>
          {PREMIUM_GROUPS.map((group) => (
            <div key={group.title}>
              <Text top={group.mid} left={group.left} className="coast-ready__step coast-ready__premium-title" align="mid">
                {group.title}
              </Text>
              <Text top={group.desc} left={group.left} className="coast-ready__note coast-ready__note--tight coast-ready__premium-desc">
                {group.lines[0]}
                <br />
                {group.lines[1]}
              </Text>
              {group.tags.map((tag, index) => (
                <Text
                  key={tag}
                  top={group.tagMid + index * 19}
                  left={group.left}
                  className="coast-ready__tag"
                  align="mid"
                >
                  {tag}
                </Text>
              ))}
            </div>
          ))}
        </Screen>
      </div>
    </main>
  );
}
