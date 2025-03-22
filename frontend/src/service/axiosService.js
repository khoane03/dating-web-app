import axios from 'axios';
import { refreshToken } from './authService';
import { getAccessToken, setAccessToken, removeAccessToken } from '../service/localstore';

export const axiosService = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

const noAuthUrls = ["/auth/"];

axiosService.interceptors.request.use(
    async (config) => {
      if (noAuthUrls.some((url) => config.url?.includes(url))) return config;
  
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
  
      try {
        const response = await refreshToken();
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;
      } catch (error) {
        console.error("Refresh token failed:", error);
        removeAccessToken();
        window.location.href = "/intro";
        return Promise.reject(error);
      }
    },
    (error) => Promise.reject(error)
  );
  

axiosService.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        if (!error.config || !noAuthUrls.some((url) => error.config.url?.includes(url))) {
            if (!error.response) {
                return Promise.reject(error);
            }

            const originalRequest = error.config;
            switch (error.response.status) {
                case 401:
                    if (!originalRequest._retry) {
                        originalRequest._retry = true;
                        try {
                            const response = await refreshToken();
                            const newAccessToken = response.data.accessToken;
                            setAccessToken(newAccessToken);
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axiosService(originalRequest);
                        } catch (refreshError) {
                            console.error("Refresh token failed:", refreshError);
                            removeAccessToken();
                            window.location.href = '/intro';
                            return Promise.reject(refreshError);
                        }
                    }
                    break;

                case 403:
                    console.error("Forbidden: Access denied");
                    window.location.href = '/no-permission';
                    break;

                case 404:
                    console.error("Not Found: Redirecting to 404 page");
                    window.location.href = '/404';
                    break;

                default:
                    console.error(`Unhandled status code: ${error.response.status}`);
                 //   window.location.href = '/intro';
                    break;
            }
        }
        return Promise.reject(error);
    }
);