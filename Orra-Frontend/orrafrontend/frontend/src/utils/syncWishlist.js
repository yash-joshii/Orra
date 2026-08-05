import { addToWishlist, getWishlist } from "@/api/wishlist";
import { getGuestWishlist, clearGuestWishlist } from "@/utils/guestWishlist";

// Call this once, right after a successful login/signup, with the real userId.
export const syncWishlistOnLogin = async (userId) => {
  const guestItems = getGuestWishlist();

  if (!userId || guestItems.length === 0) {
    return;
  }

  try {
    // Get what's already saved for this user in the DB
    const existingRes = await getWishlist(userId);
    const existing = existingRes.data ?? [];

    const existingProductIds = new Set(
      existing.map((w) => w.productList?.productId ?? w.productId),
    );

    // Only push items that aren't already in the DB wishlist
    const toAdd = guestItems.filter((id) => !existingProductIds.has(id));

    await Promise.all(
      toAdd.map((productId) => addToWishlist(userId, productId).catch(() => null)),
    );

    clearGuestWishlist();
  } catch (err) {
    console.error("Wishlist sync failed:", err);
    // Leave localStorage intact if sync fails, so nothing is lost — user can retry on next login.
  }
};