export default function PriceFilter({ sort, onSortChange }) {
  return (
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
      className="px-3.5 py-2 rounded-full border border-ink/15 dark:border-paper/20 bg-white dark:bg-ink-soft text-ink dark:text-paper text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
    >
      <option value="">Sort: Featured</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-desc">Rating: Highest First</option>
    </select>
  );
}
