import React, { useEffect, useState } from "react";
import { Heart, Share2, Star, MapPin, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from "@/api/wishlist";

const ProductDetails = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
useEffect(() => {
  if (!data?.productId) return;

  const fetchWishlistStatus = async () => {
    try {
      const response = await checkWishlist(userId, data.productId);
      setIsWishlisted(response.data);
    } catch (error) {
      console.log(error);
    }
  };
const handleWishlist = async () => {
  try {
    if (isWishlisted) {
      await removeFromWishlist(userId, data.productId);
      setIsWishlisted(false);
    } else {
      await addToWishlist(userId, data.productId);
      setIsWishlisted(true);
    }
  } catch (error) {
    console.log(error);
  }
};
  fetchWishlistStatus();
}, [data]);
const userId = 1;

  const images =
    data?.images?.length > 0
      ? data.images
      : ["https://placehold.co/800x500?text=No+Image"];

  const includedItems = data?.productspec || [
    "Camera Body",
    "24-70mm f/2.8 Lens",
    "2x Batteries",
    "Dual Charger",
    "128GB SD Card",
    "Carrying Case",
    "Lens Cleaning Kit",
    "Shoulder Strap",
  ];

  const feature = data?.description
    ? data.description
        .split(".")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      {/* Image */}
      <div className="relative">
        <img
          src={images[selectedImage]?.imageBase64}
          alt={data?.productName}
          className="w-full h-[500px] rounded-3xl object-cover"
        />

        <div className="absolute top-4 right-4 flex gap-2">
         <button
  onClick={handleWishlist}
  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
>
  <Heart
    size={20}
    className={
      isWishlisted
        ? "fill-red-500 text-red-500"
        : "text-gray-500"
    }
  />
</button>

          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="flex gap-3 mt-4">
        {images.map((img, index) => (
          <img
            key={img.id ?? index}
            src={img.imageBase64}
            alt=""
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 transition ${
              selectedImage === index
                ? "border-indigo-600"
                : "border-transparent"
            }`}
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="mt-7">
        <h1 className="text-3xl font-bold">{data?.productName}</h1>

        <div className="flex items-center gap-2 mt-2">
          {/* <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">
            {data?.rating || 4.9}
          </span>

          <span className="text-sm text-gray-500">
            ({data?.reviews || 24} Reviews)
          </span>

          <span className="text-gray-300">•</span> */}

          <MapPin size={16} className="text-gray-500" />

          <span className="text-sm text-gray-500">
            {data?.location || "Downtown, San Francisco"}
          </span>
        </div>
      </div>

      {/* About */}
      <div className="mt-10 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">About this product</h2>

        <p className="text-gray-600 leading-7">
          {data?.description ||
            "Perfect condition Sony A7 IV full-frame mirrorless camera paired with the versatile Sony FE 24-70mm f/2.8 GM lens. This setup is perfect for both professional photography and high-end video work."}
        </p>

        <ul className="mt-6 space-y-2">
          {feature.map((feature, index) => (
            <div key={index} className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
              <p className="text-gray-600">{feature}</p>
            </div>
          ))}
        </ul>
      </div>

      {/* Included */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-bold mb-6">What's included</h2>

        <div className="grid md:grid-cols-2 gap-y-4">
          {includedItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />

              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
