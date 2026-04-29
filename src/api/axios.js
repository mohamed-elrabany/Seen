import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NGROK_BASE_URL = import.meta.env.NGROK_API_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

// --- ADD THIS PART ---
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// --------------------

export default api;