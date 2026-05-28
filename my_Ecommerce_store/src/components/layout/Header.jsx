import { ClipboardList, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { brand } from '../../assets/brand.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/reach-us', label: 'Reach us' },
  { to: '/cart', label: 'Cart' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { totalItems, orderCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();
    navigate(`/products${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ''}`);
    setIsMenuOpen(false);
  }

  const navClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-teal-600 text-white'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="container-page flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-600 text-white">K</span>
          <span>{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearchSubmit} className="ml-auto hidden min-w-0 max-w-sm flex-1 md:block">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="focus-ring w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm dark:border-slate-800 dark:bg-slate-900"
              placeholder="Search products"
            />
          </label>
        </form>

        <button onClick={toggleTheme} className="focus-ring rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <Link to="/cart" className="focus-ring relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Cart">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>

        <Link to="/orders" className="focus-ring relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="My orders">
          <ClipboardList className="h-5 w-5" />
          {orderCount > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-teal-600 px-1 text-xs font-bold text-white">
              {orderCount}
            </span>
          )}
        </Link>

        {user ? (
          <button onClick={logout} className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950 sm:inline-flex">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950 sm:inline-flex">
            <UserRound className="mr-2 h-4 w-4" />
            Login
          </Link>
        )}

        <button onClick={() => setIsMenuOpen((open) => !open)} className="focus-ring rounded-full p-2 md:hidden" aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="focus-ring w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900"
              placeholder="Search products"
            />
          </form>
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)} className={navClass}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to={user ? '/checkout' : '/login'} onClick={() => setIsMenuOpen(false)} className={navClass}>
              {user ? 'Checkout' : 'Login'}
            </NavLink>
            <NavLink to="/orders" onClick={() => setIsMenuOpen(false)} className={navClass}>
              My orders
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
