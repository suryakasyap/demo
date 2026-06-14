import { useEffect, useMemo, useState } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

/**
 * Looping hero photo carousel: crossfade + slow Ken Burns zoom.
 * Photos are hotlinked from Unsplash (free licence) — swap the `src`
 * values for your own assets in src/assets when ready. Any image that
 * fails to load is dropped from the rotation automatically.
 */
const SLIDES = [
  {
    id: 'talent',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1100&q=70',
    alt: 'A team collaborating around a meeting table',
    kicker: 'Talent & HR',
    caption: 'Executive search & leadership hiring',
  },
  {
    id: 'advisory',
    src: 'https://images.pexels.com/photos/5833340/pexels-photo-5833340.jpeg',
    alt: 'A senior business leader in a modern office',
    kicker: 'Advisory',
    caption: 'HR consulting, audits & compliance',
  },
  {
    id: 'logistics',
    src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1100&q=70',
    alt: 'Warehouse logistics operations',
    kicker: 'Software & product',
    caption: 'Logistics & supply-chain platforms',
  },
  {
    id: 'engineering',
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1100&q=70',
    alt: 'Source code on a developer screen',
    kicker: 'Engineering',
    caption: 'Custom software & ERP integrations',
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
    return (
      <aside className="photo-loop photo-loop--empty" aria-hidden="true">
        <span className="photo-loop__fallback">TPHRS</span>
      </aside>
    );
  }

  const active = ((index % slides.length) + slides.length) % slides.length;

  return (
    <aside className="photo-loop" aria-label="TPHRS in pictures">
      {slides.map((s, i) => (
        <figure
          key={s.id}
          className={`photo-loop__slide ${i === active ? 'is-active' : ''}`}
          aria-hidden={i !== active}
        >
          <img
            src={s.src}
            alt={s.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={() => setBroken((b) => ({ ...b, [s.id]: true }))}
          />
          <figcaption className="photo-loop__caption">
            <span className="photo-loop__kicker">{s.kicker}</span>
            {s.caption}
          </figcaption>
        </figure>
      ))}

      <div className="photo-loop__dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={i === active ? 'is-current' : ''}
            aria-label={`Show slide ${i + 1}: ${s.kicker}`}
            aria-current={i === active}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </aside>
  );
}
