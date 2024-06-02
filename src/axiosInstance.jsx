import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://donkey-archive-af41e8314602.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
