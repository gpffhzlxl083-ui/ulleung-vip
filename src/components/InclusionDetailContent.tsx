import { Link } from "react-router-dom";
import "../styles/inclusion-detail.css";

const INCLUSION_BASE = "/Image/inclusion";

const SECTIONS = [
  {
    title: "울릉도로 가는 교통경비",
    items: ["포항 - 울릉 선박료", "유류할증료, 여객터미널 항만세", "독도 쾌속선 (우등석)"],
  },
  {
    title: "인솔자의 동행 경비",
    items: ["인솔자 선박료, 숙식비", "울릉도 전문해설 경비 및 봉사료"],
  },
  {
    title: "울릉도에서 가장 좋은 잠자리",
    items: ["전 객실 OCEAN VIEW (바다전망)", "일정 2박 요금"],
  },
  {
    title: "우리들만의 울릉도 여행",
    items: ["2박 3일 관광버스 단독 대절비", "NO 옵션, NO 쇼핑, NO TIP", "유류대, 주차비 등"],
  },
  {
    title: "당신을 위한 울릉도 토속음식",
    items: [
      "마블링 최상급 약소구이",
      "시원한 물회와 얼큰한 울릉도식 매운탕",
      "깊은 바다 오징어로 만든 오삼불고기",
      "나리분지에서 먹는 산채의 향연 산채정식",
      "깊은바다 울릉도 해녀가 직접 잡은 담백한 홍합밥",
    ],
  },
  {
    title: "여유와 느림의 미학",
    items: [
      "심해 깊은 울릉도 심층수 (2회)",
      "넓은 동해가 보이는 카페에서 커피 제공 (2회)",
      "허브티와 다과",
    ],
  },
  {
    title: "울릉도 구석구석",
    items: [
      "관음도 관음교 이용 입장료",
      "올레 SPA & TEA 족욕 체험",
      "울릉도 10대 비경 태하모노레일",
      "저동 오징어길 나이트 투어",
      "유람선 투어, 죽도 투어, 렌트카 선택 경비",
    ],
  },
  {
    title: "추억에 남을 당신의 독도",
    items: ["소형 태극기, 독도 티셔츠, 독도 타월", "독도 퍼포먼스 경비"],
  },
  {
    title: "안전 그리고 건강",
    items: [
      "멀미약 3회 제공",
      "구급의약품 인솔자 구비",
      "안전자료 제공",
      "CPR 교육 이수 인솔자 동행",
    ],
  },
] as const;

function DetailSection({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="inclusion-detail__section">
      <h2 className="inclusion-detail__section-title">{title}</h2>
      <ul className="inclusion-detail__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function InclusionDetailContent() {
  return (
    <article className="inclusion-detail" aria-label="프리미엄 포함사항 상세">
      <div className="inclusion-detail__photos">
        <img
          src={`${INCLUSION_BASE}/inclusion-sea-sparkle.webp`}
          alt="울릉도 바다"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          src={`${INCLUSION_BASE}/inclusion-coastal-walkway.webp`}
          alt="울릉도 해안 산책로"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="inclusion-detail__culture-block">
        <div className="inclusion-detail__culture">
          <p className="inclusion-detail__culture-en">Humanity &amp; Culture</p>
          <p className="inclusion-detail__culture-ko">울릉도 문화와 삶 해설</p>
        </div>

        <div className="inclusion-detail__divider" aria-hidden="true" />
      </div>

      <div className="inclusion-detail__content">
        <p className="inclusion-detail__summary">
          <span className="inclusion-detail__summary-line">프리미엄 패키지는</span>
          <span className="inclusion-detail__summary-line">여행의 모든 경비를 포함하고 있습니다</span>
        </p>

        <div className="inclusion-detail__sections">
          {SECTIONS.map((section) => (
            <DetailSection key={section.title} title={section.title} items={section.items} />
          ))}
        </div>

        <p className="inclusion-detail__note">단, 개인 구매경비는 불포함입니다.</p>
      </div>

      <div className="inclusion-detail__cta-wrap">
        <Link className="inclusion-detail__cta" to="/reservations">
          예약하기
          <span className="inclusion-detail__cta-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
