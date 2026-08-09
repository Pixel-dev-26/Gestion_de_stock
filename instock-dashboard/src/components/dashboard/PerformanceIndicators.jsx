import { Gauge, TrendingUp, RefreshCw, ActivitySquare } from 'lucide-react';
import ChartCard from '../ui/ChartCard.jsx';
import './PerformanceIndicators.css';

const INDICATORS = [
  { key: 'availability', label: 'Taux de disponibilité', icon: Gauge },
  { key: 'shortage', label: 'Taux de rupture', icon: ActivitySquare },
  { key: 'turnover', label: 'Rotation du stock', icon: RefreshCw },
  { key: 'growth', label: 'Croissance', icon: TrendingUp },
];

/**
 * Grille d'indicateurs prete a recevoir les valeurs calculees cote backend.
 * Format attendu pour `values` : { availability, shortage, turnover, growth }
 */
export default function PerformanceIndicators({ values = {}, loading = false, delay = 0 }) {
  return (
    <ChartCard
      icon={Gauge}
      title="Performance du stock"
      subtitle="Indicateurs clés calculés sur la période"
      loading={loading}
      delay={delay}
      height={undefined}
    >
      <div className="indicators-grid">
        {INDICATORS.map((ind) => (
          <div key={ind.key} className="indicator-item">
            <span className="indicator-icon">
              <ind.icon size={17} strokeWidth={1.8} />
            </span>
            <div>
              <p className="indicator-label">{ind.label}</p>
              <p className="indicator-value">{values[ind.key] ?? '—'}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
