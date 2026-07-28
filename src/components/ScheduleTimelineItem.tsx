import type { ScheduleItem } from "../data/schedule";
import ScheduleImageCarousel from "./ScheduleImageCarousel";
import ScheduleTimelineIcon from "./ScheduleTimelineIcon";

type ScheduleTimelineItemProps = {
  item: ScheduleItem;
  isLast: boolean;
};

export default function ScheduleTimelineItem({ item, isLast }: ScheduleTimelineItemProps) {
  return (
    <article className={`schedule-day__item${isLast ? " schedule-day__item--last" : ""}`}>
      <div className="schedule-day__timeline-col">
        <ScheduleTimelineIcon icon={item.icon} />
        {!isLast && <span className="schedule-day__timeline-line" aria-hidden="true" />}
      </div>

      <div className="schedule-day__content">
        <div className="schedule-day__meta">
          {item.category && <span className="schedule-day__category">{item.category}</span>}
          {item.time && <span className="schedule-day__time">{item.time}</span>}
        </div>

        <h2 className="schedule-day__item-title">{item.title}</h2>

        <p className="schedule-day__description">
          {item.highlight && <strong className="schedule-day__highlight">{item.highlight} </strong>}
          {item.description}
        </p>

        {item.actionLabel && (
          <button type="button" className="schedule-day__action">
            {item.actionLabel}
          </button>
        )}

        <ScheduleImageCarousel images={item.images} title={item.title} />
      </div>
    </article>
  );
}
