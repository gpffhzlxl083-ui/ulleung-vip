import { Navigate, Route, Routes } from "react-router-dom";
import GlobalNav from "./components/GlobalNav";
import InclusionIntroPage from "./pages/InclusionIntroPage";
import InfinityPoolDeckPage from "./pages/InfinityPoolDeckPage";
import LoginPage from "./pages/LoginPage";
import OptionPage from "./pages/OptionPage";
import PlanPage from "./pages/PlanPage";
import PremiumLandingPage from "./pages/PremiumLandingPage";
import ReservationsPage from "./pages/ReservationsPage";
import ScheduleDayPage from "./pages/ScheduleDayPage";
import VideoIntroPage from "./pages/VideoIntroPage";

export default function App() {
  return (
    <>
      <GlobalNav />
      <Routes>
        <Route path="/" element={<VideoIntroPage />} />
        <Route path="/premium" element={<PremiumLandingPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/plan/:dayId" element={<ScheduleDayPage />} />
        <Route path="/inclusion" element={<InclusionIntroPage />} />
        <Route path="/infinity-pool-deck" element={<InfinityPoolDeckPage />} />
        <Route path="/option" element={<OptionPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
