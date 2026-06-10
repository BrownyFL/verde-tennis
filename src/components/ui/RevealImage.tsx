import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE_OUT } from '../../lib/anim';

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Direction the unveiling curtain travels. */
  from?: 'bottom' | 'left' | 'right' | 'top';
  delay?: number;
}

const CLIP = {
  bottom: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0% 0 0 0)' },
  top: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0% 0)' },
  left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0% 0 0)' },
  right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0%)' },
};

// Images that unveil with a clip-path "curtain" while the photo itself eases
// down from a slight zoom — far more expensive-feeling than a plain fade.
export default function RevealImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  from = 'bottom',
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const clip = CLIP[from];

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        initial={{ clipPath: clip.hidden }}
        animate={inView ? { clipPath: clip.visible } : { clipPath: clip.hidden }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover ${imgClassName}`}
          initial={{ scale: 1.35 }}
          animate={inView ? { scale: 1 } : { scale: 1.35 }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay }}
        />
      </motion.div>
    </div>
  );
}
