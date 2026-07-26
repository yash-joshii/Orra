// import axios from "axios";

// const axiosinstance = axios.create({
//   baseURL: "http://localhost:8081",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosinstance;

import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosinstance;