import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import Highlight from './Highlight';
import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';

/* ---------- How we work ---------- */

const STEPS = [
  {
    num: 'Step 01',
    title: 'Listen & scope',
    body: 'We start with your situation, not a pitch — a conversation with the people who will actually do the work.',
  },
  {
    num: 'Step 02',
    title: 'Propose in plain terms',
    body: 'A clear written plan: what we will do, who will do it, what it costs and how success is measured.',
  },
  {
    num: 'Step 03',
    title: 'Deliver & report',
    body: 'Search, advisory or software build — you get named owners, regular checkpoints and no surprises.',
  },
  {
    num: 'Step 04',
    title: 'Stay accountable',
    body: 'We support what we place and what we ship, and stay with candidates and products as they grow.',
  },
];

export function Approach() {
  const headRef = useReveal();
  const gridRef = useReveal({ delay: 0.15 });

  return (
    <section className="section section--soft approach" id="approach">
      <div className="wrap">
        <div className="reveal" ref={headRef}>
          <p className="eyebrow">How we work</p>
          <h2 className="section-title">
            The same four steps, whether you need{' '}
            <Highlight>a leader or a platform</Highlight>.
          </h2>
        </div>
        <div className="approach__grid reveal" ref={gridRef}>
          {STEPS.map((s) => (
            <article className="step-card" key={s.num}>
              <span className="step-card__num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
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
    window.location.href = `mailto:dvrraju@tphrs.com?subject=${subject}&body=${body}`;
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
            <p className="contact-form__hint">
              This opens your email app with the message pre-filled, addressed
              to dvrraju@tphrs.com
            </p>
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
                Opp. Indusund Bank,Visakhapatnam-530016.
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
          <a className="brand" href="#top">
            <img className="brand__logo brand__logo--dark" src={logoDark} alt="TPHRS logo" />
            <img className="brand__logo brand__logo--light" src={logoLight} alt="TPHRS logo" />
            <div className="brand__text">
              <span className="brand__mark">
                TPHRS<span className="dot">.</span>
              </span>
              <span className="brand__sub">Turning Point HR Solutions</span>
            </div>
          </a>

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
          <span>Consulting · Software &amp; Product Development</span>
        </div>
      </div>
    </footer>
  );
}
