import { useState } from 'react';

const CONSENT_KEY = 'tphrs-cookie-consent';

function hasNoChoiceYet() {
  try {
    return !localStorage.getItem(CONSENT_KEY);
  } catch {
    return false; // storage blocked — don't nag
  }
}

/**
 * A lightweight cookie / local-storage notice. The site only uses essential
 * storage (theme preference + this consent choice), so declining simply
 * dismisses the notice; the choice is remembered so it isn't shown again.
 */
export default function CookieBanner() {
  const [show, setShow] = useState(hasNoChoiceYet);

  const decide = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p className="cookie-banner__text">
        We use essential cookies and local storage to remember your preferences
        (such as light or dark mode) and keep the site working well. We don&rsquo;t
        use advertising or tracking cookies. See our{' '}
        <a href="#/cookies">Cookie Policy</a>.
      </p>
      <div className="cookie-banner__actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => decide('declined')}
        >
          Decline
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => decide('accepted')}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
