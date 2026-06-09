import axios from 'axios';
import { apiBaseURL } from '@/config/appConfig';

const baseURL = apiBaseURL;

/**
 * Cliente API panel admin: Bearer Sanctum (guard admin), sin cookies CSRF de usuario.
 */
export const adminHttp = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

adminHttp.interceptors.request.use((config) => {
  const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem('admin_token') : null;
  if (raw) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${raw}`;
  }
  return config;
});

adminHttp.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      window.sessionStorage.removeItem('admin_token');
    }
    return Promise.reject(error);
  },
);

export default adminHttp;
