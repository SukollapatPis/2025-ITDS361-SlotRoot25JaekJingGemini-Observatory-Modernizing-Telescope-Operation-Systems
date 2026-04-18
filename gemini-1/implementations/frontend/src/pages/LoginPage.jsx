import React from 'react';
import { Telescope } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* ส่วน Logo กล้องโทรทรรศน์ */}
        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-xl shadow-lg">
            <Telescope className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Gemini Observatory
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to access the Control System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Card สีขาวที่บรรจุฟอร์ม */}
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100 mx-4 sm:mx-0">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;