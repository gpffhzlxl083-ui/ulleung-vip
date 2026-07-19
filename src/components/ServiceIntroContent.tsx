import "../styles/viewport-full.css";
import "../styles/service-intro.css";

const CIRCLE_ITEMS = [
  "바다와 숲의 여행",
  "짙푸른 동해의 감동",
  "당신의 기억과 추억",
] as const;

export default function ServiceIntroContent() {
  return (
    <div className="vf service-intro">
      <div className="vf__stage">
        <img
          className="service-intro__bg"
          src="/Image/coast-cliff-view.webp"
          alt=""
          decoding="async"
        />

        <div className="service-intro__content">
          <p className="service-intro__eyebrow">PREMIUM PACKAGE</p>

          <div className="service-intro__circles" aria-label="프리미엄 패키지 소개">
            <img
              className="service-intro__circles-img"
              src="/Image/service-circles.webp"
              alt=""
              decoding="async"
            />
            <div className="service-intro__circle-labels">
              {CIRCLE_ITEMS.map((label) => (
                <p key={label} className="service-intro__circle-text">
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
