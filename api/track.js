// Vercel Serverless Function: POST /api/track
import crypto from 'crypto';
import { recordVisit } from './lib/storage.js';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Check Do Not Track (DNT) header
    const dnt = req.headers['dnt'] || req.headers['x-do-not-track'];
    if (dnt === '1') {
      return res.status(200).json({ ok: true, ignored: 'dnt' });
    }

    // 2. Check Admin Exclude Cookie
    const cookieHeader = req.headers['cookie'] || '';
    if (cookieHeader.includes('portfolio_admin_logged_in=1') || cookieHeader.includes('portfolio_admin_token=')) {
      return res.status(200).json({ ok: true, ignored: 'admin_session' });
    }

    // Parse Body
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    body = body || {};

    // Do not track admin routes
    if (body.page && body.page.startsWith('/admin')) {
      return res.status(200).json({ ok: true, ignored: 'admin_route' });
    }

    // 3. Privacy-preserving IP hashing (SHA-256 with rotating daily salt)
    const rawIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1').split(',')[0].trim();
    const todaySalt = new Date().toISOString().slice(0, 10);
    const visitorHash = body.visitorId || crypto
      .createHash('sha256')
      .update(`${rawIp}_${todaySalt}_antigravity_salt`)
      .digest('hex')
      .slice(0, 16);

    // 4. Vercel Geo Detection
    let country = req.headers['x-vercel-ip-country'] || body.country || 'Unknown';
    let region = req.headers['x-vercel-ip-country-region'] || body.region || '';
    let city = 'Unknown';

    if (req.headers['x-vercel-ip-city']) {
      try {
        city = decodeURIComponent(req.headers['x-vercel-ip-city']);
      } catch (e) {
        city = req.headers['x-vercel-ip-city'];
      }
    } else if (body.city) {
      city = body.city;
    }

    // If on localhost or missing country, deduce from timezone if provided
    if ((country === 'Unknown' || country === 'XX') && body.timezone) {
      if (body.timezone.includes('Calcutta') || body.timezone.includes('Kolkata')) {
        country = 'IN';
        if (city === 'Unknown') city = 'Bengaluru';
      } else if (body.timezone.includes('New_York')) {
        country = 'US';
        if (city === 'Unknown') city = 'New York';
      } else if (body.timezone.includes('Los_Angeles')) {
        country = 'US';
        if (city === 'Unknown') city = 'Los Angeles';
      } else if (body.timezone.includes('London')) {
        country = 'GB';
        if (city === 'Unknown') city = 'London';
      }
    }

    // 5. Parse User-Agent
    const userAgent = req.headers['user-agent'] || '';
    let device = body.device || 'Desktop';
    let browser = body.browser || 'Other';
    let os = body.os || 'Other';

    if (!body.device || !body.browser || !body.os) {
      // Device
      if (/tablet|ipad/i.test(userAgent)) device = 'Tablet';
      else if (/mobile|iphone|android/i.test(userAgent)) device = 'Mobile';
      else device = 'Desktop';

      // Browser
      if (/edg/i.test(userAgent)) browser = 'Edge';
      else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome';
      else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';
      else if (/safari/i.test(userAgent)) browser = 'Safari';
      else if (/opr\//i.test(userAgent)) browser = 'Opera';

      // OS
      if (/windows/i.test(userAgent)) os = 'Windows';
      else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
      else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
      else if (/android/i.test(userAgent)) os = 'Android';
      else if (/linux/i.test(userAgent)) os = 'Linux';
    }

    // 6. Source categorization
    let source = body.source;
    if (!source) {
      const ref = (body.referrer || req.headers['referer'] || '').toLowerCase();
      if (!ref || ref.includes('localhost') || ref.includes('krupabt.vercel.app')) source = 'Direct';
      else if (ref.includes('linkedin.com')) source = 'LinkedIn';
      else if (ref.includes('github.com')) source = 'GitHub';
      else if (ref.includes('google.')) source = 'Google';
      else if (ref.includes('twitter.com') || ref.includes('t.co') || ref.includes('x.com')) source = 'X (Twitter)';
      else if (ref.includes('instagram.com')) source = 'Instagram';
      else if (ref.includes('youtube.com')) source = 'YouTube';
      else {
        try {
          source = new URL(ref).hostname.replace('www.', '');
        } catch (e) {
          source = 'Direct';
        }
      }
    }

    // 7. Save Visit Record
    const visitRecord = {
      id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      visitorHash,
      sessionId: body.sessionId || `s_${Date.now()}`,
      isNewVisitor: body.isNewVisitor ?? true,
      page: body.page || '/',
      referrer: body.referrer || '',
      source,
      country,
      region,
      city,
      device,
      browser,
      os,
      screenResolution: body.screenResolution || '',
      durationSeconds: Math.min(1800, Math.max(0, parseInt(body.duration || 0, 10))),
      createdAt: new Date().toISOString()
    };

    await recordVisit(visitRecord);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Tracking endpoint error:', err);
    return res.status(200).json({ ok: false, error: 'Internal tracking error' });
  }
}
