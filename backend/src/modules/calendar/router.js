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
    getCalendarGuests,
    removeUserFromCalendar,
    leaveCalendar,
    updateCalendar,
} from "./calendar.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import {
    idValidator,
    nameValidator,
    descriptionValidator,
} from "./calendar.validators.js";
import { authenticate } from "../auth/auth.middleware.js";
import { calendarIdValidator, userIdValidator } from "./calendar.validators.js";

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

router.get(
    "/:calendar_id/guests",
    authenticate,
    calendarIdValidator,
    validationErrors,
    getCalendarGuests,
);

router.delete(
    "/:calendar_id/guests/:user_id",
    authenticate,
    calendarIdValidator,
    userIdValidator,
    validationErrors,
    removeUserFromCalendar,
);

router.post(
    "/:calendar_id/leave",
    authenticate,
    calendarIdValidator,
    validationErrors,
    leaveCalendar,
);

router.delete("/:calendar_id", authenticate, validationErrors, deleteCalendar);

export default router;
