import { AxiosRequestConfig } from "axios";
import { client } from "./client";

export const deleteRequest = <T>(endpoint: string, config?: AxiosRequestConfig) =>
  client<T>({ ...config, method: "DELETE", url: endpoint });
