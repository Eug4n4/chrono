import express from "express";
import { sendInvite } from "./event.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";
import { idValidator } from "./event.validators.js";
import { emailValidator } from "../auth/auth.validator.js";

const router = express.Router();

router.post(
    "/invite",
    authenticate,
    idValidator,
    emailValidator,
    validationErrors,
    sendInvite,
);
export default router;
