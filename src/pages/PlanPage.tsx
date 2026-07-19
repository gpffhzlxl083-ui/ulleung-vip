import { useNavigate } from "react-router-dom";
import PlanContent from "../components/PlanContent";

export default function PlanPage() {
  const navigate = useNavigate();

  return (
    <PlanContent
      onClose={() => navigate("/premium")}
      onEnter={() => navigate("/inclusion")}
    />
  );
}
