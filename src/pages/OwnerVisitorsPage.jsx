import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Activity,
  Calendar,
  RefreshCw,
  LogOut,
  Shield,
  Smartphone,
  Laptop,
  Globe,
  Compass,
  ArrowUpRight,
  Sun,
  Moon,
  CheckCircle2,
  Filter,
  UserCheck,
  Briefcase,
  Building,
  Mail,
  ExternalLink,
  MessageSquare,
  Lock,
  Layers
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { LinkedinIcon } from '../components/Icons';

export default function OwnerVisitorsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterDate, setFilterDate] = useState('all'); // 'all', 'today', 'week', 'month'
  const [customDate, setCustomDate] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'recruiters'
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const fetchVisitors = async (range = filterDate, isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

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
        sessionStorage.removeItem('portfolio_admin_token');
        localStorage.removeItem('portfolio_admin_logged_in');
        navigate('/owner-login?redirect=/owner/visitors', { replace: true });
        return;
      }

      if (!res.ok) throw new Error('Failed to load visitor data');

      const json = await res.json();
      if (json.analytics) {
        setData(json.analytics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVisitors(filterDate);
  }, [filterDate]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {}
    sessionStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_logged_in');
    navigate('/owner-login', { replace: true });
  };

  // Filter visits based on date selection
  const displayedVisits = (data?.recentVisits || []).filter((visit) => {
    if (customDate) {
      return visit.timestamp.startsWith(customDate);
    }
    return true;
  });

  const recruiterVisits = (data?.recruiterInterest?.recruiterVisits || []).filter((v) => {
    if (customDate) {
      return v.timestamp.startsWith(customDate);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F3ED] dark:bg-[#141210] text-[#292522] dark:text-[#F5EFEB] transition-colors duration-300 font-sans">
      {/* ─────────────────────────────────────────────────────────────
          TOP BAR
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FFFCF7]/90 dark:bg-[#141210]/90 backdrop-blur-xl border-b border-[#DED3C5] dark:border-[#38332E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] flex items-center justify-center text-[#A8875A] dark:text-[#C4A67B]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                  Owner Visitor Tracking
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
              <span className="text-[11px] text-[#7D736A] dark:text-[#9E9389]">
                Private Owner Portal • Krupa B T
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Refresh Button */}
            <button
              onClick={() => fetchVisitors(filterDate, true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif font-semibold text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors cursor-pointer"
              title="Refresh Visitor Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#A8875A]' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-[#5F5750] dark:text-[#D1C8C0] hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EDE4D8] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif font-bold text-[#7D736A] dark:text-[#9E9389] hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Navigation Tabs (All Visitors vs Recruiter Interest) */}
        <div className="flex items-center gap-3 border-b border-[#DED3C5] dark:border-[#38332E] pb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#292522] dark:bg-[#C4A67B] text-[#F7F3ED] dark:text-[#141210] shadow-sm'
                : 'text-[#7D736A] dark:text-[#9E9389] hover:text-[#292522] dark:hover:text-[#F5EFEB]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>All Portfolio Visitors</span>
          </button>

          <button
            onClick={() => setActiveTab('recruiters')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all duration-200 cursor-pointer relative ${
              activeTab === 'recruiters'
                ? 'bg-[#292522] dark:bg-[#C4A67B] text-[#F7F3ED] dark:text-[#141210] shadow-sm'
                : 'text-[#7D736A] dark:text-[#9E9389] hover:text-[#292522] dark:hover:text-[#F5EFEB]'
            }`}
          >
            <Briefcase className="w-4 h-4 text-blue-500" />
            <span>Recruiter Interest</span>
            {data?.recruiterInterest?.totalLinkedInVisits > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500 text-white font-mono">
                {data.recruiterInterest.totalLinkedInVisits}
              </span>
            )}
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: VISITOR OVERVIEW (4 TILES)
        ───────────────────────────────────────────────────────────── */}
        <div>
          <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-[#A8875A] dark:text-[#C4A67B] mb-3">
            Visitor Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* 1. Total Visitors */}
            <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-serif font-semibold text-[#7D736A] dark:text-[#9E9389]">
                  Total Visitors
                </span>
                <Users className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : data?.overview?.totalVisitors || 0}
              </div>
              <p className="mt-1 text-[11px] text-[#7D736A] dark:text-[#9E9389] font-serif">
                {data?.overview?.returningVisitors > 0
                  ? `${data.overview.returningVisitors} returning visits`
                  : 'Total unique visitors'}
              </p>
            </div>

            {/* 2. Today's Visitors */}
            <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-serif font-semibold text-[#7D736A] dark:text-[#9E9389]">
                  Today's Visitors
                </span>
                <Calendar className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : data?.overview?.visitorsToday || 0}
              </div>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-serif">
                Active today
              </p>
            </div>

            {/* 3. This Week's Visitors */}
            <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-serif font-semibold text-[#7D736A] dark:text-[#9E9389]">
                  This Week's Visitors
                </span>
                <Calendar className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B]" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                {loading ? '—' : data?.overview?.visitorsThisWeek || 0}
              </div>
              <p className="mt-1 text-[11px] text-[#7D736A] dark:text-[#9E9389] font-serif">
                Past 7 days
              </p>
            </div>

            {/* 4. Currently Active Visitors */}
            <div className="p-6 rounded-[22px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-serif font-semibold text-[#7D736A] dark:text-[#9E9389]">
                  Currently Active
                </span>
                <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                {loading ? '—' : data?.overview?.activeVisitors || 0}
              </div>
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-serif">
                Estimated in last 15 min
              </p>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 5: RECRUITER INTEREST (WHEN RECRUITERS TAB SELECTED)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'recruiters' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Recruiter Summary Card */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#292522] dark:text-[#F5EFEB]">
                    LinkedIn & Recruiter Interest Overview
                  </h3>
                  <p className="text-xs text-[#7D736A] dark:text-[#9E9389]">
                    Visits originating from LinkedIn and voluntary hiring inquiries.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E]">
                  <span className="text-xs font-serif text-[#7D736A] dark:text-[#9E9389] block">
                    Total LinkedIn Visits
                  </span>
                  <span className="text-2xl font-bold text-[#292522] dark:text-[#F5EFEB] mt-1 block">
                    {data?.recruiterInterest?.totalLinkedInVisits || 0}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E]">
                  <span className="text-xs font-serif text-[#7D736A] dark:text-[#9E9389] block">
                    Voluntary Contact Submissions
                  </span>
                  <span className="text-2xl font-bold text-[#292522] dark:text-[#F5EFEB] mt-1 block">
                    {data?.recruiterInterest?.voluntaryInquiries?.length || 0}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#EDE4D8]/50 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E]">
                  <span className="text-xs font-serif text-[#7D736A] dark:text-[#9E9389] block">
                    Top Projects Evaluated
                  </span>
                  <span className="text-xs font-bold text-[#A8875A] dark:text-[#C4A67B] mt-1 block truncate">
                    {data?.recruiterInterest?.topRecruiterPages?.[0]?.name || 'Projects Section'}
                  </span>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-6 p-3.5 rounded-xl bg-[#EDE4D8]/30 dark:bg-[#1C1917]/60 border border-[#DED3C5] dark:border-[#38332E] text-xs text-[#7D736A] dark:text-[#9E9389] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#A8875A] dark:text-[#C4A67B] flex-shrink-0" />
                <span>
                  Privacy guarantee: Anonymous LinkedIn visitors are presented using non-identifying telemetry (Location, Device, Timestamp). Visitor real names and employer identities are only displayed if they voluntarily provide them with consent.
                </span>
              </div>
            </div>

            {/* Voluntary Recruiter Contact Submissions */}
            {data?.recruiterInterest?.voluntaryInquiries?.length > 0 && (
              <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm">
                <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[#A8875A] dark:text-[#C4A67B] mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Voluntary Inquiries from Recruiters & Companies</span>
                </h3>

                <div className="space-y-3">
                  {data.recruiterInterest.voluntaryInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-[#EDE4D8]/40 dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 font-bold text-sm text-[#292522] dark:text-[#F5EFEB]">
                          <span>{inq.name}</span>
                          {inq.company && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              {inq.company}
                            </span>
                          )}
                        </div>
                        <div className="text-[#5F5750] dark:text-[#D1C8C0] mt-1">
                          {inq.message || 'Expressed hiring interest in full-stack / AI engineering.'}
                        </div>
                      </div>

                      <a
                        href={`mailto:${inq.email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292522] dark:bg-[#C4A67B] text-[#F7F3ED] dark:text-[#141210] font-bold text-[11px] self-start sm:self-auto"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email {inq.name.split(' ')[0]}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: RECENT VISITOR DETAILS (REQUESTED TABLE)
        ───────────────────────────────────────────────────────────── */}
        <div className="p-6 sm:p-8 rounded-[24px] bg-[#FFFCF7] dark:bg-[#24201D] border border-[#DED3C5] dark:border-[#38332E] shadow-sm space-y-6">
          
          {/* Header & Date Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#292522] dark:text-[#F5EFEB]">
                {activeTab === 'recruiters' ? 'LinkedIn Recruiter Visits' : 'Recent Visitor Details'}
              </h2>
              <p className="text-xs text-[#7D736A] dark:text-[#9E9389] mt-0.5">
                {activeTab === 'recruiters'
                  ? 'Visits arriving directly from LinkedIn referrals.'
                  : 'Live tracked visits across all referral channels.'}
              </p>
            </div>

            {/* Date Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center p-1 rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-xs font-serif font-semibold">
                {[
                  { id: 'all', label: 'All Dates' },
                  { id: 'today', label: 'Today' },
                  { id: 'week', label: '7 Days' },
                  { id: 'month', label: '30 Days' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setFilterDate(f.id);
                      setCustomDate('');
                    }}
                    className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                      filterDate === f.id && !customDate
                        ? 'bg-[#FFFCF7] dark:bg-[#24201D] text-[#A8875A] dark:text-[#C4A67B] shadow-xs'
                        : 'text-[#7D736A] dark:text-[#9E9389]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Specific Date Filter Input */}
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-xl bg-[#EDE4D8] dark:bg-[#1C1917] border border-[#DED3C5] dark:border-[#38332E] text-[#292522] dark:text-[#F5EFEB] focus:outline-none focus:border-[#A8875A]"
                title="Filter by specific date"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-serif">
              <thead>
                <tr className="border-b border-[#DED3C5] dark:border-[#38332E] text-[#7D736A] dark:text-[#9E9389]">
                  <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px]">Visit Time</th>
                  <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px]">Location</th>
                  <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px]">Device</th>
                  <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px]">Source</th>
                  <th className="py-3 px-3 font-bold uppercase tracking-wider text-[11px]">Page Viewed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DED3C5]/40 dark:divide-[#38332E]/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-[#7D736A]">
                      Loading real visitor data...
                    </td>
                  </tr>
                ) : (activeTab === 'recruiters' ? recruiterVisits : displayedVisits).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-[#7D736A] leading-relaxed">
                      {activeTab === 'recruiters'
                        ? 'No LinkedIn recruiter visits recorded for this timeframe yet.'
                        : 'No visits recorded yet for this date selection.'}
                      <span className="block text-[11px] text-[#9E9389] mt-1">
                        When someone opens your portfolio, their session will appear here live.
                      </span>
                    </td>
                  </tr>
                ) : (
                  (activeTab === 'recruiters' ? recruiterVisits : displayedVisits).map((visit) => {
                    const visitDate = new Date(visit.timestamp);
                    const timeStr = visitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const dateStr = visitDate.toLocaleDateString([], { month: 'short', day: 'numeric' });

                    const locationText =
                      visit.city && visit.city !== 'Unknown'
                        ? visit.city
                        : visit.country && visit.country !== 'Unknown'
                        ? visit.country
                        : 'Unknown';

                    const isVoluntaryIdentified = Boolean(visit.visitorName || visit.visitorEmail);

                    return (
                      <tr
                        key={visit.id}
                        className="hover:bg-[#EDE4D8]/30 dark:hover:bg-[#1C1917]/50 transition-colors"
                      >
                        {/* Visit Time */}
                        <td className="py-3.5 px-3 whitespace-nowrap text-[#292522] dark:text-[#F5EFEB]">
                          <span className="font-semibold">{timeStr}</span>
                          <span className="text-[11px] text-[#7D736A] dark:text-[#9E9389] block">
                            {dateStr}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-3 whitespace-nowrap text-[#292522] dark:text-[#F5EFEB]">
                          <div className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                            <span className="font-medium">{locationText}</span>
                          </div>
                          {visit.region && visit.region !== visit.city && (
                            <span className="text-[10px] text-[#7D736A] dark:text-[#9E9389] block pl-5">
                              {visit.region}, {visit.country}
                            </span>
                          )}
                        </td>

                        {/* Device */}
                        <td className="py-3.5 px-3 whitespace-nowrap text-[#292522] dark:text-[#F5EFEB]">
                          <div className="flex items-center gap-1.5">
                            {visit.device === 'Mobile' ? (
                              <Smartphone className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                            ) : (
                              <Laptop className="w-3.5 h-3.5 text-[#A8875A] dark:text-[#C4A67B]" />
                            )}
                            <span className="font-medium">{visit.device || 'Laptop'}</span>
                          </div>
                          <span className="text-[10px] text-[#7D736A] dark:text-[#9E9389] block pl-5">
                            {visit.browser}
                          </span>
                        </td>

                        {/* Source */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium border ${
                              (visit.source || '').toLowerCase().includes('linkedin')
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-bold'
                                : 'bg-[#EDE4D8] dark:bg-[#1C1917] border-[#DED3C5] dark:border-[#38332E] text-[#A8875A] dark:text-[#C4A67B]'
                            }`}
                          >
                            {visit.source || 'Direct Link'}
                          </span>
                        </td>

                        {/* Page Viewed */}
                        <td className="py-3.5 px-3 whitespace-nowrap text-[#292522] dark:text-[#F5EFEB]">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{visit.pageTitle || 'Home'}</span>
                            {isVoluntaryIdentified && (
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                title={`Identified with consent: ${visit.visitorName} (${visit.visitorEmail})`}
                              >
                                <UserCheck className="w-3 h-3" />
                                {visit.visitorName}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-[#7D736A] dark:text-[#9E9389] block">
                            {visit.page}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-[#DED3C5]/60 dark:border-[#38332E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7D736A] dark:text-[#9E9389]">
            <span>
              Real visitor records • IP anonymized with SHA-256 • Privacy-conscious
            </span>
            <a
              href="/"
              className="mt-2 sm:mt-0 hover:text-[#A8875A] dark:hover:text-[#C4A67B] transition-colors"
            >
              &larr; View Public Portfolio
            </a>
          </div>

        </div>

      </main>
    </div>
  );
}
