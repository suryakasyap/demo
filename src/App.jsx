import { useEffect, useState } from 'react';
import useTheme from './hooks/useTheme';
import AmbientBackground from './components/AmbientBackground';
import FlowCursor from './components/FlowCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Story from './components/Story';
import Services from './components/Services';
import { Approach, Why, Contact, Footer } from './components/Sections';
import LegalPage from './components/Legal';
import CookieBanner from './components/CookieBanner';

// Tiny hash router so the legal pages get their own URLs (#/privacy, #/terms,
// #/cookies) without pulling in a routing dependency. Anything that isn't a
// legal route falls through to the marketing page (and normal #section anchors
// keep working).
const LEGAL_ROUTES = ['privacy', 'terms', 'cookies'];

function getRoute() {
  const hash = window.location.hash;
  return hash.startsWith('#/') ? hash.slice(2) : '';
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const legal = LEGAL_ROUTES.includes(route) ? route : null;

  useEffect(() => {
    if (legal) window.scrollTo(0, 0);
  }, [legal]);

  return (
    <>
      <AmbientBackground />
      <FlowCursor />
      <div className="site">
        {!legal && (
          <>
            <a className="skip-link" href="#services">
              Skip to services
            </a>
            <div className="announce">
              We&rsquo;re now a software &amp; product development firm —
              alongside the HR practice we built our name on.{' '}
              <a href="#story">Read the story</a>
            </div>
          </>
        )}
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        {legal ? (
          <main>
            <LegalPage page={legal} />
          </main>
        ) : (
          <main>
            <Hero />
            <Story />
            <Services />
            <Approach />
            <Why />
            <Contact />
          </main>
        )}
        <Footer />
      </div>
      <CookieBanner />
    </>
  );
}
