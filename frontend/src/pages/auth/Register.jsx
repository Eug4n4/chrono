import { useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import AuthService from "../../api/services/AuthService";
import {
    showSuccessToast,
    showErrorToast,
    extractErrorMessage,
} from "../../utils/toast";

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
    return <RegisterForm onSubmit={handleSubmit} submitting={submitting} />;
}

export default Register;
