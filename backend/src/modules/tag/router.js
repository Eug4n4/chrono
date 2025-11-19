import express from "express";
import { createTag, getTags } from "./tag.controller.js";
import validationErrors from "../../shared/validators/catch.errors.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, validationErrors, getTags);
router.post("/", authenticate, validationErrors, createTag);

export default router;
