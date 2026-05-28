import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency.js';

function CartSummary({ subtotal, shipping, tax, total, canCheckout = true }) {
  return (
    <aside className="surface rounded-lg p-5">
      <h2 className="text-lg font-bold">Order summary</h2>
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 dark:text-slate-400">Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="border-t border-slate-200 pt-3 text-base font-bold dark:border-slate-800">
          <div className="flex justify-between">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      {canCheckout && (
        <Link to="/checkout" className="focus-ring mt-5 block rounded-full bg-teal-600 px-5 py-3 text-center font-semibold text-white hover:bg-teal-700">
          Continue to checkout
        </Link>
      )}
    </aside>
  );
}

export default CartSummary;
