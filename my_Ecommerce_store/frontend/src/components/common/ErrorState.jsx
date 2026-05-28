import { RefreshCcw } from 'lucide-react';

function ErrorState({ message, onRetry }) {
  return (
    <div className="surface rounded-lg p-8 text-center">
      <h2 className="text-xl font-bold">We could not load this section.</h2>
      <p className="mx-auto mt-2 max-w-xl text-slate-500 dark:text-slate-400">{message}</p>
      <button onClick={onRetry} className="focus-ring mt-5 inline-flex items-center rounded-full bg-teal-600 px-5 py-2.5 font-semibold text-white hover:bg-teal-700">
        <RefreshCcw className="mr-2 h-4 w-4" />
        Retry
      </button>
    </div>
  );
}

export default ErrorState;
