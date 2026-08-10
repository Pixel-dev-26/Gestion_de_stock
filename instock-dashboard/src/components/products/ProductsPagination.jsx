import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductsPagination({ currentPage, totalPages, onPageChange, disabled, totalItems }) {
  return <nav className="products-pagination" aria-label="Pagination des produits"><span>{totalItems} produit{totalItems > 1 ? 's' : ''}</span><div><button type="button" disabled={disabled || currentPage === 1} onClick={() => onPageChange(currentPage - 1)} aria-label="Page précédente"><ChevronLeft size={16} /></button><strong>Page {currentPage} / {totalPages}</strong><button type="button" disabled={disabled || currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} aria-label="Page suivante"><ChevronRight size={16} /></button></div></nav>;
}
