# kk - Modern E-Commerce Store

kk is a production-style React + Vite e-commerce SPA. It demonstrates product browsing, product details, category filtering, search, cart persistence, fake auth, protected checkout, theme switching, loading states, error retry UI, toast notifications, and pagination.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Context API
- Fetch API
- LocalStorage
- DummyJSON Products API
- lucide-react icons

## Folder Structure

```text
src/
├── assets/       # Brand constants and static app assets
├── components/   # Reusable UI, layout, product, cart components
├── context/      # Auth, cart, theme, and toast global state
├── hooks/        # Custom hooks such as useFetch and useLocalStorage
├── layouts/      # Shared page shell
├── pages/        # Route-level page components
├── routes/       # Router config and protected route
├── services/     # API integration layer
├── styles/       # Tailwind entry and shared component classes
└── utils/        # Constants, storage helpers, formatting helpers
```

## Concepts Covered

- SPA concept: `BrowserRouter` and React Router change views without full page reloads.
- Virtual DOM: React builds an in-memory UI representation, compares changes, and updates only the necessary DOM nodes.
- Vite setup: `vite.config.js`, `index.html`, and npm scripts define the project.
- JSX components: pages and reusable components return JSX UI.
- Props: components such as `ProductCard`, `ProductGrid`, and `CartSummary` receive data and callbacks.
- `useState`: used for forms, menu toggles, quantity controls, and local UI state.
- Event handling: form submissions, search input, cart buttons, and theme toggles use React events.
- Conditional rendering: loaders, errors, empty cart, authenticated UI, and mobile menu are conditionally shown.
- Show/hide functionality: mobile navigation and password visibility are toggled with state.
- Lists and keys: product grids, cart items, categories, and toasts render dynamic lists with stable keys.
- Lifting state up: search/filter state lives in `Products` and is passed to child controls.
- Parent to child interaction: parent pages pass callback handlers to product and filter components.
- Form handling and validation: login, register, and checkout forms validate before submission.
- Registration form UI: `src/pages/Register.jsx`.
- React DevTools readiness: named components, separated providers, and clear state boundaries make debugging easier.
- React Router and multi-page navigation: configured in `src/routes/AppRoutes.jsx`.
- `useEffect` lifecycle: `useFetch`, `useLocalStorage`, and `ThemeContext` perform effects.
- Fetch API: `src/services/api.js` requests products and categories.
- Loader implementation: `SkeletonGrid` and `PageLoader`.
- Error handling with retry: `ErrorState` calls `retry` from `useFetch`.
- URL params: product details read `productId` via `useParams`.
- Navigation hooks: `useNavigate`, `useLocation`, and `useSearchParams`.
- Context API: auth, cart, theme, and toast providers.
- Custom hooks: `useFetch`, `useProducts`, and `useLocalStorage`.
- `useMemo`: derived cart totals, featured products, filters, and discount price.
- `React.memo`: `ProductCard` avoids unnecessary re-renders in large lists.
- `useCallback`: stable handlers for cart actions, filters, pagination, and API fetchers.
- Tailwind styling: responsive utility-first UI with dark mode support.
- Authentication basics: fake auth is stored in localStorage.
- Protected routes: checkout is wrapped by `ProtectedRoute`.

## Routing Flow

- `/` renders the home page with hero and featured products.
- `/products` renders the catalog with search, category filtering, and pagination.
- `/products/:productId` renders product details using URL params.
- `/cart` renders cart items and quantity controls.
- `/login` and `/register` manage fake auth forms.
- `/checkout` is protected. Anonymous users are redirected to `/login`.
- `*` renders the not found page.

## Authentication Flow

Auth is intentionally fake for learning purposes. Login and registration validate form data, create a local user object, and persist it under the `kk-auth` localStorage key. `ProtectedRoute` checks `isAuthenticated`; if false, it redirects users to login and preserves the intended destination.

## Cart Flow

Cart state is managed in `CartContext` and persisted in localStorage. Products can be added from the home page, catalog, or details page. The cart supports quantity changes, item removal, subtotal, tax, shipping, and total calculations.

## Optimization Techniques

- Lazy-loaded route pages with `React.lazy` and `Suspense`.
- `React.memo` for repeated product cards.
- `useCallback` for stable callbacks passed to memoized children.
- `useMemo` for expensive or derived values like cart totals and paginated filters.
- Centralized API service and reusable `useFetch` hook to avoid duplicated fetching logic.
- Responsive image loading with `loading="lazy"` on product cards.

## API

The app uses DummyJSON:

```text
https://dummyjson.com/products
https://dummyjson.com/products/search?q=phone
https://dummyjson.com/products/category/smartphones
https://dummyjson.com/products/:id
```

## Notes

This project is designed for learning and portfolio practice. Payment, authentication, and checkout are intentionally simulated, while product data is fetched from a live public API.
