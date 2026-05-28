import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-10 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">404</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist or has moved.
        </p>
        <Link to="/" className="focus-ring mt-6 inline-flex rounded-full bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">
          Back home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
