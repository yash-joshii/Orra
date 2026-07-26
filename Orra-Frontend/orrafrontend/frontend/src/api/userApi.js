import axiosinstance from "./Axiosconfig"


export const getUser = () => {
    
    return axiosinstance.get("/profile");
}