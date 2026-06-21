
import axiosinstance from "./Axiosconfig";


export const SignupUser = (data)=>{
   console.log(data);
    return axiosinstance.post("/api/users/signup",data);

}

export const SignIn =(data) =>{
    console.log(data);
    return axiosinstance.post("/signin",data);
}