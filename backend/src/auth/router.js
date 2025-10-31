import express from 'express';
import { login, register } from './auth.controller.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import validationErrors from '../validators/catch.errors.js';


const router = express.Router()


router.post("/login", ...loginValidator, validationErrors, login)
router.post("/register", ...registerValidator, validationErrors, register)

export default router;