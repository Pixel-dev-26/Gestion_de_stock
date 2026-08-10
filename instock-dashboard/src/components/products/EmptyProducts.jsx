import { PackageSearch, RotateCcw } from 'lucide-react';

export default function EmptyProducts({ onReset, filtered }) {
  return (
    <section className="products-empty" aria-live="polite">
      <span className="empty-icon"><PackageSearch size={28} /></span>
      <h2>Aucun produit trouvé</h2>
      <p>{filtered ? 'Aucun produit ne correspond à vos critères actuels.' : 'Votre catalogue est vide pour le moment.'}</p>
      {filtered && <button type="button" className="secondary-button" onClick={onReset}><RotateCcw size={16} /> Réinitialiser les filtres</button>}
    </section>
  );
}
