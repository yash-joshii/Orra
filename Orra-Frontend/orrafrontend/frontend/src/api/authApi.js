// import axiosinstance from "./Axiosconfig"

import axiosinstance from "./Axiosconfig"

export const SignupUser = (data) => {
    return axiosinstance.post("/signup", data);
}


export const SignIn = (data) => {
    return axiosinstance.get("/signin", data);
}



//arrow function converted to normal function of signup
// function SignupUser(data){
//     return axiosinstance.post("/signup", data);
// }

//arrow function
// const add = (a, b) => {
//   return a + b;
// };

//normal function
// function add(a, b) {
//   return a + b;
// }