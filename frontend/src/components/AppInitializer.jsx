import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../features/state/authSlice";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../utils/cookies";

const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie("access");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now();
                if (decoded.exp > currentTime) {
                    dispatch(loginSuccess({ user: decoded }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    }, [dispatch]);

    return children;
};

export default AppInitializer;
