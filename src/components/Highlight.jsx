import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

/**
 * <Highlight> wraps key words in the brand's pastel-green marker swipe.
 * The swipe draws itself in when scrolled into view.
 */
export default function Highlight({ children, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      el.classList.add('is-inked');
      return undefined;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          '--ink-scale': 1,
          duration: 0.85,
          delay,
          ease: 'power3.inOut',
        }),
    });

    return () => trigger.kill();
  }, [delay]);

  return (
    <mark ref={ref} className="hl">
      {children}
    </mark>
  );
}
