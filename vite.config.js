import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Local Dev Middleware for /api/* routes during `npm run dev`
function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        // Parse query params and clean url path
        const parsedUrl = new URL(req.url, 'http://localhost');
        const pathname = parsedUrl.pathname;

        // Collect body if POST/PUT
        let body = {};
        if (req.method === 'POST' || req.method === 'PUT') {
          const chunks = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          const raw = Buffer.concat(chunks).toString('utf8');
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch (e) {
            body = {};
          }
        }

        // Mock express/vercel res helpers
        res.status = function (code) {
          res.statusCode = code;
          return res;
        };
        res.json = function (data) {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };

        // Attach body
        req.body = body;

        try {
          if (pathname === '/api/track') {
            const { default: handler } = await import('./api/track.js');
            return await handler(req, res);
          }
          if (pathname === '/api/auth/login') {
            const { default: handler } = await import('./api/auth/login.js');
            return await handler(req, res);
          }
          if (pathname === '/api/auth/verify') {
            const { default: handler } = await import('./api/auth/verify.js');
            return await handler(req, res);
          }
          if (pathname === '/api/auth/logout') {
            const { default: handler } = await import('./api/auth/logout.js');
            return await handler(req, res);
          }
          if (pathname === '/api/analytics') {
            const { default: handler } = await import('./api/analytics.js');
            return await handler(req, res);
          }
        } catch (err) {
          console.error('Local dev API error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: err.message }));
        }

        return next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 3000,
    open: true
  }
});
