import axios from "axios";


export const createAPI = (onFailRequest) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    onFailRequest(response);

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};