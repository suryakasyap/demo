import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import PhotoLoop from './PhotoLoop';

import heroBg from '../assets/hero-bg.png';

const TICKER = [
  'Executive search',
  'HR advisory',
  'HR outsourcing',
  'Domain consulting',
  'ERP integration',
  'Carrier connect',
  'Implementation & onboarding',
  'Managed services',
  'Support & maintenance',
];

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;

    if (prefersReducedMotion()) {
      root
        ?.querySelectorAll('.hero h1 .hl')
        .forEach((el) => el.classList.add('is-inked'));
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Clip the headline only while it animates in, so the highlight
      // bubbles aren't cropped afterwards.
      const heroLines = root?.querySelectorAll('.hero__line');
      heroLines?.forEach((el) => el.classList.add('is-animating'));

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero .eyebrow', { y: 16, opacity: 0, duration: 0.6 })
        .from(
          '.hero__line > span',
          {
            yPercent: 112,
            duration: 0.95,
            stagger: 0.12,
            onComplete: () => {
              heroLines?.forEach((el) => el.classList.remove('is-animating'));
            },
          },
          '-=0.25'
        )
        .from('.hero__lede', { y: 22, opacity: 0, duration: 0.7 }, '-=0.45')
        .from('.hero__ctas', { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(
          '.hero__meta li',
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 },
          '-=0.35'
        )
        .from(
          '.photo-loop',
          { y: 26, opacity: 0, scale: 0.97, duration: 0.9 },
          '-=0.7'
        )
        .from('.ticker', { opacity: 0, duration: 0.7 }, '-=0.6')
        .to(
          '.hero h1 .hl',
          {
            '--ink-scale': 1,
            duration: 0.85,
            ease: 'power3.inOut',
            stagger: 0.2,
          },
          '-=1.1'
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <img className="hero__bg" src={heroBg} alt="" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div>
          <p className="eyebrow">Advisory · Search · Outsourcing · Software</p>
          <h1>
            <span className="hero__line">
              <span>
                The Turning Point for your <mark className="hl">people</mark>
              </span>
            </span>
            <span className="hero__line">
              <span>
                and now, your <mark className="hl">product</mark>.
              </span>
            </span>
          </h1>
          <p className="hero__lede">
            For more than a decade, Turning Point HR Solutions has helped
            organisations find leaders, run HR operations and stay compliant.{' '}
            <strong>
              Today we are a software and product development firm as well
            </strong>{' '}
            — one partner from first hire to finished product.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#services">
              Explore our services
              <span className="arrow" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </a>
            <a className="btn btn--ghost" href="#contact">
              Start a conversation
            </a>
          </div>
          <ul className="hero__meta">
            <li>
              <span className="dot">●</span>India &amp; USA — expanding to
              Singapore &amp; UAE
            </li>
            <li>
              <span className="dot">●</span>Multiple practices, one accountable team
            </li>
          </ul>
        </div>

        <PhotoLoop />
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span className="ticker__item" key={`${item}-${i}`}>
              {item}
              <span className="ticker__sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
