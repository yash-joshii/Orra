import axiosinstance from "./Axiosconfig"


export const SignupUser = (data)=>{

    return axiosinstance.post("/signup",data)

}

export const SignIn =(data) =>{
    return axiosinstance.get("/signin",data)
}