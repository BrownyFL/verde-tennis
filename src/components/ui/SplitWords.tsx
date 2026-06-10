import { useRef, type CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_OUT } from '../../lib/anim';

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
  /** Tag to render as (h1, h2, p, span). */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

// Cinematic heading reveal: each word rises out from behind a clipping mask,
// staggered. This is the single most "editorial / luxury" typographic move.
export default function SplitWords({ text, className = '', style, as = 'h2', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  };
  const word = {
    hidden: { y: '115%' },
    visible: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT } },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden>
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.12em', marginBottom: '-0.12em' }}
          >
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </MotionTag>
  );
}
