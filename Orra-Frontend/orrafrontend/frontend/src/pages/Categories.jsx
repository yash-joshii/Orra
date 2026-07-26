import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import CategoryCard from "@/components/common/CategoryCard";

// Redux
import {
  setLoading,
  setCategories,
  setError,
} from "@/redux/slices/categorySlices";

// API
import { getCategorySummary } from "@/api/listingApi";

// Presentation helpers
import { getCategoryStyle, formatCategoryLabel } from "@/constants/categoryStyle";

const Categories = () => {
  // ---- Redux state ----
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  // ---- Fetch categories on mount ----
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getCategorySummary();
      dispatch(setCategories(response.data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ---- Render ----
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            All Categories
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Explore our complete collection of premium tech and electronics
            available for rent from trusted owners in your area.
          </p>
        </div>

        {/* Status states */}
        {loading && (
          <p className="text-center text-slate-500">Loading categories...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const { icon, iconBg, iconColor } = getCategoryStyle(cat.category);

            return (
              <CategoryCard
                key={cat.category}
                name={formatCategoryLabel(cat.category)}
                deviceCount={cat.count}
                icon={icon}
                iconBg={iconBg}
                iconColor={iconColor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;