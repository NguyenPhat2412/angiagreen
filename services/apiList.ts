import type { PaginatedResponse } from "@/lib/types";

export const unwrapList = <T>(response: T[] | PaginatedResponse<T>) =>
  Array.isArray(response) ? response : response.items;
