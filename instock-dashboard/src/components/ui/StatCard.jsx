import { SkeletonStatCard } from './SkeletonLoader.jsx';
import './StatCard.css';

export default function StatCard({
  icon: Icon,
  label,
  value = '—',
  tone = 'primary',
  size = 'default',
  loading = false,
  delay = 0,
}) {
  if (loading) return <SkeletonStatCard />;

  return (
    <div
      className={`stat-card tone-${tone} size-${size} fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="stat-icon">
        <Icon size={size === 'sm' ? 18 : 20} strokeWidth={1.8} />
      </span>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}
