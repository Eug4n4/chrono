import express from "express";
import { getHolidays } from "./holidays.controller.js";
import validationErrors from "../validators/catch.errors.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, validationErrors, getHolidays);

export default router;
