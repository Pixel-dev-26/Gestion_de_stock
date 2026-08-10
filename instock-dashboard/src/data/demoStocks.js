const categories = ['Informatique', 'Électronique', 'Logistique', 'Mobilier', 'Fournitures'];
const images = ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=120&q=80', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=120&q=80', 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=120&q=80'];
const rawProducts = [
  ['Ordinateur portable Pro 14', 'INF-1001', 'Informatique', 32, 12, 'Entrepôt A · Allée 2'],
  ['Écran UltraWide 34 pouces', 'ELE-1002', 'Électronique', 8, 10, 'Entrepôt B · Allée 1'],
  ['Film étirable 500 m', 'REF-1003', 'Logistique', 32, 40, 'Entrepôt A · Allée 2'],
  ['Étiquettes code-barres', 'REF-1004', 'Fournitures', 0, 20, 'Entrepôt B · Allée 1'],
  ['Gants de manutention', 'REF-1007', 'Logistique', 12, 30, 'Entrepôt C · Allée 4'],
  ['Bac de rangement 40 L', 'MOB-1011', 'Mobilier', 25, 15, 'Entrepôt A · Allée 5'],
  ['Cartouche d’imprimante noire', 'INF-1013', 'Informatique', 0, 8, 'Entrepôt B · Allée 3'],
  ['Clavier mécanique sans fil', 'ACC-1018', 'Électronique', 46, 12, 'Entrepôt C · Allée 2'],
  ['Bureau réglable électrique', 'MOB-1021', 'Mobilier', 6, 8, 'Entrepôt A · Allée 6'],
  ['Souris ergonomique verticale', 'ACC-1024', 'Électronique', 58, 15, 'Entrepôt C · Allée 2'],
  ['Ramette papier A4', 'FOU-1028', 'Fournitures', 120, 30, 'Entrepôt A · Allée 7'],
  ['Scanner code-barres', 'INF-1032', 'Informatique', 4, 6, 'Entrepôt B · Allée 2'],
  ['Chaise ergonomique Atlas', 'MOB-1036', 'Mobilier', 18, 6, 'Entrepôt C · Allée 5'],
  ['Station d’accueil USB-C', 'ELE-1040', 'Électronique', 9, 10, 'Entrepôt B · Allée 4'],
];

export function computeStatus(quantity, threshold) {
  if (quantity === 0) return 'out_of_stock';
  if (quantity <= threshold * 0.5) return 'critical_stock';
  if (quantity <= threshold) return 'low_stock';
  return 'in_stock';
}

export function getDemoProducts() {
  return rawProducts.map((item, index) => {
    const [name, reference, category, quantity, minThreshold, location] = item;
    const status = computeStatus(quantity, minThreshold);
    return { id: index + 1, name, reference, category, quantity, minThreshold, location, status, image: images[index % images.length], lastEntry: { date: `2026-08-${String(8 + (index % 10)).padStart(2, '0')}`, quantity: 10 + index }, lastExit: { date: `2026-08-${String(5 + (index % 8)).padStart(2, '0')}`, quantity: 3 + (index % 7) } };
  });
}

export function getDemoMovements() {
  return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((date, index) => ({ date, entries: 18 + index * 3, exits: 11 + (index % 4) * 4 }));
}
