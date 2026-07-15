export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("")}
        className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          active === ""
            ? "bg-ink text-paper border-ink dark:bg-paper dark:text-ink"
            : "border-ink/15 dark:border-paper/20 text-slate hover:border-coral hover:text-coral"
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const slug = typeof cat === "string" ? cat : cat.slug;
        const label = typeof cat === "string" ? cat : cat.name;
        return (
          <button
            key={slug}
            onClick={() => onSelect(slug)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border capitalize transition-colors ${
              active === slug
                ? "bg-ink text-paper border-ink dark:bg-paper dark:text-ink"
                : "border-ink/15 dark:border-paper/20 text-slate hover:border-coral hover:text-coral"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
