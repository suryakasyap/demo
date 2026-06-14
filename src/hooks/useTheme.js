import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'tphrs-theme';

function getInitialTheme() {
  // The inline script in index.html resolves the theme (stored pref → system
  // preference → light) and applies it before first paint. Read that back so
  // React's state matches the DOM and we never flash or override it.
  if (typeof document !== 'undefined') {
    const applied = document.documentElement.dataset.theme;
    if (applied === 'light' || applied === 'dark') return applied;
  }
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private browsing — fine to skip persistence */
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    []
  );

  return { theme, toggleTheme };
}
