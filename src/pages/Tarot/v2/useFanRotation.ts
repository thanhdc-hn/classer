import {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DRAG_THRESHOLD_PX, FRICTION, RADIUS_K } from './constants.ts';

const MIN_VELOCITY = 0.005; // deg/ms — below this inertia stops
const VELOCITY_WINDOW_MS = 100; // only recent samples count for release speed
const FRAME_MS = 1000 / 60;

interface Sample {
  x: number;
  t: number;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Wheel radius in px. The CSS sizes the wheel in `cqmin` of the fan area
 * (`--radius-k` units, set on `.fan`), so mirror that here.
 */
const readRadiusPx = (area: HTMLElement) => {
  const fan = area.querySelector<HTMLElement>('.fan') ?? area;
  const radiusK =
    parseFloat(getComputedStyle(fan).getPropertyValue('--radius-k')) ||
    RADIUS_K;
  // Same as CSS: --u: min(1cqw, 0.8cqh)
  const unit = Math.min(area.clientWidth, area.clientHeight * 0.8) / 100;
  return Math.max(radiusK * unit, 1);
};

/** Full 360° wheel: rotation is unbounded, no clamping at the ends. */
const useFanRotation = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCoasting, setIsCoasting] = useState(false);

  const rotationRef = useRef(0);
  const degPerPxRef = useRef(0);
  const pointerRef = useRef<{
    id: number;
    startX: number;
    lastX: number;
  } | null>(null);
  const samplesRef = useRef<Sample[]>([]);
  const draggedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const apply = useCallback((value: number) => {
    rotationRef.current = value;
    setRotation(value);
  }, []);

  const stopInertia = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsCoasting(false);
  }, []);

  useEffect(() => stopInertia, [stopInertia]);

  const startInertia = (velocity: number) => {
    let v = velocity;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      apply(rotationRef.current + v * dt);
      v *= Math.pow(FRICTION, dt / FRAME_MS);
      if (Math.abs(v) < MIN_VELOCITY) {
        rafRef.current = null;
        setIsCoasting(false);
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    setIsCoasting(true);
    rafRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stopInertia();
    // Moving the pointer by one arc-length pixel at the rim = 1 px of travel
    degPerPxRef.current = 180 / (Math.PI * readRadiusPx(e.currentTarget));
    pointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
    };
    samplesRef.current = [{ x: e.clientX, t: e.timeStamp }];
    draggedRef.current = false;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== e.pointerId) return;

    if (!draggedRef.current) {
      if (Math.abs(e.clientX - pointer.startX) < DRAG_THRESHOLD_PX) return;
      draggedRef.current = true;
      setIsDragging(true);
      // Capture only once it is a real drag so plain clicks still hit cards
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }

    const dx = e.clientX - pointer.lastX;
    pointer.lastX = e.clientX;
    apply(rotationRef.current + dx * degPerPxRef.current);

    const samples = samplesRef.current;
    samples.push({ x: e.clientX, t: e.timeStamp });
    while (
      samples.length > 2 &&
      e.timeStamp - samples[0].t > VELOCITY_WINDOW_MS
    ) {
      samples.shift();
    }
  };

  const endPointer = (
    e: ReactPointerEvent<HTMLElement>,
    allowInertia: boolean,
  ) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== e.pointerId) return;
    pointerRef.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!draggedRef.current) return;
    setIsDragging(false);
    // Keep the guard up for the click that follows this pointerup, then drop
    // it so keyboard activation is not blocked afterwards.
    window.setTimeout(() => {
      if (!pointerRef.current) draggedRef.current = false;
    }, 0);

    if (!allowInertia || prefersReducedMotion()) return;
    const samples = samplesRef.current;
    const first = samples[0];
    const lastSample = samples[samples.length - 1];
    const dt = lastSample.t - first.t;
    // Ignore stale samples: pointer held still before release => no fling
    if (dt <= 0 || e.timeStamp - lastSample.t > VELOCITY_WINDOW_MS) return;
    const velocity = ((lastSample.x - first.x) / dt) * degPerPxRef.current;
    if (Math.abs(velocity) >= MIN_VELOCITY) startInertia(velocity);
  };

  const didDrag = useCallback(() => draggedRef.current, []);

  const reset = useCallback(() => {
    stopInertia();
    pointerRef.current = null;
    draggedRef.current = false;
    setIsDragging(false);
    rotationRef.current = 0;
    setRotation(0);
  }, [stopInertia]);

  return {
    rotation,
    isDragging,
    /** Dragging or coasting: rotation is changing every frame. */
    isMoving: isDragging || isCoasting,
    didDrag,
    reset,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: (e: ReactPointerEvent<HTMLElement>) => endPointer(e, true),
      onPointerCancel: (e: ReactPointerEvent<HTMLElement>) =>
        endPointer(e, false),
    },
  };
};

export default useFanRotation;
