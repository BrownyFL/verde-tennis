import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, X, Award } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { TRAINERS } from '../data';

export default function Trainers() {
  const [selected, setSelected] = useState<typeof TRAINERS[0] | null>(null);

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end pb-16 overflow-hidden bg-[#1a3a2a]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f14] to-[#2d5a3d]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#4a8a5c]/20 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-3"
          >
            Verde Club
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-white"
            style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontStyle: 'italic' }}
          >
            Наши тренеры
          </motion.h1>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#1a3a2a]/60 max-w-xl mx-auto">
              Каждый тренер — сертифицированный профессионал с международным опытом. Кликните на карточку для подробностей.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer, i) => (
              <AnimatedSection key={trainer.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelected(trainer)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#1a3a2a]/10 transition-shadow duration-300"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14] via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#d4a853] px-2.5 py-1 rounded-full">
                      <Star size={11} className="fill-[#1a3a2a] text-[#1a3a2a]" />
                      <span className="text-[#1a3a2a] text-xs font-bold">{trainer.rating}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3
                        className="text-white font-semibold text-lg"
                        style={{ fontFamily: "'Bodoni Moda', serif" }}
                      >
                        {trainer.name}
                      </h3>
                      <p className="text-white/50 text-sm">{trainer.title}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[#1a3a2a]/50 text-sm">{trainer.experience} лет опыта</span>
                      <span className="text-[#1a3a2a] font-semibold text-sm">
                        {trainer.pricePerHour.toLocaleString('ru-RU')} ₽/ч
                      </span>
                    </div>
                    <p className="text-[#1a3a2a]/50 text-xs">{trainer.specialization}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {trainer.availability.map((day) => (
                        <span key={day} className="text-xs bg-[#f5f0e8] text-[#1a3a2a]/60 px-2 py-0.5 rounded">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1f14]/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative h-64 sm:h-auto">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14]/60 to-transparent" />
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#d4a853] px-2.5 py-1 rounded-full">
                    <Star size={11} className="fill-[#1a3a2a] text-[#1a3a2a]" />
                    <span className="text-[#1a3a2a] text-xs font-bold">{selected.rating}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col">
                  <button
                    onClick={() => setSelected(null)}
                    className="self-end mb-4 w-8 h-8 rounded-full bg-[#f5f0e8] flex items-center justify-center hover:bg-[#ede8dc] transition-colors cursor-pointer"
                    aria-label="Закрыть"
                  >
                    <X size={16} />
                  </button>
                  <h2
                    className="text-[#1a3a2a] text-2xl font-bold mb-1"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {selected.name}
                  </h2>
                  <p className="text-[#d4a853] text-sm tracking-wider uppercase mb-4">{selected.title}</p>
                  <p className="text-[#1a3a2a]/60 text-sm leading-relaxed mb-5">{selected.bio}</p>

                  <div className="space-y-2 mb-5">
                    {selected.achievements.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-sm text-[#1a3a2a]/70">
                        <Award size={13} className="text-[#d4a853] shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-[#1a3a2a]/50">{selected.experience} лет опыта</span>
                      <span className="text-[#1a3a2a] font-semibold">
                        {selected.pricePerHour.toLocaleString('ru-RU')} ₽/ч
                      </span>
                    </div>
                    <Link
                      to={`/booking?trainer=${selected.id}`}
                      onClick={() => setSelected(null)}
                      className="group w-full flex items-center justify-center gap-2 py-3.5 bg-[#1a3a2a] text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-[#2d5a3d] transition-colors"
                    >
                      Записаться на тренировку
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
