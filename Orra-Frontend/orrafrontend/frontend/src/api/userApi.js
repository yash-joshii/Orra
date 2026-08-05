import axiosinstance from "./Axiosconfig"

export const getUser = () => {
    return axiosinstance.get("/api/profile", { withCredentials: true });
};

export const updateUserProfile = async (userData) => {
    return axiosinstance.put("/api/profile", userData, { withCredentials: true });
};

export const uploadAvatar = (formData) => {
    return axiosinstance.post("/api/profile/avatar", formData, {
        withCredentials: true,
        headers: { "Content-Type": undefined }, // let axios set multipart boundary itself
    });
};