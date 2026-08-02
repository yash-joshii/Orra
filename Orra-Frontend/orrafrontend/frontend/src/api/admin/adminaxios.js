import axios from "axios";



export const adminAxios = axios.create({
  baseURL: "http://localhost:8081/api/admin",
  withCredentials: true, // sends sb-access-token cookie
});