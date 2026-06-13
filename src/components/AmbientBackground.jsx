/**
 * Ambient background: three slow-drifting pastel-green blobs over a faint
 * dot grid. Pure CSS animation (cheap), theme-aware via custom properties,
 * fully disabled under prefers-reduced-motion.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <span className="blob blob--a" />
      <span className="blob blob--b" />
      <span className="blob blob--c" />
    </div>
  );
}
