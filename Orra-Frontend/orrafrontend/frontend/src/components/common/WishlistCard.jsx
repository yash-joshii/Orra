import React from "react";
import { Heart, MapPin, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ data, onRemove }) => {
  const navigate = useNavigate();

  const imageUrl =
    data.images?.length > 0
      ? data.images[0].imageBase64
      : "https://placehold.co/180x180?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">

      {/* Left Section */}
      <div className="flex items-center gap-5">

        <img
          src={imageUrl}
          alt={data.productName}
          className="w-36 h-36 rounded-xl object-cover"
        />

        <div>
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
            {data.category}
          </span>

          <h2 className="text-2xl font-bold mt-3">
            {data.productName}
          </h2>

          <p className="text-gray-500 mt-1">
            {data.brand} {data.model}
          </p>

          <p className="flex items-center gap-1 text-gray-500 mt-2">
            <MapPin size={16} />
            {data.location || "Location not available"}
          </p>

          <p className="text-2xl font-bold mt-3">
            ₹{data.dailyRate}
            <span className="text-sm text-gray-500 font-normal">
              {" "}
              / day
            </span>
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-4">

        <button
          onClick={() => onRemove(data.productId)}
          className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-xl hover:bg-red-200 transition"
        >
          <Heart size={18} fill="currentColor" />
          Remove
        </button>

        <button
          onClick={() => navigate(`/product/${data.productId}`)}
          className="flex items-center justify-center gap-2 bg-[#5B4CF6] text-white px-5 py-2 rounded-xl hover:bg-[#4b3df0] transition"
        >
          <Eye size={18} />
          View Details
        </button>

      </div>

    </div>
  );
};

export default WishlistCard;