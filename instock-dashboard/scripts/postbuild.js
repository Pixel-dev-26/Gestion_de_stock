import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const accueilSrc = path.join(root, 'public', 'accueil.html');
const accueilDest = path.join(root, '../dist', 'index.html');
const accueilCopy = path.join(root, '../dist', 'accueil.html');
const connexionSrc = path.join(root, '../dist/instock-dashboard', 'connexion.html');
const connexionDest = path.join(root, '../dist', 'connexion.html');
const assetsSrc = path.join(root, '../dist/instock-dashboard', 'assets');
const assetsDest = path.join(root, '../dist', 'assets');
const dashboardSrc = path.join(root, '../dist/instock-dashboard', 'index.html');
const dashboardDest = path.join(root, '../dist', 'instock-dashboard', 'dashboard.html');

if (!fs.existsSync(path.join(root, '../dist', 'instock-dashboard'))) {
  fs.mkdirSync(path.join(root, '../dist', 'instock-dashboard'), { recursive: true });
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

function copyDirectory(src, dest, label) {
  try {
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true, force: true });
      console.log(`postbuild: copied ${label}`);
    } else {
      console.log(`postbuild: source not found (${label}), skipping copy`);
    }
  } catch (err) {
    console.error(`postbuild error (${label}):`, err);
    process.exit(1);
  }
}

copyFile(accueilSrc, accueilDest, 'public/accueil.html -> ../dist/index.html');
copyFile(accueilSrc, accueilCopy, 'public/accueil.html -> ../dist/accueil.html');
copyFile(connexionSrc, connexionDest, 'connexion.html -> ../dist/connexion.html');
copyDirectory(assetsSrc, assetsDest, 'instock-dashboard/assets -> ../dist/assets');
copyFile(dashboardSrc, dashboardDest, 'built dashboard index.html -> ../dist/instock-dashboard/dashboard.html');
