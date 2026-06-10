import { useMemo } from 'react';

interface Props {
  items: string[];
  /** Seconds for one full loop. Higher = slower, calmer. */
  speed?: number;
  reverse?: boolean;
  className?: string;
}

// An infinite, seamless ribbon of oversized serif words. A staple of editorial
// luxury sites — adds rhythm and motion to otherwise static breaks.
export default function Marquee({ items, speed = 38, reverse = false, className = '' }: Props) {
  // Duplicate the track so the translate -50% loop is seamless.
  const track = useMemo(() => [...items, ...items], [items]);

  return (
    <div className={`marquee group relative flex overflow-hidden ${className}`}>
      <div
        className="marquee__track flex shrink-0 items-center"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="px-8 leading-none"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              {item}
            </span>
            <span className="text-[#d4a853] text-[0.5em]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
