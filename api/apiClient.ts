import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      return Promise.reject(new Error("Something went wrong with the server"));
    }
    return Promise.reject(error);
  }
);

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
