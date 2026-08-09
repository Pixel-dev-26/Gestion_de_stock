import { Trophy } from 'lucide-react';
import ChartCard from '../ui/ChartCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import './TopProductsTable.css';

const COLUMNS = ['Produit', 'Catégorie', 'Quantité vendue', 'Stock restant', 'Valeur'];

/**
 * Tableau pret a recevoir le classement des produits les plus vendus.
 * Format attendu pour `rows` :
 * [{ id, name, category, sold, remaining, value }, ...]
 */
export default function TopProductsTable({ rows = [], loading = false, delay = 0 }) {
  const hasRows = rows.length > 0;

  return (
    <ChartCard
      icon={Trophy}
      title="Produits les plus vendus"
      subtitle="Classement sur la période sélectionnée"
      loading={loading}
      delay={delay}
      height={hasRows ? undefined : 220}
    >
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasRows ? (
              rows.map((row) => (
                <tr key={row.id}>
                  <td className="cell-strong">{row.name}</td>
                  <td>{row.category}</td>
                  <td>{row.sold}</td>
                  <td>{row.remaining}</td>
                  <td>{row.value}</td>
                </tr>
              ))
            ) : (
              <tr className="empty-row">
                <td colSpan={COLUMNS.length}>
                  <EmptyState
                    compact
                    icon={Trophy}
                    title="Aucune donnée disponible"
                    description="Le classement des produits les plus vendus s'affichera ici."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
