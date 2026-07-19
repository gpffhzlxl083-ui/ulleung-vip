import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KAKAO_CONSULT_URL } from "../config/nav";
import "../styles/global-nav.css";

export default function GlobalNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="global-nav" aria-label="주요 메뉴">
        <button
          type="button"
          className="global-nav__toggle"
          aria-expanded={open}
          aria-controls="global-nav-drawer"
          onClick={() => setOpen(true)}
        >
          <span className="global-nav__bars" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="global-nav__sr-only">메뉴 열기</span>
        </button>
      </nav>

      <div className={`global-nav__shell${open ? " global-nav__shell--open" : ""}`} aria-hidden={!open}>
        <button
          type="button"
          className="global-nav__backdrop"
          aria-label="메뉴 닫기"
          tabIndex={open ? 0 : -1}
          onClick={close}
        />

        <aside
            id="global-nav-drawer"
            className={`global-nav__drawer${open ? " global-nav__drawer--open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="메뉴"
            aria-hidden={!open}
          >
            <header className="global-nav__drawer-head">
              <button type="button" className="global-nav__close" aria-label="메뉴 닫기" onClick={close}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 4L16 16M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <Link className="global-nav__user" to="/login" onClick={close}>
              <span className="global-nav__user-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="global-nav__user-text">로그인해 주세요</span>
            </Link>

            <section className="global-nav__status" aria-label="예약현황">
              <h2 className="global-nav__status-title">예약현황</h2>
              <div className="global-nav__status-grid">
                <Link className="global-nav__status-card global-nav__status-card--confirmed" to="/reservations" onClick={close}>
                  <span className="global-nav__status-label">예약확정</span>
                  <span className="global-nav__status-num">
                    <strong>0</strong>건
                  </span>
                </Link>
                <Link className="global-nav__status-card global-nav__status-card--pending" to="/reservations" onClick={close}>
                  <span className="global-nav__status-label">대기중</span>
                  <span className="global-nav__status-num">
                    <strong>0</strong>건
                  </span>
                </Link>
              </div>
            </section>

            <ul className="global-nav__list">
              <li>
                <Link className="global-nav__item" to="/" onClick={close}>
                  <span className="global-nav__item-icon global-nav__item-icon--home" aria-hidden="true" />
                  <span className="global-nav__item-body">
                    <span className="global-nav__item-title">홈 화면으로 돌아가기</span>
                  </span>
                  <span className="global-nav__chevron" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link className="global-nav__item" to="/option" onClick={close}>
                  <span className="global-nav__item-icon global-nav__item-icon--calendar" aria-hidden="true" />
                  <span className="global-nav__item-body">
                    <span className="global-nav__item-title">옵션 안내</span>
                    <span className="global-nav__item-desc">프리미엄 패키지 옵션 카드</span>
                  </span>
                  <span className="global-nav__chevron" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link className="global-nav__item" to="/reservations" onClick={close}>
                  <span className="global-nav__item-icon global-nav__item-icon--calendar" aria-hidden="true" />
                  <span className="global-nav__item-body">
                    <span className="global-nav__item-title">예약현황</span>
                    <span className="global-nav__item-desc">프리미엄 패키지 예약 내역</span>
                  </span>
                  <span className="global-nav__chevron" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link className="global-nav__item" to="/login" onClick={close}>
                  <span className="global-nav__item-icon global-nav__item-icon--login" aria-hidden="true" />
                  <span className="global-nav__item-body">
                    <span className="global-nav__item-title">로그인</span>
                    <span className="global-nav__item-desc">회원 전용 메뉴 이용</span>
                  </span>
                  <span className="global-nav__chevron" aria-hidden="true" />
                </Link>
              </li>
            </ul>

            <div className="global-nav__footer">
              <a
                className="global-nav__chat"
                href={KAKAO_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                <span className="global-nav__chat-icon" aria-hidden="true" />
                <span className="global-nav__chat-body">
                  <span className="global-nav__chat-title">카카오 상담</span>
                  <span className="global-nav__chat-desc">05:30 - 23:30 / 연중무휴</span>
                </span>
                <span className="global-nav__chevron" aria-hidden="true" />
              </a>
            </div>
        </aside>
      </div>
    </>
  );
}
