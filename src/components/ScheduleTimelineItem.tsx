import type { ScheduleItem } from "../data/schedule";
import ScheduleImageCarousel from "./ScheduleImageCarousel";
import ScheduleTimelineIcon from "./ScheduleTimelineIcon";

type ScheduleTimelineItemProps = {
  item: ScheduleItem;
  isLast: boolean;
};

export default function ScheduleTimelineItem({ item, isLast }: ScheduleTimelineItemProps) {
  const isRichCard = Boolean(item.welcomeLines || item.bullets?.length);

  return (
    <article className={`schedule-day__item${isLast ? " schedule-day__item--last" : ""}`}>
      <div className="schedule-day__timeline-col">
        <ScheduleTimelineIcon icon={item.icon} />
        {item.time && (
          <span className="schedule-day__timeline-time">
            {item.time.replace(" ~ ", "\n~\n")}
          </span>
        )}
        {!isLast && <span className="schedule-day__timeline-line" aria-hidden="true" />}
      </div>

      <div className={`schedule-day__content${isRichCard ? " schedule-day__content--card" : ""}`}>
        {isRichCard ? (
          <>
            {item.welcomeLines && (
              <p className="schedule-day__welcome">
                <span className="schedule-day__welcome-line">{item.welcomeLines[0]}</span>
                <span className="schedule-day__welcome-line">{item.welcomeLines[1]}</span>
              </p>
            )}
            <div className="schedule-day__title-block">
              <h2 className="schedule-day__item-title schedule-day__item-title--rich">{item.title}</h2>
            </div>

            {item.bullets && item.bullets.length > 0 && (
              <ol className="schedule-day__bullets">
                {item.bullets.map((bullet, index) => (
                  <li key={`${item.id}-bullet-${index}`}>
                    {bullet.emphasis && (
                      <strong className="schedule-day__bullet-emphasis">{bullet.emphasis}</strong>
                    )}
                    {bullet.text}
                  </li>
                ))}
              </ol>
            )}

            {item.meetingPlace && (
              <div className="schedule-day__meeting-place">
                <p className="schedule-day__meeting-label">{item.meetingPlace.label}</p>
                <p className="schedule-day__meeting-address">{item.meetingPlace.address}</p>
              </div>
            )}

            <ScheduleImageCarousel images={item.images} title={item.title} />

            {item.footerNote && <p className="schedule-day__footer-note">{item.footerNote}</p>}
          </>
        ) : (
          <>
            <div className="schedule-day__meta">
              {item.category && <span className="schedule-day__category">{item.category}</span>}
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
          </>
        )}
      </div>
    </article>
  );
}
