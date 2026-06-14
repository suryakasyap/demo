/**
 * Infinite logo scroll. Items support three shapes:
 *   { name, icon }     — a simple-icons brand mark (monochrome SVG)
 *   { name, img }      — an imported image asset (shown greyscale, colour on hover)
 *   { name, wordmark } — a styled text wordmark (for placeholder/partner names)
 * The list is rendered twice for a seamless loop; the duplicate is
 * aria-hidden and removed entirely under prefers-reduced-motion.
 */
function Item({ item }) {
  return (
    <span className="lm__item">
      {item.icon && (
        <svg className="lm__svg" viewBox="0 0 24 24" aria-hidden="true">
          <path d={item.icon.path} />
        </svg>
      )}
      {item.img && <img className="lm__img" src={item.img} alt={item.name} />}
      {!item.img && (
        <span className={item.wordmark ? 'lm__wordmark' : 'lm__name'}>
          {item.name}
        </span>
      )}
    </span>
  );
}

export default function LogoMarquee({ label, items, className = '' }) {
  // Ensure each group is wide enough to fill the viewport for a seamless loop.
  // Repeat the items until we have at least 14 entries per group.
  const MIN_COUNT = 14;
  let padded = items;
  if (items.length < MIN_COUNT) {
    const repeats = Math.ceil(MIN_COUNT / items.length);
    padded = Array.from({ length: repeats }, () => items).flat();
  }

  const group = (dup) => (
    <div
      className={`lm__group ${dup ? 'lm__dup' : ''}`}
      aria-hidden={dup || undefined}
    >
      {padded.map((item, i) => (
        <Item key={`${item.name}-${i}`} item={item} />
      ))}
    </div>
  );

  return (
    <div className={`lm ${className}`.trim()}>
      <p className="lm__label">{label}</p>
      <div className="lm__viewport">
        <div
          className="lm__track"
          style={{ '--lm-duration': `${padded.length * 2.4}s` }}
        >
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  );
}
