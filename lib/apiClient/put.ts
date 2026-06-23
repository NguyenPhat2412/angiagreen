import { AxiosRequestConfig } from "axios";
import { client } from "./client";

export const putRequest = <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
  client<T>({ ...config, method: "PUT", url: endpoint, data });
