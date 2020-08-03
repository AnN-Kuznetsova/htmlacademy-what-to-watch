import axios from "axios";


export const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  VALIDATION: `VALIDATION`,
};


export const createAPI = (onFailRequest) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    onFailRequest(error);

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
