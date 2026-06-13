import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import useReveal from '../hooks/useReveal';
import Highlight from './Highlight';

const STEPS = [
  {
    when: 'Where we started',
    title: 'A people firm, trusted at the top.',
    body: `Turning Point HR Solutions began as an executive-level advisory, search
      and outsourcing firm — the team CEOs and senior executives turn to for
      day-to-day management support. We place leaders, run recruitment end to
      end, manage payroll and HRIS, and keep organisations compliant.`,
    chips: ['Executive search', 'HR advisory', 'HR outsourcing'],
  },
  {
    when: 'What we noticed',
    title: 'Every people problem ended at a system.',
    body: `Years of designing IT tools for HR, guiding ERP implementations and
      managing HRIS platforms taught us something: the organisations we serve
      don't just need the right people — they need the right software around
      those people.`,
    chips: ['IT tools for HR', 'ERP guidance', 'Global HRIS'],
  },
  {
    when: 'Where we are now',
    title: 'A software and product development firm — still a people firm.',
    body: `TPHRS has grown into a full software and product development
      practice alongside everything we have always done: consulting on
      logistics and supply chains, integrating the enterprise platforms our
      clients already run, and building, deploying and supporting the systems
      their businesses depend on. The same advisory rigour, applied to the
      platforms your organisation runs on.`,
    chips: ['Logistics consulting', 'ERP integration', 'Managed platforms'],
  },
];

function Step({ step }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      el.classList.add('is-active');
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          once: true,
          onEnter: () => el.classList.add('is-active'),
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <article className="story__step reveal" ref={ref}>
      <span className="story__node" aria-hidden="true" />
      <p className="story__when">{step.when}</p>
      <h3>{step.title}</h3>
      <p>{step.body}</p>
      <div className="story__chips">
        {step.chips.map((c) => (
          <span className="chip" key={c}>
            {c}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Story() {
  const headRef = useReveal();
  const railRef = useRef(null);

  // The thread draws itself as you read down the story.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    const fill = rail.querySelector('.story__thread-fill');

    if (prefersReducedMotion()) {
      gsap.set(fill, { '--draw': 1 });
      return undefined;
    }

    const tween = gsap.fromTo(
      fill,
      { '--draw': 0 },
      {
        '--draw': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rail,
          start: 'top 72%',
          end: 'bottom 62%',
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="section section--soft story" id="story">
      <div className="wrap">
        <div className="reveal" ref={headRef}>
          <p className="eyebrow">Our story</p>
          <h2 className="section-title">
            From placing great teams to{' '}
            <Highlight>building what they work with</Highlight>.
          </h2>
          <p className="section-lede">
            One thread runs through everything TPHRS does: helping organisations
            perform. It used to end at people. It now continues into product.
          </p>
        </div>

        <div className="story__rail" ref={railRef}>
          <div className="story__thread" aria-hidden="true">
            <span className="story__thread-fill" />
          </div>
          {STEPS.map((s) => (
            <Step key={s.when} step={s} />
          ))}
          <p className="story__step story__handoff">
            <span className="story__node" aria-hidden="true" />
            Both practices now share one front door —{' '}
            <a href="#services">see everything we offer below</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
