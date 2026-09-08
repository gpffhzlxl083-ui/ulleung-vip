import { Navigate, Route, Routes } from "react-router-dom";
import CoastPage from "./pages/CoastPage";
import SeokhyangPage from "./pages/SeokhyangPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SeokhyangPage />} />
      <Route path="/coast" element={<CoastPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
