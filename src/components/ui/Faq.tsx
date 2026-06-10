import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { EASE_OUT } from '../../lib/anim';

interface QA {
  q: string;
  a: string;
}

interface Props {
  items: QA[];
  /** Index opened by default (set to null for all collapsed). */
  defaultOpen?: number | null;
}

// Accessible, animated FAQ accordion. The "+" rotates into an "×" on open and
// the answer eases its height open/closed.
export default function Faq({ items, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <AnimatedSection key={item.q} delay={i * 0.06}>
            <div className="bg-white rounded-2xl border border-[#1a3a2a]/5 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
              >
                <span
                  className="text-[#1a3a2a] font-semibold text-lg"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="shrink-0 text-[#d4a853]"
                >
                  <Plus size={22} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[#1a3a2a]/60 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        );
      })}
    </div>
  );
}
