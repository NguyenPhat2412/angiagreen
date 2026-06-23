import { AxiosRequestConfig } from "axios";
import { client } from "./client";

export const patchRequest = <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
  client<T>({ ...config, method: "PATCH", url: endpoint, data });
