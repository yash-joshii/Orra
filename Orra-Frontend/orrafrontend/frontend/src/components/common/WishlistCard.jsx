import React from "react";
import { Heart, MapPin, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

const WishlistCard = ({ data, onRemove }) => {
  const navigate = useNavigate();

  const imageUrl =
    data.images?.[0]?.imageUrl ||
    "https://placehold.co/180x180?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 hover:shadow-lg transition-shadow duration-300 w-full group">
      
      {/* Left Section - Image & Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full overflow-hidden">
        
        {/* Responsive Image */}
        <LazyImage
          src={imageUrl}
          alt={data.productName}
          className="w-full sm:w-36 md:w-40 h-48 sm:h-36 md:h-40 rounded-xl object-cover shrink-0 bg-gray-50 border border-gray-100"
        />

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col w-full">
          <span className="inline-flex w-fit px-2.5 py-1 mb-2 bg-indigo-50 text-[#544be9] rounded-lg text-[10px] sm:text-xs font-bold tracking-wider uppercase border border-indigo-100/50">
            {data.category}
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 truncate tracking-tight mb-1">
            {data.productName}
          </h2>

          <p className="text-sm sm:text-base text-gray-500 font-medium truncate">
            {data.brand} {data.model}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 sm:mt-4 gap-3">
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <span className="truncate">{data.location || "Location not available"}</span>
            </p>

            <p className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              ₹{data.dailyRate}
              <span className="text-xs sm:text-sm text-gray-500 font-medium ml-1 tracking-normal">
                / day
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Action Buttons */}
      <div className="flex flex-row sm:flex-col w-full sm:w-auto gap-3 shrink-0 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        
        <button
          onClick={() => navigate(`/product/${data.productId}`)}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#544be9] text-white px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200"
        >
          <Eye size={18} />
          <span>View Details</span>
        </button>

        <button
          onClick={() => onRemove(data.productId)}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold hover:bg-red-100 active:scale-[0.98] transition-all duration-200 border border-red-100/50"
        >
          <Heart size={18} fill="currentColor" className="text-red-500" />
          <span>Remove</span>
        </button>
        
      </div>

    </div>
  );
};

export default WishlistCard;