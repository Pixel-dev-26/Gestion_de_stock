import { useEffect, useState } from 'react';
import {
  Package,
  Wallet,
  AlertTriangle,
  XCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  ShoppingCart,
  ClipboardList,
} from 'lucide-react';

import DashboardHeader from './DashboardHeader.jsx';
import MovementsChart from './MovementsChart.jsx';
import CategoryChart from './CategoryChart.jsx';
import StockValueChart from './StockValueChart.jsx';
import TopProductsTable from './TopProductsTable.jsx';
import PerformanceIndicators from './PerformanceIndicators.jsx';
import StockStatus from './StockStatus.jsx';
import StatCard from '../ui/StatCard.jsx';
import './Dashboard.css';

const PRIMARY_KPIS = [
  { key: 'total', label: 'Total produits', icon: Package, tone: 'primary' },
  { key: 'value', label: 'Valeur du stock', icon: Wallet, tone: 'primary' },
  { key: 'low', label: 'Stock faible', icon: AlertTriangle, tone: 'warning' },
  { key: 'out', label: 'Rupture de stock', icon: XCircle, tone: 'danger' },
];

const SECONDARY_KPIS = [
  { key: 'in', label: 'Entrées du mois', icon: ArrowDownCircle, tone: 'primary' },
  { key: 'out', label: 'Sorties du mois', icon: ArrowUpCircle, tone: 'accent' },
  { key: 'sold', label: 'Produits vendus', icon: ShoppingCart, tone: 'primary' },
  { key: 'orders', label: 'Commandes', icon: ClipboardList, tone: 'accent' },
];

const PRIMARY_KPI_VALUES = {
  total: '96 produits',
  value: '48 250 Ar',
  low: '12',
  out: '3',
};

const SECONDARY_KPI_VALUES = {
  in: '380',
  out: '275',
  sold: '215',
  orders: '14',
};

const MOVEMENTS_DATA = [
  { date: '01/04', entrees: 58, sorties: 42 },
  { date: '08/04', entrees: 72, sorties: 53 },
  { date: '15/04', entrees: 66, sorties: 60 },
  { date: '22/04', entrees: 84, sorties: 68 },
  { date: '29/04', entrees: 90, sorties: 72 },
];

const CATEGORY_DATA = [
  { name: 'Électronique', value: 34 },
  { name: 'Maison', value: 24 },
  { name: 'Bureautique', value: 18 },
  { name: 'Entretien', value: 14 },
  { name: 'Autres', value: 10 },
];

const STOCK_VALUE_DATA = [
  { date: 'Jan', valeur: 32500 },
  { date: 'Fév', valeur: 34200 },
  { date: 'Mar', valeur: 36600 },
  { date: 'Avr', valeur: 38750 },
  { date: 'Mai', valeur: 43200 },
  { date: 'Juin', valeur: 48250 },
];

const TOP_PRODUCTS_ROWS = [
  { id: 'p1', name: 'Casque sans fil', category: 'Électronique', sold: 42, remaining: 28, value: '8 120 Ar' },
  { id: 'p2', name: 'Lampe connectée', category: 'Maison', sold: 37, remaining: 16, value: '5 540 Ar' },
  { id: 'p3', name: 'Imprimante laser', category: 'Bureautique', sold: 29, remaining: 9, value: '6 300 Ar' },
  { id: 'p4', name: 'Pack de sprays', category: 'Entretien', sold: 24, remaining: 14, value: '2 860 Ar' },
  { id: 'p5', name: 'Chargeur USB-C', category: 'Électronique', sold: 21, remaining: 33, value: '3 430 Ar' },
];

const PERFORMANCE_VALUES = {
  availability: '94%',
  shortage: '3%',
  turnover: '7,8x',
  growth: '+12,4%',
};

const STOCK_STATUS_VALUES = {
  normal: 72,
  low: 18,
  critical: 8,
  out: 2,
};

export default function Dashboard() {
  // Simule un court chargement initial (skeleton) avant l'affichage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="dashboard container">
      <DashboardHeader />

      <section className="kpi-grid" aria-label="Indicateurs clés">
        {PRIMARY_KPIS.map((kpi, i) => (
          <StatCard
            key={kpi.key}
            icon={kpi.icon}
            label={kpi.label}
            tone={kpi.tone}
            value={PRIMARY_KPI_VALUES[kpi.key] ?? '—'}
            loading={loading}
            delay={i * 70}
          />
        ))}
      </section>

      <section className="kpi-grid kpi-grid-secondary" aria-label="Indicateurs secondaires">
        {SECONDARY_KPIS.map((kpi, i) => (
          <StatCard
            key={kpi.key}
            icon={kpi.icon}
            label={kpi.label}
            tone={kpi.tone}
            size="sm"
            value={SECONDARY_KPI_VALUES[kpi.key] ?? '—'}
            loading={loading}
            delay={280 + i * 70}
          />
        ))}
      </section>

      <section className="charts-row-1">
        <MovementsChart data={MOVEMENTS_DATA} loading={loading} delay={560} />
        <CategoryChart data={CATEGORY_DATA} loading={loading} delay={630} />
      </section>

      <section className="charts-row-2">
        <StockValueChart data={STOCK_VALUE_DATA} loading={loading} delay={700} />
      </section>

      <section className="charts-row-2">
        <TopProductsTable rows={TOP_PRODUCTS_ROWS} loading={loading} delay={770} />
      </section>

      <section className="charts-row-3">
        <PerformanceIndicators values={PERFORMANCE_VALUES} loading={loading} delay={840} />
        <StockStatus values={STOCK_STATUS_VALUES} loading={loading} delay={900} />
      </section>
    </main>
  );
}
