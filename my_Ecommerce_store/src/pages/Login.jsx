import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    login(form);
    showToast('Logged in successfully');
    navigate(location.state?.from || '/checkout', { replace: true });
  }

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10">
      <form onSubmit={handleSubmit} className="surface w-full max-w-md rounded-lg p-6">
        <h1 className="text-3xl font-black tracking-tight">Login</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Use any valid email and a 6+ character password.</p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input name="email" value={form.email} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
            {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Password</span>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
            {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password}</p>}
          </label>
        </div>

        <button className="focus-ring mt-6 w-full rounded-full bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700">Login</button>
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          New here? <Link to="/register" className="font-semibold text-teal-600">Create account</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
