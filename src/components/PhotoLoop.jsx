import { useEffect, useMemo, useState } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

/**
 * Full-bleed crossfading hero background: crossfade + slow Ken Burns zoom,
 * images only (the headline sits over them). Photos are hotlinked from
 * Unsplash/Pexels (free licence) — swap the `src` values for your own assets
 * in src/assets when ready. Any image that fails to load is dropped from the
 * rotation automatically.
 */
const SLIDES = [
  {
    id: 'talent',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1100&q=70',
  },
  {
    id: 'advisory',
    src: 'https://images.pexels.com/photos/5833340/pexels-photo-5833340.jpeg?auto=compress&cs=tinysrgb&w=1100&q=70',
  },
  {
    id: 'logistics',
    src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1100&q=70',
  },
  {
    id: 'engineering',
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1100&q=70',
  },
];

const INTERVAL_MS = 4200;

export default function PhotoLoop() {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState({});
  const still = useMemo(() => prefersReducedMotion(), []);

  const slides = SLIDES.filter((s) => !broken[s.id]);

  useEffect(() => {
    if (still || slides.length < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => i + 1), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [still, slides.length]);

  if (!slides.length) {
    return <div className="hero__photos hero__photos--empty" aria-hidden="true" />;
  }

  const active = ((index % slides.length) + slides.length) % slides.length;

  return (
    <div className="hero__photos" aria-hidden="true">
      {slides.map((s, i) => (
        <img
          key={s.id}
          className={`hero__photo ${i === active ? 'is-active' : ''}`}
          src={s.src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          onError={() => setBroken((b) => ({ ...b, [s.id]: true }))}
        />
      ))}
    </div>
  );
}
