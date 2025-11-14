import { useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import FeatureShowcase from "../../components/auth/FeatureShowcase";
import AuthService from "../../api/services/AuthService";
import {
    showSuccessToast,
    showErrorToast,
    extractErrorMessage,
} from "../../utils/toast.jsx";
import styles from "./Auth.module.css";

function Register() {
    const [submitting, setSubmitting] = useState(false);

    function handleSubmit(formData) {
        setSubmitting(true);
        AuthService.register(Object.fromEntries(formData))
            .then(() => {
                showSuccessToast(
                    "Registration successful! Please check your email for verification.",
                );
            })
            .catch((error) => {
                const errorMessage = extractErrorMessage(error);
                showErrorToast(errorMessage);
                console.error("Registration failed:", error);
            })
            .finally(() => setSubmitting(false));
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
                    <RegisterForm
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                </div>
            </div>
        </div>
    );
}

export default Register;
