import { Link } from 'react-router-dom';
import { Share2, Send, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1f14] text-white/70">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full border-2 border-[#d4a853] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a853]" />
              </div>
              <span
                className="text-xl text-white tracking-widest uppercase"
                style={{ fontFamily: "'Bodoni Moda', serif" }}
              >
                Verde
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              Премиальный теннисный и падел-клуб. Место, где рождаются чемпионы.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#d4a853] hover:text-[#d4a853] transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Share2 size={15} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[#d4a853] hover:text-[#d4a853] transition-colors cursor-pointer"
                aria-label="Telegram"
              >
                <Send size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">
              Навигация
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/courts', label: 'Корты' },
                { to: '/trainers', label: 'Тренеры' },
                { to: '/schedule', label: 'Расписание' },
                { to: '/booking', label: 'Бронирование' },
                { to: '/pricing', label: 'Тарифы' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">
              Услуги
            </h4>
            <ul className="space-y-3 text-sm">
              <li>Аренда кортов</li>
              <li>Занятия с тренером</li>
              <li>Детские группы</li>
              <li>Турниры</li>
              <li>Фитнес-зона</li>
              <li>Гастро-бар</li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-widest uppercase mb-5">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 text-[#d4a853] shrink-0" />
                <span>Москва, ул. Теннисная, 12</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-[#d4a853] shrink-0" />
                <a href="tel:+74951234567" className="hover:text-white transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#d4a853] shrink-0" />
                <a href="mailto:info@verde-club.ru" className="hover:text-white transition-colors">
                  info@verde-club.ru
                </a>
              </li>
            </ul>
            <div className="mt-6 text-sm">
              <p className="text-white/50">Режим работы:</p>
              <p>Пн–Пт: 07:00 – 23:00</p>
              <p>Сб–Вс: 08:00 – 22:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <p>© 2025 Verde Tennis Club. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/60 transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
