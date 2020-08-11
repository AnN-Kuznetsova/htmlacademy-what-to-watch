import axios from "axios";


const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAGE_NOT_FOUND: 404,
  VALIDATION: `VALIDATION`,
};


const createAPI = (onFailRequest) => {
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


export {
  Error,
  createAPI,
};
