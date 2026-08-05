import axiosinstance from "./Axiosconfig";

export const getAllProducts = () => {
  return axiosinstance.get("/api/product");
};

export const searchProducts = (keyword) => {
  return axiosinstance.get(`/api/products/search?keyword=${keyword}`);
};
export const getProductById = (id) => {
  return axiosinstance.get(`/api/product/${id}`);
};

export const getCategorySummary = () => {
  return axiosinstance.get("/api/product/categories/summary");
};

// ✅ Hits /api/product/user/me (Authorization header attached automatically)
export const getMyListings = () => {
  return axiosinstance.get("/api/product/user/me");
};

export const updateProduct = (productId, payload) => {
  return axiosinstance.patch(`/api/product/${productId}`, payload);
};

export const deleteProduct = (productId) => {
  return axiosinstance.delete(`/api/product/${productId}`);
};