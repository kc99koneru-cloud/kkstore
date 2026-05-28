function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectCategory('')}
        className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
          !selectedCategory
            ? 'bg-teal-600 text-white'
            : 'bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800'
        }`}
      >
        All
      </button>
      {categories.map((category) => {
        const slug = typeof category === 'string' ? category : category.slug;
        const label = typeof category === 'string' ? category : category.name;

        return (
          <button
            key={slug}
            onClick={() => onSelectCategory(slug)}
            className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold capitalize ${
              selectedCategory === slug
                ? 'bg-teal-600 text-white'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
