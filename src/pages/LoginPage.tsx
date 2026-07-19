import { Link } from "react-router-dom";
import "../styles/utility-page.css";

export default function LoginPage() {
  return (
    <div className="utility-page">
      <div className="utility-page__card">
        <h1 className="utility-page__title">로그인</h1>
        <p className="utility-page__desc">로그인 기능을 준비 중입니다.</p>
        <Link className="utility-page__back" to="/">
          홈으로
        </Link>
      </div>
    </div>
  );
}
