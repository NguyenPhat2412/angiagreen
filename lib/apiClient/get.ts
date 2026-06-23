import { AxiosRequestConfig } from "axios";
import { client } from "./client";

export const getRequest = <T>(endpoint: string, config?: AxiosRequestConfig) =>
  client<T>({ ...config, method: "GET", url: endpoint });
