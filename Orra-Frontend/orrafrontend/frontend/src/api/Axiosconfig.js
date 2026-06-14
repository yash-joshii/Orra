import axios from "axios";


const axiosinstance =  axios.create({
    baseURL:"http://localhost:8081",
    headers:{
        "Content-Type" : "application/json",
    },

})


export default axiosinstance;