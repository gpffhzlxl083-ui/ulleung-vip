import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ServiceIntroModal from "../components/ServiceIntroModal";
import "../styles/viewport-full.css";
import "../styles/premium-landing.css";

function CtaArrow({ variant }: { variant: "light" | "dark" }) {
  return (
    <span className={`premium-landing__cta-arrow premium-landing__cta-arrow--${variant}`} aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M10 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const INTRO_POPUP_DELAY_MS = 3000;

export default function PremiumLandingPage() {
  const navigate = useNavigate();
  const [showServiceIntro, setShowServiceIntro] = useState(false);

  const openServiceIntro = () => setShowServiceIntro(true);
  const closeServiceIntro = () => setShowServiceIntro(false);
  const goToInclusion = useCallback(() => {
    setShowServiceIntro(false);
    navigate("/inclusion");
  }, [navigate]);

  useEffect(() => {
    if (!showServiceIntro) return;

    const timer = window.setTimeout(goToInclusion, INTRO_POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [showServiceIntro, goToInclusion]);

  return (
    <>
      <div className="vf premium-landing">
        <div className="vf__stage">
          <img
            className="premium-landing__bg"
            src="/Image/premiumintro.webp"
            alt=""
            decoding="async"
          />

          <div className="premium-landing__content">
            <header className="premium-landing__hero">
              <p className="premium-landing__eyebrow">PREMIUM PACKAGE</p>
              <h1 className="premium-landing__title">
                <span className="premium-landing__title-line">Another</span>
                <span className="premium-landing__title-line premium-landing__title-line--main">VIP TOUR</span>
              </h1>
              <p className="premium-landing__desc">
                남들과 다른 당신만을 위한
                <br />
                특별한 울릉도·독도 여행을 시작합니다
              </p>
            </header>

            <nav className="premium-landing__actions" aria-label="패키지 메뉴">
              <Link to="/inclusion" className="premium-landing__cta premium-landing__cta--light">
                <span className="premium-landing__cta-en">Inclusions</span>
                <span className="premium-landing__cta-ko">
                  포함사항
                  <CtaArrow variant="dark" />
                </span>
              </Link>
              <button
                type="button"
                className="premium-landing__cta premium-landing__cta--dark"
                onClick={openServiceIntro}
              >
                <span className="premium-landing__cta-en">Schedule</span>
                <span className="premium-landing__cta-ko">
                  여행계획
                  <CtaArrow variant="light" />
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {showServiceIntro && <ServiceIntroModal onClose={closeServiceIntro} />}
    </>
  );
}
