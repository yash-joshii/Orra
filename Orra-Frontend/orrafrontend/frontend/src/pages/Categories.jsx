import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, FolderSearch } from "lucide-react";

// Components
import CategoryCard from "@/components/common/CategoryCard";
import LogoLoader from "@/components/common/LogoLoader";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getCategorySummary();
        dispatch(setCategories(response?.data || []));
      } catch (err) {
        dispatch(
          setError(
            err.response?.data?.message || err.message || "Failed to fetch categories"
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCategories();
  }, [dispatch]);

  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Categories
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto font-medium">
            Explore our complete collection of premium tech and electronics
            available for rent from trusted owners in your area.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="min-h-[40vh] flex items-center justify-center">
            <LogoLoader />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-rose-100 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Error Loading Categories</h3>
            <p className="text-xs text-slate-500">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && categoryList.length === 0 && (
          <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 border border-slate-200/60 flex items-center justify-center mx-auto">
              <FolderSearch className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">No Categories Found</h3>
            <p className="text-xs text-slate-500">
              There are currently no active categories available.
            </p>
          </div>
        )}

        {/* Category Grid */}
        {!loading && !error && categoryList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryList.map((cat) => {
              const { icon, iconBg, iconColor } = getCategoryStyle(cat.category);

              return (
                <CategoryCard
                  key={cat.category}
                  name={formatCategoryLabel(cat.category)}
                  deviceCount={cat.count}
                  icon={icon}
                  iconBg={iconBg}
                  iconColor={iconColor}
                  onClick={() =>
                    navigate(`/browserdevices?category=${cat.category}`)
                  }
                />
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Categories;