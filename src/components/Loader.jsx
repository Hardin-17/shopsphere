export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-ink/10 dark:border-paper/10">
          <div className="aspect-square skeleton" />
          <div className="p-4 space-y-2">
            <div className="h-3 w-1/3 skeleton rounded" />
            <div className="h-4 w-4/5 skeleton rounded" />
            <div className="h-4 w-1/2 skeleton rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate">
      <div className="orbit-ring w-10 h-10 border-coral text-coral animate-spin" style={{ animationDuration: "1.4s" }} />
      <p className="text-sm font-mono-data">{label}…</p>
    </div>
  );
}
