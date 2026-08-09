import { AreaChart as AreaChartIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import ChartCard from '../ui/ChartCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

/**
 * Aire pret a recevoir l'evolution de la valeur totale du stock.
 * Format attendu pour `data` : [{ date: '2026-01-01', valeur: 0 }, ...]
 */
export default function StockValueChart({ data = [], loading = false, delay = 0 }) {
  const hasData = data.length > 0;

  return (
    <ChartCard
      icon={AreaChartIcon}
      title="Évolution de la valeur du stock"
      subtitle="Valeur totale estimée du stock dans le temps"
      height={300}
      loading={loading}
      delay={delay}
    >
      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="stockValueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
            <Tooltip
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
              }}
            />
            <Area type="monotone" dataKey="valeur" name="Valeur du stock" stroke="var(--primary)" strokeWidth={2.4} fill="url(#stockValueFill)" />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          icon={AreaChartIcon}
          title="Aucune donnée disponible"
          description="La courbe de valorisation du stock apparaîtra ici dès que l'historique sera disponible."
        />
      )}
    </ChartCard>
  );
}
