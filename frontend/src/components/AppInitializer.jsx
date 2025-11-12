import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../features/state/authSlice";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../utils/cookies";
import api from "../api/api";

const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeAuth = async () => {
            let token = getCookie("access");
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const currentTime = Date.now();
                    if (decoded.exp > currentTime) {
                        dispatch(loginSuccess({ user: decoded }));
                        return;
                    }
                } catch (error) {}
            }

            try {
                const response = await api.post(
                    "auth/refresh",
                    {},
                    { withCredentials: true },
                );
                const newToken = getCookie("access");
                if (newToken) {
                    const decoded = jwtDecode(newToken);
                    dispatch(loginSuccess({ user: decoded }));
                } else {
                    throw new Error("No new token");
                }
            } catch (refreshError) {
                dispatch(logout());
            }
        };

        initializeAuth();
    }, [dispatch]);

    return children;
};

export default AppInitializer;
