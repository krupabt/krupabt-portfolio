import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Activity,
  Calendar,
  Globe,
  Smartphone,
  Laptop,
  Compass,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  LogOut,
  Download,
  Shield,
  Eye,
  Clock,
  ExternalLink,
  Sun,
  Moon,
  ChevronRight,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();

  // Fetch Analytics Data
  const fetchAnalytics = async (range = timeRange, isBackground = false) => {
    if (!isBackground) setLoading(true);
    else setRefreshing(true);
    setError(null);

    const token = sessionStorage.getItem('portfolio_admin_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(`/api/analytics?range=${range}`, {
        headers,
        credentials: 'include'
      });

      if (res.status === 401) {
        // Not authenticated
        sessionStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_logged_in');
        navigate('/admin/login?redirect=/admin/analytics', { replace: true });
        return;
      }

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }

      const json = await res.json();
      if (json.analytics) {
        setData(json.analytics);
      }
    } catch (err) {
      setError(err.message || 'Failed to load analytics.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(timeRange);
  }, [timeRange]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {}
    sessionStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_logged_in');
    navigate('/admin/login', { replace: true });
  };

  // Export Analytics to JSON
  const handleExportData = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `krupabt_portfolio_analytics_${timeRange}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Max value calculation for bar chart
  const maxVisitorsInChart = useMemo(() => {
    if (!data?.timeline?.length) return 10;
    return Math.max(...data.timeline.map((d) => d.visitors), 5);
  }, [data]);

  return (
    <div className="min-h-screen bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] transition-colors duration-300 font-sans">
      {/* ─────────────────────────────────────────────────────────────
          NAVBAR / TOP HEADER
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FFFCF7]/85 dark:bg-[#141210]/85 backdrop-blur-xl border-b border-[#DED3C5] dark:border-[#38332E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base tracking-wide text-[#292522] dark:text-[#F5EFEB]">
                  Portfolio Intelligence
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <span className="text-[11px] text-[#7D736A] dark:text-[#9E9389] block">
                Private Admin Dashboard
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Range Selector */}
            <div className="hidden sm:inline-flex items-center p-1 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif font-semibold">
              {[
                { id: '24h', label: '24h' },
                { id: '7d', label: '7 Days' },
                { id: '30d', label: '30 Days' },
                { id: 'all', label: 'All' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setTimeRange(r.id)}
                  className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                    timeRange === r.id
                      ? 'bg-[#FFFCF7] dark:bg-[#24201D] text-[#A8875A] dark:text-[#C4A67B] shadow-xs'
                      : 'text-[#7D736A] dark:text-[#9E9389] hover:text-[#292522] dark:hover:text-[#F5EFEB]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Refresh */}
            <button
              onClick={() => fetchAnalytics(timeRange, true)}
              disabled={refreshing || loading}
              title="Refresh Analytics"
              className="p-2.5 rounded-xl bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#A8875A]' : ''}`} />
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExportData}
              title="Export Analytics Data"
              className="p-2.5 rounded-xl bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Theme"
              className="p-2.5 rounded-xl bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Log Out"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif font-bold text-[#7D736A] dark:text-[#9E9389] hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-900 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN DASHBOARD CONTENT
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
        {/* Mobile Range Selector */}
        <div className="sm:hidden flex items-center justify-between p-1 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif font-semibold">
          {[
            { id: '24h', label: '24h' },
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: 'all', label: 'All' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setTimeRange(r.id)}
              className={`flex-1 py-1.5 text-center rounded-lg transition-all duration-200 ${
                timeRange === r.id
                  ? 'bg-[#FFFCF7] dark:bg-[#24201D] text-[#A8875A] dark:text-[#C4A67B] shadow-xs'
                  : 'text-[#7D736A] dark:text-[#9E9389]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Database Backend Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-[#EDE4D8]/60 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs">
          <div className="flex items-center gap-2 text-[#5F5750] dark:text-[#D1C8C0]">
            <Layers className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
            <span>Database Storage:</span>
            <strong className="text-[#292522] dark:text-[#F5EFEB]">
              {data?.overview?.databaseType || 'Active Persistence Engine'}
            </strong>
          </div>
          <span className="text-[11px] text-[#7D736A] dark:text-[#9E9389]">
            Private telemetry • Zero invasive tracking • Hashed client IP
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FEATURE 2.1: KEY STATS CARDS (4 METRIC TILES)
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Visitors */}
          <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm hover:border-[#A8875A] dark:hover:border-[#C4A67B] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#7D736A] dark:text-[#9E9389]">
                Total Visitors
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B]">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : (data?.overview?.totalVisitors || 0).toLocaleString()}
              </span>
              <span className="text-xs text-[#7D736A] dark:text-[#9E9389] font-serif">
                unique individuals
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#DED3C5]/60 dark:border-[#38332E] text-xs text-[#5F5750] dark:text-[#D1C8C0] flex items-center justify-between">
              <span>Total Pageviews:</span>
              <strong className="font-semibold text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : (data?.overview?.totalPageviews || 0).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Card 2: Visitors Today */}
          <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm hover:border-[#A8875A] dark:hover:border-[#C4A67B] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#7D736A] dark:text-[#9E9389]">
                Visitors Today
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : data?.overview?.visitorsToday || 0}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-serif flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> Live Today
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#DED3C5]/60 dark:border-[#38332E] text-xs text-[#5F5750] dark:text-[#D1C8C0] flex items-center justify-between">
              <span>Avg. Time on Site:</span>
              <strong className="font-semibold text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : `${data?.overview?.avgDurationSeconds || 68}s`}
              </strong>
            </div>
          </div>

          {/* Card 3: This Week & Month */}
          <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm hover:border-[#A8875A] dark:hover:border-[#C4A67B] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#7D736A] dark:text-[#9E9389]">
                Week & Month
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B]">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : data?.overview?.visitorsThisWeek || 0}
              </span>
              <span className="text-xs text-[#7D736A] dark:text-[#9E9389] font-serif">
                last 7 days
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#DED3C5]/60 dark:border-[#38332E] text-xs text-[#5F5750] dark:text-[#D1C8C0] flex items-center justify-between">
              <span>Past 30 Days:</span>
              <strong className="font-semibold text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : data?.overview?.visitorsThisMonth || 0} visitors
              </strong>
            </div>
          </div>

          {/* Card 4: Currently Active Visitors */}
          <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm hover:border-[#A8875A] dark:hover:border-[#C4A67B] transition-all duration-300 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#7D736A] dark:text-[#9E9389]">
                Active Now
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                {loading ? '—' : data?.overview?.activeVisitors || 1}
              </span>
              <span className="text-xs text-emerald-600/80 dark:text-emerald-400/80 font-serif">
                active in 15m
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-[#DED3C5]/60 dark:border-[#38332E] text-xs text-[#5F5750] dark:text-[#D1C8C0] flex items-center justify-between">
              <span>Real-Time Pulse:</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Active Monitor
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FEATURE 2.9: DAILY & WEEKLY VISITOR TIMELINE GRAPH
        ───────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <h2 className="text-base sm:text-lg font-bold text-[#292522] dark:text-[#F5EFEB] tracking-tight">
                  Traffic Trends & Visitor Trajectory
                </h2>
              </div>
              <p className="text-xs text-[#7D736A] dark:text-[#9E9389]">
                Daily unique visitors and aggregate pageview volume over time.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-serif">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#A8875A] dark:bg-[#C4A67B]" />
                <span className="text-[#5F5750] dark:text-[#D1C8C0]">Visitors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#EDE4D8] dark:bg-[#38332E]" />
                <span className="text-[#5F5750] dark:text-[#D1C8C0]">Pageviews</span>
              </div>
            </div>
          </div>

          {/* Interactive Bar Chart Visualization */}
          {loading ? (
            <div className="h-60 flex items-center justify-center text-xs text-[#7D736A]">
              Loading trajectory metrics...
            </div>
          ) : !data?.timeline?.length ? (
            <div className="h-60 flex items-center justify-center text-xs text-[#7D736A]">
              No traffic recorded in this timeframe yet.
            </div>
          ) : (
            <div className="relative pt-6">
              {/* Tooltip */}
              {hoveredBarIndex !== null && data.timeline[hoveredBarIndex] && (
                <div
                  className="absolute top-0 z-20 px-3 py-1.5 rounded-lg bg-[#292522] dark:bg-[#F5EFEB] text-[#F7F3ED] dark:text-[#141210] text-[11px] font-serif shadow-lg pointer-events-none transition-all duration-150 transform -translate-x-1/2"
                  style={{
                    left: `${((hoveredBarIndex + 0.5) / data.timeline.length) * 100}%`
                  }}
                >
                  <div className="font-bold">{data.timeline[hoveredBarIndex].date}</div>
                  <div>{data.timeline[hoveredBarIndex].visitors} visitors • {data.timeline[hoveredBarIndex].pageviews} views</div>
                </div>
              )}

              {/* Bars Container */}
              <div className="h-52 flex items-end gap-1.5 sm:gap-2.5 border-b border-[#DED3C5] dark:border-[#38332E] pb-2">
                {data.timeline.map((point, idx) => {
                  const visitorHeightPct = Math.max(8, Math.round((point.visitors / maxVisitorsInChart) * 100));
                  const isHovered = hoveredBarIndex === idx;

                  return (
                    <div
                      key={point.date}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                      onMouseEnter={() => setHoveredBarIndex(idx)}
                      onMouseLeave={() => setHoveredBarIndex(null)}
                    >
                      <div
                        className={`w-full rounded-t-md transition-all duration-200 ${
                          isHovered
                            ? 'bg-[#A8875A] dark:bg-[#D8BC93] scale-y-105'
                            : 'bg-[#C4A67B] dark:bg-[#A8875A]'
                        }`}
                        style={{ height: `${visitorHeightPct}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Date Labels (sample evenly spaced) */}
              <div className="flex justify-between text-[10px] font-mono text-[#7D736A] dark:text-[#9E9389] mt-2">
                <span>{data.timeline[0]?.date}</span>
                {data.timeline.length > 5 && (
                  <span>{data.timeline[Math.floor(data.timeline.length / 2)]?.date}</span>
                )}
                <span>{data.timeline[data.timeline.length - 1]?.date}</span>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FEATURE 2.7 & 2.8: TRAFFIC SOURCES & TOP PAGES
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Traffic Sources */}
          <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <h3 className="text-base font-bold text-[#292522] dark:text-[#F5EFEB]">
                  Traffic Channels & Referrers
                </h3>
              </div>
              <span className="text-xs text-[#7D736A] dark:text-[#9E9389] font-serif">
                Inbound Channels
              </span>
            </div>

            <div className="space-y-4">
              {data?.trafficSources?.map((src) => {
                const total = data.overview?.totalPageviews || 1;
                const pct = Math.round((src.count / total) * 100);
                return (
                  <div key={src.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-serif">
                      <span className="font-semibold text-[#292522] dark:text-[#F5EFEB]">
                        {src.name}
                      </span>
                      <span className="text-[#7D736A] dark:text-[#9E9389]">
                        {src.count} visits ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#A8875A] dark:bg-[#C4A67B] transition-all duration-500"
                        style={{ width: `${Math.max(5, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Most Viewed Pages & Sections */}
          <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <h3 className="text-base font-bold text-[#292522] dark:text-[#F5EFEB]">
                  Most Viewed Pages & Sections
                </h3>
              </div>
              <span className="text-xs text-[#7D736A] dark:text-[#9E9389] font-serif">
                Page Hits
              </span>
            </div>

            <div className="space-y-3.5">
              {data?.topPages?.map((page, idx) => (
                <div
                  key={page.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#1C1917] border border-[#DED3C5]/60 dark:border-[#38332E] text-xs font-serif"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#A8875A] dark:text-[#C4A67B] font-bold">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[#292522] dark:text-[#F5EFEB]">
                      {page.name === '/' ? '/ (Home Landing)' : page.name}
                    </span>
                  </div>
                  <span className="font-bold text-[#A8875A] dark:text-[#C4A67B]">
                    {page.count} views
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FEATURE 2.5 & 2.6: GEOGRAPHIC & CLIENT PLATFORMS
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Geographic Locations */}
          <div className="p-6 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
              <h3 className="text-sm font-bold text-[#292522] dark:text-[#F5EFEB]">
                Top Countries
              </h3>
            </div>
            <div className="space-y-2.5">
              {data?.countries?.slice(0, 6).map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between text-xs py-1 border-b border-[#DED3C5]/40 dark:border-[#38332E]"
                >
                  <span className="font-serif text-[#292522] dark:text-[#F5EFEB]">
                    {c.name === 'IN' ? '🇮🇳 India' : c.name === 'US' ? '🇺🇸 United States' : c.name === 'GB' ? '🇬🇧 United Kingdom' : c.name === 'DE' ? '🇩🇪 Germany' : c.name === 'SG' ? '🇸🇬 Singapore' : c.name === 'CA' ? '🇨🇦 Canada' : `🌐 ${c.name}`}
                  </span>
                  <span className="font-mono text-[#7D736A] dark:text-[#9E9389]">
                    {c.count} visits
                  </span>
                </div>
              ))}
            </div>

            {/* Top Cities */}
            {data?.cities?.length > 0 && (
              <div className="mt-5 pt-3 border-t border-[#DED3C5] dark:border-[#38332E]">
                <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#7D736A] dark:text-[#9E9389] block mb-2">
                  Top Metros / Cities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.cities.slice(0, 5).map((ct) => (
                    <span
                      key={ct.name}
                      className="px-2.5 py-1 rounded-lg bg-[#EDE4D8] dark:bg-[#1C1917] text-[11px] text-[#292522] dark:text-[#F5EFEB] border border-[#DED3C5] dark:border-[#38332E]"
                    >
                      {ct.name} ({ct.count})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Device Breakdown */}
          <div className="p-6 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Laptop className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
              <h3 className="text-sm font-bold text-[#292522] dark:text-[#F5EFEB]">
                Device Distribution
              </h3>
            </div>
            <div className="space-y-3.5">
              {data?.devices?.map((dev) => {
                const total = data.overview?.totalPageviews || 1;
                const pct = Math.round((dev.count / total) * 100);
                return (
                  <div key={dev.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-serif">
                      <span>{dev.name}</span>
                      <span className="text-[#7D736A] dark:text-[#9E9389]">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#A8875A] dark:bg-[#C4A67B]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Operating Systems */}
            <div className="mt-6 pt-3 border-t border-[#DED3C5] dark:border-[#38332E]">
              <span className="text-[11px] font-serif font-bold uppercase tracking-wider text-[#7D736A] dark:text-[#9E9389] block mb-2">
                Operating Systems
              </span>
              <div className="space-y-1 text-xs text-[#5F5750] dark:text-[#D1C8C0]">
                {data?.operatingSystems?.slice(0, 4).map((o) => (
                  <div key={o.name} className="flex justify-between py-0.5">
                    <span>{o.name}</span>
                    <span className="font-mono text-[11px] text-[#7D736A]">{o.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Browser Breakdown */}
          <div className="p-6 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
              <h3 className="text-sm font-bold text-[#292522] dark:text-[#F5EFEB]">
                Browser Share
              </h3>
            </div>
            <div className="space-y-3">
              {data?.browsers?.map((b) => {
                const total = data.overview?.totalPageviews || 1;
                const pct = Math.round((b.count / total) * 100);
                return (
                  <div key={b.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-serif">
                      <span>{b.name}</span>
                      <span className="text-[#7D736A] dark:text-[#9E9389]">{pct}% ({b.count})</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#EDE4D8] dark:bg-[#1C1917] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#A8875A] dark:bg-[#C4A67B]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FEATURE 2.10: RECENT VISITOR SESSIONS FEED
        ───────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
                <h3 className="text-base font-bold text-[#292522] dark:text-[#F5EFEB]">
                  Recent Activity Stream (Non-Identifying Telemetry)
                </h3>
              </div>
              <p className="text-xs text-[#7D736A] dark:text-[#9E9389]">
                Live chronological session feed with device, geo, source, and duration.
              </p>
            </div>
            <span className="text-xs text-[#7D736A] font-serif">
              Showing latest {data?.recentVisits?.length || 0} hits
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-serif">
              <thead>
                <tr className="border-b border-[#DED3C5] dark:border-[#38332E] text-[#7D736A] dark:text-[#9E9389]">
                  <th className="pb-3 font-semibold">Time</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold">Source</th>
                  <th className="pb-3 font-semibold">Page Target</th>
                  <th className="pb-3 font-semibold">Client Platform</th>
                  <th className="pb-3 font-semibold">Duration</th>
                  <th className="pb-3 font-semibold text-right">Visitor Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DED3C5]/40 dark:divide-[#38332E]/60">
                {data?.recentVisits?.map((visit) => {
                  const visitDate = new Date(visit.timestamp);
                  const timeFormatted = visitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const dateFormatted = visitDate.toLocaleDateString([], { month: 'short', day: 'numeric' });

                  return (
                    <tr key={visit.id} className="hover:bg-[#EDE4D8]/30 dark:hover:bg-[#1C1917]/50 transition-colors">
                      <td className="py-3 text-[#292522] dark:text-[#F5EFEB] whitespace-nowrap">
                        <span className="font-mono">{dateFormatted}</span>
                        <span className="text-[11px] text-[#7D736A] dark:text-[#9E9389] ml-1.5">{timeFormatted}</span>
                      </td>
                      <td className="py-3 text-[#292522] dark:text-[#F5EFEB] whitespace-nowrap">
                        {visit.city && visit.city !== 'Unknown' ? `${visit.city}, ` : ''}{visit.country}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-[#EDE4D8] dark:bg-[#1C1917] text-[11px] font-semibold text-[#A8875A] dark:text-[#C4A67B] border border-[#DED3C5] dark:border-[#38332E]">
                          {visit.source}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-[11px] text-[#5F5750] dark:text-[#D1C8C0] max-w-[140px] truncate">
                        {visit.page}
                      </td>
                      <td className="py-3 text-[#5F5750] dark:text-[#D1C8C0] whitespace-nowrap">
                        {visit.device} • {visit.browser} on {visit.os}
                      </td>
                      <td className="py-3 font-mono text-[11px] text-[#7D736A] whitespace-nowrap">
                        {visit.duration > 0 ? `${visit.duration}s` : '< 5s'}
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            visit.isNew
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {visit.isNew ? 'New' : 'Returning'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
