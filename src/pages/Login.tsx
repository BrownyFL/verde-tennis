import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store';

const schema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    login({
      id: '1',
      name: 'Иван Иванов',
      email: data.email,
      phone: '+7 (999) 123-45-67',
      membershipType: 'Gold',
    });
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-[#1a3a2a] flex">
      {/* Left: form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 w-fit">
          <ArrowLeft size={16} />
          <span className="text-sm">На главную</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-sm w-full"
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-full border-2 border-[#d4a853] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4a853]" />
            </div>
            <span className="text-white text-xl tracking-widest uppercase" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              Verde
            </span>
          </div>

          <h1
            className="text-white text-4xl mb-2"
            style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: 'italic' }}
          >
            Добро пожаловать
          </h1>
          <p className="text-white/50 text-sm mb-8">Войдите в личный кабинет</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-white/60 text-sm mb-1.5">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="your@email.com"
                className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-white/20 outline-none transition-all ${
                  errors.email ? 'border-red-400' : 'border-white/10 focus:border-[#d4a853]'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-1.5">Пароль</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-white/20 outline-none transition-all pr-11 ${
                    errors.password ? 'border-red-400' : 'border-white/10 focus:border-[#d4a853]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  aria-label="Показать пароль"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                <input type="checkbox" className="accent-[#d4a853]" />
                Запомнить меня
              </label>
              <a href="#" className="text-[#d4a853] hover:text-white transition-colors">
                Забыли пароль?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#d4a853] text-[#1a3a2a] font-bold tracking-wider uppercase rounded-full hover:bg-[#c49a3a] transition-all hover:shadow-xl hover:shadow-[#d4a853]/20 cursor-pointer"
            >
              Войти
            </button>
          </form>

          <p className="mt-6 text-center text-white/40 text-sm">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-white hover:text-[#d4a853] transition-colors">
              Зарегистрироваться
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right: visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a3d] to-[#0d1f14]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#d4a853]/10 blur-[100px]" />
        <div className="relative z-10 text-center px-12">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">Членство Verde</p>
          <h2
            className="text-white text-6xl mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: 'italic' }}
          >
            Игра <br />высшего <br />уровня
          </h2>
          <p className="text-white/40 text-sm max-w-xs mx-auto">
            Доступ к лучшим кортам, тренерам и сообществу единомышленников.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            {[
              { n: '8', l: 'Кортов' },
              { n: '24/7', l: 'Поддержка' },
              { n: '4.9★', l: 'Рейтинг' },
              { n: '500+', l: 'Членов' },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 rounded-xl p-4">
                <p
                  className="text-[#d4a853] text-2xl font-bold"
                  style={{ fontFamily: "'Bodoni Moda', serif" }}
                >
                  {s.n}
                </p>
                <p className="text-white/40 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
