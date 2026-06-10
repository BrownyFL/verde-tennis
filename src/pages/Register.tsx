import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store';

const schema = z.object({
  name: z.string().min(2, 'Введите имя'),
  email: z.string().email('Неверный email'),
  phone: z.string().min(10, 'Введите корректный номер'),
  password: z.string().min(6, 'Минимум 6 символов'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: 'Пароли не совпадают',
  path: ['confirm'],
});
type FormData = z.infer<typeof schema>;

export default function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    login({
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      membershipType: 'Дневной',
    });
    navigate('/account');
  };

  const fields = [
    { name: 'name' as const, label: 'Имя и фамилия', type: 'text', placeholder: 'Иван Иванов' },
    { name: 'email' as const, label: 'Email', type: 'email', placeholder: 'your@email.com' },
    { name: 'phone' as const, label: 'Телефон', type: 'tel', placeholder: '+7 (999) 000-00-00' },
    { name: 'password' as const, label: 'Пароль', type: 'password', placeholder: '••••••••' },
    { name: 'confirm' as const, label: 'Повторите пароль', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div className="min-h-screen bg-[#1a3a2a] flex">
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 w-fit">
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
            Создать аккаунт
          </h1>
          <p className="text-white/50 text-sm mb-8">Присоединяйтесь к Verde Club</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((f) => (
              <div key={f.name}>
                <label className="block text-white/60 text-sm mb-1.5">{f.label}</label>
                <div className="relative">
                  <input
                    {...register(f.name)}
                    type={f.type.includes('password') && showPwd ? 'text' : f.type}
                    placeholder={f.placeholder}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 outline-none transition-all ${
                      f.type.includes('password') ? 'pr-11' : ''
                    } ${
                      errors[f.name] ? 'border-red-400' : 'border-white/10 focus:border-[#d4a853]'
                    }`}
                  />
                  {f.type === 'password' && (
                    <button
                      type="button"
                      onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                      aria-label="Показать пароль"
                    >
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  )}
                </div>
                {errors[f.name] && (
                  <p className="mt-1 text-xs text-red-400">{errors[f.name]?.message}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-4 bg-[#d4a853] text-[#1a3a2a] font-bold tracking-wider uppercase rounded-full hover:bg-[#c49a3a] transition-all hover:shadow-xl hover:shadow-[#d4a853]/20 cursor-pointer mt-2"
            >
              Зарегистрироваться
            </button>
          </form>

          <p className="mt-6 text-center text-white/40 text-sm">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-white hover:text-[#d4a853] transition-colors">
              Войти
            </Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#2d5a3d] to-[#0d1f14]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#4a8a5c]/20 blur-[100px]" />
        <div className="relative z-10 text-center px-12">
          <h2
            className="text-white text-5xl mb-4"
            style={{ fontFamily: "'Bodoni Moda', serif", fontStyle: 'italic' }}
          >
            Стань членом<br />клуба Verde
          </h2>
          <p className="text-white/40 text-sm max-w-xs mx-auto mb-10">
            Первое занятие с тренером бесплатно для всех новых членов.
          </p>
          <div className="space-y-3">
            {[
              'Эксклюзивный доступ к кортам',
              'Персональный план тренировок',
              'Участие в клубных турнирах',
              'Скидки на все услуги',
            ].map((b) => (
              <div key={b} className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#d4a853]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#d4a853] text-xs">✓</span>
                </div>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
