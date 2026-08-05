import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Heart, Share2, MapPin, CheckCircle2 } from "lucide-react";

import {
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from "@/api/wishlist";
import LazyImage from "../common/LazyImage";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

const ProductDetails = ({ data, loading }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Retrieve authenticated user from Redux store
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id || user?.userId;

  useEffect(() => {
    if (!data?.productId || !userId) return;

    const fetchWishlistStatus = async () => {
      try {
        const response = await checkWishlist(userId, data.productId);
        setIsWishlisted(Boolean(response?.data));
      } catch (error) {
        console.error("Failed to check wishlist status:", error);
      }
    };

    fetchWishlistStatus();
  }, [data?.productId, userId]);

  // Gallery Images Fallback
  const images =
    data?.images?.length > 0
      ? data.images
      : [
          {
            imageUrl: "https://placehold.co/800x500?text=No+Image+Available",
          },
        ];

  // Included Items Array
  const includedItems = Array.isArray(data?.productspec)
    ? data.productspec
    : [
        "Camera Body",
        "24-70mm f/2.8 Lens",
        "2x Batteries",
        "Dual Charger",
        "128GB SD Card",
        "Carrying Case",
        "Lens Cleaning Kit",
      ];

  // Key Features Bullet List
  const features = data?.description
    ? data.description
        .split(".")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];

  // Toggle Wishlist Action
  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (!userId) {
      alert("Please log in to save items to your wishlist.");
      return;
    }

    try {
      setWishlistLoading(true);
      if (isWishlisted) {
        await removeFromWishlist(userId, data.productId);
        setIsWishlisted(false);
      } else {
        await addToWishlist(userId, data.productId);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist action error:", error.response?.data || error.message);
    } finally {
      setWishlistLoading(false);
    }
  };

  // Share Listing Logic
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data?.productName || "Equipment Listing",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Listing URL copied to clipboard!");
    }
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="space-y-8">
      
      {/* Primary Gallery Section */}
      <div className="space-y-4">
        {/* Main Banner Image */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-100 border border-slate-200/60 shadow-xs">
          <LazyImage
            src={images[selectedImage]?.imageUrl}
            alt={data?.productName || "Product photo"}
            className="w-full h-[380px] sm:h-[480px] object-cover transition-all duration-300"
          />

          {/* Quick Action Floating Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              disabled={wishlistLoading}
              onClick={handleWishlist}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white active:scale-95 transition-all text-slate-700 cursor-pointer disabled:opacity-50"
              aria-label="Wishlist button"
            >
              <Heart
                size={18}
                className={
                  isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-600"
                }
              />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white active:scale-95 transition-all text-slate-700 cursor-pointer"
              aria-label="Share button"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Thumbnail Gallery Row */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {images.map((img, index) => (
              <button
                key={img.id ?? index}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === index
                    ? "border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <LazyImage
                  src={img.imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title & Metadata Header */}
      <div className="space-y-2 border-b border-slate-200/60 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {data?.productName || "Unnamed Product"}
        </h1>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <MapPin size={15} className="text-indigo-600 shrink-0" />
          <span>{data?.location || "Downtown, San Francisco"}</span>
        </div>
      </div>

      {/* Description & Key Points */}
      <div className="space-y-4 border-b border-slate-200/60 pb-8">
        <h2 className="text-lg font-bold text-slate-900">About this equipment</h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          {data?.description ||
            "No description provided for this equipment listing."}
        </p>

        {features.length > 0 && (
          <ul className="space-y-2 pt-2">
            {features.map((featureItem, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{featureItem}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Included Specifications */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">What's included in the box</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {includedItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100/80 text-xs font-medium text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetails;