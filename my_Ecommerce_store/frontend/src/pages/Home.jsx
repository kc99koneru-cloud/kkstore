import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import ErrorState from '../components/common/ErrorState.jsx';
import SkeletonGrid from '../components/common/SkeletonGrid.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { productApi } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';

function Home() {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const fetchFeaturedProducts = useCallback(() => productApi.getProducts({ limit: 8 }), []);
  const { data, loading, error, retry } = useFetch(fetchFeaturedProducts);

  const featuredProducts = useMemo(() => data?.products?.slice(0, 8) || [], [data]);

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    showToast(`${product.title} added to cart`);
  }, [addToCart, showToast]);

  return (
    <>
      <section className="bg-white py-12 dark:bg-slate-950 lg:py-16">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">kk Storefront</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Shop your favorite products with fast, simple checkout.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Discover daily essentials, add them to your cart, and track every placed order from your account.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="focus-ring inline-flex items-center rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
                Browse products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/register" className="focus-ring rounded-full border border-slate-200 px-6 py-3 font-semibold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                Create account
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80"
                alt="Modern retail products arranged on shelves"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-100 py-6 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="container-page grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, title: 'Fast shipping', text: 'Free shipping over $100.' },
            { icon: ShieldCheck, title: 'Secure checkout', text: 'Sign in before placing an order.' },
            { icon: Zap, title: 'Quick ordering', text: 'Save your cart and checkout smoothly.' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <item.icon className="h-6 w-6 text-teal-600" />
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Featured</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Popular picks</h2>
          </div>
          <Link to="/products" className="font-semibold text-teal-600 hover:text-teal-700">View all</Link>
        </div>
        {loading && <SkeletonGrid />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && <ProductGrid products={featuredProducts} onAddToCart={handleAddToCart} />}
      </section>
    </>
  );
}

export default Home;
