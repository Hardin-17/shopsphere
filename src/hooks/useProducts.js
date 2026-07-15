import { useEffect, useState, useCallback } from "react";
import { fetchProducts, fetchProductsByCategory } from "../services/api";

const PAGE_SIZE = 12;

export function useProducts({ category = "", search = "", sort = "" } = {}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * PAGE_SIZE;
      const data = category
        ? await fetchProductsByCategory(category, { limit: PAGE_SIZE, skip })
        : await fetchProducts({ limit: PAGE_SIZE, skip, q: search });

      let list = data.products || [];

      if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
      if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
      if (sort === "rating-desc") list = [...list].sort((a, b) => b.rating - a.rating);

      setProducts(list);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [category, search, sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  // reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [category, search, sort]);

  return {
    products,
    total,
    page,
    setPage,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    loading,
    error,
    refetch: load,
  };
}
