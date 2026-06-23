import { BASE_URL, apiClient } from "./apiClient/instance";
import { getRequest } from "./apiClient/get";
import { postRequest } from "./apiClient/post";
import { putRequest } from "./apiClient/put";
import { patchRequest } from "./apiClient/patch";
import { deleteRequest } from "./apiClient/delete";

export { BASE_URL, apiClient };

export const api = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  patch: patchRequest,
  delete: deleteRequest,
};

export default api;
