import React from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

const categories = [
  "ALL",
  "LAPTOP",
  "CAMERA",
  "MOBILE",
  "REFRIGERATOR",
  "TV"
];

const FilterationSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedCategory = searchParams.get("category") || "ALL";
  const maxPrice = Number(searchParams.get("maxPrice")) || 150;

  const handleCategoryClick = (cat) => {
    if (cat === "ALL") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const handleMaxPriceChange = (value) => {
    const numValue = Number(value);
    if (numValue >= 200) {
      searchParams.delete("maxPrice");
    } else {
      searchParams.set("maxPrice", numValue);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const handleReset = () => {
    searchParams.delete("category");
    searchParams.delete("maxPrice");
    setSearchParams(searchParams);
  };

  const isFiltered = selectedCategory !== "ALL" || searchParams.has("maxPrice");

  return (
    <div className="w-full bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 sm:p-7">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#f0f0ff] rounded-lg text-[#544be9]">
            <SlidersHorizontal className="w-5 h-5" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Filters</h3>
        </div>
        
        {isFiltered && (
          <button
            onClick={handleReset}
            className="text-sm font-bold text-[#544be9] hover:text-indigo-700 transition-colors bg-transparent border-none cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {/* Category Section */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 pl-2">
          Category
        </p>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <label
                key={cat}
                className={`flex items-center gap-3 cursor-pointer py-2.5 px-3 rounded-xl transition-all duration-200 group ${
                  isActive ? "bg-[#f0f0ff]" : "hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {/* Custom Radio Button */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                    isActive
                      ? "border-[#544be9] bg-white"
                      : "border-gray-300 bg-transparent group-hover:border-[#544be9]"
                  }`}
                >
                  <div 
                    className={`w-2 h-2 rounded-full bg-[#544be9] transition-transform duration-200 ${
                      isActive ? "scale-100" : "scale-0"
                    }`} 
                  />
                </div>
                
                {/* Label Text */}
                <span
                  className={`text-[14px] transition-colors duration-200 ${
                    isActive
                      ? "text-[#544be9] font-bold"
                      : "text-gray-600 font-medium group-hover:text-gray-900"
                  }`}
                >
                  {cat === "ALL" ? "All Categories" : cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 my-8" />

      {/* Max Price Section */}
      <div>
        <div className="flex items-center justify-between mb-6 pl-2">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Max Price
          </p>
          <span className="text-xs font-bold text-[#544be9] bg-[#f0f0ff] px-2.5 py-1 rounded-md">
            ${maxPrice}/day
          </span>
        </div>
        
        <div className="px-2">
          <input
            type="range"
            min={10}
            max={200}
            value={maxPrice}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#544be9]"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-medium text-gray-400">$10</span>
            <span className="text-xs font-medium text-gray-400">$200+</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FilterationSidebar;