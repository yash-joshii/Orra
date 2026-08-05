import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "@/api/wishlist";
import { getProductById } from "@/api/listingApi";
import WishlistCard from "@/components/common/WishlistCard";
import {
  getGuestWishlist,
  removeGuestWishlistItem,
} from "@/utils/guestWishlist";
import { setWishlistCount, decrementWishlistCount } from "@/redux/slices/wishlistSlice";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth) || {};
  const userId = user?.userId ?? user?.id;
  const isLoggedIn = Boolean(userId);

  useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      if (isLoggedIn) {
        const response = await getWishlist(userId);
        const items = response.data ?? [];
        setWishlist(items);
        dispatch(setWishlistCount(items.length));
      } else {
        // Guest: localStorage only has productIds, fetch full product details for each
        const guestIds = getGuestWishlist();

        const products = await Promise.all(
          guestIds.map((id) =>
            getProductById(id)
              .then((res) => res.data)
              .catch(() => null),
          ),
        );

        const items = products
          .filter(Boolean)
          .map((product) => ({
            wishlistId: `guest-${product.productId}`,
            productList: product,
          }));

        setWishlist(items);
        dispatch(setWishlistCount(items.length));
      }
    } catch (err) {
      console.error("Failed to load wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    if (isLoggedIn) {
      try {
        await removeFromWishlist(userId, productId);
        setWishlist((prev) =>
          prev.filter((item) => item.productList.productId !== productId),
        );
        dispatch(decrementWishlistCount());
      } catch (err) {
        console.error("Failed to remove item:", err);
      }
    } else {
      removeGuestWishlistItem(productId);
      setWishlist((prev) =>
        prev.filter((item) => item.productList.productId !== productId),
      );
      dispatch(decrementWishlistCount());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 selection:bg-[#544be9] selection:text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                My Wishlist
              </h1>
              {!loading && (
                <span className="bg-[#544be9]/10 text-[#544be9] text-xs sm:text-sm font-bold px-3 py-1 rounded-full border border-[#544be9]/20">
                  {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
                </span>
              )}
            </div>
            <p className="text-gray-500 font-medium text-sm sm:text-base">
              {isLoggedIn
                ? "Keep track of high-end equipment you plan to rent or acquire."
                : "Your saved items. Log in to permanently save them across all devices."}
            </p>
          </div>

          {!isLoggedIn && (
            <Link
              to="/login"
              className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-[#544be9] bg-indigo-50 border border-indigo-100 px-4 py-2.5 rounded-xl hover:bg-indigo-100 transition-all duration-200 shrink-0"
            >
              Log in to sync wishlist →
            </Link>
          )}
        </div>

        {/* Guest Warning Banner */}
        {!isLoggedIn && wishlist.length > 0 && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm font-medium">
                You are viewing a guest wishlist. Items are stored temporarily in your browser.
              </p>
            </div>
            <Link
              to="/login"
              className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-amber-900 hover:underline shrink-0"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          /* Animated Skeleton Loading State */
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="w-full bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-full sm:w-36 h-36 bg-gray-200 rounded-xl shrink-0" />
                <div className="flex-1 w-full space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-6 bg-gray-200 rounded w-1/4 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : wishlist.length === 0 ? (
          /* Empty State View */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto my-6">
            <div className="w-20 h-20 rounded-full bg-indigo-50 text-[#544be9] flex items-center justify-center mb-5 shadow-inner">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Wishlist is Empty
            </h2>
            
            <p className="text-gray-500 font-medium max-w-md mb-8 text-sm sm:text-base">
              Looks like you haven't saved any gear yet. Explore our extensive catalog to discover high-end electronics available for rent.
            </p>

            <Link
              to="/browserdevices"
              className="bg-[#544be9] hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Browse Catalog</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        ) : (
          /* Wishlist Items List */
          <div className="flex flex-col gap-5">
            {wishlist.map((item) => (
              <WishlistCard
                key={item.wishlistId}
                data={item.productList}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;