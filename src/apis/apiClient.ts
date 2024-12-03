import { USER_ACCESS_KEY } from "@/utils/enums";
import axios from "axios";
import Cookies from "js-cookie";

// const apiClient = axios.create({ baseURL: process.env.REACT_APP_API_URL });
const apiClient = axios.create({
  baseURL: "http://localhost:8085/kafka-queue",
});

console.log(apiClient);
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get(USER_ACCESS_KEY.TOKEN);
    if (accessToken) {
      config.headers["accesstoken"] = `Bearer ${accessToken}`;
      config.headers["content-type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(new Error(error.response.data))
);

apiClient.interceptors.response.use(
  (response) => {
    response.data = {
      statusCode: response.status,
      response: response.data,
    };
    return response;
  },
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      typeof window !== "undefined"
    ) {
      //   Cookies.remove(USER_ACCESS_KEY.TOKEN);
    } else if (
      error.response &&
      (error.response.status === 400 || error.response.status === 404)
    ) {
      window.location.href = "/not-access";
    } else if (error.response.status === 500 || error.response.status === 503) {
      alert("Server under maintenance");
    }

    return Promise.reject({
      status: error.response?.status,
      response: error.response?.data,
      message: error.message,
    });
  }
);

export default apiClient;
