import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    headers: {
        "Content-Type": " application/json",
        Accept: "application/json",
    },
    maxRedirects: 0,
});

api.interceptors.request.use(
    (config) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzYTBmNjBjZi0wM2ZhLWNkZGQtM2IxYi1kZmIwZTc3OGVlZjUiLCJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhYnAuaW8iLCJuYmYiOjE3MDMwNzY4NzYsImV4cCI6MTcwMzA4MDQ3NiwiaWF0IjoxNzAzMDc2ODc2fQ.2A7Fen9BquJsQ21jWCe9nKaL1IiS6E_gCxb1RgVmGys';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;