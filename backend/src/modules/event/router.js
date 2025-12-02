import express from "express";
import {
    deleteEvent,
    deleteGuest,
    getGuests,
    leaveEvent,
    sendInvite,
    updateEvent,
} from "./event.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";
import { emailValidator } from "../auth/auth.validator.js";
import { mongoIdValidator } from "../../shared/validators/id.validator.js";
import stringValidator from "../../shared/validators/string.validator.js";
import { body } from "express-validator";

const router = express.Router();

router.get(
    "/:eventId/guests",
    authenticate,
    mongoIdValidator("eventId", "param"),
    validationErrors,
    getGuests,
);

router.post(
    "/invite",
    authenticate,
    mongoIdValidator("eventId", "body"),
    emailValidator,
    validationErrors,
    sendInvite,
);

router.post(
    "/:eventId/leave",
    authenticate,
    mongoIdValidator("eventId", "param"),
    validationErrors,
    leaveEvent,
);

router.patch(
    "/:eventId",
    authenticate,
    mongoIdValidator("eventId", "param"),
    stringValidator("name", "body"),
    stringValidator("type", "body").isIn(["arrangement", "reminder", "task"]),
    stringValidator("description", "body").optional(),
    body("color").exists().isHexColor(),
    body("tags").exists().isArray(),
    stringValidator("start", "body"),
    stringValidator("end", "body").optional(),
    stringValidator("remindAfter", "body").optional(),
    validationErrors,
    updateEvent,
);

router.delete(
    "/:eventId/guests/:userId",
    authenticate,
    mongoIdValidator("eventId", "param"),
    mongoIdValidator("userId", "param"),
    validationErrors,
    deleteGuest,
);

router.delete(
    "/:eventId",
    authenticate,
    mongoIdValidator("eventId", "param"),
    validationErrors,
    deleteEvent,
);
export default router;
