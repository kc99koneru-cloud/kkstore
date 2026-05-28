import { Link } from 'react-router-dom';
import { PackageCheck, XCircle } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';

function Orders() {
  const { orders, cancelOrder } = useCart();
  const { showToast } = useToast();

  function handleCancelOrder(orderId) {
    cancelOrder(orderId);
    showToast('Order cancelled');
  }

  if (!orders.length) {
    return (
      <section className="container-page grid min-h-[60vh] place-items-center py-10 text-center">
        <div>
          <PackageCheck className="mx-auto h-12 w-12 text-teal-600" />
          <h1 className="mt-4 text-4xl font-black tracking-tight">No orders yet</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Your placed orders will show up here.</p>
          <Link to="/products" className="focus-ring mt-6 inline-flex rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
            Shop products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">My orders</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{orders.length} placed order{orders.length === 1 ? '' : 's'}</p>
        </div>
        <Link to="/products" className="font-semibold text-teal-600 hover:text-teal-700">
          Keep shopping
        </Link>
      </div>

      <div className="mt-8 space-y-5">
        {orders.map((order) => (
          <article key={order.id} className="surface rounded-lg p-5">
            <div className="flex flex-wrap justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-bold">Order #{order.id.slice(0, 8)}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    order.status === 'Cancelled'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                  }`}
                  >
                    {order.status || 'Placed'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(order.createdAt))}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
                <p className="text-lg font-black">{formatCurrency(order.summary.total)}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3">
                  <img src={item.thumbnail} alt={item.title} className="h-14 w-14 rounded-md bg-slate-100 object-contain dark:bg-slate-800" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{item.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Qty {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Delivery to {order.details.address}, {order.details.city} {order.details.zip}
            </p>

            {order.status === 'Cancelled' ? (
              <p className="mt-4 text-sm font-semibold text-rose-600 dark:text-rose-300">
                Cancelled on {new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(order.cancelledAt))}
              </p>
            ) : (
              <button
                onClick={() => handleCancelOrder(order.id)}
                className="focus-ring mt-4 inline-flex items-center rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel order
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Orders;
