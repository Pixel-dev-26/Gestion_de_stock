import './EmptyState.css';

export default function EmptyState({ icon: Icon, title = 'Aucune donnée disponible', description, compact = false }) {
  return (
    <div className={`empty-state ${compact ? 'compact' : ''}`}>
      {Icon && (
        <span className="empty-state-icon">
          <Icon size={compact ? 20 : 26} strokeWidth={1.6} />
        </span>
      )}
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-desc">{description}</p>}
    </div>
  );
}
