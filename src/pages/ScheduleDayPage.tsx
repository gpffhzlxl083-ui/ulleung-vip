import { useParams } from "react-router-dom";

export default function ScheduleDayPage() {
  const { dayId } = useParams<{ dayId: string }>();

  return (
    <main>
      <h1>/plan/{dayId}</h1>
      <p>준비 중입니다.</p>
    </main>
  );
}
