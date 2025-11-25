import express from "express";
import {
    acceptInviteToEvent,
    createCalendar,
    createEventToCalendar,
    deleteCalendar,
    getCalendars,
    getCalendarsEvents,
} from "./calendar.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, validationErrors, getCalendars);
router.get(
    "/:calendar_id/events",
    authenticate,
    validationErrors,
    getCalendarsEvents,
    acceptInviteToEvent
);

router.post("/", authenticate, validationErrors, createCalendar);
router.post("/:calendar_id/events", authenticate, validationErrors, createEventToCalendar);
router.post("/add-shared-event", authenticate, validationErrors, acceptInviteToEvent);

router.delete("/:calendar_id", authenticate, validationErrors, deleteCalendar);

export default router;
