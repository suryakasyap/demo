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
  ChevronDown,
  Check,
  ArrowRight,
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
  siDotnet,
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

const PLATFORMS = [
  { glyph: 'OTM', name: 'Oracle Transportation Management', logo: logoOtm },
  { glyph: 'BY', name: 'Blue Yonder', logo: logoBy },
  { glyph: 'SAP', name: 'SAP TMS', logo: logoSap },
  { glyph: 'API', name: 'Flexible API connectivity', logo: logoApi },
];

const TECH_LOGOS = [
  { name: 'Oracle OTM', img: logoOtm },
  { name: 'Blue Yonder', img: logoBy },
  { name: 'SAP TMS', img: logoSap },
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
    id: 'software',
    label: 'Software & product development',
    intro: `Our technology practice: we consult on logistics and supply
      chains, integrate the enterprise platforms you already run, and build,
      deploy and support the systems that move your business.`,
    services: [
      {
        icon: Compass,
        title: 'Domain consulting',
        blurb: 'Simplify complex logistics and lift supply-chain performance.',
        items: [
          'Strategic supply-chain advisory',
          'Transportation optimisation',
          'Digital transformation consulting',
          'Process re-engineering',
        ],
      },
      {
        icon: Plug,
        title: 'ERP & platform integration',
        blurb:
          'Prebuilt connectors to leading enterprise platforms — unified processes, smooth data flow.',
        items: [
          'Oracle Transportation Management (OTM)',
          'Blue Yonder',
          'SAP TMS',
          'Flexible API connectivity',
        ],
        platforms: true,
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
      {
        icon: LifeBuoy,
        title: 'Support & maintenance',
        blurb:
          'Keep operations running smoothly and maximise long-term platform value.',
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
    intro: `The practice we built our name on: finding leaders, running HR
      operations and keeping organisations compliant — delivered by
      postgraduate consultants with deep domain expertise.`,
    services: [
      {
        icon: Users,
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

          {service.platforms && (
            <div className="platforms" aria-label="Platform connectors">
              {PLATFORMS.map((p) => (
                <span className="platform" key={p.glyph}>
                  <span className="platform__glyph" aria-hidden="true">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="platform__logo" />
                    ) : (
                      p.glyph
                    )}
                  </span>
                  {p.name}
                </span>
              ))}
            </div>
          )}

          <a className="svc-ask" href="#contact">
            Discuss {service.title.toLowerCase()}{' '}
            <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

const NOTE_COPY = {
  talent:
    'Where the practices meet: we build and integrate the HR expertise we have spent a decade advising on — so your hiring, payroll and people systems are designed by a team that has actually run them.',
  software:
    'From blueprint to production: our engineers consult, build and run logistics and supply-chain software — so your platforms are shaped by people who understand the domain, not just the code.',
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

export default function Services() {
  const headRef = useReveal();
  const [active, setActive] = useState('software');
  const [openIndex, setOpenIndex] = useState(0);
  const panelRef = useRef(null);
  const firstRender = useRef(true);

  const tab = TABS.find((t) => t.id === active);

  const switchTab = (id) => {
    setActive(id);
    setOpenIndex(0);
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
            Two practices. <Highlight>One accountable partner.</Highlight>
          </h2>
          <p className="section-lede">
            Hire us for one engagement or both — the relationship, the
            standards and the team that answers your call stay the same.
          </p>
        </div>

        <div
          className="services__tabs"
          role="tablist"
          aria-label="Service practice"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              className="services__tab"
              onClick={() => switchTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
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
            label={
              tab.id === 'software'
                ? 'Technologies & platforms we build with'
                : 'Companies we have partnered with'
            }
            items={tab.id === 'software' ? TECH_LOGOS : PARTNER_LOGOS}
          />
        </div>

        <ServiceNote active={active} />
      </div>
    </section>
  );
}
