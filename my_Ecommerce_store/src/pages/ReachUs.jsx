import { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';

const contactOptions = [
  { icon: Mail, label: 'Email', value: 'support@kkstore.in' },
  { icon: MapPin, label: 'Visit', value: 'Hyderabad, Telangana' },
];

function ReachUs() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (form.message.trim().length < 10) nextErrors.message = 'Tell us a little more.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    setForm({ name: '', email: '', message: '' });
    setErrors({});
    showToast('Message sent. We will get back to you soon.');
  }

  return (
    <section className="container-page py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Reach us</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">We are here to help</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Questions about products, orders, payments, or delivery? Send us a note and the kk support team will respond.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-4">
          {contactOptions.map((option) => (
            <div key={option.label} className="surface flex items-start gap-4 rounded-lg p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                <option.icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-bold">{option.label}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{option.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="surface rounded-lg p-6">
          <h2 className="text-xl font-bold">Send a message</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
              />
              {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="focus-ring mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
              />
              {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="focus-ring mt-1 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-800 dark:bg-slate-950"
              />
              {errors.message && <p className="mt-1 text-sm text-rose-600">{errors.message}</p>}
            </label>
          </div>

          <button className="focus-ring mt-6 inline-flex items-center rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
            <Send className="mr-2 h-4 w-4" />
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReachUs;
