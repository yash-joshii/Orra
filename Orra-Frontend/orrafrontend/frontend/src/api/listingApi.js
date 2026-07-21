import axiosinstance from "./Axiosconfig";

export const getAllProducts = () => {
  return axiosinstance.get("/api/product");
};

export const getProductById = (id) => {
  return axiosinstance.get(`/api/product/$(id)`);
};
