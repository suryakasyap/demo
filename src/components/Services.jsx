import { useEffect, useRef, useState } from 'react';
import {
  Compass,
  Plug,
  Truck,
  Rocket,
  Activity,
  LifeBuoy,
  Users,
  ShieldCheck,
  Layers,
  Network,
  Boxes,
  Route,
  UserSearch,
  ChevronDown,
  Check,
  ArrowRight,
  MousePointerClick,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import useReveal from '../hooks/useReveal';
import Highlight from './Highlight';
import LogoMarquee from './LogoMarquee';
import {
  siReact,
  siNodedotjs,
  siTypescript,
  siPython,
  siPostgresql,
  siDocker,
  siKubernetes,
  siGooglecloud,
  siGraphql,
} from 'simple-icons';

import logoOtm from '../assets/logo-otm.png';
import logoBy from '../assets/logo-by.png';
import logoSap from '../assets/logo-sap.png';
import logoApi from '../assets/logo-api.png';
import logoAws from '../assets/aws.png';
import logoAzure from '../assets/azure.png';
import logoHsbc from '../assets/HSBC.png';
import logoIbm from '../assets/ibm.png';
import logoConcentrix from '../assets/concentrix.png';
import logoGenpact from '../assets/genpact.png';
import logoWipro from '../assets/wipro.png';
import logoHcl from '../assets/hcl.png';
import logoConduent from '../assets/conduent.png';

// ERP / TMS platforms we integrate — each one is its own toggle in the build
// tab, showing the services we deliver on that specific platform.
const ERP_PLATFORMS = [
  {
    id: 'otm',
    name: 'Oracle OTM',
    full: 'Oracle Transportation Management',
    logo: logoOtm,
    blurb:
      'End-to-end OTM delivery — from greenfield rollout to day-two managed support.',
    services: [
      'OTM implementation & configuration',
      'Carrier, rate & tender integration',
      'Custom agents, automation & extensions',
      'Managed OTM support & upgrades',
    ],
  },
  {
    id: 'by',
    name: 'Blue Yonder',
    full: 'Blue Yonder',
    logo: logoBy,
    blurb:
      'Blue Yonder transportation & network, configured to how your supply chain actually runs.',
    services: [
      'Blue Yonder implementation & rollout',
      'Network & flow configuration',
      'ERP & carrier integration',
      'Managed support & optimisation',
    ],
  },
  {
    id: 'sap',
    name: 'SAP TMS',
    full: 'SAP Transportation Management',
    logo: logoSap,
    blurb:
      'SAP TM across S/4HANA and ECC — freight, carriers and settlement, joined up.',
    services: [
      'SAP TM implementation',
      'S/4HANA & ECC integration',
      'Freight, carrier & settlement setup',
      'Managed support & upgrades',
    ],
  },
  {
    id: 'api',
    name: 'Custom & API',
    full: 'Custom builds & API connectivity',
    logo: logoApi,
    blurb:
      'No off-the-shelf fit? We build the platform and the connectors around your process.',
    services: [
      'Bespoke platform & product builds',
      'Flexible API & EDI connectivity',
      'Legacy & multi-system integration',
      'Deploy, monitor & support',
    ],
  },
];

// The engineering stack behind the builds — technologies only; the ERP
// platforms now live in their own selector above the marquee.
const TECH_STACK = [
  { name: 'React', icon: siReact },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Python', icon: siPython },
  { name: '.NET' },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'Docker', icon: siDocker },
  { name: 'Kubernetes', icon: siKubernetes },
  { name: 'Google Cloud', icon: siGooglecloud },
  { name: 'GraphQL', icon: siGraphql },
  { name: 'AWS', img: logoAws },
  { name: 'Azure', img: logoAzure },
];

const PARTNER_LOGOS = [
  { name: 'HSBC', img: logoHsbc },
  { name: 'IBM', img: logoIbm },
  { name: 'Concentrix', img: logoConcentrix },
  { name: 'Genpact', img: logoGenpact },
  { name: 'Wipro', img: logoWipro },
  { name: 'HCL', img: logoHcl },
  { name: 'Conduent', img: logoConduent },
];

const TABS = [
  {
    id: 'build',
    label: 'SI Partner & Product Development',
    tagline: 'Integrate, build & run',
    icon: Boxes,
    intro: `Our build practice: we integrate the enterprise platforms you
      already run, connect your carriers, and deploy, monitor and support
      the systems that move your business.`,
    // The build tab keeps the standard accordion; its "ERP & platform
    // integration" row expands to reveal the platform selector, and the tab
    // closes with the engineering-stack marquee.
    marquee: { label: 'Engineered on a best-in-class stack', logos: 'tech' },
    services: [
      {
        icon: Plug,
        title: 'ERP & platform integration',
        blurb:
          'Prebuilt connectors to leading enterprise platforms — unified processes, smooth data flow.',
        items: [
          'Prebuilt connectors to leading platforms',
          'Unified processes & clean data flow',
          'Real-time, two-way synchronisation',
          'Flexible API & EDI connectivity',
        ],
        platformSelector: true,
      },
      {
        icon: Truck,
        title: 'Carrier connect',
        blurb:
          'Simplify, automate and optimise transportation management end to end.',
        items: [
          'Direct carrier integration',
          'Centralised carrier management',
          'Analytics & reporting',
          'Route optimisation & load consolidation',
        ],
      },
      {
        icon: Rocket,
        title: 'Implementation & onboarding',
        blurb:
          'Fast, seamless deployment tailored to your operations — adoption made easy.',
        items: [
          'Process automation',
          'Scalability & flexibility',
          'Compliance & security',
          'Personalised training',
        ],
      },
      {
        icon: Activity,
        title: 'Managed services',
        blurb:
          'We monitor and manage your logistics so you can focus on the core business.',
        items: [
          'Unified data flow',
          'Automated documentation',
          'Shipment tracking & monitoring',
          'Exception handling & alerts',
        ],
      },
    ],
  },
  {
    id: 'consulting',
    label: 'Consulting services',
    // Short, plain-language cue shown under the title on the big toggle card.
    tagline: 'Strategy & domain advisory',
    icon: Compass,
    intro: `Where every engagement starts: independent advisory from
      postgraduate consultants who map your supply chain, redesign the
      process and de-risk the change — before a single system is touched.`,
    marquee: { label: 'Enterprises we have advised' },
    services: [
      {
        icon: Route,
        title: 'Supply-chain consulting',
        blurb: 'Simplify complex logistics and lift supply-chain performance.',
        items: [
          'Strategic supply-chain advisory',
          'Transportation optimisation',
          'Network & flow design',
          'Process re-engineering',
        ],
      },
      {
        icon: Network,
        title: 'Digital transformation',
        blurb:
          'A pragmatic roadmap from where you are to a connected, automated operation.',
        items: [
          'Digital transformation consulting',
          'Automation & data strategy',
          'Platform & tooling selection',
          'Operating-model design',
        ],
      },
      {
        icon: LifeBuoy,
        title: 'Risk, compliance & change',
        blurb:
          'Keep the transformation safe, compliant and adopted by your people.',
        items: [
          'Regulatory & compliance advisory',
          'Sustainability consulting',
          'Risk & resilience planning',
          'Change management & training',
        ],
      },
    ],
  },
  {
    id: 'talent',
    label: 'Talent & HR services',
    tagline: 'Hiring, HR ops & compliance',
    icon: Users,
    intro: `The practice we built our name on: finding leaders, running HR
      operations and keeping organisations compliant — delivered by
      postgraduate consultants with deep domain expertise.`,
    marquee: { label: 'Companies we have partnered with' },
    services: [
      {
        icon: UserSearch,
        title: 'Executive search & recruitment',
        blurb: 'Leadership and volume hiring, handled end to end.',
        items: [
          'Headhunting niche C-level leadership',
          'Re-sourcing & talent search',
          'End-to-end campus solutions',
          'Online evaluation & skill testing',
        ],
      },
      {
        icon: ShieldCheck,
        title: 'HR advisory & compliance',
        blurb: 'Custom-made consulting for every client situation.',
        items: [
          'HR consulting & process optimisation',
          'Compliance audits — ISO, SOX, ISMS',
          'Statutory compliance under employment law',
          'M&A due diligence & compliances',
          'Workplace surveys & employer branding',
          'Outplacement',
        ],
      },
      {
        icon: Layers,
        title: 'HR outsourcing',
        blurb: 'Your HR operations, run for you — anywhere, anytime.',
        items: [
          'Staffing solutions',
          'Total recruitment vendor management (TVM)',
          'Global HRIS management',
          'Payroll for small & medium enterprises',
          'HR process outsourcing for large corporates',
          'Training content management',
        ],
      },
    ],
  },
];

function ServiceRow({ service, index, open, onToggle, tabId }) {
  const bodyRef = useRef(null);
  const firstRender = useRef(true);
  const { icon: Icon } = service;
  const rowId = `${tabId}-svc-${index}`;

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    if (firstRender.current || prefersReducedMotion()) {
      firstRender.current = false;
      gsap.set(el, { height: open ? 'auto' : 0 });
      return;
    }

    if (open) {
      gsap.to(el, { height: 'auto', duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(el, { height: 0, duration: 0.4, ease: 'power3.inOut' });
    }
  }, [open]);

  return (
    <div className={`svc-row ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="svc-row__head"
        aria-expanded={open}
        aria-controls={`${rowId}-body`}
        id={`${rowId}-head`}
        onClick={onToggle}
      >
        <span className="svc-row__num">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="svc-row__icon" aria-hidden="true">
          <Icon />
        </span>
        <span>
          <span className="svc-row__title">{service.title}</span>
          <span className="svc-row__blurb">{service.blurb}</span>
        </span>
        <span className="svc-row__chev" aria-hidden="true">
          <ChevronDown size={20} />
        </span>
      </button>

      <div
        className="svc-row__body"
        id={`${rowId}-body`}
        role="region"
        aria-labelledby={`${rowId}-head`}
        ref={bodyRef}
      >
        <div className="svc-row__inner">
          <ul className="svc-items">
            {service.items.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {service.platformSelector ? (
            <div className="svc-platforms">
              <p className="svc-platforms__label">Platforms we integrate</p>
              <p className="svc-platforms__hint">
                Pick a platform to see how we implement, connect and run it.
              </p>
              <ErpPlatforms />
            </div>
          ) : (
            <a className="svc-ask" href="#contact">
              Discuss {service.title.toLowerCase()}{' '}
              <ArrowRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const NOTE_COPY = {
  consulting:
    'Strategy that ships: our consultants don’t hand you a deck and walk away — the same firm can integrate, build and run what we recommend, so the advice is grounded in what we can actually deliver.',
  build:
    'From blueprint to production: our engineers consult, build and run logistics and supply-chain software — so your platforms are shaped by people who understand the domain, not just the code.',
  talent:
    'Where the practices meet: we build and integrate the HR expertise we have spent a decade advising on — so your hiring, payroll and people systems are designed by a team that has actually run them.',
};

function ServiceNote({ active }) {
  const noteRef = useRef(null);
  const prevActive = useRef(active);

  useEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;

    const el = noteRef.current;
    if (!el || prefersReducedMotion()) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    );
  }, [active]);

  return (
    <p className="services__note" ref={noteRef}>
      {NOTE_COPY[active]}
    </p>
  );
}

// Section 1 of the build tab: a toggle selector of the ERP/TMS platforms we
// integrate, each one revealing the services we deliver on it.
function ErpPlatforms() {
  const [active, setActive] = useState(ERP_PLATFORMS[0].id);
  const tabRefs = useRef([]);
  const panelRef = useRef(null);
  const firstRender = useRef(true);
  const platform = ERP_PLATFORMS.find((p) => p.id === active);

  const onKeyDown = (e, idx) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ERP_PLATFORMS.length - 1;
    else if (step[e.key] !== undefined)
      next = (idx + step[e.key] + ERP_PLATFORMS.length) % ERP_PLATFORMS.length;
    else return;

    e.preventDefault();
    setActive(ERP_PLATFORMS[next].id);
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
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    );
  }, [active]);

  return (
    <div className="erp">
      <div
        className="erp__switch"
        role="tablist"
        aria-label="Enterprise platforms we integrate"
      >
        {ERP_PLATFORMS.map((p, i) => {
          const selected = active === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`erp-tab-${p.id}`}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              aria-selected={selected}
              aria-controls={selected ? `erp-panel-${p.id}` : undefined}
              tabIndex={selected ? 0 : -1}
              className={`erp__tab ${selected ? 'is-active' : ''}`}
              onClick={() => setActive(p.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {p.name}
              <span className="erp__tab-check" aria-hidden="true">
                <Check />
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="erp__panel"
        ref={panelRef}
        role="tabpanel"
        id={`erp-panel-${platform.id}`}
        aria-labelledby={`erp-tab-${platform.id}`}
        tabIndex={0}
      >
        <div className="erp__head">
          <span className={`erp__logo erp__logo--${platform.id}`}>
            <img src={platform.logo} alt={platform.full} />
          </span>
          <div>
            <h4 className="erp__name">{platform.full}</h4>
            <p className="erp__blurb">{platform.blurb}</p>
          </div>
        </div>
        <ul className="svc-items erp__services">
          {platform.services.map((s) => (
            <li key={s}>
              <Check aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <a className="svc-ask" href="#contact">
          Discuss {platform.name}
          <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const headRef = useReveal();
  const [active, setActive] = useState('build');
  const [openIndex, setOpenIndex] = useState(0);
  const panelRef = useRef(null);
  const firstRender = useRef(true);
  const tabRefs = useRef([]);

  const tab = TABS.find((t) => t.id === active);

  const switchTab = (id) => {
    setActive(id);
    setOpenIndex(0);
  };

  // Arrow-key navigation for the practice toggle (WAI-ARIA tablist pattern).
  const onTabKeyDown = (e, idx) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next;
    if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    else if (step[e.key] !== undefined)
      next = (idx + step[e.key] + TABS.length) % TABS.length;
    else return;

    e.preventDefault();
    switchTab(TABS[next].id);
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
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }
    );
  }, [active]);

  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="reveal" ref={headRef}>
          <p className="eyebrow">Services</p>
          <h2 className="section-title">
            Multiple practices. <Highlight>One accountable partner.</Highlight>
          </h2>
          <p className="section-lede">
            Hire us for one practice or all three — the relationship, the
            standards and the team that answers your call stay the same.
          </p>
        </div>

        <div className="practice-picker">
          <p className="practice-picker__hint" id="practice-hint">
            <MousePointerClick aria-hidden="true" />
            Choose a practice to explore — click or tap any card to switch.
          </p>
          <div
            className="practice-switch"
            role="tablist"
            aria-label="Choose a service practice"
            aria-describedby="practice-hint"
          >
            {TABS.map((t, i) => {
              const PracticeIcon = t.icon;
              const selected = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  aria-selected={selected}
                  // Only one panel is mounted (the active one); point
                  // aria-controls at it only from the selected tab so the
                  // other tabs don't reference an id that isn't in the DOM.
                  aria-controls={selected ? `panel-${t.id}` : undefined}
                  tabIndex={selected ? 0 : -1}
                  className={`practice-card ${selected ? 'is-active' : ''}`}
                  onClick={() => switchTab(t.id)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                >
                  <span className="practice-card__icon" aria-hidden="true">
                    <PracticeIcon />
                  </span>
                  <span className="practice-card__check" aria-hidden="true">
                    <Check />
                  </span>
                  <span className="practice-card__text">
                    <span className="practice-card__label">{t.label}</span>
                    <span className="practice-card__tagline">{t.tagline}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          // The panel's first content (the intro copy) isn't focusable, so
          // make the panel itself a tab stop — keyboard users land on the
          // intro that explains the practice they just switched to.
          tabIndex={0}
        >
          <p className="services__intro">{tab.intro}</p>

          <div className="svc-index">
            {tab.services.map((service, i) => (
              <ServiceRow
                key={service.title}
                service={service}
                index={i}
                tabId={tab.id}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>

          <LogoMarquee
            label={tab.marquee.label}
            items={tab.marquee.logos === 'tech' ? TECH_STACK : PARTNER_LOGOS}
          />
        </div>

        <ServiceNote active={active} />
      </div>
    </section>
  );
}
