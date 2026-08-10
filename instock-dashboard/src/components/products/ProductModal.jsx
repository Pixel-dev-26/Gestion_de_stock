import { ImagePlus, X } from 'lucide-react';

const initialForm = { name: '', reference: '', category: 'Informatique', price: '', quantity: '', threshold: '', image: '' };

export function ProductFormModal({ product, categories, onClose, onSave }) {
  const values = product || initialForm;

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSave({
      ...values,
      id: values.id || Date.now(),
      name: form.get('name').trim(),
      reference: form.get('reference').trim(),
      category: form.get('category'),
      price: Number(form.get('price')) || 0,
      quantity: Number(form.get('quantity')) || 0,
      threshold: Number(form.get('threshold')) || 0,
      image: form.get('image').trim() || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=240&q=80',
      status: Number(form.get('quantity')) > Number(form.get('threshold')) ? 'En stock' : Number(form.get('quantity')) > 0 ? 'Stock faible' : 'Rupture de stock',
    });
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-form-title">
      <div className="modal-heading"><div><span className="modal-kicker">Mode démo</span><h2 id="product-form-title">{product ? 'Modifier le produit' : 'Ajouter un produit'}</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Fermer"><X size={19} /></button></div>
      <form className="product-form" onSubmit={handleSubmit}>
        <label>Nom du produit<input name="name" defaultValue={values.name} required placeholder="Ex. Station de travail" /></label>
        <label>Référence<input name="reference" defaultValue={values.reference} required placeholder="Ex. INF-STA-001" /></label>
        <label>Catégorie<select name="category" defaultValue={values.category}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <div className="form-grid"><label>Prix (Ar)<input name="price" type="number" min="0" step="1" defaultValue={values.price} required /></label><label>Quantité<input name="quantity" type="number" min="0" defaultValue={values.quantity} required /></label><label>Seuil minimum<input name="threshold" type="number" min="0" defaultValue={values.threshold} required /></label></div>
        <label className="image-field"><span>URL de l'image <small>(optionnel)</small></span><span className="image-input"><ImagePlus size={17} /><input name="image" type="url" defaultValue={values.image} placeholder="https://..." /></span></label>
        <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Annuler</button><button type="submit" className="primary-button">Enregistrer</button></div>
      </form>
    </section>
  </div>;
}

export function ProductDetailModal({ product, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="product-modal detail-modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
      <div className="modal-heading"><div><span className="modal-kicker">Fiche produit</span><h2 id="product-detail-title">{product.name}</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Fermer"><X size={19} /></button></div>
      <img className="detail-image" src={product.image} alt="" />
      <div className="detail-grid"><span><small>Référence</small>{product.reference}</span><span><small>Catégorie</small>{product.category}</span><span><small>Prix</small>{new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA', maximumFractionDigits: 0 }).format(product.price)}</span><span><small>Stock</small>{product.quantity} unités</span><span><small>Seuil minimum</small>{product.threshold} unités</span><span><small>Statut</small>{product.status}</span></div>
    </section>
  </div>;
}
