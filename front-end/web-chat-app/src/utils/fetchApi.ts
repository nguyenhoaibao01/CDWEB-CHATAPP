/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Helper from './Helper';
import { API_URL } from './config';

const authToken: any = Helper.getAuthToken();
const headers = {
  'Content-Type': 'text/plain',
  ...(authToken && { Authorization: `Bearer ${Helper.getAuthToken()}` }),
};
const fetchApi = {
  post: (url, body) => {
    return fetch(`${API_URL}/${url}`, {
      method: 'POST',
      headers,
      body,
    }).then((response) => response.json());
  },
  put: (url, body) => {
    return fetch(`${API_URL}/${url}`, {
      method: 'put',
      headers,
      body,
    }).then((response) => response.json());
  },
};

export default fetchApi;
