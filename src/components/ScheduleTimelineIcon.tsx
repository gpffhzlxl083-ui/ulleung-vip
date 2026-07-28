import type { ScheduleIcon } from "../data/schedule";

type ScheduleTimelineIconProps = {
  icon: ScheduleIcon;
};

export default function ScheduleTimelineIcon({ icon }: ScheduleTimelineIconProps) {
  return (
    <span className="schedule-day__icon" aria-hidden="true">
      {icon === "pin" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="10" r="2.2" fill="currentColor" />
        </svg>
      )}
      {icon === "boat" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 18h16M6 14l2-8h8l2 8M8 14h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {icon === "bus" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 11h16M8 17h.01M16 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {icon === "food" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 4v8M5 4v5M11 4v5M8 12v8M16 4c1.5 0 3 1.2 3 3.5V12c0 1.7-1.3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
      {icon === "tree" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 20V12M8 12l4-8 4 8M6 14h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {icon === "camera" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 8h3l2-2h6l2 2h3v10H4V8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
      {icon === "bed" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12V18h16v-6M4 14h16M7 10V8h10v2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {icon === "spa" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 14c0-2.2 1.8-4 4-4s4 1.8 4 4M6 18h12M12 6v2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
      {icon === "staff" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M6 19c0-3.3 2.7-5 6-5s6 1.7 6 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}
