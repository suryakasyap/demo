import useTheme from './hooks/useTheme';
import AmbientBackground from './components/AmbientBackground';
import FlowCursor from './components/FlowCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Story from './components/Story';
import Services from './components/Services';
import { Approach, Why, Contact, Footer } from './components/Sections';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <AmbientBackground />
      <FlowCursor />
      <div className="site">
        <a className="skip-link" href="#services">
          Skip to services
        </a>
        <div className="announce">
          We&rsquo;re now a software &amp; product development firm — alongside
          the HR practice we built our name on.{' '}
          <a href="#story">Read the story</a>
        </div>
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <Story />
          <Services />
          <Approach />
          <Why />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
