import { Boxes } from 'lucide-react';
import ChartCard from '../ui/ChartCard.jsx';
import './StockStatus.css';

const STATUSES = [
  { key: 'normal', label: 'Stock normal' },
  { key: 'low', label: 'Stock faible' },
  { key: 'critical', label: 'Stock critique' },
  { key: 'out', label: 'Rupture' },
];

/**
 * Repartition de l'etat du stock, prete a recevoir des pourcentages reels.
 * Format attendu pour `values` : { normal, low, critical, out } (0-100)
 */
export default function StockStatus({ values = {}, loading = false, delay = 0 }) {
  return (
    <ChartCard
      icon={Boxes}
      title="État général du stock"
      subtitle="Répartition des produits par niveau de stock"
      loading={loading}
      delay={delay}
      height={undefined}
    >
      <div className="status-list">
        {STATUSES.map((status) => {
          const raw = values[status.key];
          const percent = typeof raw === 'number' ? Math.min(100, Math.max(0, raw)) : 0;
          return (
            <div key={status.key} className="status-row">
              <div className="status-row-head">
                <span className="status-label">{status.label}</span>
                <span className="status-value">{typeof raw === 'number' ? `${raw}%` : '—'}</span>
              </div>
              <div className="status-track">
                <div className="status-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
