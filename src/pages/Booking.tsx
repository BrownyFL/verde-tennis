import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Check, ChevronRight, CreditCard, Calendar, MapPin, User } from 'lucide-react';
import { useAuthStore } from '../store';
import { COURTS, TRAINERS, TIME_SLOTS } from '../data';

const STEPS = ['Корт и тренер', 'Дата и время', 'Контакты', 'Оплата'];

const contactSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Неверный email'),
  phone: z.string().min(10, 'Введите корректный номер'),
});
type ContactForm = z.infer<typeof contactSchema>;

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [courtId, setCourtId] = useState(Number(searchParams.get('court')) || COURTS[0].id);
  const [trainerId, setTrainerId] = useState<number | null>(Number(searchParams.get('trainer')) || null);
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState('');
  const [duration] = useState(1);
  const [done, setDone] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, user, addBooking } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '', phone: user?.phone || '' },
  });

  const court = COURTS.find((c) => c.id === courtId)!;
  const trainer = TRAINERS.find((t) => t.id === trainerId);
  const courtPrice = court.pricePerHour * duration;
  const trainerPrice = trainer ? trainer.pricePerHour * duration : 0;
  const total = courtPrice + trainerPrice;

  const upcomingDates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1));

  const handleContactSubmit = (data: ContactForm) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setStep(3);
    void data;
  };

  const handlePayment = () => {
    const booking = {
      id: Date.now().toString(),
      courtId,
      courtName: court.name,
      trainerId: trainerId ?? undefined,
      trainerName: trainer?.name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      duration,
      totalPrice: total,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-xl"
        >
          <div className="w-20 h-20 rounded-full bg-[#1a3a2a] flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-[#d4a853]" />
          </div>
          <h2
            className="text-[#1a3a2a] text-3xl mb-3"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Бронирование подтверждено!
          </h2>
          <p className="text-[#1a3a2a]/60 mb-6">
            Детали отправлены на вашу почту. До встречи на корте!
          </p>
          <div className="bg-[#f5f0e8] rounded-2xl p-5 text-left mb-6 space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-[#1a3a2a]/50 flex items-center gap-1.5"><MapPin size={13} /> Корт</span>
              <span className="font-medium text-[#1a3a2a]">{court.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#1a3a2a]/50 flex items-center gap-1.5"><Calendar size={13} /> Дата</span>
              <span className="font-medium text-[#1a3a2a]">{format(selectedDate, 'd MMMM', { locale: ru })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#1a3a2a]/50">Время</span>
              <span className="font-medium text-[#1a3a2a]">{selectedTime}</span>
            </div>
            {trainer && (
              <div className="flex justify-between text-sm">
                <span className="text-[#1a3a2a]/50 flex items-center gap-1.5"><User size={13} /> Тренер</span>
                <span className="font-medium text-[#1a3a2a]">{trainer.name}</span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-2 border-t border-[#1a3a2a]/10">
              <span className="text-[#1a3a2a]/50">Итого</span>
              <span className="font-bold text-[#1a3a2a]">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/account')}
            className="w-full py-4 bg-[#1a3a2a] text-white rounded-full font-semibold tracking-wider uppercase hover:bg-[#2d5a3d] transition-colors cursor-pointer"
          >
            Мои бронирования
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-[#d4a853] text-xs tracking-[0.4em] uppercase mb-2">Verde Club</p>
          <h1
            className="text-[#1a3a2a]"
            style={{ fontFamily: "'Bodoni Moda', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontStyle: 'italic' }}
          >
            Бронирование
          </h1>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    i < step ? 'bg-[#d4a853] text-[#1a3a2a]' : i === step ? 'bg-[#1a3a2a] text-white' : 'bg-white text-[#1a3a2a]/30 border border-[#1a3a2a]/10'
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`mt-1.5 text-xs whitespace-nowrap ${i === step ? 'text-[#1a3a2a] font-medium' : 'text-[#1a3a2a]/40'}`}>
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-12 sm:w-20 mx-2 mb-4 transition-colors duration-300 ${i < step ? 'bg-[#d4a853]' : 'bg-[#1a3a2a]/10'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: Court & Trainer */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
                <h2 className="text-[#1a3a2a] text-xl font-semibold mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  Выберите корт
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COURTS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCourtId(c.id)}
                      className={`relative rounded-xl overflow-hidden h-36 text-left transition-all duration-200 cursor-pointer ${
                        courtId === c.id ? 'ring-2 ring-[#1a3a2a]' : 'opacity-70 hover:opacity-90'
                      }`}
                    >
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f14]/80 to-transparent" />
                      {courtId === c.id && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-[#d4a853] rounded-full flex items-center justify-center">
                          <Check size={13} className="text-[#1a3a2a]" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Bodoni Moda', serif" }}>{c.name}</p>
                        <p className="text-white/60 text-xs">{c.pricePerHour.toLocaleString('ru-RU')} ₽/ч</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-[#1a3a2a] text-xl font-semibold mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  Тренер (опционально)
                </h2>
                <p className="text-[#1a3a2a]/50 text-sm mb-5">Первое занятие с тренером — бесплатно!</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => setTrainerId(null)}
                    className={`p-4 rounded-xl border text-sm text-center transition-all cursor-pointer ${
                      trainerId === null
                        ? 'border-[#1a3a2a] bg-[#f5f0e8] text-[#1a3a2a]'
                        : 'border-[#1a3a2a]/10 text-[#1a3a2a]/50 hover:border-[#1a3a2a]/30'
                    }`}
                  >
                    Без тренера
                  </button>
                  {TRAINERS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTrainerId(t.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        trainerId === t.id
                          ? 'border-[#1a3a2a] bg-[#f5f0e8]'
                          : 'border-[#1a3a2a]/10 hover:border-[#1a3a2a]/30'
                      }`}
                    >
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover mx-auto mb-2" />
                      <p className="text-xs font-medium text-[#1a3a2a] truncate">{t.name.split(' ')[0]}</p>
                      <p className="text-xs text-[#1a3a2a]/40">{t.pricePerHour.toLocaleString('ru-RU')} ₽/ч</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(1)}
                  className="group flex items-center gap-2 px-8 py-4 bg-[#1a3a2a] text-white font-semibold tracking-wider uppercase rounded-full hover:bg-[#2d5a3d] transition-colors cursor-pointer"
                >
                  Далее <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Date & Time */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
                <h2 className="text-[#1a3a2a] text-xl font-semibold mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  Выберите дату
                </h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {upcomingDates.map((d) => (
                    <button
                      key={d.toISOString()}
                      onClick={() => setSelectedDate(d)}
                      className={`shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        format(d, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                          ? 'bg-[#1a3a2a] text-white border-[#1a3a2a]'
                          : 'border-[#1a3a2a]/10 text-[#1a3a2a] hover:border-[#1a3a2a]/30'
                      }`}
                    >
                      <span className="text-xs opacity-70 capitalize">{format(d, 'EEE', { locale: ru })}</span>
                      <span className="text-xl font-bold mt-0.5" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                        {format(d, 'd')}
                      </span>
                      <span className="text-xs opacity-50 capitalize">{format(d, 'MMM', { locale: ru })}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
                <h2 className="text-[#1a3a2a] text-xl font-semibold mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  Выберите время
                </h2>
                <p className="text-[#1a3a2a]/50 text-sm mb-5">Длительность: 1 час</p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                        selectedTime === slot
                          ? 'bg-[#1a3a2a] text-white'
                          : 'bg-[#f5f0e8] text-[#1a3a2a] hover:bg-[#ede8dc]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(0)}
                  className="px-6 py-3 border border-[#1a3a2a]/20 text-[#1a3a2a]/60 rounded-full hover:text-[#1a3a2a] transition-colors cursor-pointer"
                >
                  Назад
                </button>
                <button
                  onClick={() => selectedTime && setStep(2)}
                  disabled={!selectedTime}
                  className="group flex items-center gap-2 px-8 py-4 bg-[#1a3a2a] text-white font-semibold tracking-wider uppercase rounded-full hover:bg-[#2d5a3d] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Далее <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Contact */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <form onSubmit={handleSubmit(handleContactSubmit)}>
                <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
                  <h2 className="text-[#1a3a2a] text-xl font-semibold mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                    Ваши данные
                  </h2>
                  <div className="space-y-5">
                    {[
                      { name: 'name' as const, label: 'Имя и фамилия', type: 'text', placeholder: 'Иван Иванов' },
                      { name: 'email' as const, label: 'Email', type: 'email', placeholder: 'ivan@example.com' },
                      { name: 'phone' as const, label: 'Телефон', type: 'tel', placeholder: '+7 (999) 123-45-67' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-[#1a3a2a] mb-1.5">
                          {field.label}
                        </label>
                        <input
                          {...register(field.name)}
                          type={field.type}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 bg-[#f5f0e8] rounded-xl text-[#1a3a2a] placeholder-[#1a3a2a]/30 outline-none border-2 transition-colors ${
                            errors[field.name]
                              ? 'border-red-400'
                              : 'border-transparent focus:border-[#1a3a2a]'
                          }`}
                        />
                        {errors[field.name] && (
                          <p className="mt-1 text-xs text-red-500">{errors[field.name]?.message}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="mt-8 p-5 bg-[#f5f0e8] rounded-xl">
                    <h3 className="text-[#1a3a2a] font-semibold text-sm mb-4">Итого бронирования</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-[#1a3a2a]/70">
                        <span>{court.name} × {duration} ч</span>
                        <span>{courtPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      {trainer && (
                        <div className="flex justify-between text-[#1a3a2a]/70">
                          <span>{trainer.name} × {duration} ч</span>
                          <span>{trainerPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#1a3a2a] font-bold pt-2 border-t border-[#1a3a2a]/10">
                        <span>Итого</span>
                        <span>{total.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-[#1a3a2a]/20 text-[#1a3a2a]/60 rounded-full hover:text-[#1a3a2a] transition-colors cursor-pointer"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="group flex items-center gap-2 px-8 py-4 bg-[#1a3a2a] text-white font-semibold tracking-wider uppercase rounded-full hover:bg-[#2d5a3d] transition-colors cursor-pointer"
                  >
                    К оплате <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
                <h2 className="text-[#1a3a2a] text-xl font-semibold mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  Оплата
                </h2>

                {/* Mock payment methods */}
                <div className="space-y-3 mb-8">
                  {[
                    { id: 'card', label: 'Банковская карта', sub: 'Visa, Mastercard, МИР' },
                    { id: 'sbp', label: 'СБП', sub: 'Быстрый платёж' },
                    { id: 'crypto', label: 'Криптовалюта', sub: 'USDT, BTC' },
                  ].map((m, i) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        i === 0 ? 'border-[#1a3a2a] bg-[#f5f0e8]' : 'border-[#1a3a2a]/10 hover:border-[#1a3a2a]/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={i === 0}
                        className="accent-[#1a3a2a]"
                      />
                      <div className="flex-1">
                        <p className="text-[#1a3a2a] font-medium text-sm">{m.label}</p>
                        <p className="text-[#1a3a2a]/40 text-xs">{m.sub}</p>
                      </div>
                      <CreditCard size={18} className="text-[#1a3a2a]/40" />
                    </label>
                  ))}
                </div>

                {/* Mock card form */}
                <div className="bg-[#1a3a2a] rounded-2xl p-6 text-white mb-6">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Номер карты</p>
                      <p className="text-lg font-mono tracking-widest">•••• •••• •••• 4242</p>
                    </div>
                    <div className="text-[#d4a853]">
                      <svg viewBox="0 0 48 30" className="w-12 h-8" fill="none">
                        <circle cx="18" cy="15" r="12" fill="#d4a853" opacity="0.7" />
                        <circle cx="30" cy="15" r="12" fill="#f5f0e8" opacity="0.4" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Держатель</p>
                      <p className="text-sm">IVAN IVANOV</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Срок</p>
                      <p className="text-sm font-mono">12/28</p>
                    </div>
                  </div>
                </div>

                {/* Order total */}
                <div className="bg-[#f5f0e8] rounded-xl p-5">
                  <div className="flex justify-between text-[#1a3a2a] font-bold text-lg">
                    <span>К оплате</span>
                    <span style={{ fontFamily: "'Bodoni Moda', serif" }}>
                      {total.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-[#1a3a2a]/20 text-[#1a3a2a]/60 rounded-full hover:text-[#1a3a2a] transition-colors cursor-pointer"
                >
                  Назад
                </button>
                <button
                  onClick={handlePayment}
                  className="group flex items-center gap-3 px-10 py-4 bg-[#d4a853] text-[#1a3a2a] font-semibold tracking-wider uppercase rounded-full hover:bg-[#c49a3a] transition-colors cursor-pointer hover:shadow-xl hover:shadow-[#d4a853]/30"
                >
                  Оплатить {total.toLocaleString('ru-RU')} ₽
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
