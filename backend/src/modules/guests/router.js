import express from "express";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = express.Router();

//router.get("/", authenticate, validationErrors, getHolidays);

export default router;