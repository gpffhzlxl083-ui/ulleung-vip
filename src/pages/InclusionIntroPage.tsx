import { Link } from "react-router-dom";
import InclusionDetailContent from "../components/InclusionDetailContent";
import "../styles/viewport-full.css";import "../styles/inclusion-intro-page.css";

function NavChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === "left" ? (
        <path
          d="M14 6L8 12l6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M10 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function InclusionIntroPage() {
  return (
    <div className="vf inclusion-intro-page">
      <div className="vf__stage inclusion-intro-page__stage">
        <section className="inclusion-intro-page__hero" aria-label="프리미엄 포함사항 소개">
          <img
            className="inclusion-intro-page__bg"
            src="/Image/inclusion/basalt-rock.webp"
            alt=""
            decoding="async"
          />

          <header className="inclusion-intro-page__header">
            <Link className="inclusion-intro-page__nav inclusion-intro-page__nav--back" to="/plan">
              <NavChevron direction="left" />
              BACK
            </Link>
            <Link className="inclusion-intro-page__nav inclusion-intro-page__nav--next" to="/option">
              NEXT
              <NavChevron direction="right" />
            </Link>
          </header>

          <div className="inclusion-intro-page__copy">
            <h1 className="inclusion-intro-page__title">PREMIUM OF ULLEUNGDO</h1>
            <p className="inclusion-intro-page__subtitle">프리미엄 포함사항</p>
          </div>

          <p className="inclusion-intro-page__credit">Premium by ulleung_sketch</p>
        </section>

        <footer className="inclusion-intro-page__footer">
          <p className="inclusion-intro-page__footer-label">PREMIUM</p>
          <p className="inclusion-intro-page__footer-place">Ulleung, Dokdo</p>
          <span className="inclusion-intro-page__footer-line" aria-hidden="true" />
        </footer>

        <div className="inclusion-intro-page__detail-wrap">
          <InclusionDetailContent />
        </div>      </div>
    </div>
  );
}
