import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Share2, Send, Check } from 'lucide-react';
import { useState } from 'react';
import AnimatedSection from '../components/ui/AnimatedSection';

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Неверный email'),
  subject: z.string().min(3, 'Укажите тему'),
  message: z.string().min(10, 'Сообщение слишком короткое'),
});
type FormData = z.infer<typeof schema>;

export default function Contacts() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (_data: FormData) => {
    setSent(true);
  };

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-14 overflow-hidden bg-[#1a3a2a]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f14] to-[#3d7a52]" />
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
            Контакты
          </motion.h1>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <AnimatedSection direction="left">
              <h2
                className="text-[#1a3a2a] text-3xl mb-8"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Приезжайте к нам
              </h2>
            </AnimatedSection>

            <div className="space-y-6 mb-10">
              {[
                {
                  icon: MapPin,
                  title: 'Адрес',
                  lines: ['Москва, ул. Теннисная, 12', 'Ближайшее метро: Спортивная'],
                },
                {
                  icon: Phone,
                  title: 'Телефон',
                  lines: ['+7 (495) 123-45-67', '+7 (495) 765-43-21'],
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['info@verde-club.ru', 'booking@verde-club.ru'],
                },
                {
                  icon: Clock,
                  title: 'Режим работы',
                  lines: ['Пн–Пт: 07:00 – 23:00', 'Сб–Вс: 08:00 – 22:00'],
                },
              ].map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.1} direction="left">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#1a3a2a] rounded-xl flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#d4a853]" />
                    </div>
                    <div>
                      <p className="text-[#1a3a2a] font-semibold text-sm mb-1">{item.title}</p>
                      {item.lines.map((l) => (
                        <p key={l} className="text-[#1a3a2a]/60 text-sm">{l}</p>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection direction="left">
              <h3
                className="text-[#1a3a2a] font-semibold mb-4"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Социальные сети
              </h3>
              <div className="flex gap-3">
                {[
                  { icon: Share2, label: 'Instagram' },
                  { icon: Send, label: 'Telegram' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full text-sm text-[#1a3a2a]/70 hover:text-[#1a3a2a] hover:shadow-md transition-all duration-200"
                  >
                    <s.icon size={16} />
                    {s.label}
                  </a>
                ))}
              </div>
            </AnimatedSection>

            {/* Map placeholder */}
            <AnimatedSection direction="left" className="mt-8">
              <div className="rounded-2xl overflow-hidden h-48 bg-[#1a3a2a] relative">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px),
                      repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px)
                    `,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/70">
                    <MapPin size={32} className="mx-auto mb-2 text-[#d4a853]" />
                    <p className="text-sm">Москва, ул. Теннисная, 12</p>
                    <p className="text-xs text-white/40 mt-1">Откройте в картах</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection direction="right">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2
                className="text-[#1a3a2a] text-2xl mb-2"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Напишите нам
              </h2>
              <p className="text-[#1a3a2a]/50 text-sm mb-8">
                Ответим в течение 24 часов в рабочие дни.
              </p>

              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#1a3a2a] rounded-full flex items-center justify-center mb-5">
                    <Check size={28} className="text-[#d4a853]" />
                  </div>
                  <h3
                    className="text-[#1a3a2a] text-xl mb-2"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    Сообщение отправлено!
                  </h3>
                  <p className="text-[#1a3a2a]/50 text-sm">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {[
                    { name: 'name' as const, label: 'Имя', type: 'text', placeholder: 'Ваше имя' },
                    { name: 'email' as const, label: 'Email', type: 'email', placeholder: 'email@example.com' },
                    { name: 'subject' as const, label: 'Тема', type: 'text', placeholder: 'Вопрос о членстве' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-[#1a3a2a] mb-1.5">{f.label}</label>
                      <input
                        {...register(f.name)}
                        type={f.type}
                        placeholder={f.placeholder}
                        className={`w-full px-4 py-3 bg-[#f5f0e8] rounded-xl text-[#1a3a2a] placeholder-[#1a3a2a]/30 outline-none border-2 transition-colors ${
                          errors[f.name] ? 'border-red-400' : 'border-transparent focus:border-[#1a3a2a]'
                        }`}
                      />
                      {errors[f.name] && (
                        <p className="mt-1 text-xs text-red-500">{errors[f.name]?.message}</p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-[#1a3a2a] mb-1.5">Сообщение</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Расскажите подробнее..."
                      className={`w-full px-4 py-3 bg-[#f5f0e8] rounded-xl text-[#1a3a2a] placeholder-[#1a3a2a]/30 outline-none border-2 transition-colors resize-none ${
                        errors.message ? 'border-red-400' : 'border-transparent focus:border-[#1a3a2a]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1a3a2a] text-white font-semibold tracking-wider uppercase rounded-full hover:bg-[#2d5a3d] transition-colors cursor-pointer"
                  >
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
