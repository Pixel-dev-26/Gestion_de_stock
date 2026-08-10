import { Eye, Pencil, Trash2 } from 'lucide-react';

const money = new Intl.NumberFormat('fr-MG', { style: 'currency', currency: 'MGA', maximumFractionDigits: 0 });
function statusClass(status) { return status === 'En stock' ? 'status-good' : status === 'Stock faible' ? 'status-low' : 'status-empty'; }

export default function ProductCard({ products, loading, onView, onEdit, onDelete }) {
  if (loading) return <div className="mobile-product-list">{Array.from({ length: 4 }, (_, index) => <div className="product-card skeleton-card" key={index} />)}</div>;
  return <div className="mobile-product-list">{products.map((product) => <article className="product-card" key={product.id}><div className="card-product-top"><img className="product-thumb" src={product.image} alt="" /><div><h3>{product.name}</h3><p>{product.reference}</p></div><span className={`status-badge ${statusClass(product.status)}`}>{product.status}</span></div><div className="card-product-grid"><span><small>Catégorie</small>{product.category}</span><span><small>Prix</small>{money.format(product.price)}</span><span><small>Stock</small>{product.quantity} / {product.threshold} min.</span></div><div className="card-actions"><button type="button" onClick={() => onView(product)}><Eye size={15} /> Voir</button><button type="button" onClick={() => onEdit(product)}><Pencil size={15} /> Modifier</button><button type="button" onClick={() => onDelete(product)} aria-label={`Supprimer ${product.name}`}><Trash2 size={15} /></button></div></article>)}</div>;
}
