// Vercel Serverless Function: GET /api/analytics
import { extractToken, verifyToken } from './lib/auth.js';
import { getAnalyticsData } from './lib/storage.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. Strict Server-Side Authorization Check
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({
        error: 'unauthorized',
        message: 'Access denied: Admin authentication required.'
      });
    }

    const payload = verifyToken(token);
    if (!payload || (payload.role !== 'admin' && payload.role !== 'owner')) {
      return res.status(401).json({
        error: 'unauthorized',
        message: 'Invalid or expired owner session token.'
      });
    }

    // 2. Query Time Range
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const timeRange = url.searchParams.get('range') || '30d';

    // 3. Compute Analytics from Storage
    const analytics = await getAnalyticsData(timeRange);

    return res.status(200).json({
      success: true,
      timeRange,
      analytics
    });
  } catch (err) {
    console.error('Analytics API error:', err);
    return res.status(500).json({
      error: 'server_error',
      message: 'Failed to aggregate analytics data.'
    });
  }
}
