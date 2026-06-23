import { AxiosRequestConfig } from "axios";
import { apiClient } from "./instance";

export const client = <T>(config: AxiosRequestConfig): Promise<T> =>
  apiClient.request<T, T>(config);
