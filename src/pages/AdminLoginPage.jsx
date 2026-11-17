import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, User, Eye, EyeOff, AlertCircle, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('krupabt');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [setupNotice, setSetupNotice] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  // Check if already authenticated
  useEffect(() => {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.authenticated) {
          navigate('/admin/analytics', { replace: true });
        }
      })
      .catch(() => {});
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSetupNotice(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.error === 'admin_password_not_configured') {
          setSetupNotice(
            data.message ||
              'ADMIN_PASSWORD is not configured in server environment variables. Please set ADMIN_PASSWORD in your .env or Vercel Project Settings.'
          );
        } else {
          setError(data.message || 'Invalid username or password. Please try again.');
        }
        setLoading(false);
        return;
      }

      // Store in session
      if (data.token) {
        sessionStorage.setItem('portfolio_admin_token', data.token);
      }
      localStorage.setItem('portfolio_admin_logged_in', 'true');

      // Navigate to destination or analytics
      const params = new URLSearchParams(location.search);
      const redirect = params.get('redirect') || '/admin/analytics';
      navigate(redirect, { replace: true });
    } catch (err) {
      setError('Network error while connecting to authentication service. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] relative overflow-hidden transition-colors duration-300 font-sans">
      {/* Background Ambience */}
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
                AUTHENTICATION GATEWAY
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
              Admin Analytics Portal
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#7D736A] dark:text-[#9E9389] leading-relaxed">
              Private visitor intelligence dashboard for portfolio metrics.
            </p>
          </div>

          {/* Setup Notice */}
          {setupNotice && (
            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs leading-relaxed space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold">
                <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span>Environment Setup Required</span>
              </div>
              <p>{setupNotice}</p>
              <div className="text-[11px] p-2 bg-black/5 dark:bg-black/30 rounded font-mono">
                ADMIN_PASSWORD=your_password
              </div>
            </div>
          )}

          {/* Error Notice */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs leading-relaxed flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#5F5750] dark:text-[#D1C8C0] mb-2">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A8875A] dark:text-[#C4A67B]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="krupabt"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] focus:border-[#A8875A] dark:focus:border-[#C4A67B] focus:outline-none focus:ring-1 focus:ring-[#A8875A] text-sm text-[#292522] dark:text-[#F5EFEB] placeholder-[#9E9389] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#5F5750] dark:text-[#D1C8C0] mb-2">
                Master Password
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
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7D736A] dark:text-[#9E9389] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors"
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
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-[#DED3C5] dark:border-[#38332E] text-center">
            <a
              href="/"
              className="text-xs text-[#7D736A] dark:text-[#9E9389] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors"
            >
              &larr; Return to Public Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
