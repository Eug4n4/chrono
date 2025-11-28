import express from "express";
import {
    acceptInviteToEvent,
    createCalendar,
    createEventToCalendar,
    deleteCalendar,
    getCalendars,
    getCalendarsEvents,
    inviteUserToCalendar,
    respondToCalendarInvite,
    updateCalendar,
} from "./calendar.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";
import {
    idValidator,
    nameValidator,
    descriptionValidator,
} from "./calendar.validators.js";
const router = express.Router();

router.get("/", authenticate, validationErrors, getCalendars);
router.get(
    "/:calendar_id/events",
    authenticate,
    validationErrors,
    getCalendarsEvents,
    acceptInviteToEvent,
);

router.post("/", authenticate, validationErrors, createCalendar);
router.post(
    "/:calendar_id/events",
    authenticate,
    validationErrors,
    createEventToCalendar,
);
router.post(
    "/add-shared-event",
    authenticate,
    validationErrors,
    acceptInviteToEvent,
);
router.post("/invite", authenticate, validationErrors, inviteUserToCalendar);
router.post("/invite/respond", validationErrors, respondToCalendarInvite);

router.patch(
    "/:id",
    authenticate,
    idValidator,
    nameValidator,
    descriptionValidator,
    validationErrors,
    updateCalendar,
);

router.delete("/:calendar_id", authenticate, validationErrors, deleteCalendar);

export default router;
