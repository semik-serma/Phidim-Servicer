'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "@/hooks/useAuth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function LoginPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        // Sync the auth context (updates navbar immediately)
        await refreshUser();

        toast.success('Welcome back! Logging you in...');
        router.push('/');
      } else {
        toast.error(data.detail || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Unable to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FAFCF8] selection:bg-[#063B00] selection:text-white">
      <Toaster position="top-right" reverseOrder={false} />

      {/* LEFT SECTION: Modern Brand Showcase */}
      <div className="relative hidden md:flex md:w-1/2 lg:w-[52%] bg-gradient-to-br from-[#052900] via-[#063B00] to-[#0d4f04] text-white p-10 lg:p-16 flex-col justify-between overflow-hidden">
        {/* Subtle Ambient Background Accents */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" 
        />

        {/* Top Brand Tag */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Phidim & Panchthar On-Demand
          </div>
        </div>

        {/* Middle Feature Content */}
        <div className="relative z-10 max-w-xl my-auto py-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-6">
            Reliable technical service at your <span className="text-emerald-300">doorstep</span>.
          </h1>
          <p className="text-emerald-100/85 text-base lg:text-lg leading-relaxed mb-8">
            Connect instantly with certified local technicians for fast, transparent, and trusted repairs across homes, shops, and offices in Phidim.
          </p>

          {/* Service Feature Badges */}
          <div className="grid grid-cols-2 gap-3 text-sm font-medium text-white/90">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <WrenchIcon className="w-4 h-4" />
              </span>
              <span>Electrical & Plumbing</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <CctvIcon className="w-4 h-4" />
              </span>
              <span>CCTV & Surveillance</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <WifiIcon className="w-4 h-4" />
              </span>
              <span>Internet & Networking</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <LaptopIcon className="w-4 h-4" />
              </span>
              <span>Computer & IT Repair</span>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof / Trust Footnote */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/70">
          <p>© {new Date().getFullYear()} Phidim Service. All rights reserved.</p>
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-400" /> Verified Professionals
          </span>
        </div>
      </div>

      {/* RIGHT SECTION: Login Form */}
      <div className="w-full md:w-1/2 lg:w-[48%] flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Header Branding (Visible only on small screens) */}
          <div className="md:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#063B00] text-xs font-semibold uppercase mb-2">
              Phidim Service
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to manage your technical service orders</p>
          </div>

          {/* Desktop Form Heading */}
          <div className="hidden md:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Account Sign In</h2>
            <p className="text-sm text-gray-500 mt-2">
              Welcome back! Please enter your credentials to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <MailIcon className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#063B00] focus:ring-4 focus:ring-[#063B00]/10 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-700 tracking-wide uppercase">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#063B00] hover:text-[#085500] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <LockIcon className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-11 py-3 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#063B00] focus:ring-4 focus:ring-[#063B00]/10 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label htmlFor="rememberMe" className="relative flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#063B00] border-gray-300 rounded focus:ring-[#063B00] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-xs font-medium text-gray-600">Keep me logged in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3.5 px-4 bg-[#063B00] hover:bg-[#084d00] active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#063B00]/20 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Registration Redirect */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Don't have an account yet?{' '}
              <Link href="/register" className="font-semibold text-[#063B00] hover:underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>

          {/* Subtle Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
            <LockIcon className="w-3 h-3" />
            <span>End-to-end encrypted session</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Self-contained lightweight SVGs (No external dependencies needed)
   ========================================================================== */

function MailIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function LockIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function EyeIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EyeOffIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function SpinnerIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function WrenchIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.496-3.03c.315-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.337 4.486c.048.58.024 1.193-.14 1.743" />
    </svg>
  );
}

function CctvIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function WifiIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  );
}

function LaptopIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}