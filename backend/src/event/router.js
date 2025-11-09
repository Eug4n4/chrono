import express from "express";
import { createEvent } from "./event.controller.js";
import validationErrors from "../validators/catch.errors.js";
import { authenticate } from "../midlewear/auth.midelwear.js";

const router = express.Router();

router.post("/", authenticate, validationErrors, createEvent);

export default router;
