import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 rounded-full border border-ink/15 dark:border-paper/20 text-ink dark:text-paper disabled:opacity-30 hover:border-coral hover:text-coral transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, idx) => (
        <div key={p} className="flex items-center">
          {idx > 0 && pages[idx - 1] !== p - 1 && <span className="px-1 text-slate">…</span>}
          <button
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-full text-sm font-mono-data transition-colors ${
              p === page
                ? "bg-coral text-paper"
                : "text-ink dark:text-paper hover:bg-ink/5 dark:hover:bg-paper/10"
            }`}
          >
            {p}
          </button>
        </div>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="p-2 rounded-full border border-ink/15 dark:border-paper/20 text-ink dark:text-paper disabled:opacity-30 hover:border-coral hover:text-coral transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
