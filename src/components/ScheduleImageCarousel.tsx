type ScheduleImageCarouselProps = {
  images: string[];
  title: string;
};

export default function ScheduleImageCarousel({ images, title }: ScheduleImageCarouselProps) {
  if (images.length === 0) return null;

  return (
    <div className="schedule-day__carousel-wrap">
      <div className="schedule-day__carousel" aria-label={`${title} 사진`}>
        {images.map((src, index) => (
          <img
            key={src}
            className="schedule-day__carousel-img"
            src={src}
            alt={`${title} ${index + 1}`}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="schedule-day__carousel-dots" aria-hidden="true">
          {images.map((src, index) => (
            <span key={src} className={index === 0 ? "is-active" : ""} />
          ))}
        </div>
      )}
    </div>
  );
}
