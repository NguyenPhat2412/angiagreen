import type { PaginatedResponse } from "@/interface/types";

export const unwrapList = <T>(response: T[] | PaginatedResponse<T>) =>
  Array.isArray(response) ? response : response.items;
