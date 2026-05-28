function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface animate-pulse rounded-lg p-4">
          <div className="aspect-square rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonGrid;
