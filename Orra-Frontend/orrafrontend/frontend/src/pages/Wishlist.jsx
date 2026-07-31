import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "@/api/wishlist";
import WishlistCard from "@/components/common/WishlistCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist(1); // Replace 1 with logged-in user's ID later
      console.log(response.data);
      setWishlist(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(1, productId);

      // Remove from UI immediately
      setWishlist((prev) =>
        prev.filter((item) => item.productList.productId !== productId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] px-10 py-10">
      <h1 className="text-4xl font-bold mb-2">
        ❤️ My Wishlist
      </h1>

      <p className="text-gray-500 mb-8">
        Products you've saved for later.
      </p>

      {wishlist.length === 0 ? (
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