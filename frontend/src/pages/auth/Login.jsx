import AuthService from "../../api/services/AuthService";
import { useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setLoading } from "../../features/state/authSlice";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookies";
import { jwtDecode } from "jwt-decode";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    async function handleSubmit(e) {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            await AuthService.login(Object.fromEntries(new FormData(e.target)));

            const token = getCookie("access");
            if (token) {
                const decoded = jwtDecode(token);
                dispatch(loginSuccess({ user: decoded }));
            }

            navigate("/calendar");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return <LoginForm onSubmit={handleSubmit} submitting={loading} />;
}

export default Login;
