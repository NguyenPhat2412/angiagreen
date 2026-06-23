import { AxiosRequestConfig } from "axios";
import { client } from "./client";

export const postRequest = <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
  client<T>({ ...config, method: "POST", url: endpoint, data });
