import express from "express";
import { createCalendar } from "./calendar.controller.js";
import validationErrors from "../validators/catch.errors.js";
import { authenticate } from "../midlewear/auth.midelwear.js";

const router = express.Router();

router.post("/", authenticate, validationErrors, createCalendar);

export default router;
