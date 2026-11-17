// Vercel Serverless Function: POST /api/auth/login
import { createToken, safeCompare } from '../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }
    // Accept email or username
    const identifier = (body.email || body.username || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    if (!identifier || !password) {
      return res.status(400).json({
        error: 'missing_fields',
        message: 'Admin email/username and password are required.'
      });
    }

    const configuredEmail = (process.env.ADMIN_EMAIL || 'krupabt83@gmail.com').trim().toLowerCase();
    const configuredUsername = (process.env.ADMIN_USERNAME || 'krupabt').trim().toLowerCase();
    const configuredPassword = (process.env.ADMIN_PASSWORD || 'Krupa123').trim();

    // Verify authorized owner account
    const isOwnerValid =
      identifier === configuredEmail ||
      identifier === configuredUsername ||
      identifier === 'admin';

    const isPassValid = safeCompare(password, configuredPassword);

    if (!isOwnerValid || !isPassValid) {
      return res.status(401).json({
        error: 'invalid_credentials',
        message: 'Invalid owner credentials. Access denied.'
      });
    }

    // Generate signed JWT session token
    const token = createToken({
      email: configuredEmail,
      username: configuredUsername,
      role: 'owner',
      iat: Math.floor(Date.now() / 1000)
    });

    const isProd = process.env.NODE_ENV === 'production';
    const cookieFlags = `Path=/; Max-Age=${7 * 24 * 3600}; SameSite=Lax${isProd ? '; Secure' : ''}`;

    res.setHeader('Set-Cookie', [
      `portfolio_admin_token=${token}; HttpOnly; ${cookieFlags}`,
      `portfolio_admin_logged_in=1; ${cookieFlags}`,
      `portfolio_owner_session=1; ${cookieFlags}`
    ]);

    return res.status(200).json({
      success: true,
      token,
      redirect: '/owner/visitors',
      user: {
        email: configuredEmail,
        username: configuredUsername,
        role: 'owner'
      }
    });
  } catch (err) {
    console.error('Owner Login Error:', err);
    return res.status(500).json({ error: 'server_error', message: 'Authentication service error.' });
  }
}
