import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/instock-dashboard/',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../dist/instock-dashboard'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    middlewareMode: false,
  },
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const parsedUrl = new URL(req.url || '', 'http://localhost');
      const pathname = parsedUrl.pathname;

      if (pathname === '/' || pathname === '' || pathname === '/accueil.html') {
        const accueilPath = path.join(__dirname, 'public', 'accueil.html');
        try {
          if (fs.existsSync(accueilPath)) {
            let content = fs.readFileSync(accueilPath, 'utf-8');
            try {
              content = await server.transformIndexHtml(req.url, content);
            } catch (e) {
              // fallback to raw content
            }
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(content);
            return;
          }
        } catch (err) {
          console.error('Error reading accueil.html:', err);
        }
      }

      const isDashboardRoute =
        pathname === '/instock-dashboard' ||
        pathname === '/instock-dashboard/' ||
        pathname === '/instock-dashboard/index.html' ||
        (pathname.startsWith('/instock-dashboard/') && path.extname(pathname) === '');

      if (isDashboardRoute) {
        const dashboardPath = path.join(__dirname, 'public', 'instock-dashboard', 'dashboard.html');
        try {
          if (fs.existsSync(dashboardPath)) {
            let content = fs.readFileSync(dashboardPath, 'utf-8');
            try {
              content = await server.transformIndexHtml(req.url, content);
            } catch (e) {
              // fallback to raw content
            }
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(content);
            return;
          }
        } catch (err) {
          console.error('Error reading dashboard.html:', err);
        }
      }

      next();
    });
  },
});
