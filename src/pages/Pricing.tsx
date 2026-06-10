import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import Faq from '../components/ui/Faq';
import { PRICING_PLANS } from '../data';

const FAQS = [
  {
    q: 'Можно ли заморозить членство?',
    a: 'Да, один раз в год на срок до 30 дней без дополнительной оплаты.',
  },
  {
    q: 'Как отменить бронирование?',
    a: 'Бесплатная отмена за 24 часа до начала. При более поздней отмене взимается 50% стоимости.',
  },
  {
    q: 'Есть ли скидки для детей?',
    a: 'Дети до 14 лет получают скидку 30% на аренду корта в сопровождении взрослого члена клуба.',
  },
  {
    q: 'Как оплатить членство?',
    a: 'Карта, СБП, наличные в клубе. Доступна рассрочка на 3 месяца без процентов.',
  },
];

export default function Pricing() {
  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end pb-16 overflow-hidden bg-[#1a3a2a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f14] to-[#2d5a3d]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#d4a853]/10 blur-[100px]" />
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
            Тарифы и членство
          </motion.h1>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[#1a3a2a]/60 max-w-xl mx-auto">
              Гибкие условия для игроков любого уровня. Все тарифы включают доступ к раздевалкам, Wi-Fi и lounge-зоне.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {PRICING_PLANS.map((plan, i) => (
              <AnimatedSection key={plan.id} delay={i * 0.1}>
                <div
                  className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-300 hover:-translate-y-2 ${
                    plan.highlight
                      ? 'bg-[#1a3a2a] text-white shadow-2xl shadow-[#1a3a2a]/30'
                      : 'bg-white text-[#1a3a2a] shadow-sm hover:shadow-xl hover:shadow-[#1a3a2a]/10'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4a853] text-[#1a3a2a] text-xs font-bold px-5 py-1.5 rounded-full tracking-widest uppercase">
                      Популярный
                    </div>
                  )}

                  <div className="mb-8">
                    <h2
                      className="text-3xl font-bold mb-1"
                      style={{ fontFamily: "'Bodoni Moda', serif" }}
                    >
                      {plan.name}
                    </h2>
                    <p className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-[#1a3a2a]/50'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    {plan.price > 0 ? (
                      <div>
                        <span
                          className="text-4xl font-bold"
                          style={{ fontFamily: "'Bodoni Moda', serif" }}
                        >
                          {plan.price.toLocaleString('ru-RU')}
                        </span>
                        <span className={`text-sm ml-1 ${plan.highlight ? 'text-white/50' : 'text-[#1a3a2a]/50'}`}>
                          ₽ / {plan.period}
                        </span>
                      </div>
                    ) : (
                      <p className={`text-sm font-medium ${plan.highlight ? 'text-white/60' : 'text-[#1a3a2a]/60'}`}>
                        {plan.period}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3.5 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          plan.highlight ? 'bg-[#d4a853]/20' : 'bg-[#1a3a2a]/10'
                        }`}>
                          <Check size={11} className={plan.highlight ? 'text-[#d4a853]' : 'text-[#2d5a3d]'} />
                        </div>
                        <span className={`text-sm leading-relaxed ${plan.highlight ? 'text-white/70' : 'text-[#1a3a2a]/70'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.id === 'day' ? '/booking' : '/contacts'}
                    className={`group flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold tracking-wider uppercase text-sm transition-all duration-200 ${
                      plan.highlight
                        ? 'bg-[#d4a853] text-[#1a3a2a] hover:bg-[#c49a3a] hover:shadow-lg hover:shadow-[#d4a853]/30'
                        : 'border-2 border-[#1a3a2a]/15 text-[#1a3a2a] hover:bg-[#1a3a2a] hover:text-white hover:border-[#1a3a2a]'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 px-6 bg-[#ede8dc]">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2
              className="text-[#1a3a2a]"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
            >
              Сравнение тарифов
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a3a2a]">
                    <th className="p-4 text-left text-white/70 font-medium">Услуга</th>
                    {PRICING_PLANS.map((p) => (
                      <th key={p.id} className="p-4 text-center text-white font-semibold" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Аренда корта', '1 800 ₽/ч', '1 400 ₽/ч', '1 000 ₽/ч', '700 ₽/ч'],
                    ['Приоритетное бронирование', '—', '—', '✓', '✓'],
                    ['Фитнес-зал', '—', '✓', '✓', '✓'],
                    ['SPA', '—', '—', '—', '✓'],
                    ['Скидка на тренировки', '—', '10%', '20%', '30%'],
                    ['Гастро-бар скидка', '—', '—', '15%', '25%'],
                    ['Персональный менеджер', '—', '—', '—', '✓'],
                  ].map(([label, ...vals]) => (
                    <tr key={label} className="border-t border-[#1a3a2a]/5 hover:bg-[#f5f0e8]/50 transition-colors">
                      <td className="p-4 text-[#1a3a2a]/70">{label}</td>
                      {vals.map((v, vi) => (
                        <td key={vi} className={`p-4 text-center ${v === '✓' ? 'text-[#2d5a3d] font-bold text-base' : v === '—' ? 'text-[#1a3a2a]/20' : 'text-[#1a3a2a] font-medium'}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h2
              className="text-[#1a3a2a]"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
            >
              Часто задаваемые вопросы
            </h2>
          </AnimatedSection>
          <Faq items={FAQS} />
        </div>
      </section>
    </div>
  );
}
