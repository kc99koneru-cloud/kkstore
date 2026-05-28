import { Search } from 'lucide-react';

function SearchBar({ value, onChange }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 dark:border-slate-800 dark:bg-slate-900"
        placeholder="Search by name, brand, or category"
      />
    </label>
  );
}

export default SearchBar;
