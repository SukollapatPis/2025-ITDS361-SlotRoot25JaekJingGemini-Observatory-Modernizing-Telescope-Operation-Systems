import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const mockUsers = [
    {
      email: 'edwin@gemini.edu',
      password: 'password123',
      name: 'Edwin Hubble',
      role: 'ASTRONOMER'  // ✅ แก้แล้ว
    },
    {
      email: 'jocelyn@gemini.edu',
      password: 'password123',
      name: 'Jocelyn Bell',
      role: 'OBSERVER'    // ✅ แก้แล้ว
    }
  ];

  const validateEmail = (value) => {
    if (!value) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Not a valid email address.';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ email: emailErr, password: passwordErr });

    if (emailErr || passwordErr) return;

    // แก้ไขเฉพาะส่วนใน handleSubmit ของ LoginForm.jsx
    try {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) throw new Error('Invalid');

      localStorage.setItem('user', JSON.stringify(user));

      // 🟢 1. ตรวจสอบ Role เพื่อเลือก Path ให้ถูกต้องตาม App.jsx
      const targetPath = user.role === 'ASTRONOMER'
        ? '/dashboard/astronomer'
        : '/dashboard/observer';

      navigate(targetPath, {
        state: {
          name: user.name,
          role: user.role,
          justLoggedIn: true // ส่งค่าไปแสดง Toast สีเขียว
        }
      });

    } catch (err) {
      setErrors({ email: 'Invalid email or password.', password: ' ' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-slate-700" htmlFor="email">
          Email address
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
          </span>
          <input
            type="email"
            id="email"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none text-slate-700
              ${errors.email
                ? 'border-red-400 focus:ring-red-300 bg-red-50'
                : 'border-slate-200 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50'}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: '' }));
            }}
            placeholder="edwin@gemini.edu"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-slate-700" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </span>
          <input
            type="password"
            id="password"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:outline-none text-slate-700
              ${errors.password
                ? 'border-red-400 focus:ring-red-300 bg-red-50'
                : 'border-slate-200 focus:ring-indigo-400 focus:border-indigo-400 bg-slate-50'}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: '' }));
            }}
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Sign in Button */}
      <button
        type="submit"
        className="w-full py-3 text-white font-semibold transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200"
      >
        Sign in
      </button>

      {/* Demo Accounts */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm text-slate-400">
        <p className="mb-1">Demo Accounts (Password: password123)</p>
        <p className="text-slate-600"><span className="font-semibold">Astronomer:</span> edwin@gemini.edu</p>
        <p className="text-slate-600"><span className="font-semibold">Observer:</span> jocelyn@gemini.edu</p>
      </div>

    </form>
  );
};

export default LoginForm;