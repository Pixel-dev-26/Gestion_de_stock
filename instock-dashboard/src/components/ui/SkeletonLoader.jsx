import './SkeletonLoader.css';

export function SkeletonBlock({ width = '100%', height = 14, radius = 8, style }) {
  return (
    <span
      className="skeleton-block"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

export function SkeletonStatCard() {
  return (
    <div className="skeleton-card">
      <SkeletonBlock width={40} height={40} radius={12} />
      <div className="skeleton-card-lines">
        <SkeletonBlock width="55%" height={11} />
        <SkeletonBlock width="35%" height={20} />
      </div>
    </div>
  );
}

export function SkeletonChart({ height = 280 }) {
  return (
    <div className="skeleton-chart" style={{ height }}>
      <SkeletonBlock width="100%" height="100%" radius={12} />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="skeleton-row">
      <SkeletonBlock width={34} height={34} radius={9} />
      <SkeletonBlock width="30%" height={12} />
      <SkeletonBlock width="15%" height={12} />
      <SkeletonBlock width="15%" height={12} />
      <SkeletonBlock width="15%" height={12} />
    </div>
  );
}
