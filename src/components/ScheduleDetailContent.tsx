import { SCHEDULE_DAYS } from "../data/schedule";
import ScheduleTimelineItem from "./ScheduleTimelineItem";
import "../styles/schedule-day.css";

export default function ScheduleDetailContent() {
  return (
    <div className="schedule-detail" aria-label="프리미엄 일정 상세">
      {SCHEDULE_DAYS.map((day) => (
        <section
          key={day.day}
          id={`schedule-day-${day.day}`}
          className="schedule-detail__day"
          aria-label={day.listTitle}
        >
          <div className="schedule-detail__day-banner">
            <span className="schedule-detail__day-badge">Day {day.day}</span>
            <span className="schedule-detail__day-banner-divider" aria-hidden="true" />
            <span className="schedule-detail__day-banner-label">상세일정</span>
          </div>

          <div className="schedule-day__timeline">
            {day.items.map((item, index) => (
              <ScheduleTimelineItem
                key={item.id}
                item={item}
                isLast={index === day.items.length - 1}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
