import { SkeletonChart } from './SkeletonLoader.jsx';
import './ChartCard.css';

export default function ChartCard({
  icon: Icon,
  title,
  subtitle,
  action,
  loading = false,
  height = 300,
  children,
  delay = 0,
}) {
  return (
    <section
      className="chart-card fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <header className="chart-card-head">
        <div className="chart-card-heading">
          {Icon && (
            <span className="chart-card-icon">
              <Icon size={18} strokeWidth={1.8} />
            </span>
          )}
          <div>
            <h3>{title}</h3>
            {subtitle && <p className="chart-card-subtitle">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="chart-card-action">{action}</div>}
      </header>

      <div className="chart-card-body" style={{ minHeight: height }}>
        {loading ? <SkeletonChart height={height} /> : children}
      </div>
    </section>
  );
}
