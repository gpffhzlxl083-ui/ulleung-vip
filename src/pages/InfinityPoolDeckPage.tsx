import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "../styles/pool-deck-page.css";

const CARD_MAIN_FOLDER = "card main";
const base = `/Image/${encodeURIComponent(CARD_MAIN_FOLDER)}/`;
const INFINITY_SERVICE_BASE = "/Image/service/infinity-service/";
const DINING_SERVICE_BASE = "/Image/service/dining-service/";
const PUMPKIN_SERVICE_BASE = "/Image/service/pumpkin-service/";

type ServiceKey = "infinity" | "dining" | "pumpkin";

const INFINITY_SERVICE_HERO = {
  images: [
    {
      src: `${INFINITY_SERVICE_BASE}hotel-facade-coast.webp`,
      alt: "\uD638\uD154 \uC804\uACBD",
    },
    {
      src: `${INFINITY_SERVICE_BASE}pool-shilla-monogram.webp`,
      alt: "\uD480 \uB370\uD06C",
    },
  ],
  heading: "\uB77C\uB9C8\uB2E4\uC6B8\uB989\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4",
  lines: ["\uC6B8\uB989\uB3C4\uC5D0\uC11C \uAC00\uC7A5 \uCD5C\uC2E0\uC2DD \uD638\uD154", "\uD638\uD154\uC5D0\uC11C \uACE0\uAE09\uC2A4\uB7EC\uC6B4 \uD558\uB8E8\uB97C \uC2DC\uC791\uD558\uC138\uC694"],
} as const;

const INFINITY_SERVICE_ITEMS = [
  {
    src: `${INFINITY_SERVICE_BASE}premium-room-twin.webp`,
    alt: "\uD504\uB9AC\uBBF8\uC5C4 \uAC1D\uC2E4",
    title: "Premium room",
    highlight: "\uD504\uB9AC\uBBF8\uC5C4",
    after: " \uAC1D\uC2E4\uC740 \uD328\uD0A4\uC9C0\uC758 \uAE30\uBCF8\uC785\uB2C8\uB2E4",
  },
  {
    src: `${INFINITY_SERVICE_BASE}inroom-service-coffee.webp`,
    alt: "\uC778\uB8E8 \uC11C\uBE44\uC2A4",
    title: "Premium service",
    highlight: "\uC11C\uBE44\uC2A4",
    after: "\uB294 \uC6B8\uB989\uC2A4\uCF00\uCE58\uC758 \uC7A5\uC810\uC785\uB2C8\uB2E4",
    before: "\uD2B9\uBCC4\uD55C ",
  },
  {
    src: `${INFINITY_SERVICE_BASE}buffet-station.webp`,
    alt: "\uBDF0\uD398 \uC11C\uBE44\uC2A4",
    title: "Clean service",
    highlight: "\uAC1D\uC2E4\uC744 \uCCAD\uC18C",
    after: "\uD574\uB4DC\uB9BD\uB2C8\uB2E4",
    before: "\uC12C\uBC14\uB514 \uD638\uD154\uC740 \uB9E4\uC77C ",
  },
  {
    src: `${INFINITY_SERVICE_BASE}dining-ocean-view.webp`,
    alt: "\uB2E4\uC774\uB2DD \u00B7 \uC624\uC158\uBDF0",
    title: "Tea service",
    highlight: "\uCEE4\uD53C",
    after: "\uB294 \uC6B8\uB989\uC2A4\uCF00\uCE58\uC758 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4",
    before: "\uD638\uD154 \uC778\uADFC \uC990\uAE30\uB294 ",
  },
] as const;

const DINING_SERVICE_ITEMS = [
  {
    src: `${DINING_SERVICE_BASE}ulleung-yakso-beef.webp`,
    alt: "\uC6B8\uB989 \uC57D\uC18C \uD55C\uC6B0",
    title: "Ulleung Beef",
    before: "\uC6B8\uB989 ",
    highlight: "\uC57D\uC18C \uD55C\uC6B0\uAD6C\uC774",
    after: "\uC758 \uB2F4\uBC14\uD55C \uB9DB\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${DINING_SERVICE_BASE}mulhoe.webp`,
    alt: "\uBB3C\uD68C",
    title: "Ulleung mulhoe",
    before: "\uC2DC\uC6D0\uD55C ",
    highlight: "\uBB3C\uD68C",
    middle: "\uC640 \uC5BC\uD81C\uD55C ",
    highlight2: "\uC6B0\uB7ED\uB9E4\uC6B4\uD0D5",
    after: "\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${DINING_SERVICE_BASE}stir-fry.webp`,
    alt: "\uC624\uC0BC\uBD88\uACE0\uAE30",
    title: "Osam Bulgogi",
    before: "\uC6B8\uB989\uB3C4\uC758 \uBCC4\uBBF8 ",
    highlight: "\uC624\uC0BC\uBD88\uACE0\uAE30",
    after: "\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${DINING_SERVICE_BASE}fish-soup.webp`,
    alt: "\uC624\uC9D5\uC5B4\uB0B4\uC7A5\uD0D5",
    title: "Ojingeo soup",
    before: "\uB2F4\uBC14\uD558\uACE0 \uAE54\uB054\uD55C ",
    highlight: "\uC624\uC9D5\uC5B4\uB0B4\uC7A5\uD0D5",
    after: "\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${DINING_SERVICE_BASE}abalone-porridge.webp`,
    alt: "\uC5C9\uACAA\uD034\uD574\uC7A5\uAD6D",
    title: "Eonggeongkwi",
    before: "\uC6B8\uB989\uB3C4\uC758 \uD1A0\uC775\uC74C\uC2DD ",
    highlight: "\uC5C9\uACAA\uD034\uD574\uC7A5\uAD6D",
    after: "\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${DINING_SERVICE_BASE}mussel-rice.webp`,
    alt: "\uD64D\uD569\uBC25",
    title: "Bibimbap",
    before: "\uC800\uB3D9 \uC55E\uBC14\uB2E4\uC5D0\uC11C \uC7A1\uC740 ",
    highlight: "\uD64D\uD569\uBC25 \uC815\uC2DD",
    after: "\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
] as const;

const PUMPKIN_SERVICE_ITEMS = [
  {
    src: `${PUMPKIN_SERVICE_BASE}pumpkin-bath.webp`,
    alt: "\uC544\uB85C\uB9C8 \uC2A4\uD30C",
    title: "Aroma Spa",
    before: "\uC6B8\uB989\uB3C4 \uC2EC\uCE35\uC218\uB85C ",
    highlight: "\uC544\uB85C\uB9C8 \uC2A4\uD30C",
    after: " \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${PUMPKIN_SERVICE_BASE}deep-sea-water.webp`,
    alt: "\uC6B8\uB989 \uC2EC\uCE35\uC218",
    title: "Deep Sea Water",
    before: "\uC6B8\uB989\uB3C4 ",
    highlight: "\uC2EC\uCE35\uC218",
    after: "\uB85C \uAC74\uAC15\uD55C \uD734\uC2EC\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${PUMPKIN_SERVICE_BASE}green-tea.webp`,
    alt: "\uD5C8\uBE0C\uD2F0",
    title: "Herbal Tea",
    before: "\uC2A4\uD30C\uC640 \uD568\uAED8 \uD790\uB9C1\uC744 \uC704\uD55C ",
    highlight: "\uD5C8\uBE0C\uD2F0",
    after: "\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${PUMPKIN_SERVICE_BASE}latte-by-sea.webp`,
    alt: "\uCEE4\uD53C",
    title: "Ulleung Coffee",
    before: "\uD734\uC2EC\uACFC \uC5EC\uC720\uAC00 \uD544\uC694\uD560 \uB54C ",
    highlight: "\uCEE4\uD53C",
    after: "\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
  {
    src: `${PUMPKIN_SERVICE_BASE}traditional-drink.webp`,
    alt: "\uD638\uBC15\uB9C9\uAC1C\uB864",
    title: "Makgeolli",
    before: "\uB2F4\uBC14\uD558\uACE0 \uACE0\uC18C\uD55C ",
    highlight: "\uD638\uBC15\uB9C9\uAC1C\uB864",
    after: "\uB97C \uC81C\uACF5\uD569\uB2C8\uB2E4",
  },
] as const;

const DINING_SERVICE_NOTES = [
  "\uC2DD\uC0AC\uB294 \uD604\uC9C0 \uC0AC\uC815\uC5D0 \uC758\uD574 \uB2E4\uC18C \uBCC0\uACBD \uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
  "\uC2DD\uC0AC \uC911 \uC74C\uB8CC(\uC8FC\uB958)\uB294 \uD3EC\uD568\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",
  "\uC2DD\uC0AC \uC2DC\uAC04\uC740 \uC77C\uC815\uD45C\uB97C \uCC38\uACE0 \uBD80\uD0C1\uB4DC\uB9BD\uB2C8\uB2E4",
] as const;

const SERVICE_HINTS: Record<ServiceKey, { hint: string; button: string; modalLabel: string }> = {
  infinity: {
    hint: "\uCE74\uB4DC\uB97C \uB204\uB974\uBA74 \uC21C\uC18C \uC18C\uAC1C\uB97C \uBCFC \uC218 \uC788\uC5B4\uC694.",
    button: "\uC21C\uC18C \uC18C\uAC1C \uBCF4\uAE30",
    modalLabel: "\uC778\uD53C\uB2C8\uD2F0 \uD480 \uB370\uD06C \uC21C\uC18C \uC18C\uAC1C",
  },
  dining: {
    hint: "\uCE74\uB4DC\uB97C \uB204\uB974\uBA74 \uB2E4\uC774\uB2DD \uBA54\uB274\uB97C \uBCFC \uC218 \uC788\uC5B4\uC694.",
    button: "\uB2E4\uC774\uB2DD \uBA54\uB274 \uBCF4\uAE30",
    modalLabel: "\uB2E4\uC774\uB2DD \u00B7 \uD504\uB77C\uC774\uBE7B \uC608\uC57D \uBA54\uB274 \uC18C\uAC1C",
  },
  pumpkin: {
    hint: "\uCE74\uB4DC\uB97C \uB204\uB974\uBA74 \uD638\uBC15 \uC11C\uBE44\uC2A4\uB97C \uBCFC \uC218 \uC788\uC5B4\uC694.",
    button: "\uD638\uBC15 \uC11C\uBE44\uC2A4 \uBCF4\uAE30",
    modalLabel: "\uD638\uBC15\uBE59 \uC11C\uBE44\uC2A4 \uC18C\uAC1C",
  },
};

const SLIDES = [
  {
    src: `${base}infinity-pool-deck.webp`,
    alt: "\uC778\uD53C\uB2C8\uD2F0 \uD480 \uB370\uD06C",
    title: "\uC778\uD53C\uB2C8\uD2F0 \uD480 \uB370\uD06C",
    location: "\uC6B8\uB989\uB3C4 \u00B7 \uC12C\uBC14\uB514\uD638\uD154",
    serviceKey: "infinity" as const,
  },
  {
    src: `${base}dining-reserved.webp`,
    alt: "\uB2E4\uC774\uB2DD \u00B7 \uD504\uB77C\uC774\uBE7B \uC608\uC57D",
    title: "\uB2E4\uC774\uB2DD \u00B7 \uD504\uB77C\uC774\uBE7B \uC608\uC57D",
    location: "\uD638\uD154 \uB2E4\uC774\uB2DD",
    serviceKey: "dining" as const,
  },
  {
    src: `${base}pumpkin-bread.webp`,
    alt: "\uD638\uBC15\uBE59",
    title: "\uD638\uBC15\uBE59",
    location: "\uC6B8\uB989\uB3C4 \u00B7 \uB85C\uCEEC \uB9DB",
    serviceKey: "pumpkin" as const,
  },
  {
    src: `${base}ulleung-ferry.webp`,
    alt: "\uC6B8\uB989 \uD3B8\uB9AC",
    title: "\uC6B8\uB989\uD56D \u00B7 \uD3B8\uB9AC",
    location: "\uC6B8\uB989\uB3C4",
  },
] as const;

const SLIDE_COUNT = SLIDES.length;
const DRAG_THRESHOLD = 48;
const SLIDE_GAP_PX = 14;
const SLIDE_STEP_RATIO = 0.86;

function wrapIndex(i: number) {
  return ((i % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
}

function shortestOffset(index: number, i: number) {
  let diff = i - index;
  if (diff > SLIDE_COUNT / 2) diff -= SLIDE_COUNT;
  if (diff < -SLIDE_COUNT / 2) diff += SLIDE_COUNT;
  return diff;
}

function getSlideTransform(offset: number, slideIndex: number, baseIndex: number) {
  const rotateY = offset * -20;
  const abs = Math.abs(offset);
  const scale = Math.max(0.76, 0.98 - abs * 0.18);
  const opacity = Math.max(0.45, 1 - abs * 0.14);
  const zIndex = 100 - Math.abs(shortestOffset(baseIndex, slideIndex)) * 10;

  return {
    transform: `translate(-50%, -50%) translateX(calc(${offset} * var(--slide-step))) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
  };
}

function applySlideTransforms(
  slides: (HTMLButtonElement | null)[],
  baseIndex: number,
  dragFraction: number,
) {
  for (let i = 0; i < slides.length; i++) {
    const el = slides[i];
    if (!el) continue;

    const offset = shortestOffset(baseIndex, i) + dragFraction;
    const { transform, opacity, zIndex } = getSlideTransform(offset, i, baseIndex);
    el.style.transform = transform;
    el.style.opacity = String(opacity);
    el.style.zIndex = String(zIndex);
  }
}

function clearSlideInlineStyles(slides: (HTMLButtonElement | null)[]) {
  for (const el of slides) {
    if (!el) continue;
    el.style.transform = "";
    el.style.opacity = "";
    el.style.zIndex = "";
    el.style.transition = "";
  }
}

export default function InfinityPoolDeckPage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const slideStepRef = useRef(227);
  const rafRef = useRef<number | null>(null);
  const dragRef = useRef({
    startX: 0,
    baseIndex: 0,
    moved: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [popIndex, setPopIndex] = useState<number | null>(null);
  const [openService, setOpenService] = useState<ServiceKey | null>(null);
  const popTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureSlideStep = useCallback(() => {
    const slide = slideRefs.current.find(Boolean);
    if (!slide) return;
    slideStepRef.current = slide.getBoundingClientRect().width * SLIDE_STEP_RATIO + SLIDE_GAP_PX;
  }, []);

  useLayoutEffect(() => {
    measureSlideStep();
    window.addEventListener("resize", measureSlideStep);
    return () => window.removeEventListener("resize", measureSlideStep);
  }, [measureSlideStep]);

  const scheduleDragTransforms = useCallback((baseIndex: number, dragFraction: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      applySlideTransforms(slideRefs.current, baseIndex, dragFraction);
      rafRef.current = null;
    });
  }, []);

  const triggerPop = (index: number) => {
    if (popTimerRef.current) clearTimeout(popTimerRef.current);
    setPopIndex(index);
    popTimerRef.current = setTimeout(() => {
      setPopIndex(null);
      popTimerRef.current = null;
    }, 420);
  };

  const goTo = (index: number) => {
    const next = wrapIndex(index);
    setActiveIndex(next);
    setSelectedIndex(next);
    triggerPop(next);
  };

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  useEffect(() => {
    return () => {
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!openService) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenService(null);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openService]);

  const handleSlideTap = (clientX: number, clientY: number, baseIndex: number) => {
    const target = document.elementFromPoint(clientX, clientY);
    const slideEl = target?.closest<HTMLElement>("[data-slide-index]");
    const index = slideEl ? Number(slideEl.dataset.slideIndex) : baseIndex;
    if (Number.isNaN(index)) return;

    const offset = shortestOffset(baseIndex, index);
    if (offset === 0) {
      setSelectedIndex(index);
      const slide = SLIDES[index];
      if ("serviceKey" in slide) {
        setOpenService(slide.serviceKey);
      }
      return;
    }

    goTo(baseIndex + (offset > 0 ? 1 : -1));
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const { startX, baseIndex, moved, velocity } = dragRef.current;
    const delta = event.clientX - startX;
    const step = slideStepRef.current;

    carouselRef.current?.classList.remove("pool-deck-page__carousel--dragging");
    clearSlideInlineStyles(slideRefs.current);

    if (moved) {
      const projected = delta / step + velocity * 0.2;
      let shift = 0;
      if (projected > 0.18) shift = -1;
      else if (projected < -0.18) shift = 1;
      else if (Math.abs(velocity) > 0.35) shift = velocity > 0 ? -1 : 1;
      else if (Math.abs(delta) >= DRAG_THRESHOLD) shift = delta > 0 ? -1 : 1;

      if (shift !== 0) goTo(baseIndex + shift);
    } else {
      handleSlideTap(event.clientX, event.clientY, baseIndex);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    measureSlideStep();
    setPopIndex(null);
    dragRef.current = {
      startX: e.clientX,
      baseIndex: activeIndex,
      moved: false,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };

    carouselRef.current?.classList.add("pool-deck-page__carousel--dragging");
    for (const el of slideRefs.current) {
      if (el) el.style.transition = "none";
    }

    carouselRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current?.hasPointerCapture(e.pointerId)) return;

    const now = performance.now();
    const elapsed = now - dragRef.current.lastTime;
    if (elapsed > 0) {
      dragRef.current.velocity = (e.clientX - dragRef.current.lastX) / elapsed;
    }
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastTime = now;

    const delta = e.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;

    scheduleDragTransforms(dragRef.current.baseIndex, delta / slideStepRef.current);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current?.hasPointerCapture(e.pointerId)) return;
    carouselRef.current.releasePointerCapture(e.pointerId);
    finishDrag(e);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current?.hasPointerCapture(e.pointerId)) return;
    carouselRef.current.releasePointerCapture(e.pointerId);
    finishDrag(e);
  };

  const closeService = () => setOpenService(null);

  const activeSlide = SLIDES[activeIndex];
  const activeServiceKey = "serviceKey" in activeSlide ? activeSlide.serviceKey : null;
  const activeServiceHint = activeServiceKey ? SERVICE_HINTS[activeServiceKey] : null;

  const serviceModal =
    openService &&
    createPortal(
      <div className="pool-deck-page__modal" role="presentation" onClick={closeService}>
        <div
          className="pool-deck-page__modal-panel"
          role="dialog"
          aria-modal="true"
          aria-label={SERVICE_HINTS[openService].modalLabel}
          onClick={(event) => event.stopPropagation()}
        >
          <header className="pool-deck-page__modal-head">
            <button
              type="button"
              className="pool-deck-page__modal-close"
              aria-label={"\uB2EB\uAE30"}
              onClick={closeService}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <p className="pool-deck-page__modal-brand">Ulleung</p>
          </header>

          <div className="pool-deck-page__modal-body">
            {openService === "infinity" ? (
              <>
                <section className="pool-deck-page__modal-hero" aria-label={"\uC21C\uC18C \uC18C\uAC1C"}>
                  <div className="pool-deck-page__modal-hero-images">
                    {INFINITY_SERVICE_HERO.images.map((image) => (
                      <img key={image.src} src={image.src} alt={image.alt} loading="eager" decoding="async" />
                    ))}
                  </div>
                  <h2 className="pool-deck-page__modal-hero-title">{INFINITY_SERVICE_HERO.heading}</h2>
                  {INFINITY_SERVICE_HERO.lines.map((line) => (
                    <p key={line} className="pool-deck-page__modal-hero-line">
                      {line}
                    </p>
                  ))}
                </section>

                {INFINITY_SERVICE_ITEMS.map((item) => (
                  <article key={item.src} className="pool-deck-page__modal-item">
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                    <h3 className="pool-deck-page__modal-item-title">{item.title}</h3>
                    <p className="pool-deck-page__modal-desc">
                      {"before" in item && item.before ? item.before : null}
                      <span className="pool-deck-page__modal-desc-em">{item.highlight}</span>
                      {item.after}
                    </p>
                  </article>
                ))}
              </>
            ) : openService === "dining" ? (
              <>
                {DINING_SERVICE_ITEMS.map((item) => (
                  <article key={item.src} className="pool-deck-page__modal-item">
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                    <h3 className="pool-deck-page__modal-item-title">{item.title}</h3>
                    <p className="pool-deck-page__modal-desc">
                      {item.before}
                      <span className="pool-deck-page__modal-desc-em">{item.highlight}</span>
                      {"middle" in item && item.middle ? item.middle : null}
                      {"highlight2" in item && item.highlight2 ? (
                        <span className="pool-deck-page__modal-desc-em">{item.highlight2}</span>
                      ) : null}
                      {item.after}
                    </p>
                  </article>
                ))}

                <section className="pool-deck-page__modal-notes" aria-label={"\uC720\uC758\uC0AC\uD56D"}>
                  <p className="pool-deck-page__modal-notes-label">{"\uC720\uC758\uC0AC\uD56D"}</p>
                  <ol className="pool-deck-page__modal-notes-list">
                    {DINING_SERVICE_NOTES.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ol>
                </section>
              </>
            ) : (
              PUMPKIN_SERVICE_ITEMS.map((item) => (
                <article key={item.src} className="pool-deck-page__modal-item">
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  <h3 className="pool-deck-page__modal-item-title">{item.title}</h3>
                  <p className="pool-deck-page__modal-desc">
                    {item.before}
                    <span className="pool-deck-page__modal-desc-em">{item.highlight}</span>
                    {item.after}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className="pool-deck-page">
      <div className="pool-deck-page__shell">
        <header className="pool-deck-page__top">
          <Link className="pool-deck-page__back" to="/" aria-label={"\uC774\uC804 \uD654\uBA74"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14 6L8 12l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <p className="pool-deck-page__pager">
            {activeIndex + 1} / {SLIDE_COUNT}
          </p>
        </header>

        <div className="pool-deck-page__intro">
          <h1 className="pool-deck-page__heading">SEOMBADI OF ULLEUNG</h1>
          <p className="pool-deck-page__lead">
            {"\uCE74\uB4DC\uB97C \uB04C\uC5B4 \uB3CC\uB9AC\uAC70\uB098 \uC635\uC73C\uB85C \uBC00\uC5B4 \uB458\uB7EC\uBCF4\uC138\uC694."}
          </p>
        </div>

        <div
          ref={carouselRef}
          className="pool-deck-page__carousel"
          role="region"
          aria-label={"\uD638\uD154 \uC774\uBBF8\uC9C0 \uAC24\uB7EC\uB9AC"}
          aria-roledescription="carousel"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <div className="pool-deck-page__ring">
            {SLIDES.map((slide, i) => {
              const offset = shortestOffset(activeIndex, i);
              const abs = Math.abs(offset);
              const isCenter = abs < 0.01;
              const isSelected = i === selectedIndex && isCenter;
              const isPopping = isCenter && i === popIndex;
              const style = getSlideTransform(offset, i, activeIndex);

              return (
                <button
                  key={slide.src}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  type="button"
                  data-slide-index={i}
                  className={`pool-deck-page__slide${isCenter ? " pool-deck-page__slide--center" : ""}${
                    isSelected ? " pool-deck-page__slide--selected" : ""
                  }${isPopping ? " pool-deck-page__slide--pop" : ""}${
                    isCenter && "serviceKey" in slide ? " pool-deck-page__slide--openable" : ""
                  }`}
                  style={style}
                  aria-label={`${slide.title}, ${i + 1}\uBC88\uC9F8 \uC0AC\uC9C4`}
                  aria-current={isSelected ? "true" : undefined}
                >
                  <span className="pool-deck-page__slide-frame">
                    <img src={slide.src} alt={slide.alt} loading={abs < 2 ? "eager" : "lazy"} decoding="async" draggable={false} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pool-deck-page__carousel-nav">
          <button type="button" className="pool-deck-page__nav pool-deck-page__nav--prev" aria-label={"\uC774\uC804 \uCE74\uB4DC"} onClick={goPrev}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14 6L8 12l6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" className="pool-deck-page__nav pool-deck-page__nav--next" aria-label={"\uB2E4\uC74C \uCE74\uB4DC"} onClick={goNext}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="pool-deck-page__meta">
          <p className="pool-deck-page__meta-title">{SLIDES[activeIndex].title}</p>
          <p className="pool-deck-page__location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            {SLIDES[activeIndex].location}
          </p>
          <div className="pool-deck-page__meta-extra" aria-hidden={!activeServiceHint}>
            {activeServiceHint && activeServiceKey ? (
              <>
                <p className="pool-deck-page__hint">{activeServiceHint.hint}</p>
                <button type="button" className="pool-deck-page__open-service" onClick={() => setOpenService(activeServiceKey)}>
                  {activeServiceHint.button}
                </button>
              </>
            ) : null}
          </div>
        </div>

        <p className="pool-deck-page__credit">Premium by ulleung_sketch</p>
      </div>

      {serviceModal}
    </div>
  );
}
