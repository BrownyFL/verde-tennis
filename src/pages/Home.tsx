import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Users, Trophy, Clock, Quote, Award } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import SplitWords from '../components/ui/SplitWords';
import Counter from '../components/ui/Counter';
import Marquee from '../components/ui/Marquee';
import RevealImage from '../components/ui/RevealImage';
import Faq from '../components/ui/Faq';
import { COURTS, TRAINERS, PRICING_PLANS } from '../data';

const TESTIMONIALS = [
  {
    quote:
      'Verde — единственное место, где я чувствую себя одновременно как дома и как на большом турнире. Корты безупречны, а сервис предугадывает желания.',
    name: 'Анна Соколова',
    role: 'Член клуба Gold',
  },
  {
    quote:
      'Тренеры мирового уровня и приватность, которую не найти больше нигде в Москве. За полгода моя игра изменилась до неузнаваемости.',
    name: 'Дмитрий Волков',
    role: 'Член клуба Platinum',
  },
  {
    quote:
      'Записала детей в академию — прогресс поразительный. А ради гастро-бара хочется остаться в клубе на весь день.',
    name: 'Мария Лебедева',
    role: 'Член клуба Silver',
  },
];

const AWARDS = [
  { title: 'Лучший теннисный клуб', sub: 'Moscow Sport Awards · 2024' },
  { title: 'Падел-площадка года', sub: 'Russian Padel Federation · 2023' },
  { title: 'В подборке Forbes Life', sub: 'Лучшие клубы Москвы · 2024' },
  { title: '4.9 из 5', sub: '2 400+ отзывов участников' },
];

const HOME_FAQS = [
  {
    q: 'Нужно ли быть членом клуба, чтобы забронировать корт?',
    a: 'Нет. По тарифу «Дневной» можно бронировать разово, без абонемента. Членство даёт сниженные цены, приоритетное бронирование и доступ к фитнес- и SPA-зонам.',
  },
  {
    q: 'Первая тренировка действительно бесплатная?',
    a: 'Да. Знакомство с тренером и пробное занятие — бесплатно для новых гостей. Записаться можно онлайн или по телефону клуба.',
  },
  {
    q: 'Есть ли прокат инвентаря?',
    a: 'Ракетки, мячи и форма доступны в аренду на стойке ресепшн. Для тарифов Silver и выше прокат ракетки — бесплатно.',
  },
  {
    q: 'Можно ли отменить бронирование?',
    a: 'Бесплатная отмена — за 24 часа до начала. При более поздней отмене удерживается 50% стоимости брони.',
  },
];

const STATS = [
  { icon: Trophy, value: 8, decimals: 0, suffix: '', label: 'Кортов' },
  { icon: Users, value: 24, decimals: 0, suffix: '', label: 'Тренера' },
  { icon: Star, value: 4.9, decimals: 1, suffix: '', label: 'Рейтинг' },
  { icon: Clock, value: 16, decimals: 0, suffix: '', label: 'Часов работы' },
];

const FEATURES = [
  {
    title: 'Профессиональные корты',
    description: 'Крытые и открытые корты с покрытием премиум-класса для тенниса и падел.',
    icon: '🎾',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z',
  },
  {
    title: 'Тренеры мирового класса',
    description: 'Сертифицированные профессионалы с международным опытом и индивидуальным подходом.',
    icon: '👨‍🏫',
    svgPath: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  },
  {
    title: 'Фитнес и восстановление',
    description: 'Современный фитнес-зал, сауна и зоны отдыха для полноценного восстановления.',
    icon: '💪',
    svgPath: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z',
  },
  {
    title: 'Гастро-бар Verde',
    description: 'Авторская кухня, свежевыжатые соки и спортивное питание прямо в клубе.',
    icon: '🍃',
    svgPath: 'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2 3-1 4.11-5.23 5-6-10 3.43-5 18-5 18-2.5 0-3.5-2-3.5-2 3-5 5-11 14-12',
  },
  {
    title: 'Приватная атмосфера',
    description: 'Закрытый клуб только для членов — эксклюзивность и безопасность на каждом шагу.',
    icon: '🔒',
    svgPath: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  },
  {
    title: 'Турниры и события',
    description: 'Регулярные турниры, корпоративные мероприятия и детские лиги.',
    icon: '🏆',
    svgPath: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z',
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="bg-[#f5f0e8]">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Cinematic background video */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {/* Fallback gradient (shows under the video / while it loads) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f14] via-[#1a3a2a] to-[#2d5a3d]" />
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.png"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Dark overlays keep the headline legible over the footage */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f14]/75 via-[#0d1f14]/35 to-[#0d1f14]/85" />
          <div className="absolute inset-0 bg-[#0d1f14]/20" />
          {/* Animated texture overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.03) 40px,
                rgba(255,255,255,0.03) 80px
              )`,
            }}
          />
          {/* Court lines decoration */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-[min(940px,92vw)] h-[min(66vh,560px)] border-2 border-white rounded-sm">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white -translate-y-1/2" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white -translate-x-1/2" />
              <div className="absolute top-[20%] bottom-[20%] left-1/2 w-16 h-16 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2 top-1/2" />
            </div>
          </div>
          {/* Ambient light */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#4a8a5c]/20 blur-[120px]" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[#d4a853] text-xs font-medium tracking-[0.4em] uppercase mb-6"
          >
            Премиальный теннисный клуб
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white leading-none mb-6"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              fontStyle: 'italic',
            }}
          >
            Verde
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/60 text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl mx-auto"
          >
            Пространство, где рождаются чемпионы. Теннис и падел в лучшем исполнении.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#d4a853] text-[#1a3a2a] font-semibold tracking-wider uppercase rounded-full hover:bg-[#c49a3a] transition-all duration-300 hover:shadow-xl hover:shadow-[#d4a853]/30 hover:gap-5"
            >
              Забронировать корт
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/pricing"
              className="flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-medium tracking-wider uppercase rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Тарифы и членство
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest uppercase">Прокрутите</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#1a3a2a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} className="text-center">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  className="block text-4xl md:text-5xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                />
                <div className="text-[#d4a853] text-sm tracking-widest uppercase">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <p className="text-[#d4a853] text-xs tracking-[0.3em] uppercase mb-4">О клубе</p>
            <div className="mb-6">
              <SplitWords
                as="span"
                text="Больше, чем теннис —"
                className="block text-[#1a3a2a] leading-tight"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              />
              <SplitWords
                as="span"
                text="это стиль жизни"
                delay={0.12}
                className="block text-[#1a3a2a] leading-tight"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontStyle: 'italic' }}
              />
            </div>
            <p className="text-[#1a3a2a]/60 leading-relaxed mb-6 text-lg">
              Verde — закрытый клуб для тех, кто ценит качество, приватность и результат. Мы объединяем
              профессиональный спорт, элегантную атмосферу и первоклассный сервис.
            </p>
            <p className="text-[#1a3a2a]/60 leading-relaxed mb-8">
              Четыре корта для тенниса и падел, команда тренеров мирового уровня, фитнес-зал и
              авторский гастро-бар — всё в одном пространстве.
            </p>
            <Link
              to="/courts"
              className="group inline-flex items-center gap-3 text-[#1a3a2a] font-semibold border-b-2 border-[#d4a853] pb-1 hover:gap-5 transition-all duration-300"
            >
              Посмотреть корты <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <RevealImage
                src={COURTS[0].image}
                alt="Теннисный корт"
                from="bottom"
                className="rounded-2xl h-48 bg-[#1a3a2a]"
              />
              <RevealImage
                src={COURTS[1].image}
                alt="Падел корт"
                from="bottom"
                delay={0.12}
                className="rounded-2xl h-64 bg-[#2d5a3d]"
              />
            </div>
            <div className="space-y-4 mt-8">
              <RevealImage
                src={COURTS[3].image}
                alt="Грунтовый корт"
                from="bottom"
                delay={0.18}
                className="rounded-2xl h-64 bg-[#2d5a3d]"
              />
              <div className="rounded-2xl bg-[#1a3a2a] h-48 flex items-center justify-center p-6">
                <div className="text-center">
                  <div
                    className="text-5xl font-bold text-[#d4a853] mb-2"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    2019
                  </div>
                  <div className="text-white/60 text-sm tracking-wider">Год основания</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE RIBBON ── */}
      <section className="bg-[#0d1f14] py-8 md:py-10 overflow-hidden border-y border-white/5">
        <Marquee
          items={['Теннис', 'Падел', 'Фитнес', 'Турниры', 'Гастро-бар', 'Сообщество']}
          speed={36}
          className="select-none text-white/12 text-[clamp(2.2rem,5.5vw,4.5rem)]"
        />
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-[#ede8dc]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#d4a853] text-xs tracking-[0.3em] uppercase mb-4">Почему Verde</p>
            <SplitWords
              text="Всё, что нужно для победы"
              className="text-[#1a3a2a]"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.08}>
                <div className="group p-8 bg-white rounded-2xl hover:bg-[#1a3a2a] transition-all duration-400 cursor-default h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#1a3a2a]/10 group-hover:bg-white/10 flex items-center justify-center mb-6 transition-colors duration-400">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1a3a2a] group-hover:fill-[#d4a853] transition-colors duration-400">
                      <path d={f.svgPath} />
                    </svg>
                  </div>
                  <h3
                    className="text-[#1a3a2a] group-hover:text-white text-xl font-semibold mb-3 transition-colors duration-400"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[#1a3a2a]/60 group-hover:text-white/60 text-sm leading-relaxed transition-colors duration-400">
                    {f.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURTS PREVIEW ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <p className="text-[#d4a853] text-xs tracking-[0.3em] uppercase mb-4">Наши корты</p>
              <SplitWords
                text="Пространство для игры"
                className="text-[#1a3a2a]"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              />
            </div>
            <Link
              to="/courts"
              className="group flex items-center gap-2 text-[#1a3a2a]/60 hover:text-[#1a3a2a] transition-colors text-sm font-medium"
            >
              Все корты <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {COURTS.map((court, i) => (
              <AnimatedSection key={court.id} delay={i * 0.1}>
                <Link to="/courts" className="group block">
                  <div className="relative rounded-2xl overflow-hidden h-72 mb-4">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-xs text-[#d4a853] tracking-widest uppercase">
                        {court.type === 'padel' ? 'Падел' : court.type === 'outdoor' ? 'Открытый' : 'Крытый'}
                      </span>
                      <h3 className="text-white font-semibold mt-1" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                        {court.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[#1a3a2a]/60 text-sm">{court.surface}</span>
                    <span className="text-[#1a3a2a] font-semibold">
                      {court.pricePerHour.toLocaleString('ru-RU')} ₽/ч
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINERS PREVIEW ── */}
      <section className="py-24 px-6 bg-[#1a3a2a]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <p className="text-[#d4a853] text-xs tracking-[0.3em] uppercase mb-4">Тренеры</p>
              <SplitWords
                text="Учитесь у лучших"
                className="text-white"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              />
            </div>
            <Link
              to="/trainers"
              className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              Все тренеры <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer, i) => (
              <AnimatedSection key={trainer.id} delay={i * 0.1}>
                <Link to="/trainers" className="group block">
                  <div className="relative rounded-2xl overflow-hidden h-80 mb-4">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14] via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#d4a853] px-2 py-1 rounded-full">
                      <Star size={10} className="fill-[#1a3a2a] text-[#1a3a2a]" />
                      <span className="text-[#1a3a2a] text-xs font-bold">{trainer.rating}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-semibold" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                        {trainer.name}
                      </h3>
                      <p className="text-white/50 text-sm mt-1">{trainer.title}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-white/40 text-sm">{trainer.experience} лет опыта</span>
                    <span className="text-white/70 text-sm">
                      от {trainer.pricePerHour.toLocaleString('ru-RU')} ₽/ч
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="py-24 px-6 bg-[#ede8dc]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#d4a853] text-xs tracking-[0.3em] uppercase mb-4">Членство</p>
            <SplitWords
              text="Выберите свой формат"
              className="text-[#1a3a2a] mb-4"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            />
            <p className="text-[#1a3a2a]/60 max-w-xl mx-auto">
              Гибкие условия для игроков любого уровня — от разовых визитов до полного клубного членства.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING_PLANS.map((plan, i) => (
              <AnimatedSection key={plan.id} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl p-7 h-full flex flex-col ${
                    plan.highlight
                      ? 'bg-[#1a3a2a] text-white'
                      : 'bg-white text-[#1a3a2a]'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4a853] text-[#1a3a2a] text-xs font-bold px-4 py-1 rounded-full tracking-wider">
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <div className="mb-6">
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "'Bodoni Moda', serif" }}
                    >
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-[#1a3a2a]/50'}`}>
                      {plan.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    {plan.price > 0 ? (
                      <>
                        <span
                          className="text-3xl font-bold"
                          style={{ fontFamily: "'Bodoni Moda', serif" }}
                        >
                          {plan.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className={`text-sm ml-1 ${plan.highlight ? 'text-white/50' : 'text-[#1a3a2a]/50'}`}>
                          /{plan.period}
                        </span>
                      </>
                    ) : (
                      <span className={`text-sm ${plan.highlight ? 'text-white/50' : 'text-[#1a3a2a]/50'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.slice(0, 4).map((f) => (
                      <li
                        key={f}
                        className={`text-sm flex items-start gap-2 ${plan.highlight ? 'text-white/70' : 'text-[#1a3a2a]/70'}`}
                      >
                        <span className="text-[#d4a853] mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/pricing"
                    className={`w-full py-3 rounded-full text-center text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
                      plan.highlight
                        ? 'bg-[#d4a853] text-[#1a3a2a] hover:bg-[#c49a3a]'
                        : 'border border-[#1a3a2a]/20 text-[#1a3a2a] hover:bg-[#1a3a2a] hover:text-white hover:border-[#1a3a2a]'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS + AWARDS ── */}
      <section className="py-24 px-6 bg-[#1a3a2a]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#d4a853] text-xs tracking-[0.3em] uppercase mb-4">Отзывы</p>
            <SplitWords
              text="Что говорят члены клуба"
              className="text-white"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <figure className="h-full flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <Quote size={28} className="text-[#d4a853] mb-5 shrink-0" />
                  <blockquote className="flex-1 text-white/80 leading-relaxed mb-6">
                    {t.quote}
                  </blockquote>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="fill-[#d4a853] text-[#d4a853]" />
                    ))}
                  </div>
                  <figcaption>
                    <div
                      className="text-white font-semibold"
                      style={{ fontFamily: "'Bodoni Moda', serif" }}
                    >
                      {t.name}
                    </div>
                    <div className="text-[#d4a853]/80 text-sm">{t.role}</div>
                  </figcaption>
                </figure>
              </AnimatedSection>
            ))}
          </div>

          {/* Awards / trust */}
          <AnimatedSection className="border-t border-white/10 pt-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {AWARDS.map((a) => (
                <div key={a.title} className="flex items-start gap-3">
                  <Award size={22} className="text-[#d4a853] shrink-0 mt-0.5" />
                  <div>
                    <div
                      className="text-white text-sm font-semibold leading-tight"
                      style={{ fontFamily: "'Bodoni Moda', serif" }}
                    >
                      {a.title}
                    </div>
                    <div className="text-white/40 text-xs mt-1 leading-snug">{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-[#ede8dc]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[#d4a853] text-xs tracking-[0.3em] uppercase mb-4">Вопросы</p>
            <SplitWords
              text="Коротко о главном"
              className="text-[#1a3a2a]"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            />
          </AnimatedSection>
          <Faq items={HOME_FAQS} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-[#0d1f14] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2d5a3d]/30 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#d4a853]/10 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-6">Начните сейчас</p>
            <SplitWords
              text="Готовы выйти на корт?"
              className="text-white mb-6"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontStyle: 'italic',
                lineHeight: 1.1,
              }}
            />
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              Запишитесь на первую тренировку или забронируйте корт прямо сейчас.
              Первое занятие с тренером — бесплатно.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-[#d4a853] text-[#1a3a2a] font-semibold tracking-wider uppercase rounded-full hover:bg-[#c49a3a] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4a853]/20 hover:gap-5"
              >
                Забронировать
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/trainers"
                className="flex items-center justify-center gap-3 px-10 py-5 border border-white/20 text-white font-medium tracking-wider uppercase rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Найти тренера
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
