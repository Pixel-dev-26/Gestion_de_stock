import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routePlugin = {
  name: 'instock-entry-routes',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const parsedUrl = new URL(req.url || '', 'http://localhost');
      const pathname = parsedUrl.pathname;

      if (pathname === '/' || pathname === '' || pathname === '/accueil.html') {
        const accueilPath = path.join(__dirname, 'public', 'accueil.html');
        try {
          if (fs.existsSync(accueilPath)) {
            let content = fs.readFileSync(accueilPath, 'utf-8');
            content = await server.transformIndexHtml(req.url, content);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(content);
            return;
          }
        } catch (err) {
          console.error('Error reading accueil.html:', err);
        }
      }

      if (pathname === '/connexion.html') {
        const connexionPath = path.join(__dirname, 'connexion.html');
        try {
          if (fs.existsSync(connexionPath)) {
            let content = fs.readFileSync(connexionPath, 'utf-8');
            content = await server.transformIndexHtml(req.url, content);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(content);
            return;
          }
        } catch (err) {
          console.error('Error reading connexion.html:', err);
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
            content = await server.transformIndexHtml(req.url, content);
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
};

export default defineConfig({
  base: './',
  appType: 'custom',
  publicDir: false,
  plugins: [react(), routePlugin],
  build: {
    outDir: path.resolve(__dirname, '../dist/instock-dashboard'),
    emptyOutDir: true,
    rollupOptions: {
      input: [
        path.resolve(__dirname, 'index.html'),
        path.resolve(__dirname, 'connexion.html'),
      ],
    },
  },
  server: {
    port: 5173,
    middlewareMode: false,
  },
});
