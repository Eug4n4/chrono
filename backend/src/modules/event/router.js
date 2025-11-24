import express from "express";
import { createEvent, sendInvite } from "./event.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";
import { idValidator } from "./event.validators.js";
import { emailValidator } from "../auth/auth.validator.js";
const router = express.Router();

router.post("/", authenticate, validationErrors, createEvent);
router.post(
    "/invite",
    authenticate,
    idValidator,
    emailValidator,
    validationErrors,
    sendInvite,
);
export default router;
