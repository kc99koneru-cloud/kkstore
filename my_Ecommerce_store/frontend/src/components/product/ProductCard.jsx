import { memo } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency.js';

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="surface group flex h-full flex-col overflow-hidden rounded-lg transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block bg-slate-100 p-4 dark:bg-slate-900">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="aspect-square w-full rounded-md object-contain transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="truncate uppercase tracking-wide">{product.category}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>
        <Link to={`/products/${product.id}`} className="line-clamp-2 font-semibold hover:text-teal-600">
          {product.title}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{product.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white hover:bg-teal-700"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

// React.memo demonstrates rendering optimization for repeated product cards.
export default memo(ProductCard);
