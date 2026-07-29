import axiosinstance from "./Axiosconfig"


export const getUser = () => {
    return axiosinstance.get("/api/profile", { withCredentials: true });
};

export const updateUserProfile = async (userData) => {
    return axiosinstance.put("/api/profile", userData, { withCredentials: true });
};