import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/**
 * Fade-and-rise an element once when it scrolls into view.
 * Add className="reveal" to the element so it starts hidden without flicker.
 */
export default function useReveal({ y = 26, delay = 0, start = 'top 85%' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start, once: true },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, delay, start]);

  return ref;
}
