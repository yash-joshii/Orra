import axios from "axios";



export const adminAxios = axios.create({
  baseURL: "https://springboot-zn8k.onrender.com/api/admin",
  withCredentials: true, // sends sb-access-token cookie
});