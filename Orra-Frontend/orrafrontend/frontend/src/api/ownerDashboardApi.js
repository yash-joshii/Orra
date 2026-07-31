import axiosinstance from "./Axiosconfig";

export const getDashboard = async () => {
  return await axiosinstance.get("/owner/dashboard");
};