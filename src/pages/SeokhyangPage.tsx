import chevronRight from "../assets/chevron-right.svg";
import driftwood from "../assets/driftwood.webp";
import logoAube from "../assets/logo-aube.png";
import journeyMark from "../assets/premium-island-journey.png";
import "../styles/viewport-full.css";
import "../styles/seokhyang.css";

export default function SeokhyangPage() {
  return (
    <main className="vf seokhyang">
      <div className="vf__stage">
        <div className="seokhyang__frame">
          <img
            className="seokhyang__tree seokhyang__tree--sharp"
            src={driftwood}
            alt="울릉도 향나무"
            width={522}
            height={1024}
          />
          <div className="seokhyang__copy seokhyang__copy--intro" aria-hidden="true">
            <p className="seokhyang__title">울릉도 석향(石香)</p>
            <p className="seokhyang__desc">
              해안가 절벽 틈에서 자라는
              <br />
              특별한 붉은 향나무
            </p>
          </div>
          <div className="seokhyang__copy seokhyang__copy--next" aria-hidden="true">
            <p className="seokhyang__title">
              오브<span className="seokhyang__title-sm">(AUBE),</span> 울릉에서
            </p>
            <p className="seokhyang__desc">
              특별한 당신만을 위한
              <br />
              울릉, 독도 패키지
            </p>
          </div>
          <div className="seokhyang__landing">
            <div className="seokhyang__capsule" aria-hidden="true">
              <div className="seokhyang__capsule-body">
                <div className="seokhyang__capsule-scene">
                  <img
                    className="seokhyang__tree seokhyang__tree--blur"
                    src={driftwood}
                    alt=""
                    width={522}
                    height={1024}
                  />
                </div>
                <div className="seokhyang__capsule-tint" />
                <div className="seokhyang__capsule-shine" />
              </div>
              <svg
                className="seokhyang__capsule-outline"
                viewBox="0 0 229 539"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="seokhyang-glass-light"
                    x1="114.5"
                    y1="0"
                    x2="114.5"
                    y2="539"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                    <stop offset="38%" stopColor="rgba(255,255,255,0.7)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.18)" />
                  </linearGradient>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M119.5 0C179.975 0 229 49.0249 229 109.5V429.016C229 489.491 179.975 538.516 119.5 538.516H109.5C49.0248 538.516 0 489.491 0 429.016V109.5C5.28366e-05 49.0249 49.0249 0 109.5 0H119.5ZM114.5 8.36523C55.8834 8.36523 8.36525 55.8834 8.36523 114.5C8.36523 173.117 55.8834 220.635 114.5 220.635C173.117 220.635 220.635 173.117 220.635 114.5C220.635 55.8834 173.117 8.36523 114.5 8.36523Z"
                  stroke="url(#seokhyang-glass-light)"
                  strokeWidth="0.1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <div className="seokhyang__brand">
              <img
                className="seokhyang__logo"
                src={logoAube}
                alt="AUBE"
                width={203}
                height={28}
              />
              <p className="seokhyang__place">Ulleungdo, Dokdo</p>
              <img
                className="seokhyang__journey"
                src={journeyMark}
                alt="PREMIUM ISLAND JOURNEY"
                width={158}
                height={15}
              />
            </div>
            <button className="seokhyang__enter" type="button">
              ENTER
              <img
                className="seokhyang__chevron"
                src={chevronRight}
                alt=""
                width={24}
                height={24}
              />
            </button>
            <p className="seokhyang__footer">Premium Ulleungdo, Dokdo</p>
          </div>
        </div>
      </div>
    </main>
  );
}
