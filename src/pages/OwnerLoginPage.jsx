import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('krupabt83@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  // If already authenticated, redirect straight to /owner/visitors
  useEffect(() => {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.authenticated) {
          navigate('/owner/visitors', { replace: true });
        }
      })
      .catch(() => {});
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || 'Invalid owner email or password. Access denied.');
        setLoading(false);
        return;
      }

      if (data.token) {
        sessionStorage.setItem('portfolio_admin_token', data.token);
      }
      localStorage.setItem('portfolio_admin_logged_in', 'true');

      // Redirect to /owner/visitors
      const params = new URLSearchParams(location.search);
      const redirect = params.get('redirect') || data.redirect || '/owner/visitors';
      navigate(redirect, { replace: true });
    } catch (err) {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] relative overflow-hidden transition-colors duration-300 font-sans">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-25 dark:opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(168, 135, 90, 0.25) 0%, rgba(196, 166, 123, 0.1) 50%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-md relative z-10">
        <div className="p-8 sm:p-10 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-[0_12px_40px_-8px_rgba(41,37,34,0.08)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.4)] backdrop-blur-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] shadow-xs mb-4">
              <Shield className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
              <span className="text-[11px] font-serif font-bold uppercase tracking-[0.2em] text-[#A8875A] dark:text-[#C4A67B]">
                OWNER ACCESS GATEWAY
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
              Portfolio Owner Login
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#7D736A] dark:text-[#9E9389] leading-relaxed">
              Sign in with your authorized credentials to view live visitor records.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs leading-relaxed flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#5F5750] dark:text-[#D1C8C0] mb-2">
                Owner Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A8875A] dark:text-[#C4A67B]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="krupabt83@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] focus:border-[#A8875A] dark:focus:border-[#C4A67B] focus:outline-none focus:ring-1 focus:ring-[#A8875A] text-sm text-[#292522] dark:text-[#F5EFEB] placeholder-[#9E9389] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#5F5750] dark:text-[#D1C8C0] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A8875A] dark:text-[#C4A67B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] focus:border-[#A8875A] dark:focus:border-[#C4A67B] focus:outline-none focus:ring-1 focus:ring-[#A8875A] text-sm text-[#292522] dark:text-[#F5EFEB] placeholder-[#9E9389] transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7D736A] dark:text-[#9E9389] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-serif font-bold text-xs uppercase tracking-[0.16em] text-[#F7F3ED] dark:text-[#141210] bg-[#292522] dark:bg-[#C4A67B] hover:bg-[#A8875A] dark:hover:bg-[#D8BC93] border border-[#292522] dark:border-[#C4A67B] shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Owner</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="mt-8 pt-6 border-t border-[#DED3C5] dark:border-[#38332E] text-center">
            <a
              href="/"
              className="text-xs text-[#7D736A] dark:text-[#9E9389] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors"
            >
              &larr; Return to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
