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

    const configuredUsername = (process.env.ADMIN_USERNAME || 'krupabt').trim();
    const configuredPassword = process.env.ADMIN_PASSWORD;

    // Check if admin password is set in server environment
    if (!configuredPassword) {
      return res.status(401).json({
        error: 'admin_password_not_configured',
        message: 'ADMIN_PASSWORD is not configured in server environment variables. Please set ADMIN_PASSWORD in .env or your Vercel Project Settings.'
      });
    }

    if (!username || !password) {
      return res.status(400).json({
        error: 'missing_fields',
        message: 'Username and password are required.'
      });
    }

    // Verify username & password safely
    const isUserValid = safeCompare(username.trim().toLowerCase(), configuredUsername.toLowerCase());
    const isPassValid = safeCompare(password.trim(), configuredPassword.trim());

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
