import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [term, setTerm] = useState(initialValue);

  // debounce: fire onSearch 400ms after typing stops
  useEffect(() => {
    const handle = setTimeout(() => {
      onSearch(term.trim());
    }, 400);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <div className="relative">
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" />
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-ink/15 dark:border-paper/15 bg-white dark:bg-ink-soft text-ink dark:text-paper placeholder:text-slate text-sm focus:outline-none focus:ring-2 focus:ring-coral/50"
      />
    </div>
  );
}
