const STORAGE_KEY = "guest_wishlist";

// Returns an array of productIds (numbers) stored locally for a guest user.
export const getGuestWishlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveGuestWishlist = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const isInGuestWishlist = (productId) => {
  return getGuestWishlist().includes(productId);
};

export const addGuestWishlistItem = (productId) => {
  const list = getGuestWishlist();
  if (!list.includes(productId)) {
    list.push(productId);
    saveGuestWishlist(list);
  }
  return list;
};

export const removeGuestWishlistItem = (productId) => {
  const list = getGuestWishlist().filter((id) => id !== productId);
  saveGuestWishlist(list);
  return list;
};

export const clearGuestWishlist = () => {
  localStorage.removeItem(STORAGE_KEY);
};