import axios from 'axios';

export const axiosService = axios.create({
    baseURL: 'http://localhost:3000'
});

const noAuthUrls = ["/auth/"];

axiosService.interceptors.request.use(
    (config) => {
        if (!noAuthUrls.some((url) => config.url?.includes(url))) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                window.location.href = '/login';
                return Promise.reject(new Error('No access token'));
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);