import { useState } from "react";
import Input from "../../components/inputs/Input";
import AuthService from "../../api/services/AuthService";
import FeatureShowcase from "../../components/auth/FeatureShowcase";
import {
    showSuccessToast,
    showErrorToast,
    extractErrorMessage,
} from "../../utils/toast.jsx";
import styles from "./Auth.module.css";
import formStyles from "../../components/forms/login.form.module.css";

function PasswordReset() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({ email: "" });

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        const errors = {};

        if (!/^[\w.]+@(?:\w{2,}\.)+\w{2,}$/.test(email)) {
            errors.email = "Invalid email";
        }
        if (Object.keys(errors).length > 0) {
            setSubmitting(false);
            setSuccess(false);
            setErrors(errors);
            return;
        }

        AuthService.sendResetPassword({ email: email })
            .then(() => {
                setSuccess(true);
                showSuccessToast("Password reset email sent successfully!");
            })
            .catch((error) => {
                const errorMessage = extractErrorMessage(error);
                showErrorToast(errorMessage);
                console.error("Password reset failed:", error);
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
                    <div className={formStyles.login_container}>
                        <div className={formStyles.login_card}>
                            <form id="remind_form" onSubmit={handleSubmit}>
                                <div className={formStyles.wrapper}>
                                    <h2>Password Reset</h2>
                                </div>
                                <div className={formStyles.wrapper}>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <label htmlFor="email">Email</label>
                                    {errors.email && <p>{errors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={formStyles.submit_login}
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Send recovery email"}
                                </button>
                                {success && (
                                    <div className={formStyles.wrapper}>
                                        <p
                                            style={{
                                                color: "#10b981",
                                                margin: "16px 0 0 0",
                                            }}
                                        >
                                            Email was successfully sent!
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
