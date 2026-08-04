import React from "react";

import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import useProduct from "@/hooks/useProduct";

const TrendingNearYou = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProduct();
  // Slice to dynamically show ONLY 4 products
  const trendingProducts = products.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trending Near You
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Top-rated tech available for instant booking
          </p>
        </div>

        <button
          onClick={() => navigate("/browsedevices")}
          className="group flex items-center gap-1 text-sm font-semibold text-[#5650cc] hover:text-[#4338ca] transition-colors cursor-pointer"
        >
          <span>View all</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 4-Card Dynamic Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingProducts.map((product) => (
          <ProductCard key={product.productId} data={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingNearYou;