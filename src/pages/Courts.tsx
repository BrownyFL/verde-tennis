import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Users, Clock } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import { COURTS } from '../data';

const FILTERS = ['Все', 'Крытые', 'Падел', 'Открытые'];

export default function Courts() {
  const [activeFilter, setActiveFilter] = useState('Все');

  const filtered = COURTS.filter((c) => {
    if (activeFilter === 'Все') return true;
    if (activeFilter === 'Падел') return c.type === 'padel';
    if (activeFilter === 'Крытые') return c.type === 'indoor';
    if (activeFilter === 'Открытые') return c.type === 'outdoor';
    return true;
  });

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f14] via-[#1a3a2a] to-[#2d5a3d]" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.05) 60px, rgba(255,255,255,0.05) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.05) 60px, rgba(255,255,255,0.05) 61px)`,
          }}
        />
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
            Наши корты
          </motion.h1>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-[60px] z-30 bg-[#f5f0e8]/90 backdrop-blur-sm border-b border-[#1a3a2a]/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#1a3a2a] text-white'
                  : 'bg-white text-[#1a3a2a]/60 hover:text-[#1a3a2a] border border-[#1a3a2a]/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Courts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((court, i) => (
              <AnimatedSection key={court.id} delay={i * 0.1}>
                <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-[#1a3a2a]/10 transition-all duration-400">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14]/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#d4a853] text-[#1a3a2a] text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                        {court.type === 'padel' ? 'Падел' : court.type === 'outdoor' ? 'Открытый' : 'Крытый'}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                      <span className="text-white font-bold text-lg" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                        {court.pricePerHour.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-white/60 text-sm">/ч</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2
                          className="text-[#1a3a2a] text-2xl font-semibold mb-1"
                          style={{ fontFamily: "'Bodoni Moda', serif" }}
                        >
                          {court.name}
                        </h2>
                        <p className="text-[#1a3a2a]/50 text-sm">{court.surface}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[#1a3a2a]/50 text-sm">
                        <Users size={14} />
                        <span>до {court.capacity} чел.</span>
                      </div>
                    </div>

                    <p className="text-[#1a3a2a]/60 text-sm leading-relaxed mb-6">
                      {court.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {court.features.map((f) => (
                        <span
                          key={f}
                          className="flex items-center gap-1.5 text-xs text-[#1a3a2a]/70 bg-[#f5f0e8] px-3 py-1.5 rounded-full"
                        >
                          <Check size={11} className="text-[#2d5a3d]" />
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/booking?court=${court.id}`}
                        className="group/btn flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#1a3a2a] text-white text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-[#2d5a3d] transition-colors"
                      >
                        Забронировать
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/schedule"
                        className="flex items-center gap-2 px-5 py-3.5 border border-[#1a3a2a]/20 text-[#1a3a2a]/70 text-sm rounded-full hover:border-[#1a3a2a]/40 hover:text-[#1a3a2a] transition-colors"
                      >
                        <Clock size={14} />
                        Расписание
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-16 px-6 bg-[#1a3a2a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Бесплатная отмена', desc: 'За 24 часа до начала — без штрафов' },
            { title: 'Аренда инвентаря', desc: 'Ракетки, мячи, форма — всё на месте' },
            { title: 'Работаем 7 дней', desc: 'С 07:00 до 23:00 без выходных' },
          ].map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1} className="text-white/80">
              <h3
                className="text-white text-xl mb-2"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
