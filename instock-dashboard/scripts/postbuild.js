import fs from 'fs';
import path from 'path';

const root = process.cwd();
const src = path.join(root, 'dist', 'instock-dashboard', 'dashboard.html');
const dest = path.join(root, 'dist', 'instock-dashboard', 'index.html');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('postbuild: copied dashboard.html -> index.html');
  } else {
    console.log('postbuild: source not found, skipping copy');
  }
} catch (err) {
  console.error('postbuild error:', err);
  process.exit(1);
}
