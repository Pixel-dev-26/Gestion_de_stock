import PeriodSelector from '../ui/PeriodSelector.jsx';
import './DashboardHeader.css';

export default function DashboardHeader() {
  return (
    <div className="dashboard-header fade-in-up">
      <div>
        <h1>Tableau de bord</h1>
        <p className="dashboard-subtitle">
          Vue générale de l'activité et de l'état de votre stock
        </p>
      </div>
      <PeriodSelector />
    </div>
  );
}
