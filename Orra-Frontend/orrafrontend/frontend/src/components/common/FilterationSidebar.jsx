import { useState } from "react";
import { SlidersHorizontal, Star } from "lucide-react";

const categories = ["All", "Cameras", "Laptops", "Drones", "Gaming", "Tablets", "VR & AR"];

const FilterationSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(150);
  const [minRating, setMinRating] = useState(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  return (
    <div className="w-[300px] bg-white rounded-2xl border border-[#EEF0F3] shadow-sm p-6 ml-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <SlidersHorizontal className="w-5 h-5 text-[#5046E5]" strokeWidth={2} />
        <h3 className="text-[17px] font-bold text-[#111827]">Filters</h3>
      </div>

      {/* Category */}
      <div className="mb-6">
        <p className="text-[12px] font-bold tracking-wide text-[#111827] mb-4">
          CATEGORY
        </p>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedCategory === cat
                    ? "border-[#5046E5] bg-white"
                    : "border-[#D1D5DB] bg-[#374151]"
                }`}
              >
                {selectedCategory === cat && (
                  <span className="w-2 h-2 rounded-full bg-[#5046E5]" />
                )}
              </span>
              <span
                className={`text-[14px] ${
                  selectedCategory === cat
                    ? "text-[#5046E5] font-semibold"
                    : "text-[#6B7280]"
                }`}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#F3F4F6] my-6" />

      {/* Max Price */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-bold tracking-wide text-[#111827]">
            MAX PRICE
          </p>
          <span className="text-[12px] font-bold text-[#5046E5] bg-[#EEF0FF] px-2 py-1 rounded-md">
            ${maxPrice}/day
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={200}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#5046E5] cursor-pointer"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[12px] text-[#9CA3AF]">$10</span>
          <span className="text-[12px] text-[#9CA3AF]">$200+</span>
        </div>
      </div>

      <div className="h-[1px] bg-[#F3F4F6] my-6" />

      {/* Minimum Rating */}
      <div className="mb-6">
        <p className="text-[12px] font-bold tracking-wide text-[#111827] mb-4">
          MINIMUM RATING
        </p>
        <div className="flex flex-col gap-3">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setMinRating(rating)}
            >
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  minRating === rating
                    ? "border-[#5046E5] bg-white"
                    : "border-[#D1D5DB] bg-[#374151]"
                }`}
              >
                {minRating === rating && (
                  <span className="w-2 h-2 rounded-full bg-[#5046E5]" />
                )}
              </span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= rating
                        ? "fill-[#FBBF24] text-[#FBBF24]"
                        : "fill-[#E5E7EB] text-[#E5E7EB]"
                    }`}
                  />
                ))}
              </span>
              <span className="text-[13px] text-[#6B7280]">& Up</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#F3F4F6] my-6" />

      {/* Availability */}
      <div>
        <p className="text-[12px] font-bold tracking-wide text-[#111827] mb-4">
          AVAILABILITY
        </p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => setShowOnlyAvailable(e.target.checked)}
            className="w-4 h-4 rounded accent-[#5046E5] cursor-pointer"
          />
          <span className="text-[14px] text-[#374151]">Show only available</span>
        </label>
      </div>
    </div>
  );
}

export default FilterationSidebar