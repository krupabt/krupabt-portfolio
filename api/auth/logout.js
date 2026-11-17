// Vercel Serverless Function: POST /api/auth/logout
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Clear cookies
  res.setHeader('Set-Cookie', [
    'portfolio_admin_token=; Path=/; Max-Age=0; HttpOnly',
    'portfolio_admin_logged_in=; Path=/; Max-Age=0'
  ]);

  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
}
