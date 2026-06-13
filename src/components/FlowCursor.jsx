import { useEffect } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

const INTERACTIVE =
  'a, button, [role="tab"], input, select, textarea, label, summary';

/**
 * Flowy cursor: a precise dot plus a soft ring that trails behind it and
 * swells over anything clickable. The native cursor stays visible so
 * usability never depends on the effect. Skipped on touch devices and
 * under prefers-reduced-motion.
 */
export default function FlowCursor() {
  useEffect(() => {
    if (
      prefersReducedMotion() ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    ) {
      return undefined;
    }

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

    let shown = false;
    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e) => {
      const hot = e.target.closest?.(INTERACTIVE);
      ring.classList.toggle('is-active', Boolean(hot));
      gsap.to(ring, {
        scale: hot ? 1.6 : 1,
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: hot ? 0.5 : 1, duration: 0.35 });
    };

    const onLeave = () => {
      shown = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
}
