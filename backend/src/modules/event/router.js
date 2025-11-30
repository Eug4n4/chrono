import express from "express";
import { getGuests, sendInvite } from "./event.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";
import { idValidator, paramIdValidator } from "./event.validators.js";
import { emailValidator } from "../auth/auth.validator.js";

const router = express.Router();

router.get(
    "/:eventId/guests",
    authenticate,
    paramIdValidator,
    validationErrors,
    getGuests,
);

router.post(
    "/invite",
    authenticate,
    idValidator,
    emailValidator,
    validationErrors,
    sendInvite,
);
export default router;
