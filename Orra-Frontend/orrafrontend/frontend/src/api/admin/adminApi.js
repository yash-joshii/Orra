
import { adminAxios } from "./adminaxios";



export const getDashboardStats = () => {
  return adminAxios.get("/dashboard");
};

export const getUsers = (role, status, page = 0, size = 10) => {
  return adminAxios.get("/users", { params: { role, status, page, size } });
};

export const verifyUser = (id) => {
  return adminAxios.patch(`/users/${id}/verify`);
};

export const blockUser = (id) => {
  return adminAxios.patch(`/users/${id}/block`);
};

export const unblockUser = (id) => {
  return adminAxios.patch(`/users/${id}/unblock`);
};

export const getProducts = (status, page = 0, size = 10) => {
  return adminAxios.get("/products", { params: { status, page, size } });
};

export const approveProduct = (id) => {
  return adminAxios.patch(`/products/${id}/approve`);
};

export const rejectProduct = (id) => {
  return adminAxios.patch(`/products/${id}/reject`);
};

export const disableProduct = (id) => {
  return adminAxios.patch(`/products/${id}/disable`);
};