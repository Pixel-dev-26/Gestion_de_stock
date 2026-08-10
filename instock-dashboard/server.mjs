import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import url from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5173;

// Create HTTP server
const server = createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Route / to accueil.html
  if (pathname === '/') {
    serveFile(path.join(__dirname, 'public', 'accueil.html'), res);
    return;
  }

  // Route /instock-dashboard and SPA paths to the build entry
  if (
    pathname === '/instock-dashboard' ||
    pathname === '/instock-dashboard/' ||
    pathname === '/instock-dashboard/index.html' ||
    (pathname.startsWith('/instock-dashboard/') && !path.extname(pathname))
  ) {
    serveFile(path.join(__dirname, 'dist', 'instock-dashboard', 'index.html'), res);
    return;
  }

  // For /instock-dashboard/* asset requests, serve from dist folder
  if (pathname.startsWith('/instock-dashboard/')) {
    const relativePath = pathname.slice('/instock-dashboard/'.length);
    const filePath = path.join(__dirname, 'dist', 'instock-dashboard', relativePath);
    serveFile(filePath, res);
    return;
  }

  // For root-level assets (css, js, etc from dist)
  const distFile = path.join(__dirname, 'dist', pathname);
  if (fs.existsSync(distFile)) {
    serveFile(distFile, res);
    return;
  }

  // Try public folder
  const publicFile = path.join(__dirname, 'public', pathname);
  if (fs.existsSync(publicFile)) {
    serveFile(publicFile, res);
    return;
  }

  // If not found and it's not an asset, serve accueil.html for SPA routing
  if (!pathname.startsWith('/instock-dashboard') && 
      !['.js', '.css', '.json', '.png', '.jpg', '.gif', '.svg', '.ico', '.woff', '.woff2'].some(ext => pathname.endsWith(ext))) {
    serveFile(path.join(__dirname, 'public', 'accueil.html'), res);
    return;
  }

  // 404 for everything else
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

function serveFile(filePath, res) {
  // Prevent directory traversal
  const normalizedPath = path.normalize(filePath);
  const distDir = path.normalize(path.join(__dirname, 'dist'));
  const publicDir = path.normalize(path.join(__dirname, 'public'));
  const indexFile = path.normalize(path.join(__dirname, 'index.html'));

  if (!normalizedPath.startsWith(distDir) && 
      !normalizedPath.startsWith(publicDir) &&
      normalizedPath !== indexFile) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      serveFile(indexPath, res);
      return;
    }

    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.mjs': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

server.listen(PORT, () => {
  console.log(`Dev server listening on http://localhost:${PORT}/`);
});




