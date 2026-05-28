import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import CartSummary from '../components/cart/CartSummary.jsx';
import { useCart } from '../context/CartContext.jsx';
import { brand } from '../assets/brand.js';
import { formatCurrency } from '../utils/formatCurrency.js';

function Cart() {
  const { items, subtotal, shipping, tax, total, updateQuantity, removeFromCart } = useCart();

  if (!items.length) {
    return (
      <section className="container-page grid min-h-[60vh] place-items-center py-10 text-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Your cart is empty</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Add a few products and come back here to review your order.</p>
          <Link to="/products" className="focus-ring mt-6 inline-flex rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
            Shop products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black tracking-tight">Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="surface grid gap-4 rounded-lg p-4 sm:grid-cols-[6rem_1fr_auto]">
              <img src={item.thumbnail} alt={item.title} className="h-24 w-24 rounded-md bg-slate-100 object-contain dark:bg-slate-800" />
              <div>
                <Link to={`/products/${item.id}`} className="font-bold hover:text-teal-600">{item.title}</Link>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.brand || brand.name}</p>
                <p className="mt-3 font-semibold">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-full border border-slate-200 dark:border-slate-800">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="focus-ring p-2" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-9 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="focus-ring p-2" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="focus-ring rounded-full p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950" aria-label="Remove item">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
      </div>
    </section>
  );
}

export default Cart;
