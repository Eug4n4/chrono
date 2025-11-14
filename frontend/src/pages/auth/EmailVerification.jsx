import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../api/services/AuthService";
import {
    showSuccessToast,
    showErrorToast,
    extractErrorMessage,
} from "../../utils/toast";

function EmailVerification() {
    const { token } = useParams();
    const [validToken, setValidToken] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.verifyEmail(token)
            .then(() => {
                setValidToken(true);
                showSuccessToast("Email verified successfully!");
                setTimeout(() => navigate("/login", { replace: true }), 3000);
            })
            .catch((error) => {
                const errorMessage = extractErrorMessage(error);
                showErrorToast(errorMessage);
                console.error("Email verification failed:", error);
            });
    }, [token]);

    return (
        <div>
            {validToken && (
                <>
                    <h2>Success</h2>
                    <div>
                        <p>Your email has been verified</p>
                        <p>
                            Wait a bit utill we redirect you to the login page
                        </p>
                    </div>
                </>
            )}
            {!validToken && (
                <>
                    <h2>Error</h2>
                    <div>
                        <p>Error while verifying your email</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default EmailVerification;
