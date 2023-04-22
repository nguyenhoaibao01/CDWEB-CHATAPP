/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';

import { API_URL } from './config';
import Helper from './Helper';

const service = axios.create({
  baseURL: API_URL,
  timeout: 90000,
});

function refreshToken() {
  return service.post(`${API_URL}/v1/authentication/refresh`, {
    refreshToken: `Bearer ${Helper.getAuthrefreshToken()}`,
  });
}

service.interceptors.request.use(
  (config) => {
    const authToken: any = Helper.getAuthToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },

  async (error) => {
    console.log('error - ', error);
    const { code } = error.response.data;
    if (code === 401) {
      return refreshToken().then((rs) => {
        const { accessToken } = rs.data;
        Helper.storeAuthToken(accessToken);
        const config = error.config;
        config.baseURL = API_URL;
        return service(config);
      });
    }
    return Promise.reject(error.response.data);
  },
);
export default service;