import { PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import ChartCard from '../ui/ChartCard.jsx';
import EmptyState from '../ui/EmptyState.jsx';

const COLORS = ['var(--primary)', 'var(--accent)', 'var(--success)', 'var(--text-muted)'];

/**
 * Donut pret a recevoir la repartition des produits par categorie.
 * Format attendu pour `data` : [{ name: 'Catégorie', value: 0 }, ...]
 */
export default function CategoryChart({ data = [], loading = false, delay = 0 }) {
  const hasData = data.length > 0;

  return (
    <ChartCard
      icon={PieChartIcon}
      title="Répartition par catégorie"
      subtitle="Part de chaque catégorie dans le stock"
      height={320}
      loading={loading}
      delay={delay}
    >
      {hasData ? (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState
          icon={PieChartIcon}
          title="Aucune donnée disponible"
          description="La répartition de vos produits par catégorie s'affichera ici une fois le catalogue renseigné."
        />
      )}
    </ChartCard>
  );
}
