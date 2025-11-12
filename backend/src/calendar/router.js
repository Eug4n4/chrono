import express from "express";
import { createCalendar, getCalendar } from "./calendar.controller.js";
import validationErrors from "../validators/catch.errors.js";
import { authenticate } from "../midlewear/auth.midelwear.js";

const router = express.Router();

router.post("/", authenticate, validationErrors, createCalendar);
router.get("/", authenticate, validationErrors, getCalendar);

export default router;
