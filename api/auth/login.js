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
    const { username, password } = body || {};

    const configuredUsername = (process.env.ADMIN_USERNAME || 'krupabt').trim().toLowerCase();
    // Default password requested by user: Krupa123 (or custom from ADMIN_PASSWORD env var)
    const configuredPassword = (process.env.ADMIN_PASSWORD || 'Krupa123').trim();

    if (!username || !password) {
      return res.status(400).json({
        error: 'missing_fields',
        message: 'Username and password are required.'
      });
    }

    const inputUser = username.trim().toLowerCase();
    // Accept configured username or 'admin'
    const isUserValid = inputUser === configuredUsername || inputUser === 'admin';
    const isPassValid = safeCompare(password.trim(), configuredPassword);

    if (!isUserValid || !isPassValid) {
      return res.status(401).json({
        error: 'invalid_credentials',
        message: 'Incorrect username or password.'
      });
    }

    // Generate JWT signed token
    const token = createToken({
      username: configuredUsername,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000)
    });

    // Set secure HTTP-only cookie and exclusion cookie
    const isProd = process.env.NODE_ENV === 'production';
    const cookieFlags = `Path=/; Max-Age=${7 * 24 * 3600}; SameSite=Lax${isProd ? '; Secure' : ''}`;

    res.setHeader('Set-Cookie', [
      `portfolio_admin_token=${token}; HttpOnly; ${cookieFlags}`,
      `portfolio_admin_logged_in=1; ${cookieFlags}`
    ]);

    return res.status(200).json({
      success: true,
      token,
      user: {
        username: configuredUsername,
        role: 'admin'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'server_error', message: 'Internal server authentication error.' });
  }
}
