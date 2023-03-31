import axios from 'axios';

import { getAccessToken } from './token.helper';

export const unauthedAxiosInterface = axios.create();
export const accessTokenAxiosInterface = axios.create();

accessTokenAxiosInterface.interceptors.request.use(
  async (request) => {
    const accessToken = getAccessToken();
    if (request.headers) {
      (request.headers as any)['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);
