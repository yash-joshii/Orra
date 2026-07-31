import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "@/components/common/ProductCard";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { Calendar, Tag } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const { user } = useSelector((state) => state.auth) || {};
  const userId = user?.userId ?? user?.id;

  const { results, loading, runSearch } = useGlobalSearch(query, userId);

  // Re-run search whenever the URL query changes (e.g. user searches again from this page)
  useEffect(() => {
    runSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const hasAnyResults =
    results.products.length > 0 ||
    results.bookings.length > 0 ||
    results.categories.length > 0;

  return (
    <div className="w-full min-h-screen p-8 pl-[8.5%] pr-[8.5%]">
      <h2 className="text-[32px] font-extrabold mb-2">
        Search results for "{query}"
      </h2>

      {loading && <p className="text-gray-500 mt-4">Searching...</p>}

      {!loading && !hasAnyResults && (
        <p className="text-gray-500 mt-6">
          No results found. Try a different keyword.
        </p>
      )}

      {/* Categories */}
      {results.categories.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-3">Categories</h3>
          <div className="flex flex-wrap gap-3">
            {results.categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  navigate(`/browserdevices?category=${cat}`)
                }
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-sm font-semibold"
              >
                <Tag className="w-4 h-4" />
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      {results.products.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">Products</h3>
          <div className="flex flex-wrap gap-[36px]">
            {results.products.map((item) => (
              <ProductCard key={item.productId} data={item} />
            ))}
          </div>
        </div>
      )}

      {/* Bookings */}
      {results.bookings.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">Your Bookings</h3>
          <div className="flex flex-col gap-3">
            {results.bookings.map((b) => (
              <div
                key={b.bookingId ?? b.id}
                className="flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => navigate(`/booking/${b.bookingId ?? b.id}`)}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold">
                    {b.productName ?? b.product?.productName ?? "Booking"}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;