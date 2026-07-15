import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories } from "../services/api";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import Pagination from "../components/Pagination";
import { ProductGridSkeleton } from "../components/Loader";

export default function Home() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);

  const { products, page, setPage, totalPages, loading, error, total } = useProducts({
    category,
    search,
    sort,
  });

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-paper">
          Catalog
        </h1>
        <p className="text-slate text-sm mt-1">Browse freely — sign in to add items to your cart or wishlist.</p>
      </div>

      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <CategoryFilter categories={categories} active={category} onSelect={setCategory} />
        <PriceFilter sort={sort} onSortChange={setSort} />
      </section>

      {search && (
        <p className="text-slate text-sm mb-4">
          {total} result{total !== 1 ? "s" : ""} for <span className="text-ink dark:text-paper font-medium">"{search}"</span>
        </p>
      )}

      {error && (
        <div className="text-center py-16 text-coral">
          Couldn't load products right now. Please try again.
        </div>
      )}

      {loading && !error && <ProductGridSkeleton />}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-20 text-slate">
          <p className="font-display text-xl text-ink dark:text-paper mb-1">Nothing here yet</p>
          <p>Try a different search term or category.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
