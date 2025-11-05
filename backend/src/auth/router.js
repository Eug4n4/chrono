import express from 'express';
import { login, register, resetPassword, sendPasswordReset } from './auth.controller.js';
import { emailValidator, loginValidator, passwordValidator, registerValidator } from '../validators/auth.validator.js';
import validationErrors from '../validators/catch.errors.js';
import { tokenMustBeValid } from '../validators/token.validator.js';


const router = express.Router()


router.post("/login", ...loginValidator, validationErrors, login)
router.post("/register", ...registerValidator, validationErrors, register)
router.post("/password-reset", emailValidator, validationErrors, sendPasswordReset)
router.post("/password-reset/:token", tokenMustBeValid("token"), passwordValidator, validationErrors, resetPassword)

export default router;