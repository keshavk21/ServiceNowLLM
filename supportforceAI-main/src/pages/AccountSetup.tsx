import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Shield } from 'lucide-react';

export const AccountSetup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      navigate('/forcespace');
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error message when user types
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Logo />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">1</span>
              <span className="font-medium">Account Setup</span>
              <span className="flex-1 border-t border-gray-200"></span>
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400 font-semibold text-sm">2</span>
              <span className="text-gray-400">Forcespace</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
            <p className="text-gray-600">Get started with your 14-day free trial.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Work email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                  error ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                }`}
                placeholder="name@company.com"
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg transition-colors ${
                email && validateEmail(email)
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
              disabled={!email || !validateEmail(email)}
            >
              Continue
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Your data is protected by enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
};
