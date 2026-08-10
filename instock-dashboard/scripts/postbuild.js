import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..', '..');
const accueilSrc = path.join(root, 'accueil.html');
const accueilDest = path.join(root, 'dist', 'index.html');
const accueilCopy = path.join(root, 'dist', 'accueil.html');

if (!fs.existsSync(path.join(root, 'dist'))) {
  fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
}

function copyFile(src, dest, label) {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`postbuild: copied ${label}`);
    } else {
      console.log(`postbuild: source not found (${label}), skipping copy`);
    }
  } catch (err) {
    console.error(`postbuild error (${label}):`, err);
    process.exit(1);
  }
}

copyFile(accueilSrc, accueilDest, 'accueil.html -> index.html');
copyFile(accueilSrc, accueilCopy, 'accueil.html -> accueil.html');
