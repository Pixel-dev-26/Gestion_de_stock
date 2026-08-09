import { LineChart as LineChartIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import ChartCard from '../ui/ChartCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

/**
 * Graphique pret a recevoir les series "entrees" et "sorties".
 * Format attendu pour `data` :
 * [{ date: '2026-01-01', entrees: 0, sorties: 0 }, ...]
 */
export default function MovementsChart({ data = [], loading = false, delay = 0 }) {
  const hasData = data.length > 0;

  return (
    <ChartCard
      icon={LineChartIcon}
      title="Évolution des mouvements de stock"
      subtitle="Entrées et sorties sur la période sélectionnée"
      height={320}
      loading={loading}
      delay={delay}
    >
      {hasData ? (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
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
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Line type="monotone" dataKey="entrees" name="Entrées" stroke="var(--primary)" strokeWidth={2.4} dot={false} />
            <Line type="monotone" dataKey="sorties" name="Sorties" stroke="var(--accent)" strokeWidth={2.4} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          icon={LineChartIcon}
          title="Aucune donnée disponible"
          description="Les mouvements d'entrées et de sorties de stock apparaîtront ici dès que des données seront disponibles."
        />
      )}
    </ChartCard>
  );
}
