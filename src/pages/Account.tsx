import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, LogOut, User, CreditCard, Bell, X } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import AnimatedSection from '../components/ui/AnimatedSection';
import { useAuthStore } from '../store';

const STATUS_COLORS = {
  confirmed: 'bg-[#e8f5eb] text-[#2d5a3d]',
  pending: 'bg-yellow-50 text-yellow-700',
  cancelled: 'bg-red-50 text-red-600',
};
const STATUS_LABELS = { confirmed: 'Подтверждено', pending: 'Ожидание', cancelled: 'Отменено' };

const NAV_TABS = [
  { id: 'bookings', label: 'Мои бронирования', icon: Calendar },
  { id: 'profile', label: 'Профиль', icon: User },
  { id: 'membership', label: 'Членство', icon: CreditCard },
];

export default function Account() {
  const { user, isAuthenticated, bookings, cancelBooking, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6 pt-20">
        <div className="text-center">
          <h2
            className="text-[#1a3a2a] text-3xl mb-3"
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            Требуется вход
          </h2>
          <p className="text-[#1a3a2a]/60 mb-6">Войдите в аккаунт для доступа к личному кабинету.</p>
          <Link
            to="/login"
            className="px-8 py-4 bg-[#1a3a2a] text-white font-semibold rounded-full hover:bg-[#2d5a3d] transition-colors"
          >
            Войти
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const upcomingBookings = bookings.filter((b) => b.status !== 'cancelled');
  const pastBookings = bookings.filter((b) => b.status === 'cancelled');

  return (
    <div className="bg-[#f5f0e8] min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1a3a2a] flex items-center justify-center text-[#d4a853] text-2xl font-bold" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              {user.name[0]}
            </div>
            <div>
              <h1
                className="text-[#1a3a2a] text-2xl font-semibold"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                {user.name}
              </h1>
              <p className="text-[#1a3a2a]/50 text-sm">
                Членство:{' '}
                <span className="text-[#d4a853] font-medium">{user.membershipType}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#1a3a2a]/50 hover:text-[#1a3a2a] transition-colors text-sm cursor-pointer"
          >
            <LogOut size={15} />
            Выйти
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <AnimatedSection direction="left" className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-2 mb-6">
              {NAV_TABS.map((tab) => (
                <div
                  key={tab.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#1a3a2a]/70 hover:text-[#1a3a2a] hover:bg-[#f5f0e8] transition-colors cursor-pointer"
                >
                  <tab.icon size={16} />
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div className="bg-[#1a3a2a] rounded-2xl p-6 text-white">
              <h3
                className="text-[#d4a853] text-sm tracking-wider uppercase mb-4"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Статистика
              </h3>
              {[
                { label: 'Всего бронирований', value: bookings.length },
                { label: 'Подтверждено', value: bookings.filter(b => b.status === 'confirmed').length },
                { label: 'Потрачено', value: `${bookings.reduce((s, b) => s + (b.status !== 'cancelled' ? b.totalPrice : 0), 0).toLocaleString('ru-RU')} ₽` },
              ].map((s) => (
                <div key={s.label} className="flex justify-between py-2.5 border-b border-white/10 last:border-0">
                  <span className="text-white/50 text-sm">{s.label}</span>
                  <span className="text-white font-semibold text-sm">{s.value}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Main content */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-[#1a3a2a] text-xl font-semibold"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Мои бронирования
              </h2>
              <Link
                to="/booking"
                className="px-5 py-2 bg-[#1a3a2a] text-white text-sm font-medium rounded-full hover:bg-[#2d5a3d] transition-colors"
              >
                + Новое
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-[#f5f0e8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={24} className="text-[#1a3a2a]/30" />
                </div>
                <p
                  className="text-[#1a3a2a] text-xl mb-2"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  Нет бронирований
                </p>
                <p className="text-[#1a3a2a]/50 text-sm mb-6">Забронируйте свой первый корт!</p>
                <Link
                  to="/booking"
                  className="px-8 py-3.5 bg-[#1a3a2a] text-white font-semibold rounded-full hover:bg-[#2d5a3d] transition-colors text-sm"
                >
                  Забронировать
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {[...upcomingBookings, ...pastBookings].map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3
                            className="text-[#1a3a2a] font-semibold"
                            style={{ fontFamily: "'Bodoni Moda', serif" }}
                          >
                            {booking.courtName}
                          </h3>
                          {booking.trainerName && (
                            <p className="text-[#1a3a2a]/50 text-xs mt-0.5">
                              Тренер: {booking.trainerName}
                            </p>
                          )}
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[booking.status]}`}>
                          {STATUS_LABELS[booking.status]}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-[#1a3a2a]/60">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {format(new Date(booking.date), 'd MMMM yyyy', { locale: ru })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {booking.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {booking.duration} ч
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                      <span
                        className="text-[#1a3a2a] font-bold text-lg"
                        style={{ fontFamily: "'Bodoni Moda', serif" }}
                      >
                        {booking.totalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                          aria-label="Отменить бронирование"
                        >
                          <X size={12} />
                          Отменить
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Notifications section */}
            <div className="mt-8 bg-white rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell size={16} className="text-[#1a3a2a]/60" />
                <h3
                  className="text-[#1a3a2a] font-semibold"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  Уведомления
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { text: 'Ваше бронирование подтверждено', time: 'Только что', dot: 'bg-[#2d5a3d]' },
                  { text: 'Напоминание: тренировка завтра в 10:00', time: '1 час назад', dot: 'bg-[#d4a853]' },
                  { text: 'Добро пожаловать в Verde Club!', time: '2 дня назад', dot: 'bg-[#1a3a2a]/20' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 py-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                    <div className="flex-1">
                      <p className="text-[#1a3a2a] text-sm">{n.text}</p>
                      <p className="text-[#1a3a2a]/40 text-xs mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
