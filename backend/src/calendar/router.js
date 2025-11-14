import express from "express";
import { createCalendar, deleteCalendar, getCalendar } from "./calendar.controller.js";
import validationErrors from "../validators/catch.errors.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, validationErrors, createCalendar);
router.get("/", authenticate, validationErrors, getCalendar);
router.delete("/:calendar_id", authenticate, validationErrors, deleteCalendar);

export default router;
