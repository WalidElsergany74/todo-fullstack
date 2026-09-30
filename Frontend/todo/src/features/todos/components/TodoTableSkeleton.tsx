export default function TodoTableSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-5 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Table shell */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700/60">
        {/* Table head */}
        <div className="grid grid-cols-[40px_1fr_2fr_120px_100px] gap-4 border-b border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-700/60 dark:bg-gray-800/60">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-3.5 rounded bg-gray-300 dark:bg-gray-600"
            />
          ))}
        </div>

        {/* Skeleton rows */}
        {[...Array(6)].map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-[40px_1fr_2fr_120px_100px] gap-4 border-b border-gray-100 px-6 py-4 last:border-0 dark:border-gray-700/40"
          >
            {/* Checkbox */}
            <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Title */}
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Description */}
            <div className="space-y-1.5">
              <div className="h-3.5 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3.5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Date */}
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Actions */}
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
