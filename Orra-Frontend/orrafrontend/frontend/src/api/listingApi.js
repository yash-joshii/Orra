import axiosinstance from "./Axiosconfig";

export const getAllProducts = () => {
  return axiosinstance.get("/api/product");
};
