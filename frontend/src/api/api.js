import axios from "axios";
import { jwtDecode } from "jwt-decode";
import store from "../features/state/store";
import { loginSuccess, logout } from "../features/state/auth.slice";
import { getCookie } from "../utils/cookies";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/`,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            originalRequest.url !== "auth/refresh"
        ) {
            try {
                const refreshResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true },
                );
                const { accessToken } = refreshResponse.data;
                const user = jwtDecode(accessToken);
                store.dispatch(loginSuccess({ user }));
                const newToken = getCookie("access");
                return api.request(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    },
);

export default api;
