import { Navigate, Route, Routes } from "react-router-dom";
import BusinessClassPage from "./pages/BusinessClassPage";
import CoastIncludePage from "./pages/CoastIncludePage";
import CoastPage from "./pages/CoastPage";
import CoastPinePage from "./pages/CoastPinePage";
import CoastPlanDay1Page from "./pages/CoastPlanDay1Page";
import CoastPlanDay2ItineraryPage from "./pages/CoastPlanDay2ItineraryPage";
import CoastPlanDay3ItineraryPage from "./pages/CoastPlanDay3ItineraryPage";
import CoastPlanItineraryPage from "./pages/CoastPlanItineraryPage";
import CoastPlanPage from "./pages/CoastPlanPage";
import CoastReadyPage from "./pages/CoastReadyPage";
import CoastSchedulePage from "./pages/CoastSchedulePage";
import FirstClassPage from "./pages/FirstClassPage";
import HotelIntroPage from "./pages/HotelIntroPage";
import RamadaPage from "./pages/RamadaPage";
import SeokhyangPage from "./pages/SeokhyangPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SeokhyangPage />} />
      <Route path="/coast" element={<CoastPage />} />
      <Route path="/coast/include" element={<CoastIncludePage />} />
      <Route path="/coast/schedule" element={<CoastSchedulePage />} />
      <Route path="/coast/plan" element={<CoastPlanPage />} />
      <Route path="/coast/plan/ready" element={<CoastReadyPage />} />
      <Route path="/coast/plan/day1" element={<CoastPlanDay1Page />} />
      <Route path="/coast/plan/day1/itinerary" element={<CoastPlanItineraryPage />} />
      <Route path="/coast/plan/day2/itinerary" element={<CoastPlanDay2ItineraryPage />} />
      <Route path="/coast/plan/day3/itinerary" element={<CoastPlanDay3ItineraryPage />} />
      <Route path="/coast/hotel" element={<RamadaPage />} />
      <Route path="/coast/hotel/intro" element={<HotelIntroPage />} />
      <Route path="/coast/include/:kind" element={<HotelIntroPage />} />
      <Route path="/coast/plan/intro/:kind" element={<HotelIntroPage />} />
      <Route path="/coast/first-class" element={<FirstClassPage />} />
      <Route path="/coast/business-class" element={<BusinessClassPage />} />
      <Route path="/coast/pine" element={<CoastPinePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
