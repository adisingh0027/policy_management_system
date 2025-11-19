import axios from 'axios';
import { getApiBase } from '../utils/env';

export const api = axios.create({
  baseURL: getApiBase(),
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error?.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  }
);
