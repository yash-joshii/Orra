import axios from "axios";

const axiosinstance = axios.create({
  baseURL: import.meta.env.VITE_SPRINGBOOT_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const paymentAxios = axios.create({
  baseURL: import.meta.env.VITE_DOTNET_API_URL,
});

export { paymentAxios };
export default axiosinstance;