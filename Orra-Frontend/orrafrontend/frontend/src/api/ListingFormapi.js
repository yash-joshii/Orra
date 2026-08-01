import axiosinstance from "./Axiosconfig"


export const listdevice = (data)=>{
    console.log(data);
    return axiosinstance.post("/api/createProduct", data);
}               
