import axios from 'axios';
import { refreshToken } from './authService';
import { getAccessToken, setAccessToken, removeAccessToken } from '../utils/token';

export const axiosService = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true 
});

const noAuthUrls = ["/auth/"];

axiosService.interceptors.request.use(
    (config) => {
        if (!noAuthUrls.some((url) => config.url?.includes(url))) {
            const token = getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                window.location.href = '/login';
                return Promise.reject(new Error('No access token'));
            }
        }
        return config;
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
                            const newAccessToken = response.accessToken;
                            setAccessToken(newAccessToken);

                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axiosService(originalRequest);
                        } catch (refreshError) {
                            console.error("Refresh token failed:", refreshError);
                            removeAccessToken();
                            window.location.href = '/login';
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
                    break;
            }
        }
        return Promise.reject(error);
    }
);