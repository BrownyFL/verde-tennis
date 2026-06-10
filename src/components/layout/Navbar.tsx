import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store';

const NAV_LINKS = [
  { to: '/courts', label: 'Корты' },
  { to: '/trainers', label: 'Тренеры' },
  { to: '/schedule', label: 'Расписание' },
  { to: '/pricing', label: 'Тарифы' },
  { to: '/contacts', label: 'Контакты' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1a3a2a]/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full border-2 border-[#d4a853] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#d4a853]" />
            </div>
            <span
              className="text-2xl text-white tracking-widest uppercase"
              style={{ fontFamily: "'Bodoni Moda', serif", letterSpacing: '0.2em' }}
            >
              Verde
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-[#d4a853]'
                      : scrolled
                      ? 'text-white/80 hover:text-white'
                      : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/account"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
                >
                  <User size={16} />
                  <span>{user?.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Выйти"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Войти
              </Link>
            )}
            <Link
              to="/booking"
              className="px-5 py-2.5 bg-[#d4a853] text-[#1a3a2a] text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-[#c49a3a] transition-all duration-200 hover:shadow-lg hover:shadow-[#d4a853]/30"
            >
              Забронировать
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#1a3a2a] flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-light text-white/80 hover:text-white transition-colors"
                    style={{ fontFamily: "'Bodoni Moda', serif" }}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                    className="text-white/70 text-lg"
                  >
                    Личный кабинет
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="text-left text-white/50 text-lg cursor-pointer"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 text-lg"
                >
                  Войти
                </Link>
              )}
              <Link
                to="/booking"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-block px-8 py-4 bg-[#d4a853] text-[#1a3a2a] font-semibold text-center rounded-full"
              >
                Забронировать
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
