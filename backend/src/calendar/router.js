import express from "express";
import { createCalendar, deleteCalendar, getCalendars } from "./calendar.controller.js";
import validationErrors from "../validators/catch.errors.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, validationErrors, getCalendars);

router.post("/", authenticate, validationErrors, createCalendar);

router.delete("/:calendar_id", authenticate, validationErrors, deleteCalendar);

export default router;
