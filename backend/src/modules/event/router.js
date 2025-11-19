import express from "express";
import { createEvent } from "./event.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, validationErrors, createEvent);

export default router;
