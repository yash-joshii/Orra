import axios from "axios";

const axiosinstance = axios.create({
  baseURL: import.meta.env.VITE_SPRINGBOOT_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosinstance.interceptors.request.use(
  (config) => {
    // Make sure the key matches where you store the token upon login (e.g., 'token', 'jwtToken', etc.)
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const paymentAxios = axios.create({
  baseURL: import.meta.env.VITE_DOTNET_API_URL,
});

export { paymentAxios };
export default axiosinstance;