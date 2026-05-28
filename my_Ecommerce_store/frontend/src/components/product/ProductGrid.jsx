import ProductCard from './ProductCard.jsx';

function ProductGrid({ products, onAddToCart }) {
  if (!products.length) {
    return (
      <div className="surface rounded-lg p-10 text-center">
        <h2 className="text-xl font-bold">No products found</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ProductGrid;
