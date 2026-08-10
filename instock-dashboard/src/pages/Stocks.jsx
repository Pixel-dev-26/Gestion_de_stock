import { useEffect, useMemo, useState } from 'react';
import {
  Boxes,
  PackageCheck,
  AlertTriangle,
  XCircle,
  Activity,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import StockFilters from '../components/stocks/StockFilters.jsx';
import StockTable from '../components/stocks/StockTable.jsx';
import StockCard from '../components/stocks/StockCard.jsx';
import StockEmptyState from '../components/stocks/StockEmptyState.jsx';
import StockPagination from '../components/stocks/StockPagination.jsx';
import StockMovementChart from '../components/stocks/StockMovementChart.jsx';
import AttentionProducts from '../components/stocks/AttentionProducts.jsx';
import StockMovementModal from '../components/stocks/StockMovementModal.jsx';
import StockDetailsModal from '../components/stocks/StockDetailsModal.jsx';
import StockEditModal from '../components/stocks/StockEditModal.jsx';
import StockDeleteConfirm from '../components/stocks/StockDeleteConfirm.jsx';
import useDarkMode from '../hooks/useDarkMode.js';
import { getDemoProducts, getDemoMovements, computeStatus } from '../data/demoStocks.js';
import './Stocks.css';

const PAGE_SIZE = 8;

export default function Stocks() {
  const { isDark, toggleTheme } = useDarkMode();

  // Etat de demonstration (frontend uniquement) : initialise depuis
  // src/data/demoStocks.js. A remplacer par le resultat d'une API reelle.
  const [products, setProducts] = useState(() => getDemoProducts());
  const [movements, setMovements] = useState(() => getDemoMovements());
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [period, setPeriod] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [page, setPage] = useState(1);

  const [movementModalOpen, setMovementModalOpen] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const hasActiveFilters = Boolean(search || category || status || period);

  const filteredProducts = useMemo(() => {
    const now = new Date();
    let list = products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.reference.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesStatus = !status || p.status === status;

      let matchesPeriod = true;
      if (period) {
        const days = Number(period);
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        const entryDate = p.lastEntry ? new Date(p.lastEntry.date) : null;
        const exitDate = p.lastExit ? new Date(p.lastExit.date) : null;
        matchesPeriod = (entryDate && entryDate >= cutoff) || (exitDate && exitDate >= cutoff);
      }

      return matchesSearch && matchesCategory && matchesStatus && matchesPeriod;
    });

    const [field, direction] = sort.split('-');
    list = [...list].sort((a, b) => {
      let comparison = 0;
      if (field === 'name') comparison = a.name.localeCompare(b.name);
      if (field === 'quantity') comparison = a.quantity - b.quantity;
      return direction === 'desc' ? -comparison : comparison;
    });

    return list;
  }, [products, search, category, status, period, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, category, status, period, sort]);

  function resetFilters() {
    setSearch('');
    setCategory('');
    setStatus('');
    setPeriod('');
  }

  // --- Statistiques (calculees a partir des donnees de demo courantes) ---
  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return {
      total: products.length,
      available: products.reduce((sum, p) => sum + p.quantity, 0),
      low: products.filter((p) => p.status === 'low_stock' || p.status === 'critical_stock').length,
      out: products.filter((p) => p.status === 'out_of_stock').length,
      recentMovements: movements.filter((m) => new Date(m.date) >= weekAgo).length,
    };
  }, [products, movements]);

  // --- Actions (mode demo — frontend uniquement) ---
  function handleAddMovement(movement) {
    setMovements((prev) => [movement, ...prev]);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== movement.productId) return p;
        const delta = movement.type === 'in' ? movement.quantity : -movement.quantity;
        const quantity = Math.max(0, p.quantity + delta);
        const updated = {
          ...p,
          quantity,
          ...(movement.type === 'in'
            ? { lastEntry: { date: movement.date, quantity: movement.quantity } }
            : { lastExit: { date: movement.date, quantity: movement.quantity } }),
        };
        return { ...updated, status: computeStatus(updated.quantity, updated.minThreshold) };
      })
    );
  }

  function handleEditProduct(updated) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? { ...updated, status: computeStatus(updated.quantity, updated.minThreshold) }
          : p
      )
    );
  }

  function handleDeleteProduct(product) {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="stocks-page container">
        <div className="stocks-header fade-in-up">
          <div>
            <h1>Stocks</h1>
            <p className="stocks-subtitle">
              Suivez les niveaux de stock et les mouvements de vos produits
            </p>
          </div>
          <span className="demo-tag">Tous en publics</span>
        </div>

        <section className="stocks-kpi-grid" aria-label="Indicateurs de stock">
          <StatCard icon={Boxes} label="Total des produits" value={stats.total} loading={loading} delay={0} />
          <StatCard icon={PackageCheck} label="Stock disponible" value={stats.available.toLocaleString('fr-FR')} tone="primary" loading={loading} delay={60} />
          <StatCard icon={AlertTriangle} label="Stock faible" value={stats.low} tone="warning" loading={loading} delay={120} />
          <StatCard icon={XCircle} label="Rupture de stock" value={stats.out} tone="danger" loading={loading} delay={180} />
          <StatCard icon={Activity} label="Mouvements récents" value={stats.recentMovements} tone="accent" loading={loading} delay={240} />
        </section>

        <div className="stocks-main-grid">
          <div className="stocks-primary-col">
            <StockFilters
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              status={status}
              onStatusChange={setStatus}
              period={period}
              onPeriodChange={setPeriod}
              sort={sort}
              onSortChange={setSort}
              onAddMovement={() => setMovementModalOpen(true)}
              onResetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
              disabled={loading}
            />

            <h2 className="section-title">Niveau des stocks</h2>

            {!loading && filteredProducts.length === 0 ? (
              <StockEmptyState onResetFilters={resetFilters} />
            ) : (
              <>
                <div className="stocks-view-desktop">
                  <StockTable
                    products={paginatedProducts}
                    loading={loading}
                    onView={setDetailsProduct}
                    onEdit={setEditProduct}
                    onDelete={setDeleteProduct}
                  />
                </div>
                <div className="stocks-view-mobile">
                  <StockCard
                    products={paginatedProducts}
                    loading={loading}
                    onView={setDetailsProduct}
                    onEdit={setEditProduct}
                    onDelete={setDeleteProduct}
                  />
                </div>

                <StockPagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  disabled={loading}
                />
              </>
            )}

            <div className="stocks-chart-block">
              <StockMovementChart movements={movements} loading={loading} delay={100} />
            </div>
          </div>

          <aside className="stocks-side-col">
            <AttentionProducts products={products} onView={setDetailsProduct} delay={80} />
          </aside>
        </div>
      </main>

      <StockMovementModal
        open={movementModalOpen}
        onClose={() => setMovementModalOpen(false)}
        products={products}
        onSubmit={handleAddMovement}
      />

      <StockDetailsModal
        open={Boolean(detailsProduct)}
        onClose={() => setDetailsProduct(null)}
        product={detailsProduct}
        movements={movements}
      />

      <StockEditModal
        open={Boolean(editProduct)}
        onClose={() => setEditProduct(null)}
        product={editProduct}
        onSubmit={handleEditProduct}
      />

      <StockDeleteConfirm
        open={Boolean(deleteProduct)}
        onClose={() => setDeleteProduct(null)}
        product={deleteProduct}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
}
