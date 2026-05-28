import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartSummary from '../components/cart/CartSummary.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function Checkout() {
  const { user } = useAuth();
  const { items, subtotal, shipping, tax, total, placeOrder } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: '',
    city: '',
    zip: '',
    payment: 'card',
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (form.address.trim().length < 5) nextErrors.address = 'Enter a delivery address.';
    if (form.city.trim().length < 2) nextErrors.city = 'Enter a city.';
    if (!/^\d{5,6}$/.test(form.zip)) nextErrors.zip = 'Enter a valid postal code.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    placeOrder({
      customerEmail: user.email,
      address: form.address.trim(),
      city: form.city.trim(),
      zip: form.zip.trim(),
      payment: form.payment,
    });
    showToast('Order placed successfully');
    navigate('/orders');
  }

  if (!items.length) {
    return (
      <section className="container-page grid min-h-[60vh] place-items-center py-10 text-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Nothing to checkout</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Your cart is empty.</p>
          <Link to="/products" className="focus-ring mt-6 inline-flex rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-black tracking-tight">Checkout</h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Signed in as {user.email}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={handleSubmit} className="surface rounded-lg p-6">
          <h2 className="text-xl font-bold">Delivery details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Address</span>
              <input name="address" value={form.address} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
              {errors.address && <p className="mt-1 text-sm text-rose-600">{errors.address}</p>}
            </label>
            <label className="block">
              <span className="text-sm font-semibold">City</span>
              <input name="city" value={form.city} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
              {errors.city && <p className="mt-1 text-sm text-rose-600">{errors.city}</p>}
            </label>
            <label className="block">
              <span className="text-sm font-semibold">Postal code</span>
              <input name="zip" value={form.zip} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
              {errors.zip && <p className="mt-1 text-sm text-rose-600">{errors.zip}</p>}
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold">Payment method</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {['card', 'cash'].map((method) => (
                <label key={method} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 capitalize dark:border-slate-800">
                  <input type="radio" name="payment" value={method} checked={form.payment === method} onChange={handleChange} className="text-teal-600" />
                  {method === 'card' ? 'Demo card' : 'Cash on delivery'}
                </label>
              ))}
            </div>
          </fieldset>

          <button className="focus-ring mt-6 rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
            Place fake order
          </button>
        </form>
        <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} canCheckout={false} />
      </div>
    </section>
  );
}

export default Checkout;
