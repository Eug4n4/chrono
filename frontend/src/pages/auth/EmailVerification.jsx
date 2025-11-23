import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../api/services/AuthService";
import {
    showSuccessToast,
    showErrorToast,
    extractErrorMessage,
} from "../../utils/toast.jsx";
import { CircleCheckBig, CircleAlert } from "lucide-react";

import s from "./email.verify.module.css";
import h from "../../components/common/header.module.css";

function EmailVerification() {
    const { token } = useParams();
    const [status, setStatus] = useState("loading");
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        AuthService.verifyEmail(token)
            .then(() => {
                if (isMounted) {
                    setStatus("success");
                    showSuccessToast("Email verified successfully!");
                    setTimeout(
                        () => navigate("/login", { replace: true }),
                        3000,
                    );
                }
            })
            .catch((error) => {
                if (isMounted) {
                    const errorMessage = extractErrorMessage(error);
                    setStatus("error");
                    showErrorToast(errorMessage);
                    console.error("Email verification failed:", error);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [token, navigate]);

    if (status === "loading") return null;

    if (status === "success") {
        return (
            <div className={s.email_verify_page}>
                <div className={s.verify_email_wrapper}>
                    <div>
                        <h2>Success</h2>
                        <CircleCheckBig />
                    </div>
                    <div className={s.verify_email_subtext}>
                        <p>Your email has been verified!</p>
                        <p>
                            Wait a bit until we redirect you to the login page
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={s.email_verify_page}>
            <div className={s.verify_email_wrapper}>
                <div>
                    <h2>Error</h2>
                    <CircleAlert />
                </div>
                <div className={s.verify_email_subtext}>
                    <p>Error while verifying your email</p>
                    <Link className={`${h.nav_link} ${h.register}`} to="/login">
                        Go to login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EmailVerification;
