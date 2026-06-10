import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a3a2a] px-6">
      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f14] via-[#1a3a2a] to-[#2d5a3d]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#4a8a5c]/20 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.6) 60px, rgba(255,255,255,0.6) 61px),
          repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.6) 60px, rgba(255,255,255,0.6) 61px)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-xl"
      >
        <p className="text-[#d4a853] text-xs font-medium tracking-[0.4em] uppercase mb-6">
          Мяч в ауте
        </p>
        <h1
          className="text-white leading-none mb-6"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: 'clamp(5rem, 18vw, 11rem)',
            fontStyle: 'italic',
          }}
        >
          404
        </h1>
        <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
          Такой страницы нет — возможно, она ушла на корт. Вернёмся на главную и
          начнём заново.
        </p>
        <Link
          to="/"
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4a853] text-[#1a3a2a] font-semibold tracking-wider uppercase rounded-full hover:bg-[#c49a3a] transition-all duration-300 hover:shadow-xl hover:shadow-[#d4a853]/30 hover:gap-5"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          На главную
        </Link>
      </motion.div>
    </section>
  );
}
