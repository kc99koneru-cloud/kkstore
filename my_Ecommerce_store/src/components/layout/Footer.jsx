import { brand } from '../../assets/brand.js';

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="container-page flex flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
        <p>&copy; 2026 {brand.name}. Built with React, Vite, Router, Context, and Tailwind.</p>
        <p>Demo data powered by DummyJSON.</p>
      </div>
    </footer>
  );
}

export default Footer;
