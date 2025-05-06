'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    }

    // Optional: Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Admin credentials
    if (cleanEmail === 'admin@admin.com' && cleanPassword === 'admin123') {
      const adminUser = {
        id: 0,
        name: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setTimeout(() => {
        router.push('posts');
      }, 100);
      return;
    }

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await res.json();

      const user = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

      if (user && cleanPassword === user.username) {
        localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
        router.push('/myposts');
      } else {
        setError('Invalid credentials. Use your email as username and your username as password.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md shadow-lg p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input with Label */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-describedby="email-helper-text"
              required
            />
            <small id="email-helper-text" className="text-gray-500">
              e.g., Sincere@april.biz
            </small>
          </div>
  
          {/* Password Input with Label */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-describedby="password-helper-text"
              required
            />
            <small id="password-helper-text" className="text-gray-500">
              Use your username from JSONPlaceholder
            </small>
          </div>
  
          {/* Error Message */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
  
          {/* Login Button with Loading State */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="w-6 h-6 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="4" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 12l1.29-1.29a9 9 0 1111.42 0L20 12"
                  />
                </svg>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
  
        {/* Register Link */}
        <div className="flex justify-center mt-4">
          <a href="/register" className="text-blue-600 hover:underline text-sm">
            Don't have an account? Register
          </a>
        </div>
  
        {/* Forgot Password Link (Optional) */}
        <div className="flex justify-center mt-2">
          <a href="/forgot-password" className="text-blue-600 hover:underline text-sm">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
}
