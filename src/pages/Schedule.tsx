import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isBefore, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import AnimatedSection from '../components/ui/AnimatedSection';
import { COURTS, TIME_SLOTS } from '../data';

const BOOKINGS_MOCK: Record<string, string[]> = {
  '2': ['07:00', '08:00', '12:00', '18:00', '19:00'],
  '5': ['09:00', '10:00', '11:00', '15:00'],
  '8': ['13:00', '14:00', '20:00', '21:00'],
  '12': ['07:00', '08:00', '09:00', '10:00'],
  '15': ['16:00', '17:00', '18:00'],
  '19': ['11:00', '12:00'],
  '22': ['08:00', '09:00', '10:00', '19:00', '20:00', '21:00'],
};

export default function Schedule() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedCourt, setSelectedCourt] = useState(COURTS[0].id);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDow = (getDay(monthStart) + 6) % 7;

  const dateKey = format(selectedDate, 'd');
  const bookedSlots = BOOKINGS_MOCK[dateKey] || [];

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
            Расписание
          </motion.h1>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Court Selector */}
          <AnimatedSection className="mb-8">
            <p className="text-[#1a3a2a]/50 text-sm mb-3">Выберите корт:</p>
            <div className="flex flex-wrap gap-3">
              {COURTS.map((court) => (
                <button
                  key={court.id}
                  onClick={() => setSelectedCourt(court.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedCourt === court.id
                      ? 'bg-[#1a3a2a] text-white'
                      : 'bg-white text-[#1a3a2a]/60 border border-[#1a3a2a]/10 hover:text-[#1a3a2a]'
                  }`}
                >
                  {court.name}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <AnimatedSection className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                {/* Month Nav */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="w-9 h-9 rounded-full bg-[#f5f0e8] flex items-center justify-center hover:bg-[#ede8dc] transition-colors cursor-pointer"
                    aria-label="Предыдущий месяц"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <h3
                    className="text-[#1a3a2a] font-semibold capitalize"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {format(currentMonth, 'LLLL yyyy', { locale: ru })}
                  </h3>
                  <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="w-9 h-9 rounded-full bg-[#f5f0e8] flex items-center justify-center hover:bg-[#ede8dc] transition-colors cursor-pointer"
                    aria-label="Следующий месяц"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 mb-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
                    <div key={d} className="text-center text-xs text-[#1a3a2a]/40 font-medium py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startDow }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {days.map((day) => {
                    const isPast = isBefore(day, startOfDay(today));
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, today);
                    const hasBookings = Boolean(BOOKINGS_MOCK[format(day, 'd')]);
                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => !isPast && setSelectedDate(day)}
                        disabled={isPast}
                        className={`relative h-9 w-full rounded-full text-sm transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1a3a2a] text-white font-semibold'
                            : isToday
                            ? 'border-2 border-[#1a3a2a] text-[#1a3a2a] font-semibold'
                            : isPast
                            ? 'text-[#1a3a2a]/20 cursor-not-allowed'
                            : 'text-[#1a3a2a] hover:bg-[#f5f0e8]'
                        }`}
                      >
                        {format(day, 'd')}
                        {hasBookings && !isSelected && !isPast && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d4a853]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-[#1a3a2a]/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#d4a853]" /> Есть занятые слоты
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1a3a2a]" /> Выбранная дата
                  </span>
                </div>
              </div>
            </AnimatedSection>

            {/* Time Slots */}
            <AnimatedSection delay={0.1} className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3
                      className="text-[#1a3a2a] text-xl font-semibold"
                      style={{ fontFamily: "'Bodoni Moda', serif" }}
                    >
                      {format(selectedDate, 'd MMMM, EEEE', { locale: ru })}
                    </h3>
                    <p className="text-[#1a3a2a]/50 text-sm mt-0.5">
                      {COURTS.find((c) => c.id === selectedCourt)?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#1a3a2a]/50">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#e8f5eb] border border-[#2d5a3d]/30" /> Свободно
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#f5f0e8] border border-[#1a3a2a]/10" /> Занято
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    return (
                      <div
                        key={slot}
                        className={`relative py-2.5 rounded-xl text-center text-sm font-medium transition-all duration-200 ${
                          isBooked
                            ? 'bg-[#f5f0e8] text-[#1a3a2a]/30 cursor-not-allowed'
                            : 'bg-[#e8f5eb] text-[#1a3a2a] border border-[#2d5a3d]/20 cursor-pointer hover:bg-[#c8e8d0]'
                        }`}
                      >
                        {slot}
                        {isBooked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-px bg-[#1a3a2a]/20 rotate-12" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-[#f5f0e8] rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[#1a3a2a] font-medium text-sm">Хотите забронировать?</p>
                    <p className="text-[#1a3a2a]/50 text-xs mt-0.5">Выберите время в форме бронирования</p>
                  </div>
                  <Link
                    to={`/booking?court=${selectedCourt}&date=${format(selectedDate, 'yyyy-MM-dd')}`}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-[#1a3a2a] text-white text-sm font-medium rounded-full hover:bg-[#2d5a3d] transition-colors"
                  >
                    Забронировать
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
