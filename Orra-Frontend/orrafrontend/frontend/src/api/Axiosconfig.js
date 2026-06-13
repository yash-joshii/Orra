import axios from "axios";


const axiosinstance =  axios.create({
    baseURL:"http://localhost:8081/api",
    headers:{
        "Content-Type" : "application/json",
    },

})


export default axiosinstance;