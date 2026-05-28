import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import ErrorState from '../components/common/ErrorState.jsx';
import PageLoader from '../components/common/PageLoader.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { productApi } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { formatCurrency } from '../utils/formatCurrency.js';

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const fetcher = useCallback(() => productApi.getProduct(productId), [productId]);
  const { data: product, loading, error, retry } = useFetch(fetcher);

  const discountPrice = useMemo(() => {
    if (!product) return 0;
    return product.price - (product.price * product.discountPercentage) / 100;
  }, [product]);

  const handleAddToCart = useCallback(() => {
    addToCart(product, quantity);
    showToast(`${quantity} x ${product.title} added to cart`);
  }, [addToCart, product, quantity, showToast]);

  if (loading) return <PageLoader />;
  if (error) return <section className="container-page py-10"><ErrorState message={error} onRetry={retry} /></section>;

  return (
    <section className="container-page py-10">
      <button onClick={() => navigate(-1)} className="focus-ring mb-6 inline-flex items-center rounded-full px-2 py-1 font-semibold text-slate-600 hover:text-teal-600 dark:text-slate-300">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
          <img src={product.thumbnail} alt={product.title} className="aspect-square w-full rounded-lg object-contain" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images?.slice(0, 4).map((image) => (
              <img key={image} src={image} alt="" className="aspect-square rounded-md bg-slate-100 object-cover p-2 dark:bg-slate-800" />
            ))}
          </div>
        </div>

        <div>
          <Link to={`/products?category=${product.category}`} className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            {product.category}
          </Link>
          <h1 className="mt-3 text-4xl font-black tracking-tight">{product.title}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {product.rating} rating
            <span>-</span>
            <span>{product.stock} in stock</span>
          </div>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-black">{formatCurrency(discountPrice)}</span>
            <span className="pb-1 text-slate-400 line-through">{formatCurrency(product.price)}</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-slate-200 dark:border-slate-800">
              <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="focus-ring p-3" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold">{quantity}</span>
              <button onClick={() => setQuantity((value) => value + 1)} className="focus-ring p-3" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button onClick={handleAddToCart} className="focus-ring inline-flex items-center rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
