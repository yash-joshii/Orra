import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWishlist, removeFromWishlist } from "@/api/wishlist";
import { getProductById } from "@/api/listingApi";
import WishlistCard from "@/components/common/WishlistCard";
import {
  getGuestWishlist,
  removeGuestWishlistItem,
} from "@/utils/guestWishlist";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setWishlist(response.data ?? []);
      } else {
        // Guest: localStorage only has productIds, so fetch full product
        // details for each one to reuse WishlistCard.
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
      }
    } catch (err) {
      console.log(err);
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
      } catch (err) {
        console.log(err);
      }
    } else {
      removeGuestWishlistItem(productId);
      setWishlist((prev) =>
        prev.filter((item) => item.productList.productId !== productId),
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] px-10 py-10">
      <h1 className="text-4xl font-bold mb-2">
        ❤️ My Wishlist
      </h1>

      <p className="text-gray-500 mb-8">
        {isLoggedIn
          ? "Products you've saved for later."
          : "Products you've saved for later. Log in to keep them saved to your account permanently."}
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-2">
            Start adding products you love.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
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
  );
};

export default Wishlist;
