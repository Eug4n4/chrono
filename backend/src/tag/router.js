import express from "express";
import { getTags } from "./tag.controller.js";
import validationErrors from "../validators/catch.errors.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, validationErrors, getTags);

export default router;
