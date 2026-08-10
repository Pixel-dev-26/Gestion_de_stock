import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import ProductFilters from '../components/products/ProductFilters.jsx';
import ProductTable from '../components/products/ProductTable.jsx';
import ProductCard from '../components/products/ProductCard.jsx';
import EmptyProducts from '../components/products/EmptyProducts.jsx';
import ProductsPagination from '../components/products/ProductsPagination.jsx';
import { ProductDetailModal, ProductFormModal } from '../components/products/ProductModal.jsx';
import { demoProducts, DEMO_CATEGORIES } from '../data/demoProducts.js';
import useDarkMode from '../hooks/useDarkMode.js';
import './Produits.css';

export default function Produits() {
  const { isDark, toggleTheme } = useDarkMode();
  const [products, setProducts] = useState(demoProducts);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const hasActiveFilters = Boolean(search || category || stockStatus || sort);
  const filteredProducts = useMemo(() => {
    const result = products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.reference?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || p.category === category;
      const matchesStatus = !stockStatus || p.status === stockStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
    return [...result].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'fr');
      if (sort === 'price') return a.price - b.price;
      if (sort === 'quantity') return b.quantity - a.quantity;
      return 0;
    });
  }, [products, search, category, stockStatus, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, category, stockStatus, sort]);

  function handleAddProduct() {
    setModal({ type: 'form' });
  }

  function handleSaveProduct(product) {
    setProducts((current) => {
      const exists = current.some((item) => item.id === product.id);
      return exists ? current.map((item) => item.id === product.id ? product : item) : [product, ...current];
    });
    setModal(null);
  }

  function handleDelete(product) {
    if (window.confirm(`Supprimer « ${product.name} » de la démo ?`)) {
      setProducts((current) => current.filter((item) => item.id !== product.id));
    }
  }

  function resetFilters() {
    setSearch('');
    setCategory('');
    setStockStatus('');
    setSort('');
  }

  const isEmpty = !loading && filteredProducts.length === 0;

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="products-page container">
        <div className="products-header fade-in-up">
          <div>
            <span className="page-kicker">PRODUITS EN PUBLIQUE</span>
            <h1>Produits</h1>
            <p className="products-subtitle">Gérez et consultez l’ensemble de vos produits</p>
          </div>
        </div>

        <ProductFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={DEMO_CATEGORIES}
          stockStatus={stockStatus}
          onStockStatusChange={setStockStatus}
          sort={sort}
          onSortChange={setSort}
          onAddProduct={handleAddProduct}
          onReset={resetFilters}
          disabled={loading}
        />

        {isEmpty ? (
          <EmptyProducts onReset={resetFilters} filtered={hasActiveFilters} />
        ) : (
          <>
            <div className="products-view-desktop">
              <ProductTable products={visibleProducts} loading={loading} onView={(product) => setModal({ type: 'detail', product })} onEdit={(product) => setModal({ type: 'form', product })} onDelete={handleDelete} />
            </div>
            <div className="products-view-mobile">
              <ProductCard products={visibleProducts} loading={loading} onView={(product) => setModal({ type: 'detail', product })} onEdit={(product) => setModal({ type: 'form', product })} onDelete={handleDelete} />
            </div>

            <ProductsPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={filteredProducts.length}
              disabled={loading || filteredProducts.length === 0}
            />
          </>
        )}
      </main>
      {modal?.type === 'form' && <ProductFormModal product={modal.product} categories={DEMO_CATEGORIES} onClose={() => setModal(null)} onSave={handleSaveProduct} />}
      {modal?.type === 'detail' && <ProductDetailModal product={modal.product} onClose={() => setModal(null)} />}
    </>
  );
}
