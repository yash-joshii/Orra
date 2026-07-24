import axiosinstance from "./Axiosconfig"


export const listdevice = (data)=>{
    return axiosinstance.post("/api/createProduct");
}
