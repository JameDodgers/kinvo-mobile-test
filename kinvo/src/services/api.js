import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://6266f62263e0f382568936e4.mockapi.io/",
});

export default axiosInstance;
