import { Filter, Plus, Search, X } from 'lucide-react';

export default function ProductFilters({ search, onSearchChange, category, onCategoryChange, categories, stockStatus, onStockStatusChange, sort, onSortChange, onAddProduct, onReset, disabled }) {
  const hasFilters = Boolean(search || category || stockStatus || sort);

  return (
    <section className="products-toolbar" aria-label="Filtres produits">
      <label className="product-search">
        <Search size={18} aria-hidden="true" />
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Rechercher un produit ou une référence" disabled={disabled} />
      </label>
      <div className="product-controls">
        <label className="select-control"><Filter size={16} aria-hidden="true" /><select value={category} onChange={(event) => onCategoryChange(event.target.value)} disabled={disabled}><option value="">Toutes les catégories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="select-control"><select value={stockStatus} onChange={(event) => onStockStatusChange(event.target.value)} disabled={disabled}><option value="">Tous les statuts</option><option>En stock</option><option>Stock faible</option><option>Rupture de stock</option></select></label>
        <label className="select-control"><select value={sort} onChange={(event) => onSortChange(event.target.value)} disabled={disabled}><option value="">Trier par</option><option value="name">Nom</option><option value="price">Prix</option><option value="quantity">Quantité</option></select></label>
        {hasFilters && <button type="button" className="clear-filters" onClick={onReset}><X size={15} /> Réinitialiser</button>}
        <button type="button" className="add-product-button" onClick={onAddProduct}><Plus size={17} /> Ajouter un produit</button>
      </div>
    </section>
  );
}
