import AuthService from "../../api/services/AuthService";
import { useState } from "react";
import LoginForm from "../../components/forms/LoginForm";
import FeatureShowcase from "../../components/auth/FeatureShowcase";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setLoading } from "../../features/state/authSlice";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookies";
import { jwtDecode } from "jwt-decode";
import {
    showSuccessToast,
    showErrorToast,
    showActionToast,
    extractErrorMessage,
} from "../../utils/toast.jsx";
import styles from "./Auth.module.css";

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

            showSuccessToast("Login successful!");
            navigate("/calendar");
        } catch (error) {
            if (
                error.response?.status === 403 &&
                error.response?.data?.code === "EMAIL_NOT_VERIFIED"
            ) {
                const errorMessage =
                    error.response?.data?.message ||
                    "Please verify your email before logging in";
                showErrorToast(errorMessage);

                setTimeout(() => {
                    showActionToast(
                        "Do you want to send verification email?",
                        () =>
                            handleResendVerification(error.response.data.email),
                        () => console.log("Cancelled"),
                        "Send",
                        "Cancel",
                    );
                }, 500);
            } else {
                const errorMessage = extractErrorMessage(error);
                showErrorToast(errorMessage);
            }
            console.error("Login failed:", error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleResendVerification(email) {
        try {
            await AuthService.resendVerificationEmail(email);
            showSuccessToast("Verification email sent! Check your inbox.");
        } catch (error) {
            const errorMessage = extractErrorMessage(error);
            showErrorToast(errorMessage);
            console.error("Resend verification failed:", error);
        }
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.headerSection}>
                <h1 className={styles.appTitle}>Chronos</h1>
                <p className={styles.appSubtitle}>
                    Your Personal Calendar & Task Manager
                </p>
                <p className={styles.appDescription}>
                    Stay organized and manage your time effectively with our
                    modern calendar application
                </p>
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.showcaseSection}>
                    <FeatureShowcase />
                </div>
                <div className={styles.formSection}>
                    <LoginForm onSubmit={handleSubmit} submitting={loading} />
                </div>
            </div>
        </div>
    );
}

export default Login;
