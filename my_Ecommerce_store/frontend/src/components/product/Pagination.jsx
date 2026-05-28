import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="focus-ring inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Prev
      </button>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="focus-ring inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800"
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
}

export default Pagination;
