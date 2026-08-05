 import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Components & Helpers
import CategoryCard from "@/components/common/CategoryCard";
import { getCategoryStyle, formatCategoryLabel } from "@/constants/categoryStyle";

const categoriesData = [
  {
    category: "laptops",
    description: "MacBooks & PCs for work or play",
    deviceCount: 245,
    trending: true,
  },
  {
    category: "cameras",
    description: "Mirrorless, DSLR & cinema cameras",
    deviceCount: 182,
    trending: true,
  },
  {
    category: "consoles",
    description: "PS5, Xbox & Switch bundles",
    deviceCount: 94,
  },
  {
    category: "drones",
    description: "Aerial photography & FPV drones",
    deviceCount: 67,
  },
  {
    category: "smartphones",
    description: "Latest iPhones & Android flags",
    deviceCount: 312,
  },
  {
    category: "watches",
    description: "Apple Watch & fitness trackers",
    deviceCount: 89,
  },
  {
    category: "audio",
    description: "Headphones, speakers & mics",
    deviceCount: 156,
  },
  {
    category: "monitors",
    description: "4K displays, docks & peripherals",
    deviceCount: 123,
  },
];

const ExploreCategory = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-50 px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section with Title, Description, and View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Browse by Category
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              Find the perfect gadget for work, gaming, photography, travel, and everyday use.
            </p>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors shrink-0 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Column Responsive Grid using CategoryCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((cat) => {
            const { icon, iconBg, iconColor } = getCategoryStyle(cat.category);

            return (
              <CategoryCard
                key={cat.category}
                name={formatCategoryLabel(cat.category)}
                description={cat.description}
                deviceCount={cat.deviceCount}
                icon={icon}
                iconBg={iconBg}
                iconColor={iconColor}
                trending={cat.trending}
                onClick={() =>
                  navigate(`/browserdevices?category=${cat.category}`)
                }
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ExploreCategory;