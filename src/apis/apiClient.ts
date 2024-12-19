import { USER_ACCESS_KEY } from "@/utils/enums";
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://172.19.2.12",
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get(USER_ACCESS_KEY.TOKEN);

    if (accessToken) {
      config.headers.set("accesstoken", `Bearer ${accessToken}`);
    }
    config.headers.set("content-type", "application/json");

    if (
      config.method?.toLowerCase() === "get" ||
      config.method?.toLowerCase() === "delete"
    ) {
      config.params = {
        ...config.params,
        isAdmin: true,
      };
    } else {
      const currentData = config.data || {};
      if (typeof currentData === "string") {
        try {
          const parsedData = JSON.parse(currentData);
          config.data = JSON.stringify({ ...parsedData, isAdmin: true });
        } catch (e) {
          config.data = currentData;
        }
      } else {
        config.data = {
          ...currentData,
          isAdmin: true,
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(new Error(error.response?.data))
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    response.data = {
      statusCode: response.status,
      response: response.data,
    };
    return response;
  },
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      Cookies.remove(USER_ACCESS_KEY.TOKEN);
    } else if (
      error.response &&
      (error.response.status === 400 || error.response.status === 404)
    ) {
      // window.location.href = "/not-access";
    } else if (
      error.response?.status === 500 ||
      error.response?.status === 503
    ) {
      // alert("Server under maintenance");
    }

    return Promise.reject({
      status: error.response?.status,
      response: error.response?.data,
      message: error.message,
    });
  }
);

export default apiClient;
