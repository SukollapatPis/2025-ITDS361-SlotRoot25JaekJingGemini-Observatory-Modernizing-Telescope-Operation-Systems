import React from 'react';
import { Telescope } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <Telescope className="w-9 h-9 text-white" strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Gemini Observatory</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to access the Control System</p>
        </div>

        <div className="w-full p-8 bg-white shadow-lg rounded-2xl">
          <LoginForm />
        </div>

      </div>
    </div>
  );
};

export default LoginPage;