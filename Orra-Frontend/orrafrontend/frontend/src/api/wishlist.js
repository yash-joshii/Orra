import api from "./Axiosconfig";


export const addToWishlist = (userId, productId) => {
  return api.post(`/wishlist/add?userId=${userId}&productId=${productId}`);
};




export const getWishlist = (userId) => {
  return api.get(`/wishlist/userWishlist?userId=${userId}`);
};


export const checkWishlist = (userId, productId) => {
  return api.get(`/wishlist/check?userId=${userId}&productId=${productId}`);


};

 export const removeFromWishlist = (userId, productId) => {
  return api.delete(`/wishlist/delete?userId=${userId}&productId=${productId}`);
};