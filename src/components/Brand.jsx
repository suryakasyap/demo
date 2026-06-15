import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';

/**
 * Brand wordmark + logo, linking back to the top of the page.
 * Shared by the nav and the footer. Pass `onClick` to run extra logic
 * on click (e.g. closing the mobile menu).
 */
export default function Brand({ onClick }) {
  return (
    <a className="brand" href="#top" onClick={onClick}>
      <img className="brand__logo brand__logo--dark" src={logoDark} alt="TPHRS logo" />
      <img className="brand__logo brand__logo--light" src={logoLight} alt="TPHRS logo" />
      <div className="brand__text">
        <span className="brand__mark">
          TPHRS<span className="dot">.</span>
        </span>
      </div>
    </a>
  );
}
