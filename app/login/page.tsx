'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin/manage';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect on success
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6 opacity-90">
            <Image
              src="/rr-logo.png"
              alt="Ritchie Royale"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rr-green via-rr-yellow to-rr-pink bg-clip-text text-transparent">
            Member Login
          </h1>
          <p className="text-rr-green/70 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-rr-dark/80 backdrop-blur-sm border-2 border-rr-green/30 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm animate-pulse">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-rr-yellow mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-rr-dark/60 border-2 border-rr-green/40 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow focus:ring-2 focus:ring-rr-yellow/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-rr-yellow mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-rr-dark/60 border-2 border-rr-green/40 rounded-lg text-rr-green placeholder-rr-green/40 focus:outline-none focus:border-rr-yellow focus:ring-2 focus:ring-rr-yellow/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-rr-green to-rr-yellow text-rr-dark font-bold rounded-lg hover:from-rr-yellow hover:to-rr-pink transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-rr-green/30"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-rr-green/70 hover:text-rr-pink transition-colors text-sm"
          >
            ← Back to Ritchie Royale
          </a>
        </div>
      </div>
    </div>
  );
}

// useSearchParams opts the tree out of prerendering unless it sits behind a
// Suspense boundary.
export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}


