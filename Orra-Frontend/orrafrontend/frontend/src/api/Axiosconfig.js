import { supabase } from "@/lib/supabaseclient";
import axios from "axios";


const axiosinstance = axios.create({

  baseURL:
    import.meta.env.VITE_SPRINGBOOT_API_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },

});


const paymentAxios = axios.create({

  baseURL:
    import.meta.env.VITE_DOTNET_API_URL,

});


// Supabase token for .NET API
paymentAxios.interceptors.request.use(
  async (config) => {

    const {
      data,
    } = await supabase.auth.getSession();


    const token =
      data?.session?.access_token;


    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

  },
  (error) => {

    return Promise.reject(error);

  }
);


export {
  paymentAxios
};


export default axiosinstance;