import axiosInstance from "./Axiosconfig";

export const subscribe = () => {
    return axiosInstance.post("/api/subscribe");
};