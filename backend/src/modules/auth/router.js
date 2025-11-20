import express from "express";
import {
    login,
    register,
    resetPassword,
    sendPasswordReset,
    verifyEmail,
    refresh,
    resendVerificationEmail,
    logout,
} from "./auth.controller.js";
import {
    emailValidator,
    loginValidator,
    passwordValidator,
    registerValidator,
    tokenMustBeValid,
} from "./auth.validator.js";
import validationErrors from "../../shared/validators/catch.errors.js";

const router = express.Router();

router.post("/login", ...loginValidator, validationErrors, login);
router.post("/logout", logout);
router.post("/register", ...registerValidator, validationErrors, register);
router.post("/refresh", refresh);
router.post(
    "/password-reset",
    emailValidator,
    validationErrors,
    sendPasswordReset,
);
router.post(
    "/password-reset/:token",
    tokenMustBeValid("token"),
    passwordValidator,
    validationErrors,
    resetPassword,
);
router.get("/verify/:token", tokenMustBeValid("token"), verifyEmail);
router.post(
    "/resend-verification",
    emailValidator,
    validationErrors,
    resendVerificationEmail,
);

export default router;
