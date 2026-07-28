import { Navigate, useParams } from "react-router-dom";

export default function ScheduleDayPage() {
  const { dayId } = useParams<{ dayId: string }>();
  const dayNumber = dayId?.replace("day-", "") ?? "1";

  return <Navigate to={`/plan#schedule-day-${dayNumber}`} replace />;
}
