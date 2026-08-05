import { useState, useEffect, useRef, useCallback } from "react";
import { searchProducts } from "@/api/listingApi";
import { getMyBookings } from "@/api/bookingApi";
import { CATEGORIES } from "@/constants/categories";

// Debounced global search across products, bookings, and categories.
// userId: pass the logged-in user's id (or null/undefined if not logged in).
export const useGlobalSearch = (query, userId) => {
  const [results, setResults] = useState({
    products: [],
    bookings: [],
    categories: [],
  });
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const runSearch = useCallback(
    async (keyword) => {
      const trimmed = keyword.trim();

      if (trimmed === "") {
        setResults({ products: [], bookings: [], categories: [] });
        return;
      }

      setLoading(true);

      try {
        // Products — backend already does a "starts with" match
        const productPromise = searchProducts(trimmed)
          .then((res) => res.data ?? [])
          .catch(() => []);

        // Bookings — no backend keyword-search endpoint yet, so fetch
        // the user's bookings and filter client-side.
        const bookingPromise = userId
          ? getMyBookings(userId)
              .then((res) => res.data ?? [])
              .then((bookings) =>
                bookings.filter((b) => {
                  const haystack = `${b.productName ?? ""} ${b.status ?? ""} ${
                    b.product?.productName ?? ""
                  }`.toLowerCase();
                  return haystack.includes(trimmed.toLowerCase());
                }),
              )
              .catch(() => [])
          : Promise.resolve([]);

        // Categories — static list, "starts with" match
        const matchedCategories = CATEGORIES.filter((cat) =>
          cat.toLowerCase().startsWith(trimmed.toLowerCase()),
        );

        const [products, bookings] = await Promise.all([
          productPromise,
          bookingPromise,
        ]);

        setResults({ products, bookings, categories: matchedCategories });
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      runSearch(query);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query, runSearch]);

  return { results, loading, runSearch };
};
