import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  MousePointerClick,
  Plug,
  Rocket,
  Users,
  Check,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import useReveal from '../hooks/useReveal';
import Highlight from './Highlight';
import Brand from './Brand';

/* ---------- How we work ---------- */

// The four-step method stays constant; the wording is tailored to the kind
// of work selected in the toggle above the grid.
const TRACKS = [
  {
    id: 'implementation',
    label: 'Software implementation',
    tagline: 'Integrate & deploy platforms',
    icon: Plug,
    steps: [
      {
        num: 'Step 01',
        title: 'Discover & map',
        body: 'We map the platforms, data flows and processes the new system has to fit — before a single thing is configured.',
      },
      {
        num: 'Step 02',
        title: 'Blueprint the rollout',
        body: 'A written plan: scope, integrations, milestones, named owners and how go-live success will be measured.',
      },
      {
        num: 'Step 03',
        title: 'Integrate & deploy',
        body: 'We configure, connect and migrate in tested stages — with UAT and checkpoints, no big-bang surprise cutovers.',
      },
      {
        num: 'Step 04',
        title: 'Stabilise & support',
        body: 'Hypercare through go-live, then managed support so the platform keeps performing as you scale.',
      },
    ],
  },
  {
    id: 'product',
    label: 'Product development',
    tagline: 'Design, build & ship',
    icon: Rocket,
    steps: [
      {
        num: 'Step 01',
        title: 'Frame the problem',
        body: 'We start with the outcome and the users, not a feature list — a working session with the people who will live with it.',
      },
      {
        num: 'Step 02',
        title: 'Shape & estimate',
        body: 'A clear plan: scope, architecture, the team, the timeline and the cost — in plain terms, with success defined up front.',
      },
      {
        num: 'Step 03',
        title: 'Build in the open',
        body: 'Short iterations with named owners and a demo every sprint — a working build you can try at each step.',
      },
      {
        num: 'Step 04',
        title: 'Launch & evolve',
        body: 'We deploy, monitor and support what we ship, then keep improving it as your product and users grow.',
      },
    ],
  },
  {
    id: 'hr',
    label: 'HR & Consulting',
    tagline: 'Search, advisory & HR ops',
    icon: Users,
    steps: [
      {
        num: 'Step 01',
        title: 'Listen & scope',
        body: 'We start with your situation, not a pitch — a conversation about the role, the team and the culture you are hiring into.',
      },
      {
        num: 'Step 02',
        title: 'Propose in plain terms',
        body: 'A clear written plan: the search or HR approach, who runs it, what it costs and how we will measure a great fit.',
      },
      {
        num: 'Step 03',
        title: 'Search & deliver',
        body: 'Headhunting, screening and advisory by postgraduate consultants — shortlists, regular checkpoints and no surprises.',
      },
      {
        num: 'Step 04',
        title: 'Stay accountable',
        body: 'We stand behind every placement and engagement, staying with candidates and clients as they grow.',
      },
    ],
  },
];

export function Approach() {
  const headRef = useReveal();
  const bodyRef = useReveal({ delay: 0.15 });
  const panelRef = useRef(null);
  const tabRefs = useRef([]);
  const firstRender = useRef(true);
  const [active, setActive] = useState('implementation');

  const track = TRACKS.find((t) => t.id === active);

  // Arrow-key navigation for the toggle (WAI-ARIA tablist pattern).
  const onTabKeyDown = (e, idx) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TRACKS.length - 1;
    else if (step[e.key] !== undefined)
      next = (idx + step[e.key] + TRACKS.length) % TRACKS.length;
    else return;

    e.preventDefault();
    setActive(TRACKS[next].id);
    tabRefs.current[next]?.focus();
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [active]);

  return (
    <section className="section section--soft approach" id="approach">
      <div className="wrap">
        <div className="reveal" ref={headRef}>
          <p className="eyebrow">How we work</p>
          <h2 className="section-title">
            The same four-step method —{' '}
            <Highlight>tuned to the work you need</Highlight>.
          </h2>
        </div>

        <div className="reveal" ref={bodyRef}>
          <div className="practice-picker">
            <p className="practice-picker__hint" id="approach-hint">
              <MousePointerClick aria-hidden="true" />
              Pick the kind of work — see exactly how we&rsquo;d run it.
            </p>
            <div
              className="practice-switch"
              role="tablist"
              aria-label="Choose a kind of work"
              aria-describedby="approach-hint"
            >
              {TRACKS.map((t, i) => {
                const TrackIcon = t.icon;
                const selected = active === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`approach-tab-${t.id}`}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    aria-selected={selected}
                    aria-controls={
                      selected ? `approach-panel-${t.id}` : undefined
                    }
                    tabIndex={selected ? 0 : -1}
                    className={`practice-card ${selected ? 'is-active' : ''}`}
                    onClick={() => setActive(t.id)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                  >
                    <span className="practice-card__icon" aria-hidden="true">
                      <TrackIcon />
                    </span>
                    <span className="practice-card__check" aria-hidden="true">
                      <Check />
                    </span>
                    <span className="practice-card__text">
                      <span className="practice-card__label">{t.label}</span>
                      <span className="practice-card__tagline">
                        {t.tagline}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={panelRef}
            role="tabpanel"
            id={`approach-panel-${track.id}`}
            aria-labelledby={`approach-tab-${track.id}`}
            tabIndex={0}
          >
            <div className="approach__grid">
              {track.steps.map((s) => (
                <article className="step-card" key={s.num}>
                  <span className="step-card__num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why TPHRS ---------- */

const STATS = [
  { value: '15+', label: 'Years of advisory, search and outsourcing' },
  { value: '2+2', label: 'Operating in India & USA, expanding to Singapore & UAE' },
  { value: '3C', label: 'Values: Commitment, Compliance, Cognizant' },
  { value: '100%', label: 'Consultants are qualified postgraduates' },
];

const VALUES = [
  {
    title: 'Commitment',
    body: 'Enable clients to attract and retain the best talent, help candidates reach their career aspirations, and bring that same commitment to every product we ship.',
  },
  {
    title: 'Compliance',
    body: 'Work to the highest ethical and professional standards — in employment law, in audits, and now in the security and reliability of the software we build.',
  },
  {
    title: 'Cognizant',
    body: 'Minimise opportunity loss with workable, well-researched solutions — grounded in data mining, market intelligence and real delivery experience.',
  },
];

export function Why() {
  const headRef = useReveal();
  const statsRef = useReveal({ delay: 0.1 });
  const valuesRef = useReveal({ delay: 0.15 });

  return (
    <section className="section why" id="why">
      <div className="wrap">
        <div className="reveal" ref={headRef}>
          <p className="eyebrow">Why TPHRS</p>
          <h2 className="section-title">
            Professionals at work — <Highlight>now in two disciplines</Highlight>.
          </h2>
          <p className="section-lede">
            Short-term savings on people or technology often prove to be
            long-term disasters. We are built for the long term: uniform global
            practices, in-depth research, and relationships measured in careers,
            not contracts.
          </p>
        </div>

        <div className="why__stats reveal" ref={statsRef}>
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__value">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="why__values reveal" ref={valuesRef}>
          {VALUES.map((v) => (
            <article className="value-card" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */

export function Contact() {
  const headRef = useReveal();
  const gridRef = useReveal({ delay: 0.1 });
  const [mapView, setMapView] = useState('roadmap');
  const [form, setForm] = useState({
    name: '',
    email: '',
    need: 'Hire talent',
    message: '',
  });

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry — ${form.need} (${form.name})`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nNeed: ${form.need}\n\n${form.message}`
    );
    window.location.href = `mailto:hr@tphrs.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section section--soft contact" id="contact">
      <div className="wrap">
        <div className="reveal" ref={headRef}>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">
            Tell us what you need — <Highlight>people, software, or both</Highlight>.
          </h2>
          <p className="section-lede">
            A real consultant replies, usually within one business day.
          </p>
        </div>

        <div className="contact__grid reveal" ref={gridRef}>
          <form className="contact-form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="cf-name">Your name</label>
              <input
                id="cf-name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
              />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Work email</label>
              <input
                id="cf-email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={update('email')}
              />
            </div>
            <div className="field">
              <label htmlFor="cf-need">What do you need?</label>
              <select id="cf-need" value={form.need} onChange={update('need')}>
                <option>Hire talent</option>
                <option>HR advisory or outsourcing</option>
                <option>Build software or a product</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="cf-msg">A few lines about your situation</label>
              <textarea
                id="cf-msg"
                value={form.message}
                onChange={update('message')}
              />
            </div>
            <button className="btn btn--primary" type="submit">
              Send enquiry{' '}
              <span className="arrow" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </button>
          </form>

          <div>
            <div className="office-map">
              <div className="office-map__toggle">
                <button
                  type="button"
                  className={`office-map__btn ${mapView === 'roadmap' ? 'is-active' : ''}`}
                  onClick={() => setMapView('roadmap')}
                >
                  Map
                </button>
                <button
                  type="button"
                  className={`office-map__btn ${mapView === 'satellite' ? 'is-active' : ''}`}
                  onClick={() => setMapView('satellite')}
                >
                  Satellite
                </button>
              </div>
              <iframe
                className="office-map__frame"
                title="TPHRS Visakhapatnam Office"
                src={`https://maps.google.com/maps?q=17.726954,83.305365&t=${mapView === 'satellite' ? 'k' : 'm'}&z=17&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="office">
              <h3>Visakhapatnam office</h3>
              <p>
                A2, Varanasi Majestic, Dwaraka Nagar 2nd Lane,
                <br />
                Opp. IndusInd Bank, Visakhapatnam-530016.
              </p>
              <p>Phone: 0891-6669777 · 92466 55588</p>
            </div>
            <div className="office">
              <h3>Write to the right desk</h3>
              <p className="contact__mailrow">
                Business — <a href="mailto:business@tphrs.com">business@tphrs.com</a>
              </p>
              <p className="contact__mailrow">
                Careers — <a href="mailto:jobs@tphrs.com">jobs@tphrs.com</a>
              </p>
              <p className="contact__mailrow">
                Media — <a href="mailto:media.enquiries@tphrs.com">media.enquiries@tphrs.com</a>
              </p>
              <p className="contact__mailrow">
                HR services — <a href="mailto:hr@tphrs.com">hr@tphrs.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__left">
          <Brand />

          <div className="footer__tagline">
            <p>
              "Whether you're scaling a startup team or transforming enterprise
              operations, Turning Point HR Solutions is here to help you find the
              right people, build the right systems, and navigate the complexities
              of modern business with confidence and clarity."
            </p>
            <span className="footer__team">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;—TPHRS TEAM</span>
          </div>
        </div>

        <div className="footer__right">
          <nav className="footer__nav" aria-label="Footer navigation">
            <p className="footer__nav-heading">Navigation</p>
            <ul>
              <li><a href="#story">Our Story</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#approach">How We Work</a></li>
              <li><a href="#why">Why TPHRS</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <div className="footer__social">
            <p className="footer__nav-heading">Contact Us</p>
            <div className="footer__social-links">
              <a
                href="https://in.linkedin.com/company/turning-point-hr-solutions---india"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="footer__social-icon"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/Turningpointhrsolutions"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="footer__social-icon"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__legal">
          <span>
            © {new Date().getFullYear()} Turning Point HR Solutions. All rights
            reserved.
          </span>
          <nav className="footer__legal-links" aria-label="Legal">
            <a href="#/privacy">Privacy Policy</a>
            <a href="#/terms">Terms of Service</a>
            <a href="#/cookies">Cookie Policy</a>
          </nav>
          <span>Consulting · Software &amp; Product Development</span>
        </div>
      </div>
    </footer>
  );
}
