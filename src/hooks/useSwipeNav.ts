import { useRef } from "react";
import type { DragEvent, PointerEvent } from "react";

const MIN_DISTANCE = 50;

type Options = {
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
};

/** 왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전. 세로 이동이 더 크면 무시한다. */
export function useSwipeNav({ onPrev, onNext, disabled = false }: Options) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (disabled || (event.pointerType === "mouse" && event.button !== 0)) return;
    if ((event.target as HTMLElement).closest("button, a")) return;
    start.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const origin = start.current;
    start.current = null;
    if (!origin || origin.id !== event.pointerId || disabled) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    if (Math.abs(dx) < MIN_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  const onPointerCancel = () => {
    start.current = null;
  };

  const onDragStart = (event: DragEvent<HTMLElement>) => event.preventDefault();

  return { onPointerDown, onPointerUp, onPointerCancel, onDragStart };
}
