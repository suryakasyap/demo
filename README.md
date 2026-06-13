# TPHRS — Revamped Website

Single-page marketing site for Turning Point HR Solutions: the original
talent & HR practice plus the firm's software & product development services.

React + Vite · GSAP (ScrollTrigger) · lucide-react icons · bundled fonts
(Space Grotesk, Manrope, IBM Plex Mono — works offline)

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Where things live

- `src/styles/global.css` — every theme token (light/dark) at the top.
  Greens: `--accent`, `--accent-deep`, `--hl-bg`. Bubble highlight: `.hl`.
- `src/components/Services.jsx` — the `TABS` array holds all nine services
  (3 talent & HR, 6 software & product) and the platform connector badges.
- `src/components/Hero.jsx` — the hero photo loop and the ticker.
- `src/components/PhotoLoop.jsx` — the looping hero photos. Slides are
  hotlinked from Unsplash (free licence); swap `src` values for your own
  assets when ready. Broken images drop out of the rotation automatically.
- `src/components/LogoMarquee.jsx` — the scrolling logo strips. Tech logos
  come from the `simple-icons` package plus your platform PNGs; the partner
  strip ships with PLACEHOLDER wordmarks in `Services.jsx` (`PARTNER_LOGOS`)
  — replace them with real client logos using `{ name, img }` entries.
- `src/components/AmbientBackground.jsx` — the drifting background blobs.
- `src/components/FlowCursor.jsx` — the flowy cursor (desktop pointers only).
- `src/components/Story.jsx` — the integration narrative (animated thread).
- `src/components/Sections.jsx` — How we work, Why TPHRS, Contact, Footer.

## Notes

- Platform connectors (Oracle OTM, Blue Yonder, SAP TMS) are shown as neutral
  text badges, not official trademark logos. If you have licensed brand
  assets, drop the image into each `.platform` element in `Services.jsx`.
- To add photography, place files in `public/` and reference them in the
  story or why sections; the layout leaves room either side of the rail.
- The contact form opens the visitor's email app addressed to
  business@tphrs.com — swap the `submit` handler in `Sections.jsx` for a real
  endpoint when ready.

## Accessibility

WCAG-conscious green contrast, visible focus rings, labelled theme toggle,
keyboard-operable accordion and tabs, and `prefers-reduced-motion` disables
all animation: blobs, ticker, cursor, reveals and highlights.
