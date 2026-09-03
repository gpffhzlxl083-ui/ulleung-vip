import chevronRight from "../assets/chevron-right.svg";
import capsuleGlass from "../assets/capsule-exclude.svg";
import driftwood from "../assets/driftwood.webp";
import logoAube from "../assets/logo-aube.svg";
import journeyMark from "../assets/premium-island-journey.png";
import "../styles/viewport-full.css";
import "../styles/seokhyang.css";

export default function SeokhyangPage() {
  return (
    <main className="vf seokhyang">
      <div className="vf__stage">
        <div className="seokhyang__frame">
          <img
            className="seokhyang__img"
            src={driftwood}
            alt="울릉도 향나무"
            width={522}
            height={1024}
          />
          <div className="seokhyang__copy seokhyang__copy--intro" aria-hidden="true">
            <p className="seokhyang__title">석향(石香)</p>
            <p className="seokhyang__desc">
              해안가 절벽 틈에서 자라는
              <br />
              고귀한 울릉도 향나무
            </p>
          </div>
          <div className="seokhyang__copy seokhyang__copy--next" aria-hidden="true">
            <p className="seokhyang__title">고귀한 당신의 여정</p>
            <p className="seokhyang__kicker">Premium Ulleungdo, Dokdo</p>
          </div>
          <div className="seokhyang__landing">
            <img
              className="seokhyang__capsule"
              src={capsuleGlass}
              alt=""
              width={213}
              height={500}
            />
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
