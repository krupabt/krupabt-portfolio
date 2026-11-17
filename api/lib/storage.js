// Analytics Storage Adapter for Portfolio Tracking (Real visits only)
import fs from 'fs';
import path from 'path';

// In-Memory & File persistence store
let memoryStore = null;
let contactInquiriesStore = null;

const TMP_FILE = path.join(
  process.env.TMPDIR || process.env.TEMP || '/tmp',
  'portfolio_analytics_data.json'
);

const TMP_INQUIRIES_FILE = path.join(
  process.env.TMPDIR || process.env.TEMP || '/tmp',
  'portfolio_contact_inquiries.json'
);

function loadLocalVisits() {
  if (memoryStore) return memoryStore;

  try {
    if (fs.existsSync(TMP_FILE)) {
      const content = fs.readFileSync(TMP_FILE, 'utf8');
      memoryStore = JSON.parse(content);
      if (Array.isArray(memoryStore)) return memoryStore;
    }
  } catch (err) {
    // Fall back to empty array
  }

  // Real visitor data only - no fake seed data
  memoryStore = [];
  return memoryStore;
}

function saveLocalVisits(data) {
  memoryStore = data;
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(data.slice(0, 3000)), 'utf8');
  } catch (err) {
    // Ignore tmp write failures in serverless environments
  }
}

function loadLocalInquiries() {
  if (contactInquiriesStore) return contactInquiriesStore;
  try {
    if (fs.existsSync(TMP_INQUIRIES_FILE)) {
      const content = fs.readFileSync(TMP_INQUIRIES_FILE, 'utf8');
      contactInquiriesStore = JSON.parse(content);
      if (Array.isArray(contactInquiriesStore)) return contactInquiriesStore;
    }
  } catch (e) {}
  contactInquiriesStore = [];
  return contactInquiriesStore;
}

function saveLocalInquiries(data) {
  contactInquiriesStore = data;
  try {
    fs.writeFileSync(TMP_INQUIRIES_FILE, JSON.stringify(data.slice(0, 500)), 'utf8');
  } catch (e) {}
}

// Supabase REST client
async function saveToSupabase(visit) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return false;

  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/portfolio_visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        visitor_hash: visit.visitorHash,
        session_id: visit.sessionId,
        is_new_visitor: visit.isNewVisitor,
        page: visit.page,
        page_title: visit.pageTitle || visit.page,
        referrer: visit.referrer || '',
        source: visit.source || 'Direct',
        country: visit.country || 'Unknown',
        region: visit.region || '',
        city: visit.city || '',
        device: visit.device || 'Laptop',
        browser: visit.browser || 'Other',
        os: visit.os || 'Other',
        screen_resolution: visit.screenResolution || '',
        duration_seconds: visit.durationSeconds || 0,
        visitor_name: visit.visitorName || null,
        visitor_email: visit.visitorEmail || null,
        visitor_company: visit.visitorCompany || null,
        created_at: visit.createdAt || new Date().toISOString()
      })
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

async function getFromSupabase(sinceDate) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    let query = `${url.replace(/\/$/, '')}/rest/v1/portfolio_visits?select=*&order=created_at.desc&limit=3000`;
    if (sinceDate) {
      query += `&created_at=gte.${encodeURIComponent(sinceDate.toISOString())}`;
    }

    const res = await fetch(query, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.map((d) => ({
      id: d.id,
      visitorHash: d.visitor_hash,
      sessionId: d.session_id,
      isNewVisitor: d.is_new_visitor,
      page: d.page,
      pageTitle: d.page_title || d.page,
      referrer: d.referrer,
      source: d.source,
      country: d.country,
      region: d.region,
      city: d.city,
      device: d.device,
      browser: d.browser,
      os: d.os,
      screenResolution: d.screen_resolution,
      durationSeconds: d.duration_seconds,
      visitorName: d.visitor_name,
      visitorEmail: d.visitor_email,
      visitorCompany: d.visitor_company,
      createdAt: d.created_at
    }));
  } catch (err) {
    return null;
  }
}

// Record Voluntary Contact Inquiry (with explicit user consent)
export async function recordContactInquiry(inquiry) {
  const inquiries = loadLocalInquiries();
  inquiries.unshift({
    id: `inq_${Date.now()}`,
    name: inquiry.name,
    email: inquiry.email,
    company: inquiry.company || '',
    message: inquiry.message || '',
    sessionId: inquiry.sessionId,
    visitorHash: inquiry.visitorHash,
    createdAt: new Date().toISOString()
  });
  saveLocalInquiries(inquiries);

  // Link to existing visit records if present
  const visits = loadLocalVisits();
  for (const v of visits) {
    if (v.sessionId === inquiry.sessionId || v.visitorHash === inquiry.visitorHash) {
      v.visitorName = inquiry.name;
      v.visitorEmail = inquiry.email;
      v.visitorCompany = inquiry.company || '';
    }
  }
  saveLocalVisits(visits);
  return true;
}

// Public API to record real visit
export async function recordVisit(visit) {
  // Check if voluntary contact exists for this session
  const inquiries = loadLocalInquiries();
  const match = inquiries.find((q) => q.sessionId === visit.sessionId || q.visitorHash === visit.visitorHash);
  if (match) {
    visit.visitorName = match.name;
    visit.visitorEmail = match.email;
    visit.visitorCompany = match.company;
  }

  // Save to Supabase if configured
  await saveToSupabase(visit);

  // Save to local / serverless store
  const list = loadLocalVisits();
  list.unshift(visit);
  if (list.length > 3000) list.pop();
  saveLocalVisits(list);

  return true;
}

export async function getAnalyticsData(timeRange = 'all') {
  const now = new Date();
  let since = null;
  if (timeRange === '24h' || timeRange === 'today') {
    since = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (timeRange === '7d' || timeRange === 'week') {
    since = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  } else if (timeRange === '30d' || timeRange === 'month') {
    since = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
  }

  // Try Supabase first, fallback to local store
  let visits = await getFromSupabase(since);
  if (!visits) {
    visits = loadLocalVisits();
  }

  // Filter by time range if set
  const filtered = since ? visits.filter((v) => new Date(v.createdAt) >= since) : visits;

  // Aggregate Metrics
  const uniqueVisitors = new Set();
  const todayVisitors = new Set();
  const weekVisitors = new Set();
  const monthVisitors = new Set();
  const activeVisitors = new Set();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfWeek = now.getTime() - 7 * 24 * 3600 * 1000;
  const startOfMonth = now.getTime() - 30 * 24 * 3600 * 1000;
  const activeThreshold = now.getTime() - 15 * 60 * 1000; // active in last 15 min

  const countryCounts = {};
  const cityCounts = {};
  const deviceCounts = {};
  const browserCounts = {};
  const pageCounts = {};
  const sourceCounts = {};
  const dailyTimelineMap = {};

  for (const v of filtered) {
    const vTime = new Date(v.createdAt).getTime();
    uniqueVisitors.add(v.visitorHash);

    if (vTime >= startOfToday) todayVisitors.add(v.visitorHash);
    if (vTime >= startOfWeek) weekVisitors.add(v.visitorHash);
    if (vTime >= startOfMonth) monthVisitors.add(v.visitorHash);
    if (vTime >= activeThreshold) activeVisitors.add(v.visitorHash);

    const c = v.country || 'Unknown';
    countryCounts[c] = (countryCounts[c] || 0) + 1;

    if (v.city && v.city !== 'Unknown') {
      const cityKey = `${v.city}, ${v.country || ''}`;
      cityCounts[cityKey] = (cityCounts[cityKey] || 0) + 1;
    }

    const dev = v.device || 'Laptop';
    deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;

    const b = v.browser || 'Other';
    browserCounts[b] = (browserCounts[b] || 0) + 1;

    const p = v.pageTitle || v.page || 'Home';
    pageCounts[p] = (pageCounts[p] || 0) + 1;

    const s = v.source || 'Direct';
    sourceCounts[s] = (sourceCounts[s] || 0) + 1;

    const dateKey = new Date(v.createdAt).toISOString().split('T')[0];
    if (!dailyTimelineMap[dateKey]) {
      dailyTimelineMap[dateKey] = { date: dateKey, visitors: new Set(), pageviews: 0 };
    }
    dailyTimelineMap[dateKey].visitors.add(v.visitorHash);
    dailyTimelineMap[dateKey].pageviews++;
  }

  const timeline = Object.keys(dailyTimelineMap)
    .sort()
    .map((k) => ({
      date: k,
      visitors: dailyTimelineMap[k].visitors.size,
      pageviews: dailyTimelineMap[k].pageviews
    }));

  const formatTop = (obj, limit = 8) =>
    Object.entries(obj)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

  return {
    overview: {
      totalVisitors: uniqueVisitors.size,
      totalPageviews: filtered.length,
      visitorsToday: todayVisitors.size,
      visitorsThisWeek: weekVisitors.size,
      visitorsThisMonth: monthVisitors.size,
      activeVisitors: activeVisitors.size,
      databaseType: process.env.SUPABASE_URL ? 'Supabase (PostgreSQL)' : 'Integrated Real-Time Tracking Engine'
    },
    timeline,
    countries: formatTop(countryCounts, 10),
    cities: formatTop(cityCounts, 10),
    devices: formatTop(deviceCounts, 5),
    browsers: formatTop(browserCounts, 6),
    topPages: formatTop(pageCounts, 8),
    trafficSources: formatTop(sourceCounts, 7),
    // Table of recent visits
    recentVisits: filtered.slice(0, 100).map((v) => ({
      id: v.id,
      timestamp: v.createdAt,
      country: v.country || 'Unknown',
      region: v.region || '',
      city: v.city || 'Unknown',
      page: v.page || '/',
      pageTitle: v.pageTitle || formatPageTitle(v.page),
      source: v.source || 'Direct',
      device: v.device || 'Laptop',
      browser: v.browser || 'Other',
      os: v.os || 'Other',
      isNew: v.isNewVisitor ?? true,
      duration: v.durationSeconds || 0,
      visitorName: v.visitorName || null,
      visitorEmail: v.visitorEmail || null,
      visitorCompany: v.visitorCompany || null
    }))
  };
}

// Friendly page title helper
export function formatPageTitle(url = '/') {
  if (!url || url === '/') return 'Home';
  if (url.includes('#projects') || url.startsWith('/work')) return 'Projects';
  if (url.includes('#opensource')) return 'Open Source';
  if (url.includes('#about') || url.startsWith('/about')) return 'About';
  if (url.includes('#certifications')) return 'Certifications';
  if (url.includes('#experience')) return 'Experience';
  if (url.includes('#contact') || url.startsWith('/contact')) return 'Contact';
  return url;
}
