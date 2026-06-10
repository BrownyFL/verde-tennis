// Shared motion language for the whole site.
// Slow, confident easings are what make movement read as "expensive".

// easeOutExpo — long, luxurious deceleration. Default for reveals.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
// easeInOutExpo — for things that travel both ways (parallax, marquee handoff).
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
