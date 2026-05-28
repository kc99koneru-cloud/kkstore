import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', showPassword: false });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: type === 'checkbox' ? checked : value }));
  }

  function validate() {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Name must be at least 2 characters.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords must match.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    register(form);
    showToast('Account created successfully');
    navigate('/products');
  }

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10">
      <form onSubmit={handleSubmit} className="surface w-full max-w-lg rounded-lg p-6">
        <h1 className="text-3xl font-black tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">This fake registration stores the session locally for demo auth.</p>

        <div className="mt-6 grid gap-4">
          <label className="block">
            <span className="text-sm font-semibold">Full name</span>
            <input name="name" value={form.name} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
            {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input name="email" value={form.email} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
            {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Password</span>
            <input name="password" type={form.showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
            {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password}</p>}
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Confirm password</span>
            <input name="confirmPassword" type={form.showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950" />
            {errors.confirmPassword && <p className="mt-1 text-sm text-rose-600">{errors.confirmPassword}</p>}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="showPassword" type="checkbox" checked={form.showPassword} onChange={handleChange} className="h-4 w-4 rounded border-slate-300 text-teal-600" />
            Show password
          </label>
        </div>

        <button className="focus-ring mt-6 w-full rounded-full bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700">Register</button>
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link to="/login" className="font-semibold text-teal-600">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
