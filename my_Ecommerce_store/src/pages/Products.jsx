import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorState from '../components/common/ErrorState.jsx';
import SkeletonGrid from '../components/common/SkeletonGrid.jsx';
import CategoryFilter from '../components/product/CategoryFilter.jsx';
import Pagination from '../components/product/Pagination.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import SearchBar from '../components/product/SearchBar.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { PRODUCTS_PER_PAGE } from '../utils/constants.js';
import { productApi } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { useProducts } from '../hooks/useProducts.js';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const page = Number(searchParams.get('page') || 1);
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const filters = useMemo(() => ({ limit: PRODUCTS_PER_PAGE, skip, search, category }), [skip, search, category]);
  const { data, loading, error, retry } = useProducts(filters);
  const fetchCategories = useCallback(() => productApi.getCategories(), []);
  const categoriesQuery = useFetch(fetchCategories);

  const products = data?.products || [];
  const totalPages = Math.max(1, Math.ceil((data?.total || products.length || 1) / PRODUCTS_PER_PAGE));

  const updateParams = useCallback((updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        nextParams.set(key, value);
      } else {
        nextParams.delete(key);
      }
    });

    setSearchParams(nextParams);
  }, [searchParams, setSearchParams]);

  const handleSearch = useCallback((value) => {
    updateParams({ search: value, page: '1' });
  }, [updateParams]);

  const handleCategory = useCallback((value) => {
    updateParams({ category: value, page: '1' });
  }, [updateParams]);

  const handlePageChange = useCallback((nextPage) => {
    updateParams({ page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [updateParams]);

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    showToast(`${product.title} added to cart`);
  }, [addToCart, showToast]);

  return (
    <section className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Catalog</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Products</h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Search, filter by category, and paginate through live API products.
        </p>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <SearchBar value={search} onChange={handleSearch} />
      </div>

      {!categoriesQuery.loading && !categoriesQuery.error && (
        <div className="mb-8">
          <CategoryFilter categories={categoriesQuery.data || []} selectedCategory={category} onSelectCategory={handleCategory} />
        </div>
      )}

      {loading && <SkeletonGrid />}
      {error && <ErrorState message={error} onRetry={retry} />}
      {!loading && !error && (
        <>
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </section>
  );
}

export default Products;
