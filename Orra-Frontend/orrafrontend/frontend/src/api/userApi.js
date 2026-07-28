import axiosinstance from "./Axiosconfig"


export const getUser = () => {
    
    return axiosinstance.get("/profile");
}

export const updateUserProfile = async (userData) => {
    return axiosinstance.put("/profile", userData);
};